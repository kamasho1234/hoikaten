"""
国分寺市の「認可保育所・家庭的保育の入所状況」PDFから表を抜き出してJSONで返す

実行: python scripts/kokubunji-pdf-extract.py <入所状況.pdf> <受入可能児童数.pdf>
出力: 標準出力にJSON（fetch-kokubunji-vacancy.ts から呼ぶ）

## 表の作り
- 入所状況のPDFは1ページに表が2つ。認可保育所（0〜5歳）と家庭的保育（0〜2歳）で、
  どちらも年齢ごとに「定員／人数／空き／申込」の4列が並ぶ
- 施設名は「① こくぶんじ保育園」のように丸数字が頭に付く
- 末尾に合計行がある（認可保育所のみ）
- 受入可能児童数のPDFは空き数だけの表。**丸数字が入所状況とずれている**ので
  施設ごとの照合には使わず、合計行だけを検算に使う
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


def read_status(path):
    """入所状況のPDF。表と、表題に書かれた基準日を返す"""
    tables = []
    as_of = set()
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            flat = "".join((page.extract_text() or "").translate(Z).split())
            for m in re.finditer(r"入所状況（令和(\d+)年(\d+)月(\d+)日入所）", flat):
                as_of.add((int(m.group(1)), int(m.group(2)), int(m.group(3))))
            for table_obj in page.find_tables():
                rows = [[cell(c) for c in r] for r in table_obj.extract()]
                if len(rows) < 3:
                    continue
                tables.append({"head": rows[0], "sub": rows[1], "rows": rows[2:]})
    if not tables:
        fail("入所状況の表を1つも取り出せませんでした")
    return tables, sorted(as_of)


def read_vacancy_total(path):
    """受入可能児童数のPDFから合計行だけを取り出す"""
    for page in pdfplumber.open(path).pages:
        for table_obj in page.find_tables():
            for row in table_obj.extract():
                cells = [cell(c) for c in row]
                if cells and cells[0] == "合計":
                    values = [c.translate(Z) for c in cells[1:] if c != ""]
                    if all(v.isdigit() for v in values) and len(values) == 6:
                        return [int(v) for v in values]
    fail("受入可能児童数のPDFに合計行が見つかりません")


def main():
    paths = sys.argv[1:]
    if len(paths) != 2:
        fail("入所状況と受入可能児童数のPDFを順に指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    tables, as_of = read_status(paths[0])
    json.dump(
        {"asOf": as_of, "tables": tables, "vacancyTotal": read_vacancy_total(paths[1])},
        sys.stdout,
        ensure_ascii=False,
    )


if __name__ == "__main__":
    main()
