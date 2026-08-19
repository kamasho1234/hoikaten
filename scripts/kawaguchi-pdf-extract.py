"""
川口市の「募集予定人数」PDFから表を抜き出してJSONで返す

実行: python scripts/kawaguchi-pdf-extract.py <種別>:<pdf> ...
出力: 標準出力にJSON（fetch-kawaguchi-vacancy.ts から呼ぶ）

## 表の作り
- 列は「分類／施設コード／保育施設名／0歳児…5歳児」。2本のPDFで同じ並び。
- **地区（①中央地区、②横曽根地区…）が表の直前の行**にあり、地区ごとに表が分かれる。
- 表題に「令和８年度９月募集予定人数」、その下に「令和8年7月27日時点」がある。
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


def extract_one(path):
    tables = []
    as_of = set()
    target = set()
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            flat = "".join((page.extract_text() or "").translate(Z).split())
            m = re.search(r"令和(\d+)年(\d+)月(\d+)日時点", flat)
            if m:
                as_of.add(tuple(int(g) for g in m.groups()))
            m = re.search(r"令和(\d+)年度(\d+)月募集予定人数", flat)
            if m:
                target.add(tuple(int(g) for g in m.groups()))

            lines = [
                {"text": " ".join(ln["text"].split()), "top": ln["top"]}
                for ln in page.extract_text_lines()
            ]
            for table_obj in page.find_tables():
                rows = [[cell(c) for c in r] for r in table_obj.extract()]
                if len(rows) < 2:
                    continue
                head = [cell(c) for c in rows[0]]
                if "分類" not in [h.replace(" ", "") for h in head]:
                    continue
                above = [ln for ln in lines if ln["top"] < table_obj.bbox[1] - 2]
                section = above[-1]["text"] if above else ""
                tables.append({"section": section, "head": head, "rows": rows[1:]})
    if not tables:
        fail(f"{path}: 施設の表を1つも取り出せませんでした")
    return {"asOf": sorted(as_of), "target": sorted(target), "tables": tables}


def main():
    args = sys.argv[1:]
    if not args:
        fail("「種別:PDFのパス」を1つ以上指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    files = []
    for arg in args:
        kind, _, path = arg.partition(":")
        if not path:
            fail(f"「種別:PDFのパス」の形で指定してください: {arg}")
        result = extract_one(path)
        result["kind"] = kind
        files.append(result)
    json.dump({"files": files}, sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
