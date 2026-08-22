"""
枚方市の「受入れ枠（予定）」PDFから表を抜き出す

実行: python scripts/hirakata-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-hirakata-vacancy.ts から呼ぶ）

## 表の作り
- 2ページ。9列（エリア／小エリア／保育所（園）名／0歳児クラス〜5歳児クラス）
- 受入れ枠は人数。空欄は0人
- **クラスそのものを設けていないところは灰色に塗られている**
  （本文に「■は設定がないクラスです」とある）。塗りの矩形とセルの位置を
  突き合わせて、0人と切り分ける
- エリア・小エリアは縦結合で、値はセルの真ん中あたりの行にしか入らない

## 検算のための持ち出し
- 歳児の欄のx座標の中にある数字を、表とは別に語の単位で拾って合計する
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 3 + AGE_COUNT
COL_AREA = 0
COL_SUBAREA = 1
COL_NAME = 2
COL_AGE0 = 3
# 「設定がないクラス」の灰色。真っ黒（罫線）や白は除く
GRAY_MIN, GRAY_MAX = 0.4, 0.9


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def gray_boxes(page):
    """「設定がないクラス」を表す灰色の矩形"""
    boxes = []
    for rect in page.rects:
        color = rect.get("non_stroking_color")
        if color is None:
            continue
        values = color if isinstance(color, (list, tuple)) else [color]
        try:
            numbers = [float(v) for v in values]
        except (TypeError, ValueError):
            continue
        if not numbers or not all(GRAY_MIN <= n <= GRAY_MAX for n in numbers):
            continue
        if len(set(numbers)) > 1:
            continue  # 色が付いている（見出しの青など）
        if rect["x1"] - rect["x0"] < 5 or rect["bottom"] - rect["top"] < 5:
            continue
        boxes.append((rect["x0"], rect["top"], rect["x1"], rect["bottom"]))
    return boxes


def extract(path):
    rows = []
    target = None
    word_sum = 0

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            flat = "".join((page.extract_text() or "").split())
            z = str.maketrans("０１２３４５６７８９", "0123456789")

            if page_index == 0:
                m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月受入れ枠", flat.translate(z))
                if not m:
                    fail("対象月を読み取れませんでした")
                target = (int(m.group(1)), int(m.group(2)))

            grays = gray_boxes(page)

            for table in page.find_tables():
                extracted = table.extract()
                if len(extracted[0]) != EXPECTED_COLUMNS:
                    fail(f"{page_index + 1}ページめの列数が{len(extracted[0])}になっています")
                heads = [cell(c).translate(z) for c in extracted[0][COL_AGE0 : COL_AGE0 + AGE_COUNT]]
                if heads != [f"{i}歳児クラス" for i in range(AGE_COUNT)]:
                    fail(f"{page_index + 1}ページめの歳児の見出しが{heads}になっています")

                # 歳児の欄のx座標。数字の合計を出すのにも使う
                spans = []
                for i in range(AGE_COUNT):
                    c = table.rows[0].cells[COL_AGE0 + i]
                    if c is None:
                        fail(f"{page_index + 1}ページめの歳児の見出しの位置を取れませんでした")
                    spans.append((c[0], c[2]))
                for word in page.crop(
                    (spans[0][0], table.rows[0].bbox[3], spans[-1][1], table.bbox[3])
                ).extract_words():
                    if re.fullmatch(r"\d+", word["text"]):
                        word_sum += int(word["text"])

                # エリアと小エリアは縦結合。セルの範囲を見て行に配る
                area_spans = {COL_AREA: [], COL_SUBAREA: []}
                for row_index, row in enumerate(table.rows):
                    for col in (COL_AREA, COL_SUBAREA):
                        c = row.cells[col]
                        value = cell(extracted[row_index][col])
                        if c is None or not value or value == "エリア":
                            continue
                        area_spans[col].append((c[1], c[3], value))

                def area_at(col, top, bottom):
                    middle = (top + bottom) / 2
                    for span_top, span_bottom, value in area_spans[col]:
                        if span_top <= middle <= span_bottom:
                            return value
                    return ""

                for row_index, row in enumerate(table.rows):
                    if row_index == 0:
                        continue
                    values = [cell(c) for c in extracted[row_index]]
                    name = values[COL_NAME]
                    if not name:
                        continue
                    name_cell = row.cells[COL_NAME]
                    top, bottom = (
                        (name_cell[1], name_cell[3]) if name_cell else (row.bbox[1], row.bbox[3])
                    )
                    stages = []
                    for i in range(AGE_COUNT):
                        x0, x1 = spans[i]
                        middle_x = (x0 + x1) / 2
                        middle_y = (top + bottom) / 2
                        painted = any(
                            gx0 <= middle_x <= gx1 and gy0 <= middle_y <= gy1
                            for gx0, gy0, gx1, gy1 in grays
                        )
                        stages.append({"text": values[COL_AGE0 + i], "painted": painted})
                    rows.append(
                        {
                            "area": area_at(COL_AREA, top, bottom),
                            "subarea": area_at(COL_SUBAREA, top, bottom),
                            "name": name,
                            "stages": stages,
                        }
                    )

    if not rows:
        fail("受入れ枠の表を取り出せませんでした")

    return {"target": target, "wordSum": word_sum, "rows": rows}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
