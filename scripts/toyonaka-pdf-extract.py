"""
豊中市の「保育施設の欠員表」PDFから表を抜き出してJSONで返す

実行: python scripts/toyonaka-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-toyonaka-vacancy.ts から呼ぶ）

## 表の作り
- 4ページ。「保育施設（種別）／施設名／5歳〜0歳」。**年齢が右にいくほど小さくなる**
- 欠員は人数（実数）。「-」はその園にないクラス
- 種別の欄は縦書きで文字の順が崩れるので返さない
- **家庭保育所とポピンズキッズルームは2クラスぶんの合計**を1つのセルに入れている。
  セルの幅が2列ぶんになるので、幅を見て切り分ける
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
    return "".join(str(s).split())


def extract(path):
    rows = []
    as_of = set()

    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            flat = "".join((page.extract_text() or "").split()).translate(Z)
            m = re.search(r"欠員表\[令和(\d+)年\(\d+年\)(\d+)月(\d+)日現在\]", flat)
            if m:
                as_of.add((int(m.group(1)), int(m.group(2)), int(m.group(3))))

            for table in page.find_tables():
                extracted = table.extract()
                for row_index, row in enumerate(table.rows):
                    values = [cell(c) for c in extracted[row_index]]
                    # セルの幅。2列ぶんにまたがっているセルを見つけるために返す
                    widths = [None if c is None else round(c[2] - c[0]) for c in row.cells]
                    rows.append({"values": values, "widths": widths})

    if not rows:
        fail("欠員表を取り出せませんでした")
    if len(as_of) != 1:
        fail(f"基準日が{len(as_of)}種類あります")

    return {"asOf": sorted(as_of)[0], "rows": rows}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
