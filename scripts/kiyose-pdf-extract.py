"""
清瀬市の「保育施設欠員情報」PDFから表を抜き出してJSONで返す

実行: python scripts/kiyose-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kiyose-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに表が1つ。「種類／保育園／0歳〜5歳／計」の9列で、2行目に「欠員数」が並ぶ
- 種類（公立・私立・認定こども園・小規模保育所・事業所内保育所）は変わる行にだけ入る
- **空欄は欠員がないこと**を表す（表の下に「欠員数が0（表示なし）の場合でも
  入園申込みはできます」とある）
- 末尾に「合 計」の行がある
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
        page = pdf.pages[0]
        flat = "".join((page.extract_text() or "").translate(Z).split())
        m = re.search(r"令和(\d+)年(\d+)月(\d+)日現在", flat)
        if not m:
            fail("基準日を読み取れませんでした")
        as_of = [int(m.group(1)), int(m.group(2)), int(m.group(3))]
        m = re.search(r"令和(\d+)年(\d+)月入園", flat)
        if not m:
            fail("対象月を読み取れませんでした")
        target = [int(m.group(1)), int(m.group(2))]

        tables = page.find_tables()
        if not tables:
            fail("欠員情報の表を取り出せませんでした")
        rows = [[cell(c) for c in r] for r in tables[0].extract()]

    return {"asOf": as_of, "target": target, "head": rows[0], "sub": rows[1], "rows": rows[2:]}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
