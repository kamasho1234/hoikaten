"""
水戸市の「受入れ見込み状況及び申込み状況」PDFから表を抜き出してJSONで返す

実行: python scripts/mito-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-mito-vacancy.ts から呼ぶ）

## 表の作り
- 4ページにわたる1つの表。
  「施設名／所在地／電話番号／定員／入所数／開設時間／0歳〜5歳／備考」
- **施設ごとに2行**。上段が受入れ見込み状況（×△○の記号）、
  下段が申込み人数（第一希望のみ・実数）
- 見出しは1ページめだけにあり、2ページめ以降は施設の行から始まる
- 凡例は1ページめの本文（「×＝０人、△＝１～４人、○＝５人～の受入れを見込んでいます」）
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
    head = None
    sub = None
    rows = []
    target = set()
    as_of = set()
    legend = ""

    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            flat = "".join(text.translate(Z).split())
            m = re.search(r"令和(\d+)年度(\d+)月受入れ見込み状況", flat)
            if m:
                target.add((int(m.group(1)), int(m.group(2))))
            m = re.search(r"（令和(\d+)年(\d+)月(\d+)日現在）", flat)
            if m:
                as_of.add((int(m.group(1)), int(m.group(2)), int(m.group(3))))
            if not legend:
                m = re.search(r"受入れ見込み状況について、(.+?の受入れを見込んでいます)", flat)
                if m:
                    legend = m.group(1)

            for table_obj in page.find_tables():
                table = [[cell(c) for c in r] for r in table_obj.extract()]
                if not table:
                    continue
                # 見出しは3行ぶんある（1ページめだけ）
                if head is None and any("施設名" in c for c in table[1] if c):
                    head, sub = table[1], table[0]
                    rows.extend(table[3:])
                else:
                    rows.extend(table)

    if head is None:
        fail("受入れ見込み状況の表を取り出せませんでした")
    if len(target) != 1:
        fail(f"対象月が{len(target)}種類あります")
    if not as_of:
        fail("基準日を読み取れませんでした")
    if not legend:
        fail("記号の凡例を読み取れませんでした")

    return {
        "target": sorted(target)[0],
        "asOf": sorted(as_of)[0],
        "legend": legend,
        "head": head,
        "sub": sub,
        "rows": rows,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
