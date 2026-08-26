"""
廿日市市の「認可保育施設空き状況」PDFから表を抜き出す

実行: python scripts/hatsukaichi-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-hatsukaichi-vacancy.ts から呼ぶ）

## 表の作り
- 2ページ。地域ごと（廿日市・佐伯・吉和・大野・宮島）に一覧が並ぶ
- **地域の区切りは「〇〇地域の一覧表」という行**で、そのあとに
  「保育施設名 0歳 1歳 …」の見出しが続く
- 表としては1ページに1つだが、その中に地域の見出しと年齢の見出しが混ざる
- 記号は ●＝4人以上、▲＝1〜3人、×＝0人、―＝利用できません。
  **凡例はPDFではなくページのHTMLの表にある**
- 施設名に「※建替等予定あり」「【市HP】」が改行で付くことがある
- 施設名が2行に折り返されることがある
"""

import json
import re
import sys

import pdfplumber

COL_NAME = 0
COL_AGE0 = 1
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

MARKS = "●▲×✕○◯〇△―－—"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def extract(path):
    rows = []
    mark_counts = {}
    blanks = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) < 1:
            fail("ページがありません")

        first = pdf.pages[0]
        flat = "".join((first.extract_text() or "").split()).translate(ZEN)

        m = re.search(r"[（(]令和(\d+)年(\d+)月(\d+)日現在[）)]", flat)
        if not m:
            fail("「（令和N年M月D日現在）」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"【R(\d+)\.(\d+)月入園調整後】", flat)
        if not m:
            fail("「【R8.9月入園調整後】」の形を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        area_carry = ""
        for page in pdf.pages:
            tables = page.find_tables()
            if len(tables) != 1:
                fail(f"表が{len(tables)}個あるページがあります（1個のはず）")
            for raw_row in tables[0].extract():
                values = list(map(cell, raw_row))
                if len(values) != COLUMN_COUNT:
                    fail(f"列数が{len(values)}の行があります（{COLUMN_COUNT}列のはず）")

                joined = "".join(values)
                # 「廿日市地域の一覧表」の行
                m = re.search(r"([^\s]+?)地域の一覧表", joined)
                if m:
                    area_carry = m.group(1) + "地域"
                    continue
                # 年齢の見出しの行
                if values[COL_NAME] == "保育施設名":
                    continue
                # 表題の行
                if "空き状況" in joined and "入園調整後" in joined:
                    continue

                # 施設名は改行で「※建替等予定あり」「【市HP】」が付くことがある
                parts = [cell(p) for p in str(raw_row[COL_NAME] or "").split("\n") if cell(p)]
                extra = [p for p in parts if p.startswith(("※", "【"))]
                name = "".join(p for p in parts if p not in extra)
                if not name:
                    continue
                if not area_carry:
                    fail(f"{name}: 地域が分かりません")

                marks = []
                for age in range(AGE_COUNT):
                    value = values[COL_AGE0 + age]
                    if value == "":
                        blanks += 1
                        marks.append(None)
                        continue
                    if value not in MARKS:
                        fail(f"{name}: {age}歳が想定の記号ではありません（「{value}」）")
                    marks.append(value)
                    mark_counts[value] = mark_counts.get(value, 0) + 1

                if all(m is None for m in marks):
                    fail(f"{name}: 全ての年齢が空らんです")
                rows.append({"area": area_carry, "name": name, "extra": extra, "marks": marks})

    if not rows:
        fail("施設の行を取り出せませんでした")

    return {
        "asOf": as_of,
        "target": target,
        "markCounts": mark_counts,
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
