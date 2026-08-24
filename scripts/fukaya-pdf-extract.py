"""
深谷市の「保育施設受入可能人数」PDFから表を抜き出す

実行: python scripts/fukaya-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-fukaya-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ。9列（区分／施設名／0歳〜5歳／合計）
- 空きは人数。行ごとに合計が入っているので検算に使える
- 区分は縦書きの縦結合。「認定こども園」のように2列に分けて書いてある枠があり、
  語として切り出すと「こど認も定園」のように混ざるので、文字の位置で列に分ける
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 3 + AGE_COUNT
COL_DIVISION = 0
COL_NAME = 1
COL_AGE0 = 2
COL_TOTAL = 8
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def division_of(page, box):
    """
    縦書きの区分。2列に分けて書いてある枠があるので、文字のx座標で列に分け、
    右の列から順に読む（右が「公立」、左が「保育園」で「公立保育園」）
    """
    chars = sorted(page.crop(box).chars, key=lambda c: c["x0"])
    columns = []
    for char in chars:
        width = char["x1"] - char["x0"]
        # 同じ列の中のずれは文字の幅の半分より小さく、列どうしはそれ以上あく
        if columns and char["x0"] - columns[-1]["x0"] < width / 2:
            columns[-1]["chars"].append(char)
        else:
            columns.append({"x0": char["x0"], "chars": [char]})
    return "".join(
        "".join(c["text"] for c in sorted(column["chars"], key=lambda c: c["top"]))
        for column in reversed(columns)
    )


def extract(path):
    rows = []
    target = None

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        flat = "".join((page.extract_text() or "").split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月児童受入可能人数", flat)
        if not m:
            fail("対象月を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        for table in page.find_tables():
            extracted = table.extract()
            if len(extracted[0]) != EXPECTED_COLUMNS:
                fail(f"列数が{len(extracted[0])}になっています")
            heads = [cell(c) for c in extracted[0][COL_AGE0 : COL_AGE0 + AGE_COUNT]]
            if heads != [f"{i}歳" for i in range(AGE_COUNT)]:
                fail(f"歳児の見出しが{heads}になっています")
            if cell(extracted[0][COL_TOTAL]) != "合計":
                fail(f"合計の見出しが{cell(extracted[0][COL_TOTAL])}になっています")

            for row_index, row in enumerate(table.rows):
                if row_index == 0:
                    continue
                values = [cell(c) for c in extracted[row_index]]
                if not values[COL_NAME]:
                    continue
                box = row.cells[COL_DIVISION]
                values[COL_DIVISION] = division_of(page, box) if box else ""
                rows.append(values)

    if not rows:
        fail("受入可能人数の表を取り出せませんでした")
    if len(rows) < 40:
        fail(f"施設が{len(rows)}件しか取れていません")

    return {"target": target, "rows": rows}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
