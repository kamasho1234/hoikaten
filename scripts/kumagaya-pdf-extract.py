"""
熊谷市の「保育所(園)・認定こども園・地域型保育施設 受入可能状況」PDFから表を抜き出す

実行: python scripts/kumagaya-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kumagaya-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ。13列（区分／No.／施設名／所在地／定員／年齢／電話番号／0歳〜5歳）
- 記号は○（2人以上）△（1人）×（空きはありません）。空欄は対象の歳児ではない
- 区分（公立保育所・民間保育園・認定こども園・地域型保育施設）は縦結合で、
  値はセルの真ん中あたりの行にしか入らない
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 7 + AGE_COUNT
COL_DIVISION = 0
COL_NO = 1
COL_NAME = 2
COL_TARGET_AGE = 5
COL_AGE0 = 7
MARKS = "○◯〇△×✕"


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def extract(path):
    rows = []
    legend = []
    target = None
    as_of = None
    mark_counts = {}

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            flat = "".join((page.extract_text() or "").split())
            z = str.maketrans("０１２３４５６７８９", "0123456789")

            if page_index == 0:
                m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月入所", flat.translate(z))
                if not m:
                    fail("対象月を読み取れませんでした")
                target = (int(m.group(1)), int(m.group(2)))
                m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月([０-９\d]+)日現在", flat.translate(z))
                if not m:
                    fail("基準日を読み取れませんでした")
                as_of = tuple(int(g) for g in m.groups())

            if not legend:
                # 「【表の見方】 入所可能人数 ○：２人以上 △：１人 ×：空きはありません」
                for mark, label in re.findall(rf"([{MARKS}])：([^{MARKS}※\s]+)", flat.translate(z)):
                    legend.append({"mark": mark, "label": label})

            for table in page.find_tables():
                extracted = table.extract()
                if len(extracted[0]) != EXPECTED_COLUMNS:
                    fail(f"列数が{len(extracted[0])}になっています")
                heads = [cell(c).translate(z) for c in extracted[0][COL_AGE0 : COL_AGE0 + AGE_COUNT]]
                if heads != [f"{i}歳" for i in range(AGE_COUNT)]:
                    fail(f"歳児の見出しが{heads}になっています")

                # 記号の数。表の見方の説明を拾わないよう歳児の欄のx座標で切り出す
                first = table.rows[0].cells[COL_AGE0]
                last = table.rows[0].cells[COL_AGE0 + AGE_COUNT - 1]
                if first is None or last is None:
                    fail("歳児の見出しの位置を取れませんでした")
                for word in page.crop(
                    (first[0], table.rows[0].bbox[3], last[2], table.bbox[3])
                ).extract_words():
                    for mark in MARKS:
                        mark_counts[mark] = mark_counts.get(mark, 0) + word["text"].count(mark)

                # 区分は縦結合
                division_spans = []
                for row_index, row in enumerate(table.rows):
                    c = row.cells[COL_DIVISION]
                    value = cell(extracted[row_index][COL_DIVISION])
                    if c is None or not value or row_index == 0:
                        continue
                    division_spans.append((c[1], c[3], value))

                for row_index, row in enumerate(table.rows):
                    if row_index == 0:
                        continue
                    values = [cell(c) for c in extracted[row_index]]
                    if not values[COL_NAME]:
                        continue
                    name_cell = row.cells[COL_NAME]
                    top, bottom = (
                        (name_cell[1], name_cell[3]) if name_cell else (row.bbox[1], row.bbox[3])
                    )
                    middle = (top + bottom) / 2
                    division = ""
                    for span_top, span_bottom, value in division_spans:
                        if span_top <= middle <= span_bottom:
                            division = value
                            break
                    values[COL_DIVISION] = division
                    rows.append(values)

    if not rows:
        fail("受入可能状況の表を取り出せませんでした")
    if len(legend) < 3:
        fail(f"記号の凡例を読み取れませんでした（{len(legend)}件）")

    return {
        "target": target,
        "asOf": as_of,
        "legend": legend,
        "markCounts": {k: v for k, v in mark_counts.items() if v},
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
