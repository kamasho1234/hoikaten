"""
春日部市の「保育施設などの空き状況」PDFから表を抜き出してJSONで返す

実行: python scripts/kasukabe-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kasukabe-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに表が2つ。上が公立保育所、下が私立保育園・認定こども園・地域型保育施設
- 列は「／施設名／受入年齢／定員／0歳〜5歳」。**空き数ではなく○△×の記号**が入る
- **4歳の列が2つに割れている**表がある（公立の「ゆり組」「ばら組」のように
  異年齢のクラス分けがあるため）。取り込み側で同じ年齢の列をまとめる
- pdfplumber の表抽出では見出しがずれるので、罫線から境界だけをもらって
  文字を座標から拾い直す
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
    見出しや記号がずれる。境界だけを使い、文字はどのマスに入るかを座標で決める。
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


def age_count(row):
    """その行に年齢の見出しがいくつ入っているか"""
    return sum(1 for c in row if re.fullmatch(r"\s*[0-9]\s*歳\s*", c.translate(Z)))


def extract(path):
    tables = []
    as_of = set()
    target = set()

    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            flat = "".join((page.extract_text() or "").translate(Z).split())
            m = re.search(r"令和(\d+)年度\D*?(\d+)月選考後", flat)
            if m:
                target.add((int(m.group(1)), int(m.group(2))))
            m = re.search(r"令和(\d+)年(\d+)月(\d+)日", flat)
            if m:
                as_of.add((int(m.group(1)), int(m.group(2)), int(m.group(3))))

            for table_obj in page.find_tables():
                grid = build_grid(page, table_obj)
                if len(grid) < 2:
                    continue
                # 年齢の見出しがいちばん多い行を見出しとみなす
                head_index = max(range(min(3, len(grid))), key=lambda i: age_count(grid[i]))
                if age_count(grid[head_index]) == 0:
                    continue
                tables.append({"head": grid[head_index], "rows": grid[head_index + 1 :]})

    if not tables:
        fail("空き状況の表を取り出せませんでした")
    if len(target) != 1:
        fail(f"対象月が{len(target)}種類あります")
    if not as_of:
        fail("基準日を読み取れませんでした")

    return {"asOf": sorted(as_of)[0], "target": sorted(target)[0], "tables": tables}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
