"""
日野市の「保育施設入所可能人数」PDFから表を抜き出してJSONで返す

実行: python scripts/hino-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-hino-vacancy.ts から呼ぶ）

## 表の作り
- 列は「地区／区分／施設名／0歳…5歳／合計」。地区と区分はどちらも縦に結合されていて、
  変わるときだけ値が入る。
- **1行目に「7/25時点」だけが入る行**があり、見出しは2行目。
- 表題に「令和8年9月入所可能人数 7/25時点」。
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
            m = re.search(r"令和(\d+)年(\d+)月入所可能人数", flat)
            if m:
                target.add((int(m.group(1)), int(m.group(2))))
            m = re.search(r"(\d+)/(\d+)時点", flat)
            if m:
                as_of.add((int(m.group(1)), int(m.group(2))))

            for table_obj in page.find_tables():
                rows = [[cell(c) for c in r] for r in table_obj.extract()]
                if len(rows) < 2:
                    continue
                # 見出しは「区分」を含む行。1行目が「7/25時点」だけのことがある
                header = next(
                    (i for i, r in enumerate(rows[:3]) if "区分" in [c.replace(" ", "") for c in r]),
                    None,
                )
                if header is None:
                    continue
                tables.append({"head": rows[header], "rows": rows[header + 1 :]})
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
