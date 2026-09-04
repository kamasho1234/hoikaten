"""
大仙市の「認可保育施設 受入状況一覧」PDFから表を抜き出してJSONで返す

実行: python scripts/daisen-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-daisen-vacancy.ts から呼ぶ）

## 表の作り
- 「地域／NO／種別／施設名／年齢区分（0〜5）／備考」の11列。見出しは2段
- 地域（大曲・神岡…）は縦書きで、**そのかたまりの真ん中あたりの行にだけ**入る。
  最初の行ではないので、後ろから遡ってかたまり全体に配る
- 空きは記号（○受入可能／△受入可能1〜3名程度／×受入不可）
- 備考に「◎生後57日目〜3歳児未満」のように受入年齢が書かれることがあり、
  **その園は3歳以上の欄が空になる**
- NOが1から欠けずに続くので、それを検算に使う
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 11
COL_AREA = 0
COL_NO = 1
COL_KIND = 2
COL_NAME = 3
COL_AGE0 = 4
COL_NOTE = COL_AGE0 + AGE_COUNT

MARKS = {"○": "○", "◯": "○", "〇": "○", "△": "△", "×": "×", "✕": "×"}


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    return "".join(str(s or "").split())


def extract(path):
    rows = []
    as_of = None
    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            flat = "".join((page.extract_text() or "").split())
            if as_of is None:
                m = re.search(r"令和(\d+)年(\d{1,2})月(\d{1,2})日現在", flat)
                if m:
                    as_of = [int(g) for g in m.groups()]

            tables = page.find_tables()
            if not tables:
                continue
            body = [[cell(c) for c in r] for r in tables[0].extract()]
            if any(len(r) != EXPECTED_COLUMNS for r in body):
                fail(f"{page_index + 1}ページ目に列数が{EXPECTED_COLUMNS}でない行があります")

            head = body[0]
            if head[COL_NAME] != "施設名":
                fail(f"{page_index + 1}ページ目の見出しが想定と違います: {head}")
            # 2段目に年齢の数字が並ぶ
            sub = body[1]
            for age in range(AGE_COUNT):
                if sub[COL_AGE0 + age] != str(age):
                    fail(f"{page_index + 1}ページ目の年齢の見出しが想定と違います: {sub}")

            for raw in body[2:]:
                no = raw[COL_NO]
                name = raw[COL_NAME]
                if not re.fullmatch(r"\d+", no) or not name:
                    continue
                marks = []
                for age in range(AGE_COUNT):
                    text = raw[COL_AGE0 + age]
                    if not text:
                        marks.append(None)
                        continue
                    mark = MARKS.get(text)
                    if mark is None:
                        fail(f"{name}: {age}歳の欄が記号ではありません（「{text}」）")
                    marks.append(mark)
                rows.append(
                    {
                        "no": int(no),
                        "area": raw[COL_AREA] or None,
                        "kind": raw[COL_KIND],
                        "name": name,
                        "marks": marks,
                        "note": raw[COL_NOTE],
                    }
                )

    if as_of is None:
        fail("「令和N年M月D日現在」を読み取れませんでした")
    if not rows:
        fail("施設の行を取り出せませんでした")
    for i, r in enumerate(rows, start=1):
        if r["no"] != i:
            fail(f"通し番号が飛んでいます（{i}番目が{r['no']}）")

    # 地域名はかたまりの真ん中の行に入る。名前の出た行から**前にさかのぼって**、
    # ひとつ前の地域名が出た行の次までを、その地域とする
    last = None
    for r in reversed(rows):
        if r["area"]:
            last = r["area"]
        elif last:
            r["area"] = last
    # 先頭のかたまりは、いちばん最初に出てくる地域名で埋まる
    if any(r["area"] is None for r in rows):
        fail("地域が決まらない施設があります")
    return {"asOf": as_of, "rows": rows}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
