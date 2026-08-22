"""
宝塚市の「保育施設空き状況」PDFから表を抜き出す

実行: python scripts/takarazuka-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-takarazuka-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ。9列（施設名／0歳〜5歳／保育所計／備考）
- 空きは人数。「－」はそのクラスを設けていない
- いちばん下に「年齢計」の行があり、行ごとの「保育所計」と合わせて検算に使える
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 3 + AGE_COUNT
COL_NAME = 0
COL_AGE0 = 1
COL_TOTAL = 7
COL_NOTE = 8
TOTAL_ROW = "年齢計"


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def extract(path):
    rows = []
    total_row = None
    as_of = None

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            flat = "".join((page.extract_text() or "").split())
            z = str.maketrans("０１２３４５６７８９", "0123456789")

            if page_index == 0:
                m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月([０-９\d]+)日現在", flat.translate(z))
                if not m:
                    fail("基準日を読み取れませんでした")
                as_of = tuple(int(g) for g in m.groups())

            for table in page.find_tables():
                extracted = table.extract()
                if len(extracted[0]) != EXPECTED_COLUMNS:
                    fail(f"列数が{len(extracted[0])}になっています")
                heads = [cell(c).translate(z) for c in extracted[0][COL_AGE0 : COL_AGE0 + AGE_COUNT]]
                if heads != [f"{i}歳" for i in range(AGE_COUNT)]:
                    fail(f"歳児の見出しが{heads}になっています")

                for row in extracted[1:]:
                    values = [cell(c) for c in row]
                    name = values[COL_NAME]
                    if not name:
                        continue
                    if name == TOTAL_ROW:
                        total_row = values
                        continue
                    rows.append(values)

    if not rows:
        fail("空き状況の表を取り出せませんでした")
    if total_row is None:
        fail(f"「{TOTAL_ROW}」の行が見つかりませんでした")

    return {"asOf": as_of, "totalRow": total_row, "rows": rows}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
