"""
八戸市の「保育施設空き状況一覧」PDFから表を抜き出す

実行: python scripts/hachinohe-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-hachinohe-vacancy.ts から呼ぶ）

## 表の作り
- 2ページ。10列（地区／施設名／住所／電話番号／0歳児〜5歳児）。見出しは各ページ2行
- 記号は○（空き枠がある）－（空き枠がない）。空欄はそのクラスを設けていない
- 地区は縦結合。罫線が引かれていない場所があるので、枠ではなく行のy座標で切って読む
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 4 + AGE_COUNT
HEADER_ROWS = 2
COL_AREA = 0
COL_NAME = 1
COL_AGE0 = 4
MARKS = "○◯〇-‐‑‒–—―ー－"
# ハイフンをそのまま文字クラスに入れると範囲の指定になってしまう
MARK_CLASS = "".join(re.escape(c) for c in MARKS)
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def area_of(page, box):
    """
    地区の欄。地区名は行ごとに印字されているのに罫線が引かれていない場所があり、
    枠で切ると2つの地区が混ざってしまう。行のy座標で切って読む
    """
    names = {"".join(w["text"].split()) for w in page.crop(box).extract_words()}
    names.discard("")
    if len(names) > 1:
        fail(f"地区の欄に{sorted(names)}が入っています（1種類のはず）")
    # 続きの行には地区名が印字されていない。読む側で引き継ぐ
    return names.pop() if names else ""


def extract(path):
    rows = []
    legend = []
    target = None
    as_of = None
    mark_counts = {}

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            flat = "".join((page.extract_text() or "").split()).translate(ZEN)

            if page_index == 0:
                m = re.search(r"令和(\d+)年(\d+)月(\d+)日入所審査後時点", flat)
                if not m:
                    fail("対象を読み取れませんでした")
                target = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
                m = re.search(r"令和(\d+)年(\d+)月(\d+)日現在", flat)
                if not m:
                    fail("基準日を読み取れませんでした")
                as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
                # 「○印＝空き枠がある」「－印＝空き枠がない」
                for mark, label in re.findall(
                    rf"([{MARK_CLASS}])印＝([^※]*?空き枠が(?:ある|ない))", flat
                ):
                    legend.append({"mark": mark, "label": label})

            for table in page.find_tables():
                extracted = table.extract()
                if len(extracted[0]) != EXPECTED_COLUMNS:
                    fail(f"列数が{len(extracted[0])}になっています")
                heads = [
                    cell(c).translate(ZEN)
                    for c in extracted[HEADER_ROWS - 1][COL_AGE0 : COL_AGE0 + AGE_COUNT]
                ]
                if heads != [f"{i}歳児" for i in range(AGE_COUNT)]:
                    fail(f"歳児の見出しが{heads}になっています")

                # 記号の数。住所や電話番号のハイフンを拾わないよう歳児の欄で切り出す
                first = table.rows[HEADER_ROWS - 1].cells[COL_AGE0]
                last = table.rows[HEADER_ROWS - 1].cells[COL_AGE0 + AGE_COUNT - 1]
                if first is None or last is None:
                    fail("歳児の見出しの位置を取れませんでした")
                for word in page.crop(
                    (first[0], table.rows[HEADER_ROWS - 1].bbox[3], last[2], table.bbox[3])
                ).extract_words():
                    for mark in MARKS:
                        mark_counts[mark] = mark_counts.get(mark, 0) + word["text"].count(mark)

                area_column = next(
                    (r.cells[COL_AREA] for r in table.rows if r.cells[COL_AREA]), None
                )
                if area_column is None:
                    fail("地区の欄の位置を取れませんでした")

                for row_index, row in enumerate(table.rows):
                    if row_index < HEADER_ROWS:
                        continue
                    values = [cell(c) for c in extracted[row_index]]
                    if not values[COL_NAME]:
                        continue
                    name_cell = row.cells[COL_NAME]
                    top, bottom = (
                        (name_cell[1], name_cell[3]) if name_cell else (row.bbox[1], row.bbox[3])
                    )
                    values[COL_AREA] = area_of(
                        page, (area_column[0], top, area_column[2], bottom)
                    )
                    rows.append(values)

    if not rows:
        fail("空き状況の表を取り出せませんでした")
    if len(rows) < 70:
        fail(f"施設が{len(rows)}件しか取れていません")
    if len(legend) != 2:
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
