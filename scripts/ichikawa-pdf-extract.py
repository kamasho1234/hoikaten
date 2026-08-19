"""
市川市の「公立・私立保育園等の空き状況」PDFから表を抜き出してJSONで返す

実行: python scripts/ichikawa-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-ichikawa-vacancy.ts から呼ぶ）

## 表の作り
- 列は「行政区域（2段）／保育園名／定員／募集人員（0歳…5歳）」。
- 見出しは2行あり、**年齢は2行目**に入る。
- 行政区域はどちらの段も縦に結合されていて、変わるときだけ値が入る。
- 表題に「令和8年8月20日現在」がある。
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
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            flat = "".join((page.extract_text() or "").translate(Z).split())
            m = re.search(r"令和(\d+)年(\d+)月(\d+)日現在", flat)
            if m:
                as_of.add(tuple(int(g) for g in m.groups()))

            for table_obj in page.find_tables():
                rows = [[cell(c) for c in r] for r in table_obj.extract()]
                if len(rows) < 3:
                    continue
                head = [cell(c) for c in rows[0]]
                if "保育園名" not in [h.replace(" ", "") for h in head]:
                    continue
                tables.append({"head": head, "rows": rows[1:]})
    if not tables:
        fail("施設の表を1つも取り出せませんでした")
    return {"asOf": sorted(as_of), "tables": tables}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
