"""
甲府市の「募集人員一覧表」PDFから表を抜き出す

実行: python scripts/kofu-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kofu-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに**3つの表**（保育所（園）／認定こども園／地域型保育事業所）。
  表の上に種類が書いてある
- 列は No／施設名／0歳児クラス〜5歳児クラス／合計
- **合計の列と、表の中の「公立計」「私立計」「◯◯合計」の行がある**ので検算に使える
- 空らんはその年齢のクラスがないことを表す
  （地域型保育事業所は0〜2歳児クラスのみ、幼稚園型の認定こども園は3歳児クラス以上）
"""

import json
import re
import sys

import pdfplumber

COL_NO = 0
COL_NAME = 1
COL_AGE0 = 2
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT + 1  # 合計の列を含む

ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def title_of(page, table):
    """表の上に書いてある施設の種類"""
    words = page.crop(
        (table.bbox[0] - 4, max(0, table.bbox[1] - 16), table.bbox[2], table.bbox[1] - 1)
    ).extract_words()
    # 注意書きが混ざるので、短くて「所」「園」で終わるものを選ぶ
    for word in sorted(words, key=lambda w: len(w["text"])):
        text = cell(word["text"])
        if 3 <= len(text) <= 14 and not text.startswith("※"):
            return text
    return ""


def extract(path):
    as_of = None
    target = None
    notes = []
    groups = []

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日?現在", flat)
        if not m:
            fail("「令和N年M月D日現在」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"令和(\d+)年度(\d+)月入所募集人員一覧表", flat)
        if not m:
            fail("「令和N年度M月入所 募集人員一覧表」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        for line in text.splitlines():
            line = line.strip()
            if line.startswith("※") and len(line) > 6:
                notes.append(line.lstrip("※").strip())

        tables = page.find_tables()
        if len(tables) < 3:
            fail(f"表が{len(tables)}個しかありません（3個以上のはず）")

        for index, table in enumerate(tables):
            extracted = table.extract()
            head = [cell(c) for c in extracted[0]]
            if len(head) != COLUMN_COUNT:
                fail(f"{index}番目の表の列数が{len(head)}です（{COLUMN_COUNT}列のはず）")
            if not re.fullmatch(r"[NＮ][oｏ]", head[COL_NO]) or head[-1] != "合計":
                fail(f"{index}番目の表の見出しが想定と違います: {head}")
            for age in range(AGE_COUNT):
                if head[COL_AGE0 + age] != f"{age}歳児クラス":
                    fail(f"{index}番目の表の年齢の見出しが想定と違います: {head}")

            category = title_of(page, table)
            if not category:
                fail(f"{index}番目の表の種類が見つかりません")

            rows = []
            totals = []
            for values in (list(map(cell, r)) for r in extracted[1:]):
                name = values[COL_NAME]
                no = values[COL_NO]
                marks = values[COL_AGE0 : COL_AGE0 + AGE_COUNT]
                total = values[COL_AGE0 + AGE_COUNT]
                # 「公立計 ５保育所」「認定こども園合計４０園」のような行は No の欄に入る
                if not no.isdigit():
                    if no:
                        totals.append({"label": no, "marks": marks, "total": total})
                    continue
                if not name:
                    fail(f"{category}: No {no} の施設名が空です")
                rows.append({"name": name, "marks": marks, "total": total})

            if not rows:
                fail(f"{category}: 施設の行がありません")
            if not totals:
                fail(f"{category}: 合計の行がありません")
            groups.append({"category": category, "rows": rows, "totals": totals})

    if not groups:
        fail("表を取り出せませんでした")

    return {
        "asOf": as_of,
        "target": target,
        "notes": notes,
        "groups": groups,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
