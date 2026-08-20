"""
上尾市の「保育施設 入所可能予定数」PDFから表を抜き出してJSONで返す

実行: python scripts/ageo-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-ageo-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに左右2段。**左が認可保育所（0〜5歳）、右が小規模保育施設（0〜2歳）**で、
  どちらの段にも「NO.／保育所名／年齢」の並びがある
- 施設には通し番号が振ってあり、左段の続きが右段になる（1〜47、48〜）。
  合計行がないので、この番号が飛んでいないことを検算に使う
- 右段の下のほうに「５歳 令和２年４月２日〜」のような年齢の対応表が入り込む。
  番号のない行なので、施設として数えないようにする
- 施設名は「上 尾 西」のように均等割りされている
- **pdfplumber の表抽出では数字を取りこぼす行がある**（罫線の引き方のせい）。
  罫線から行と列の境界だけをもらい、文字は座標から拾い直す
"""

import json
import re
import sys

import pdfplumber

Z = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return " ".join(str(s).split())


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
    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"1ページのPDFを想定していますが{len(pdf.pages)}ページあります")
        page = pdf.pages[0]
        flat = "".join((page.extract_text() or "").translate(Z).split())
        m = re.search(r"令和(\d+)年(\d+)月保育施設入所可能予定数", flat)
        if not m:
            fail("表題から対象月を読み取れませんでした")
        target = [int(m.group(1)), int(m.group(2))]
        m = re.search(r"令和(\d+)年(\d+)月(\d+)日現在", flat)
        if not m:
            fail("基準日を読み取れませんでした")
        as_of = [int(m.group(1)), int(m.group(2)), int(m.group(3))]

        tables = page.find_tables()
        if not tables:
            fail("入所可能予定数の表を取り出せませんでした")
        rows = build_grid(page, tables[0])

    return {"target": target, "asOf": as_of, "head": rows[0], "rows": rows[1:]}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
