"""
立川市の「保育施設募集人数一覧」PDFから表を抜き出してJSONで返す

実行: python scripts/tachikawa-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-tachikawa-vacancy.ts から呼ぶ）

## 表の作り
- **1ページに表が5つ**。認可保育園は左右2段組で2つ、ほかに認定こども園・
  家庭的保育・小規模保育の表が並ぶ。
- 施設の種類の見出しは**前の表の行の右端**に置かれる
  （「冨士見 1 0 1 2 1 2 認 定 こ ど も 園（２・３号認定）」）ので、
  数行さかのぼって行の末尾が種類名で終わるものを探す。
- 表題に「令和８年度9月期 保育施設募集人数一覧」。
"""

import json
import re
import sys

import pdfplumber

Z = str.maketrans("０１２３４５６７８９", "0123456789")
SECTION = re.compile(r"(認可保育園|認定こども園|家庭的保育|小規模保育|事業所内保育)(（[^）]*）)?$")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return " ".join(str(s).split())


def extract(path):
    tables = []
    target = set()
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            flat = "".join((page.extract_text() or "").translate(Z).split())
            m = re.search(r"令和(\d+)年度(\d+)月期", flat)
            if m:
                target.add((int(m.group(1)), int(m.group(2))))

            lines = [
                {"text": " ".join(ln["text"].split()), "top": ln["top"]}
                for ln in page.extract_text_lines()
            ]
            for table_obj in page.find_tables():
                rows = [[cell(c) for c in r] for r in table_obj.extract()]
                if len(rows) < 2:
                    continue
                head = [cell(c) for c in rows[0]]
                if "施設名" not in [h.replace(" ", "") for h in head]:
                    continue
                above = [ln["text"] for ln in lines if ln["top"] < table_obj.bbox[1] - 2]
                section = ""
                for text in reversed(above[-6:]):
                    if SECTION.search("".join(text.split())):
                        section = text
                        break
                if not section and above:
                    section = above[-1]
                tables.append({"section": section, "head": head, "rows": rows[1:]})
    if not tables:
        fail("施設の表を1つも取り出せませんでした")
    return {"target": sorted(target), "tables": tables}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
