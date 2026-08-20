"""
狛江市の「保育施設空き枠状況一覧」PDFから表を抜き出してJSONで返す

実行: python scripts/komae-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-komae-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに「認可保育所」「認定こども園」「小規模保育事業」「事業所内保育事業」の
  4つの表が縦に並ぶ。見出しの左端がそのまま施設の種類になっている
- **横罫線が見出しの下にしかない**ため extract() では施設の行が1つのセルにまとまってしまう。
  罫線から列と行の境界だけをもらい、文字は座標から拾い直す
- 「-」はそのクラスを設けていないことを表す。各行に「合計」列がある（合計行はない）
"""

import json
import re
import sys

import pdfplumber

Z = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def build_grid(page, table):
    """
    罫線から行と列の境界をもらい、セルの中身は文字の座標から組み直す。

    この表は横罫線が見出しの下にしかないので、extract() では施設の行が
    1つのセルにまとまってしまう。境界だけを使い、文字はどのマスに入るかを座標で決める。
    """
    rows = table.rows
    ys = [r.bbox[1] for r in rows] + [rows[-1].bbox[3]]
    xs = sorted(
        {round(c[0], 1) for r in rows for c in r.cells if c}
        | {round(c[2], 1) for r in rows for c in r.cells if c}
    )
    grid = []
    for y0, y1 in zip(ys, ys[1:]):
        band = [ch for ch in page.chars if y0 - 0.5 <= (ch["top"] + ch["bottom"]) / 2 <= y1 + 0.5]
        row = []
        for x0, x1 in zip(xs, xs[1:]):
            cells = [ch for ch in band if x0 - 0.5 <= (ch["x0"] + ch["x1"]) / 2 <= x1 + 0.5]
            cells.sort(key=lambda ch: (round(ch["top"], 0), ch["x0"]))
            row.append("".join(ch["text"] for ch in cells).strip())
        grid.append(row)
    return grid


def extract(path):
    tables = []
    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"1ページのPDFを想定していますが{len(pdf.pages)}ページあります")
        page = pdf.pages[0]
        flat = "".join((page.extract_text() or "").translate(Z).split())
        m = re.search(r"令和(\d+)年(\d+)月(\d+)日付", flat)
        if not m:
            fail("表題から日付を読み取れませんでした")
        as_of = [int(m.group(1)), int(m.group(2)), int(m.group(3))]

        for table_obj in page.find_tables():
            grid = build_grid(page, table_obj)
            if len(grid) < 2 or not any("歳児" in h for h in grid[0]):
                continue
            tables.append({"head": grid[0], "rows": grid[1:]})
    if not tables:
        fail("空き枠状況の表を取り出せませんでした")
    return {"asOf": as_of, "tables": tables}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
