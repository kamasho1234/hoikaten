"""
戸田市の「空き状況」PDFから表を抜き出す

実行: python scripts/toda-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-toda-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ。施設名／0才〜5才（小規模保育等は0才〜2才）／合計
- 空きは人数。行ごとの合計と、いちばん下に列ごとの合計が入っている
- **設けていないクラスは空欄ではなくセルに斜線が引いてある**
"""

import json
import re
import sys

import pdfplumber

COL_NAME = 0
TOTAL_ROW = "合計"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def has_slash(page, box):
    """セルに斜線が引いてあるか"""
    return any(
        box[0] - 1 <= c["x0"]
        and c["x1"] <= box[2] + 1
        and box[1] - 1 <= c["top"]
        and c["bottom"] <= box[3] + 1
        for c in page.curves
    )


def extract(path):
    rows = []
    ages = []
    totals = []
    as_of = None

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        flat = "".join((page.extract_text() or "").split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日現在", flat)
        if not m:
            fail("基準日を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        tables = page.find_tables()
        if len(tables) != 1:
            fail(f"表が{len(tables)}個あります（1個のはず）")
        table = tables[0]
        extracted = table.extract()

        heads = [cell(c) for c in extracted[0]]
        for index, head in enumerate(heads):
            m = re.fullmatch(r"(\d+)才", head)
            if m:
                ages.append((index, int(m.group(1))))
        if not ages:
            fail(f"歳児の見出しが見つかりません（{heads}）")
        if [a for _, a in ages] != list(range(len(ages))):
            fail(f"歳児の見出しが{[a for _, a in ages]}になっています")
        if heads[-1] != TOTAL_ROW:
            fail(f"いちばん右の見出しが{heads[-1]}になっています（合計のはず）")

        for row_index, row in enumerate(table.rows):
            if row_index == 0:
                continue
            values = [cell(c) for c in extracted[row_index]]
            name = values[COL_NAME]
            if not name:
                continue

            counts = []
            for column, _ in ages:
                if values[column]:
                    counts.append(values[column])
                    continue
                box = row.cells[column]
                if box is None:
                    fail(f"{name}: 欄の位置を取れませんでした")
                # 空の欄には斜線が引いてある＝そのクラスを設けていない
                if not has_slash(page, box):
                    fail(f"{name}: 欄が空で斜線もありません")
                counts.append(None)

            if name == TOTAL_ROW:
                totals = counts
                continue
            rows.append({"name": name, "values": counts, "total": values[-1]})

    if not rows:
        fail("空き状況の表を取り出せませんでした")
    if not totals:
        fail("いちばん下の合計の行が見つかりません")

    return {
        "asOf": as_of,
        "ages": [a for _, a in ages],
        "rows": rows,
        "totals": totals,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
