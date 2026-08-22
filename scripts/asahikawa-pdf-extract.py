"""
旭川市の「認可保育所等受入可能人数」PDFから表を抜き出す

実行: python scripts/asahikawa-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-asahikawa-vacancy.ts から呼ぶ）

## 表の作り
- 2ページ。10列（地区／園名／住所／0歳(新しい生まれ)／0歳(その年度)／1歳〜5歳）
- **0歳の欄が生年月日で2つに分かれている**
- 記号は○（3人以上）△（1〜2人）×（0人）。空欄はそのクラスがない
- 園名の頭に【保】【認】【小】【事】が付いて施設の種類を表す
- 地区は縦結合で、値はセルの真ん中あたりの行にしか入らない
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 3 + AGE_COUNT + 1  # 0歳が2列ぶんある
COL_WARD = 0
COL_NAME = 1
COL_AGE0 = 3
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
    kinds = []
    as_of = None
    mark_counts = {}

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            flat = "".join((page.extract_text() or "").split())
            z = str.maketrans("０１２３４５６７８９", "0123456789")

            if page_index == 0:
                m = re.search(r"（令和([０-９\d]+)年([０-９\d]+)月([０-９\d]+)日時点）", flat.translate(z))
                if not m:
                    fail("基準日を読み取れませんでした")
                as_of = tuple(int(g) for g in m.groups())

            def tidy(label):
                return re.sub(r"を表しています。?$", "", label)

            if not legend:
                # 「表中の○印は３人以上、△印は１～２人、×印は０人を表しています。」
                for mark, label in re.findall(rf"([{MARKS}])印は([^、。]+)", flat.translate(z)):
                    legend.append({"mark": mark, "label": tidy(label)})
            if not kinds:
                # 「【保】は認可保育所、【認】は認定こども園、…」。
                # 表の中の【小】なども引っかかるので、同じ記号は最初のものだけ使う
                for mark, label in re.findall(r"【(.)】は([^、。]+)", flat):
                    if any(k["mark"] == mark for k in kinds):
                        continue
                    kinds.append({"mark": mark, "label": tidy(label)})

            for table in page.find_tables():
                extracted = table.extract()
                if len(extracted[0]) != EXPECTED_COLUMNS:
                    fail(f"{page_index + 1}ページめの列数が{len(extracted[0])}になっています")
                heads = [cell(c).translate(z) for c in extracted[0][COL_AGE0 : COL_AGE0 + AGE_COUNT + 1]]
                if not heads[0].startswith("0歳") or not heads[1].startswith("0歳"):
                    fail(f"{page_index + 1}ページめの0歳の見出しが{heads[:2]}になっています")
                if heads[2:] != [f"{i}歳" for i in range(1, AGE_COUNT)]:
                    fail(f"{page_index + 1}ページめの歳児の見出しが{heads}になっています")

                # 記号の数。注意事項の説明を拾わないよう歳児の欄のx座標で切り出す
                first = table.rows[0].cells[COL_AGE0]
                last = table.rows[0].cells[COL_AGE0 + AGE_COUNT]
                if first is None or last is None:
                    fail(f"{page_index + 1}ページめの歳児の見出しの位置を取れませんでした")
                for word in page.crop(
                    (first[0], table.rows[0].bbox[3], last[2], table.bbox[3])
                ).extract_words():
                    for mark in MARKS:
                        mark_counts[mark] = mark_counts.get(mark, 0) + word["text"].count(mark)

                # 地区は縦結合
                ward_spans = []
                for row_index, row in enumerate(table.rows):
                    c = row.cells[COL_WARD]
                    value = cell(extracted[row_index][COL_WARD])
                    if c is None or not value or value == "地区":
                        continue
                    ward_spans.append((c[1], c[3], value))

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
                    ward = ""
                    for span_top, span_bottom, value in ward_spans:
                        if span_top <= middle <= span_bottom:
                            ward = value
                            break
                    values[COL_WARD] = ward
                    rows.append(values)

    if not rows:
        fail("受入可能人数の表を取り出せませんでした")
    if len(legend) < 3:
        fail(f"記号の凡例を読み取れませんでした（{len(legend)}件）")
    if len(kinds) < 3:
        fail(f"施設の種類の凡例を読み取れませんでした（{len(kinds)}件）")

    return {
        "asOf": as_of,
        "legend": legend,
        "kinds": kinds,
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
