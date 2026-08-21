"""
明石市の「受入予定児童数一覧表」PDFから表を抜き出してJSONで返す

実行: python scripts/akashi-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-akashi-vacancy.ts から呼ぶ）

## 表の作り
- 2ページ。「園名／0歳〜5歳」の7列。見出しは2行に分かれる
- 空きは記号（○＝5名以上、△＝3〜4名、▲＝1〜2名、×＝受入れ無し）。
  凡例は1ページめの本文
- その園にないクラスは空欄
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
    legend = []
    target = set()
    as_of = set()
    marks_in_text = {}

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            flat = "".join(text.split()).translate(Z)

            m = re.search(r"(\d+)年（令和(\d+)年）(\d+)月(\d+)日受入予定児童数一覧表", flat)
            if m:
                target.add((int(m.group(1)), int(m.group(3)), int(m.group(4))))
            m = re.search(r"令和(\d+)年(\d+)月(\d+)日時点", flat)
            if m:
                as_of.add((int(m.group(1)), int(m.group(2)), int(m.group(3))))
            if page_index == 0:
                # 「(○：5名以上、△：3～4名、▲：1～2名、×：受入れ無し)」
                for mark, label in re.findall(r"([○◯〇△▲×✕])：([^、）)]+)", flat):
                    legend.append({"mark": mark, "label": label})

            # 表の部分に出てくる記号の数。取りこぼしを見るために数えておく
            head = "0歳1歳2歳3歳4歳5歳"
            body = flat.split(head, 1)[1] if head in flat else ""
            for mark in "○◯〇△▲×✕":
                marks_in_text[mark] = marks_in_text.get(mark, 0) + body.count(mark)

            for table in page.find_tables():
                rows.extend([[cell(c) for c in r] for r in table.extract()])

    if not rows:
        fail("受入予定児童数の表を取り出せませんでした")
    if len(target) != 1:
        fail(f"対象日が{len(target)}種類あります")
    if len(as_of) != 1:
        fail(f"基準日が{len(as_of)}種類あります")
    if len(legend) < 4:
        fail(f"記号の凡例を読み取れませんでした（{len(legend)}件）")

    return {
        "target": sorted(target)[0],
        "asOf": sorted(as_of)[0],
        "legend": legend,
        "markCounts": {k: v for k, v in marks_in_text.items() if v},
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
