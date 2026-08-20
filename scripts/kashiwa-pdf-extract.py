"""
柏市の「保育園等空き状況」PDFから表を抜き出してJSONで返す

実行: python scripts/kashiwa-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kashiwa-vacancy.ts から呼ぶ）

## 表の作り
- 1行目に「保育年齢／園名」と年齢（0歳児〜5歳児）、**2行目に「空き」「保留者」**が交互に並ぶ。
- 施設の種類（公立保育園・私立保育園・認定こども園・小規模保育園）は左端の縦書きで、
  変わるときだけ値が入る。
- 表題に「令和８年度９月１日入園利用調整後」とある。
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
            m = re.search(r"令和(\d+)年度(\d+)月(\d+)日入園利用調整後", flat)
            if m:
                as_of.add(tuple(int(g) for g in m.groups()))

            for table_obj in page.find_tables():
                rows = [[cell(c) for c in r] for r in table_obj.extract()]
                if len(rows) < 3:
                    continue
                head = [cell(c) for c in rows[0]]
                if "園名" not in "".join(head).replace(" ", ""):
                    continue
                tables.append({"head": head, "subHead": [cell(c) for c in rows[1]], "rows": rows[2:]})
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
