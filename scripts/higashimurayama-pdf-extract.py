"""
東村山市の「保育施設 空き状況」PDFから表を抜き出してJSONで返す

実行: python scripts/higashimurayama-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-higashimurayama-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに表が1つ。「区分／施設名／0歳児〜5歳児／保育年齢」の9列
- **区分は縦書きで「施設型」「地域型」の2文字ずつが別々の行に散らばる**うえ、
  セルの結合も不規則で、どの行がどちらの区分かは表からは読めない。
  そこで区分の文字が置かれた高さ（y）だけを返し、どこで切り替わるかは
  取り込み側で決める（施設数を公式の地域型一覧と突き合わせて確かめる）
- 末尾に「計」の行がある
- 空欄はそのクラスを設けていないことを表す（地域型は2歳児まで）
"""

import json
import re
import sys

import pdfplumber


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
        flat = "".join((page.extract_text() or "").split())
        # 令和8年10月期から表題が「M月空き状況(…時点)」から
        # 「M月期 保育施設欠員見込 ※…時点」に変わった。どちらの書き方でも読む
        m = re.search(
            r"令和(\d+)年(\d+)月空き状況\(令和(\d+)年(\d+)月(\d+)日時点\)", flat
        ) or re.search(r"令和(\d+)年(\d+)月期[^※]{0,20}※令和(\d+)年(\d+)月(\d+)日時点", flat)
        if not m:
            fail("表題から対象月と基準日を読み取れませんでした")
        target = [int(m.group(1)), int(m.group(2))]
        as_of = [int(m.group(3)), int(m.group(4)), int(m.group(5))]

        table_obj = page.find_tables()[0]
        rows = [[cell(c) for c in r] for r in table_obj.extract()]
        # 行ごとの高さ。区分の切り替わりを取り込み側で決めるために返す
        tops = []
        for row in table_obj.rows:
            found = next((c for c in row.cells if c is not None), None)
            if found is None:
                fail("行の位置を取れませんでした")
            tops.append([found[1], found[3]])
        if len(tops) != len(rows):
            fail(f"行数が合いません（表 {len(rows)} / 位置 {len(tops)}）")

        # 区分の列（左端）に置かれた文字を高さ順に返す
        left = table_obj.rows[1].cells[0]
        if left is None:
            fail("区分の列を取れませんでした")
        marks = [
            {"text": c["text"], "top": c["top"]}
            for c in page.chars
            if left[0] - 1 <= c["x0"] <= left[2] + 1 and c["top"] > table_obj.bbox[1]
        ]
        marks.sort(key=lambda c: c["top"])

    return {
        "target": target,
        "asOf": as_of,
        "head": rows[0],
        "rows": rows[1:],
        "tops": tops[1:],
        "marks": marks,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
