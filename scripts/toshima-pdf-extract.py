"""
豊島区の「保育園欠員状況」PDFから表を抜き出してJSONで返す

実行: python scripts/toshima-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-toshima-vacancy.ts から呼ぶ）

## 表の作り
- **本文の【区立保育園】【私立保育園】【地域型保育事業】【居宅訪問型保育事業】が施設類型**。
  表の直前に出るので、表の上端より上にある直近の見出しを使う。
- 列数は類型で違う（区立12列・私立11列・地域型8列）。**「№」「園名」と年齢の見出し**を
  手がかりに列位置を引く。
- **№が連番**なので、施設数の検算に使える。
- 数値はそのまま欠員数。空欄はそのクラスの受け入れがない。
"""

import json
import re
import sys

import pdfplumber

Z = str.maketrans("０１２３４５６７８９", "0123456789")
AGE_HEADS = ["0歳", "1歳", "2歳", "3歳", "4歳", "5歳"]
AGE3 = ["0歳", "1歳", "2歳"]


def fail(message):
    raise SystemExit(f"[中断] {message}")


def normalize(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(Z)


def cell_text(s):
    if s is None:
        return ""
    return " ".join(str(s).split())


def section_of(headings, table_top):
    above = [h for h in headings if h["top"] < table_top]
    if not above:
        return ""
    return max(above, key=lambda h: h["top"])["text"]


def extract(path):
    tables = []
    as_of = set()
    target = set()
    carried_section = ""
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月([０-９\d]+)日(?:（[^）]*）)?\s*更新", text)
            if m:
                as_of.add(tuple(int(g.translate(Z)) for g in m.groups()))
            m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月入園選考分", text)
            if m:
                target.add(tuple(int(g.translate(Z)) for g in m.groups()))

            # 【区立保育園】のような見出しを y 座標つきで拾う
            headings = [
                {"text": re.sub(r"[【】].*$", "", ln["text"].strip().lstrip("【")), "top": ln["top"]}
                for ln in page.extract_text_lines()
                if ln["text"].strip().startswith("【")
            ]

            for table_obj in page.find_tables():
                rows = [list(r) for r in table_obj.extract()]
                if len(rows) < 2:
                    continue
                head = [normalize(c) for c in rows[0]]
                if "園名" not in head and "施設名" not in head and "事業所名" not in head:
                    continue
                labels = AGE_HEADS if all(a in head for a in AGE_HEADS) else AGE3
                if not all(a in head for a in labels):
                    fail(f"年齢の見出しが見つかりません: {head}")
                name_key = next(k for k in ("園名", "施設名", "事業所名") if k in head)

                # **表がページをまたぐと見出しが無いページがある**（私立の続き）ので、
                # 直近の見出しを引き継ぐ
                section = section_of(headings, table_obj.bbox[1]) or carried_section
                carried_section = section

                tables.append(
                    {
                        "section": section,
                        "columns": {
                            "no": head.index("№") if "№" in head else None,
                            "name": head.index(name_key),
                            "address": head.index("所在地") if "所在地" in head else None,
                            "ages": [head.index(a) for a in labels],
                        },
                        "rows": [[cell_text(c) for c in r] for r in rows[1:]],
                    }
                )
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
