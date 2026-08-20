"""
稲城市の「認可保育所等空き状況」PDFから表を抜き出してJSONで返す

実行: python scripts/inagi-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-inagi-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに表が1つ。「地区／保育所名／区分／0歳〜5歳／合計」の10列
- **施設ごとに3行**で、区分が「受入定員数」「空き数」「待機人数（延べ）」と並ぶ
- 地区は縦書きで、3行のうちどれかに1文字ずつ入る（「向」「陽」「台」）ので、
  取り込み側で3行ぶんをつなげて地区名にする
- 末尾に「合 計」の3行がある
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
        m = re.search(r"（令和(\d+)年(\d+)月利用選考会議終了時点）", flat)
        if not m:
            fail("表題から対象月を読み取れませんでした")
        target = [int(m.group(1)), int(m.group(2))]

        tables = page.find_tables()
        if not tables:
            fail("空き状況の表を取り出せませんでした")
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
