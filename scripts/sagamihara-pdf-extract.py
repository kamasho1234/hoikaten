"""
相模原市の「認定こども園・認可保育所等施設利用可能人数」PDFから表を抜き出す

実行: python scripts/sagamihara-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-sagamihara-vacancy.ts から呼ぶ）

## 表の作り
- 列は「管轄／施設類型／所在地／施設・事業者名／設置／0歳児…5歳児～」。
- **施設類型と所在地は縦に結合**されていて、変わるときだけ値が入る。
- 1ページめは表の上に注意事項が入るため、見出しの行が2行目になる。
- 表紙に「令和８年８月１日現在」（データの時点）と「（令和８年8月6日更新）」がある。
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


def normalize(s):
    return "".join((s or "").split()).translate(Z)


def extract(path):
    tables = []
    as_of = set()
    updated = set()
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = (page.extract_text() or "").translate(Z)
            flat = "".join(text.split())
            m = re.search(r"令和(\d+)年(\d+)月(\d+)日現在", flat)
            if m:
                as_of.add(tuple(int(g) for g in m.groups()))
            m = re.search(r"（令和(\d+)年(\d+)月(\d+)日更新）", flat)
            if m:
                updated.add(tuple(int(g) for g in m.groups()))

            for table_obj in page.find_tables():
                rows = [[cell(c) for c in r] for r in table_obj.extract()]
                header = next(
                    (i for i, r in enumerate(rows) if r and normalize(r[0]) == "管轄"), None
                )
                if header is None:
                    continue
                tables.append(
                    {
                        "headerRow": header,
                        "head": rows[header],
                        "rows": rows[header + 1 :],
                    }
                )
    if not tables:
        fail("施設の表を1つも取り出せませんでした")
    return {"asOf": sorted(as_of), "updated": sorted(updated), "tables": tables}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
