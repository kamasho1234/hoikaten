"""
東松山市の「市内認可保育施設空き状況一覧」PDFから表を抜き出す

実行: python scripts/higashimatsuyama-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-higashimatsuyama-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・10列（区分／保育施設名／定員／入園年齢／0歳児〜5歳児）
- 数字は空き人数。**0も書かれる**ので、空らんはその年齢のクラスがないことを表す
- **「入園年齢」の列**（「６か月～」「２か月～２歳児」「３歳児～」）から
  受け入れる年齢が上下とも決まるので、空らんを全件検算できる
- 区分は縦書きの結合セルで文字の並びが崩れる（「認定こども園」が「こど認も定園」）
  ので、分かっている区分名と文字の集合で照合する
"""

import json
import re
import sys

import pdfplumber

COL_KIND = 0
COL_NAME = 1
COL_CAPACITY = 2
COL_ACCEPT = 3
COL_AGE0 = 4
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

KNOWN_KINDS = ("公立保育園", "民間保育園", "小規模保育事業所", "認定こども園")
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def extract(path):
    notes = []
    rows = []
    numbers = 0
    blanks = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"R(\d+)\.(\d+)\.(\d+)時点", flat)
        if not m:
            fail("「RN.M.D時点」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"【令和(\d+)年(\d+)月入所選考", flat)
        if not m:
            fail("「【令和N年M月入所選考…】」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        for line in text.splitlines():
            stripped = line.strip()
            if len(stripped) > 20 and stripped.endswith("。"):
                notes.append(stripped.lstrip("※").strip())

        tables = [t for t in page.find_tables() if len(t.extract()[0]) == COLUMN_COUNT]
        if not tables:
            fail("表が見つかりません")
        extracted = tables[0].extract()

        head = [cell(c) for c in extracted[0]]
        if head[COL_NAME] != "保育施設名" or head[COL_ACCEPT] != "入園年齢":
            fail(f"見出しが想定と違います: {head}")
        for age in range(AGE_COUNT):
            if head[COL_AGE0 + age] != f"{age}歳児":
                fail(f"年齢の見出しが想定と違います: {head}")

        kind_carry = ""
        for values in (list(map(cell, r)) for r in extracted[1:]):
            name = values[COL_NAME]
            if not name:
                continue

            raw_kind = values[COL_KIND]
            if raw_kind:
                # 縦書きで文字の並びが崩れるので、文字の集合で照合して長いものを採る
                matched = [k for k in KNOWN_KINDS if set(k) <= set(raw_kind)]
                if not matched:
                    fail(f"{name}: 区分「{raw_kind}」が分かりません")
                kind_carry = max(matched, key=len)
            if not kind_carry:
                fail(f"{name}: 区分が分かりません")

            counts = []
            for age in range(AGE_COUNT):
                value = values[COL_AGE0 + age]
                if value == "":
                    blanks += 1
                    counts.append(None)
                    continue
                if not re.fullmatch(r"\d+", value):
                    fail(f"{name}: {age}歳児が数ではありません（「{value}」）")
                numbers += 1
                counts.append(int(value))

            if all(c is None for c in counts):
                fail(f"{name}: 全ての年齢が空らんです")
            rows.append(
                {
                    "kind": kind_carry,
                    "name": name,
                    "capacity": values[COL_CAPACITY],
                    "accept": values[COL_ACCEPT],
                    "counts": counts,
                }
            )

    if not rows:
        fail("施設の行を取り出せませんでした")

    return {
        "asOf": as_of,
        "target": target,
        "notes": notes,
        "numbers": numbers,
        "blanks": blanks,
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
