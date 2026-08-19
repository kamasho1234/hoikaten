"""
八王子市の「募集人数」PDFから表を抜き出してJSONで返す

実行: python scripts/hachioji-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-hachioji-vacancy.ts から呼ぶ）

## 表の作り
- 列は「地区／施設種別／施設名／住所／電話／0才…5才」。**どのページも同じ**。
- **地区の列は縦に結合**されていて、変わるときだけ値が入る。
- 1ページめの表の上に凡例と「令和8年8月1日 現在」がある。
- 表の斜線（その年齢の受入なし）は抽出では空欄になる。
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
            m = re.search(r"令和(\d+)年（\d+年）(\d+)月入園", flat)
            if m:
                target.add(tuple(int(g) for g in m.groups()))

            for table_obj in page.find_tables():
                rows = [[cell(c) for c in r] for r in table_obj.extract()]
                if len(rows) < 2:
                    continue
                head = [cell(c) for c in rows[0]]
                if "施設名" not in [h.replace(" ", "") for h in head]:
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
