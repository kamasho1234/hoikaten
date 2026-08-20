"""
府中市（東京都）の「保育所等受入予定人数」PDFから表を抜き出してJSONで返す

実行: python scripts/fuchu-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-fuchu-vacancy.ts から呼ぶ）

## 表の作り
- 列は「保育所等名／0歳児…5歳児／計」。施設の種類は左端の縦書きで、
  変わるときだけ値が入る（そのため保育所等名は見出しの1つ右の列に来る）。
- 表題に「◆令和８年度９月入所 保育所等受入予定人数◆」、その下に「令和８年８月３日現在」。
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


def extract(path):
    tables = []
    as_of = set()
    target = set()
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
                tables.append({"head": head, "rows": rows[1:]})
    if not tables:
        fail("施設の表を1つも取り出せませんでした")
    return {"asOf": sorted(as_of), "target": sorted(target), "tables": tables}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
