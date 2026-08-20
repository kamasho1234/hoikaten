"""
調布市の「認可保育園 募集数」PDFから表を抜き出してJSONで返す

実行: python scripts/chofu-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-chofu-vacancy.ts から呼ぶ）

## 表の作り
- **1行目に年齢（0歳児クラス〜5歳児クラス）、2行目に「募集」「申込」**が交互に並ぶ。
- 左端はエリア（西調布・飛田給など）の縦書きで、変わるときだけ値が入る。
- **公立は保育園名の左の列に「公」**と入る。
- 表題に「令和８年１０月１日入園分 （令和８年８月２０日公表）」がある。
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
    target = set()
    published = set()
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            flat = "".join((page.extract_text() or "").translate(Z).split())
            m = re.search(r"令和(\d+)年(\d+)月(\d+)日入園分", flat)
            if m:
                target.add((int(m.group(1)), int(m.group(2))))
            m = re.search(r"（令和(\d+)年(\d+)月(\d+)日公表）", flat)
            if m:
                published.add(tuple(int(g) for g in m.groups()))

            for table_obj in page.find_tables():
                rows = [[cell(c) for c in r] for r in table_obj.extract()]
                if len(rows) < 3:
                    continue
                age_head = [cell(c) for c in rows[0]]
                if not any("歳児クラス" in h.replace(" ", "") for h in age_head):
                    continue
                tables.append({"ageHead": age_head, "head": [cell(c) for c in rows[1]], "rows": rows[2:]})
    if not tables:
        fail("施設の表を1つも取り出せませんでした")
    return {"target": sorted(target), "published": sorted(published), "tables": tables}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
