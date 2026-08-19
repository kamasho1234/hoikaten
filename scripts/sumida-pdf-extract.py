"""
墨田区の「募集見込数一覧」PDFから表を抜き出してJSONで返す

実行: python scripts/sumida-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-sumida-vacancy.ts から呼ぶ）

## 表の作り
- 1ページめが認可保育園等（左右2段組で20列）、2ページめが小規模保育所・家庭的保育者。
- **pdfplumber の extract() では読めない**。「計」の列が縦に結合されてしまい、
  複数行ぶんの数字が1つのセルに入る（'2\\n1\\n2\\n3\\n15\\n' のように）。
  そこで**罫線から列と行の境界だけをもらい、文字は座標から拾い直す**。
  これなら結合セルの影響を受けず、縦書きの施設名も正しく1つにまとまる。
- 1ページめの列の並びは左右とも
  「施設名／延長保育／受入月齢／0歳／1歳／2歳／3歳／4歳／5歳／計」。
  **左の段は上から公立→公設民営→私立の続き**と3つの節に分かれ、
  節の変わり目に「施設名（公立）」のような見出し行が入る。
- 「公立計」「公設民営計」「私立計」「合計」の行があるので検算に使える。
- 2ページめは「小規模保育所」「家庭的保育者」が縦書きで左端に入る。
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

    pdfplumber の extract() は結合セルを先頭のセルにまとめてしまうので、
    「計」の列のように縦に結合された表では複数行ぶんの数字が1か所に入ってしまう。
    ここでは境界だけを使い、文字はどのマスに入るかを座標で決める。
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
    grids = []
    target = set()
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月.{0,6}募集見込数", text)
            if m:
                target.add(tuple(int(g.translate(Z)) for g in m.groups()))
            tables = page.find_tables()
            if not tables:
                continue
            grids.append(build_grid(page, tables[0]))
    if len(grids) != 2:
        fail(f"表が{len(grids)}ページぶんしか取れませんでした（2ページのはず）")
    return {"target": sorted(target), "grids": grids}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
