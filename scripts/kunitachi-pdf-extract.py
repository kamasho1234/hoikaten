"""
国立市の「認可保育施設受入可能児童数」PDFから表を抜き出してJSONで返す

実行: python scripts/kunitachi-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kunitachi-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに表が1つ。「クラス（施設名）／0歳〜5歳／計」
- 施設名は市の一覧表の呼び方（「西」「東」「北」など）がそのまま入る
- 空欄はそのクラスを設けていないことを表す
- 末尾に施設名のない合計行がある
- 家庭的保育は含まれない（表の下の注記）
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
    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"1ページのPDFを想定していますが{len(pdf.pages)}ページあります")
        page = pdf.pages[0]
        flat = "".join((page.extract_text() or "").translate(Z).split())
        m = re.search(r"R(\d+)\.(\d+)利用調整後", flat)
        if not m:
            fail("表題から対象月を読み取れませんでした")
        target = [int(m.group(1)), int(m.group(2))]

        tables = page.find_tables()
        if not tables:
            fail("受入可能児童数の表を取り出せませんでした")
        rows = [[cell(c) for c in r] for r in tables[0].extract()]

    return {"target": target, "head": rows[0], "rows": rows[1:]}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
