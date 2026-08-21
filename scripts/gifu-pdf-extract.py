"""
岐阜市の「認可保育施設の空き情報」PDFから表を抜き出してJSONで返す

実行: python scripts/gifu-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-gifu-vacancy.ts から呼ぶ）

## 表の作り
- **施設ごとに小さな表**が左右2列に並ぶ。1つの施設は3行
  （「年齢／0歳〜5歳」「在籍人数／…」「空き状況／…」）
- 地区の見出し（「＜中央地区＞」）が表の先頭の行に入る
- 空き状況は記号（✖＝空きなし、△＝1名空き、〇＝2名以上空き）で、
  **在籍人数だけは実数**
- 凡例は1ページめの本文
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
    rows = []
    target = set()
    as_of = set()
    legend = ""

    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            flat = "".join(text.translate(Z).split())
            m = re.search(r"令和(\d+)年(\d+)月入所申込", flat)
            if m:
                target.add((int(m.group(1)), int(m.group(2))))
            m = re.search(r"\(令和(\d+)年(\d+)月(\d+)日時点）", flat)
            if m:
                as_of.add((int(m.group(1)), int(m.group(2)), int(m.group(3))))
            if not legend:
                for line in text.split("\n"):
                    if "空き状況" in line and "：" in line:
                        legend = " ".join(line.split())
                        break

            for table_obj in page.find_tables():
                rows.extend([[cell(c) for c in r] for r in table_obj.extract()])

    if not rows:
        fail("空き情報の表を取り出せませんでした")
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
