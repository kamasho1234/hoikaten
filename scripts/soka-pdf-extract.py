"""
草加市の「保育所等 空き状況一覧」PDFから表を抜き出す

実行: python scripts/soka-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-soka-vacancy.ts から呼ぶ）

## 表の作り
- 2ページ・8列（区分／保育園名／0歳〜5歳）
- 空きは人数。**数字＝空き人数、斜線＝そのクラスがない、空らん＝空きなし（0人）**
- 区分は公立保育園／私立保育園／地域型保育／認定こども園の4つ。
  **認定こども園だけ縦書き2列で文字が混ざる**（「こ※ど認も定園」）ので、
  既知の区分名と文字の集合で照合して正規化する
- 宇佐美家庭保育室は表の外の別セクションにあり、年齢別に分かれていないので取り込まない
"""

import json
import re
import sys

import pdfplumber

COL_KUBUN = 0
COL_NAME = 1
COL_AGE0 = 2
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

KNOWN_KUBUN = ["公立保育園", "私立保育園", "地域型保育", "認定こども園"]
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def has_slash(page, box):
    return any(
        box[0] - 1 <= c["x0"]
        and c["x1"] <= box[2] + 1
        and box[1] - 1 <= c["top"]
        and c["bottom"] <= box[3] + 1
        for c in page.curves
    )


def normalize_kubun(raw):
    """
    縦書き2列のせいで文字の並びが崩れることがあるので、
    既知の区分名と「文字の集合」で照合して正しい名前に直す
    """
    letters = set(raw) - {"※"}
    if not letters:
        return None
    for known in KNOWN_KUBUN:
        if letters == set(known):
            return known
    return None


def extract(path):
    as_of = None
    target = None
    notes = []
    rows = []
    slashes = 0
    blanks = 0
    numbers = 0
    outside = []

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) < 1:
            fail("ページがありません")
        kubun_carry = ""

        for page_index, page in enumerate(pdf.pages):
            flat = "".join((page.extract_text() or "").split()).translate(ZEN)

            # 基準日は表題の表（「…8月入園選考後」「令和8年7月27日現在」の2列）から取る。
            # 本文の「クラスは令和8年4月1日現在の年齢」と取り違えないため
            if as_of is None:
                for header in page.find_tables():
                    values = [cell(c) for row in header.extract() for c in row]
                    if not any("入園選考後" in v for v in values):
                        continue
                    for value in values:
                        m = re.fullmatch(r"令和(\d+)年(\d+)月(\d+)日現在", value)
                        if m:
                            as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
                    for value in values:
                        m = re.search(r"(\d+)月入園選考後", value)
                        if m and target is None:
                            target = int(m.group(1))

            for line in (page.extract_text() or "").splitlines():
                line = line.strip()
                for head in ("・", "※"):
                    if line.startswith(head) and len(line) >= 12:
                        text = line.lstrip(head).strip()
                        if text not in notes:
                            notes.append(text)

            bodies = [t for t in page.find_tables() if len(t.extract()[0]) == COLUMN_COUNT]
            if not bodies:
                fail(f"{page_index + 1}ページ目に{COLUMN_COUNT}列の表がありません")

            # 表の外にある「家庭保育室」の欄は取り込まない（年齢別に分かれていないため）
            for other in page.find_tables():
                if len(other.extract()[0]) == COLUMN_COUNT:
                    continue
                for row in other.extract():
                    name = cell(row[0]) if row else ""
                    if name and "保育" in name and "空き状況" not in name:
                        outside.append(name)

            for table in bodies:
                extracted = table.extract()
                for row_index, row in enumerate(table.rows):
                    values = [cell(c) for c in extracted[row_index]]
                    name = values[COL_NAME]
                    if not name or "保育園名" in name or "年齢" in name:
                        continue
                    if values[COL_KUBUN]:
                        kubun = normalize_kubun(values[COL_KUBUN])
                        if kubun is None:
                            fail(f"分からない区分です: 「{values[COL_KUBUN]}」")
                        kubun_carry = kubun
                    if not kubun_carry:
                        fail(f"{name}: 区分が分かりません")

                    counts = []
                    for age in range(AGE_COUNT):
                        column = COL_AGE0 + age
                        value = values[column]
                        if value:
                            if not re.fullmatch(r"\d+", value):
                                fail(f"{name}: {age}歳が数ではありません: 「{value}」")
                            numbers += 1
                            counts.append(int(value))
                            continue
                        box = row.cells[column]
                        if box is None:
                            fail(f"{name}: {age}歳の欄の位置を取れませんでした")
                        if has_slash(page, box):
                            # そのクラスがない
                            slashes += 1
                            counts.append(None)
                        else:
                            # 空らん＝空きなし
                            blanks += 1
                            counts.append(0)
                    rows.append({"kubun": kubun_carry, "name": name, "counts": counts})

    if not rows:
        fail("施設の行を取り出せませんでした")
    if as_of is None:
        fail("基準日（令和N年M月D日現在）を読み取れませんでした")
    if target is None:
        fail("何月入園選考後かを読み取れませんでした")

    return {
        "asOf": as_of,
        "target": target,
        "notes": notes,
        "outside": outside,
        "slashes": slashes,
        "blanks": blanks,
        "numbers": numbers,
        "rows": rows,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
