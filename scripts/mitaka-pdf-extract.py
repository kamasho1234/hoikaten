"""
三鷹市の「募集人数及び申込者数」PDFから表を抜き出してJSONで返す

実行: python scripts/mitaka-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-mitaka-vacancy.ts から呼ぶ）

## 表の作り
- **1施設が2行**（上が「募集」、下が「申込」）。園名のセルはその2行にまたがる。
- **pdfplumber の extract() では園名が壊れる**。「第二小羊」「28」「ﾁｬｲﾙﾄﾞｾﾝﾀｰ」のように
  番号のセルと園名のセルの文字が混ざって1つのセルに入ってしまう。
  そこで**罫線から行と列の境界だけをもらい、文字は座標から拾い直す**（墨田区と同じ手）。
  こうすると園名の列と番号の列がきちんと分かれる。
- 表は施設の種類ごとに分かれ、見出しは1行目の「公立 園名／年齢」など。
- 末尾に園名のない合計行がある。
"""

import json
import re
import sys

import pdfplumber

Z = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def build_grid(page, table):
    """罫線から境界だけをもらい、セルの中身は文字の座標から組み直す"""
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
    target = set()
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            flat = "".join((page.extract_text() or "").translate(Z).split())
            m = re.search(r"令和(\d+)年(\d+)月(\d+)日募集人数及び申込者数", flat)
            if m:
                target.add(tuple(int(g) for g in m.groups()))

            for table_obj in page.find_tables():
                grid = build_grid(page, table_obj)
                if len(grid) < 3:
                    continue
                head = ["".join(c.split()) for c in grid[0]]
                if not any("園名" in h for h in head):
                    continue
                tables.append({"head": head, "rows": grid[1:]})
    if not tables:
        fail("施設の表を1つも取り出せませんでした")
    return {"target": sorted(target), "tables": tables}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
