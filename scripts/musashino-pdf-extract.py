"""
武蔵野市の「認可保育施設空き状況」PDFから表を抜き出してJSONで返す

実行: python scripts/musashino-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-musashino-vacancy.ts から呼ぶ）

## 表の作り
- **見出しが3行**。1行目に表題、2行目に年齢（0歳児〜5歳児）、
  3行目に「空き数／サポート児受入／申込数」が年齢ごとに3列ずつ並ぶ。
- 施設の種類（認可保育所・認定こども園など）と公立・私立の別は左端の縦書きで、
  変わるときだけ値が入る。
- 表題に「令和８年９月１日入所 認可保育施設空き状況」、
  本文に「空き状況は、令和８年7月30日現在確認した数になります」。
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
            m = re.search(r"令和(\d+)年(\d+)月(\d+)日入所認可保育施設空き状況", flat)
            if m:
                target.add(tuple(int(g) for g in m.groups()))
            m = re.search(r"令和(\d+)年(\d+)月(\d+)日現在確認した数", flat)
            if m:
                as_of.add(tuple(int(g) for g in m.groups()))

            for table_obj in page.find_tables():
                rows = [[cell(c) for c in r] for r in table_obj.extract()]
                if len(rows) < 4:
                    continue
                # 年齢の行と「空き数」の行を探す
                age_row = next(
                    (i for i, r in enumerate(rows[:4]) if any("0歳児" in c.replace(" ", "") for c in r)),
                    None,
                )
                if age_row is None:
                    continue
                sub_row = next(
                    (i for i in range(age_row + 1, min(age_row + 3, len(rows)))
                     if any(c.replace(" ", "") == "空き数" for c in rows[i])),
                    None,
                )
                if sub_row is None:
                    continue
                tables.append(
                    {
                        "head": rows[0],
                        "ageHead": rows[age_row],
                        "subHead": rows[sub_row],
                        "rows": rows[sub_row + 1 :],
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
