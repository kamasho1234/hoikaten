"""
府中市（東京都）の「保育所等受入予定人数」PDFから表を抜き出してJSONで返す

実行: python scripts/fuchu-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-fuchu-vacancy.ts から呼ぶ）

## 表の作り
- 列は「保育所等名／0歳児…5歳児／計」。施設の種類は左端の縦書きで、
  変わるときだけ値が入る（そのため保育所等名は見出しの1つ右の列に来る）。
- 表題に「◆令和８年度９月入所 保育所等受入予定人数◆」、その下に「令和８年８月３日現在」。

## 数字が pdfplumber から見えないPDFがある
府中市は月によって2種類のPDFを出している。
- 埋め込みフォントが CIDFont のもの … pdfplumber で数字まで読める
- そうでないもの（令和8年10月入所ぶんなど） … **pdfplumber には施設名しか見えず、
  数字は1つも取れない。**表の枠だけが残るので、黙って通すと全施設が空になる

数字は pypdf でなら座標つきで読めるので、**pdfplumber で取った表の枠に
pypdf で読んだ文字を流し込む**。どちらでも読めるPDFでは結果は変わらない。
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


def pypdf_words(path):
    """pypdfで、ページごとに (x, top, 文字) を読む。座標はpdfplumberと同じ向きに直す"""
    try:
        from pypdf import PdfReader
    except ImportError:
        return None
    try:
        reader = PdfReader(path)
    except Exception:
        return None
    pages = []
    for page in reader.pages:
        height = float(page.mediabox.height)
        items = []

        def visit(text, cm, tm, font, size, items=items, height=height):
            t = text.strip()
            if t:
                items.append((tm[4], height - tm[5], t))

        try:
            page.extract_text(visitor_text=visit)
        except Exception:
            return None
        pages.append(items)
    return pages


def fill_from_words(rows, cells, words):
    """pdfplumberが空にしたセルを、pypdfで読んだ文字で埋める"""
    filled = 0
    for r, row_cells in enumerate(cells):
        for c, bbox in enumerate(row_cells):
            if bbox is None or r >= len(rows) or c >= len(rows[r]):
                continue
            if rows[r][c]:
                continue
            x0, top, x1, bottom = bbox
            # 文字の座標はベースラインなので、下に少し余裕を持たせる
            hit = [
                t
                for x, y, t in words
                if x0 <= x <= x1 and top - 2 <= y <= bottom + 3
            ]
            if hit:
                rows[r][c] = cell(" ".join(hit))
                filled += 1
    return filled


def extract(path):
    tables = []
    as_of = set()
    target = set()
    words = pypdf_words(path)
    filled_total = 0
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            flat = "".join((page.extract_text() or "").translate(Z).split())
            m = re.search(r"令和(\d+)年(\d+)月(\d+)日現在", flat)
            if m:
                as_of.add(tuple(int(g) for g in m.groups()))
            m = re.search(r"令和(\d+)年度(\d+)月入所", flat)
            if m:
                target.add((int(m.group(1)), int(m.group(2))))

            for table_obj in page.find_tables():
                rows = [[cell(c) for c in r] for r in table_obj.extract()]
                if len(rows) < 2:
                    continue
                head = [cell(c) for c in rows[0]]
                if "保育所等名" not in [h.replace(" ", "") for h in head]:
                    continue
                if words is not None:
                    cells = [row.cells for row in table_obj.rows]
                    n = fill_from_words(rows, cells, words[page.page_number - 1])
                    if n:
                        filled_total += n
                tables.append({"head": head, "rows": rows[1:]})
    if not tables:
        fail("施設の表を1つも取り出せませんでした")
    if filled_total:
        print(f"pdfplumberが読めなかった{filled_total}個の欄をpypdfで埋めた", file=sys.stderr)
    # 表題がpdfplumberから読めないPDFでは、pypdfのほうから読み直す
    if not as_of and words:
        flat = "".join("".join(t for _, _, t in page).translate(Z).split() for page in words)
        m = re.search(r"令和(\d+)年(\d+)月(\d+)日現在", flat)
        if m:
            as_of.add(tuple(int(g) for g in m.groups()))
        m = re.search(r"令和(\d+)年度(\d+)月入所", flat)
        if m:
            target.add((int(m.group(1)), int(m.group(2))))
    return {"asOf": sorted(as_of), "target": sorted(target), "tables": tables}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
