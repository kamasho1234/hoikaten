"""
富士市の「保育施設等の空き状況」PDFから表を抜き出す

実行: python scripts/fuji-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-fuji-vacancy.ts から呼ぶ）

## 表の作り
- 3ページ。「■保育園一覧」「■認定こども園一覧」などの見出しごとに表がある
- 10列（公私／園名／所在地／受入年齢／0歳児〜5歳児）が基本だが、
  保育ママの表だけ7列（地区／名称／受入年齢／0歳児〜2歳児／3歳児／4歳児／5歳児）で
  0〜2歳がひとまとめ
- 「○」は空き有、空欄は空き枠なし
- **「＼」（受入クラスなし）は文字ではなく図形（curve）で描かれている**ので、
  セルの位置と重なる図形があるかで見分ける
- 公私は縦結合で、値はセルの真ん中あたりの行にしか入らない
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
WIDE_COLUMNS = 4 + AGE_COUNT
NARROW_COLUMNS = 7  # 保育ママの表。0〜2歳がひとまとめ


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def slash_marks(page):
    """「＼」として描かれている図形。表の枠のような大きいものは除く"""
    return [
        c
        for c in page.curves
        if (c["x1"] - c["x0"]) < 80 and (c["bottom"] - c["top"]) < 40
    ]


def extract(path):
    sections = []
    as_of = None
    slash_total = 0

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            flat = "".join(text.split())
            z = str.maketrans("０１２３４５６７８９", "0123456789")

            if page_index == 0:
                m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月([０-９\d]+)日時点", flat.translate(z))
                if not m:
                    fail("基準日を読み取れませんでした")
                as_of = tuple(int(g) for g in m.groups())

            slashes = slash_marks(page)
            slash_total += len(slashes)

            heads = []
            for line in page.extract_text_lines():
                s = "".join(line["text"].split())
                if s.startswith("■"):
                    heads.append({"top": line["top"], "text": s[1:]})

            for table in sorted(page.find_tables(), key=lambda t: t.bbox[1]):
                extracted = table.extract()
                columns = len(extracted[0])
                if columns not in (WIDE_COLUMNS, NARROW_COLUMNS):
                    fail(f"{page_index + 1}ページめの列数が{columns}になっています")

                above = [h for h in heads if h["top"] < table.bbox[1]]
                if not above:
                    fail(f"{page_index + 1}ページめの表に対応する見出しが見つかりません")
                head = above[-1]["text"]

                # 公私（または地区）は縦結合
                first_spans = []
                for row_index, row in enumerate(table.rows):
                    c = row.cells[0]
                    value = cell(extracted[row_index][0])
                    if c is None or not value or row_index == 0:
                        continue
                    first_spans.append((c[1], c[3], value))

                age_start = 4 if columns == WIDE_COLUMNS else 3
                rows = []
                for row_index, row in enumerate(table.rows):
                    if row_index == 0:
                        continue
                    values = [cell(c) for c in extracted[row_index]]
                    if not values[1]:
                        continue
                    name_cell = row.cells[1]
                    top, bottom = (
                        (name_cell[1], name_cell[3]) if name_cell else (row.bbox[1], row.bbox[3])
                    )
                    middle = (top + bottom) / 2
                    group = ""
                    for span_top, span_bottom, value in first_spans:
                        if span_top <= middle <= span_bottom:
                            group = value
                            break

                    marks = []
                    for i in range(age_start, columns):
                        c = row.cells[i]
                        if c is None:
                            marks.append(False)
                            continue
                        cx, cy = (c[0] + c[2]) / 2, (c[1] + c[3]) / 2
                        marks.append(
                            any(
                                s["x0"] <= cx <= s["x1"] and s["top"] <= cy <= s["bottom"]
                                for s in slashes
                            )
                        )
                    rows.append(
                        {
                            "group": group,
                            "values": values,
                            "slashes": marks,
                        }
                    )
                if not rows:
                    fail(f"{head}: 施設の行がありません")
                sections.append({"name": head, "columns": columns, "rows": rows})

    if not sections:
        fail("空き状況の表を取り出せませんでした")

    return {"asOf": as_of, "slashTotal": slash_total, "sections": sections}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
