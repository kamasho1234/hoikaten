"""
高松市の「保育施設等入所可能状況一覧表」PDFから表を抜き出してJSONで返す

実行: python scripts/takamatsu-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-takamatsu-vacancy.ts から呼ぶ）

## 表の作り
- 4ページ。17列で、見出しは2行に分かれてページごとに出てくる
  「エリア／種別／公私立／№／施設名／所在地／電話／入所できる年齢／
   保育標準時間／延長保育／0歳〜5歳／備考」
- 空きは記号（○＝3名以上、△＝要件や条件により若干名、×＝受入は難しい）。
  その施設にないクラスは空欄
- エリアは縦結合で、いちばん上の行にしか入らない
- 凡例と基準日は1ページめの本文
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 17
COL_ZERO = 10

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
    target = None
    as_of = None
    mark_counts = {}

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            flat = "".join(text.split()).translate(Z)

            if page_index == 0:
                m = re.search(r"令和(\d+)年(\d+)月保育施設等入所可能状況", flat)
                if not m:
                    fail("対象月を読み取れませんでした")
                target = (int(m.group(1)), int(m.group(2)))
                m = re.search(r"令和(\d+)年(\d+)月(\d+)日時点", flat)
                if not m:
                    fail("基準日を読み取れませんでした")
                as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
                # 「○（３名以上） △（要件や条件により若干名） ×（受入は難しい）」
                area = flat.split("表記号の見方", 1)[-1]
                for mark, label in re.findall(r"([○◯〇△▲×✕])（([^）]+)）", area[:120]):
                    legend.append({"mark": mark, "label": label})

            # 表の部分に出てくる記号の数（凡例の行は除く）
            for line in text.splitlines():
                squeezed = "".join(line.split())
                if not squeezed or "表記号の見方" in squeezed:
                    continue
                for mark in ("○", "◯", "〇", "△", "×", "✕"):
                    mark_counts[mark] = mark_counts.get(mark, 0) + squeezed.count(mark)

            for table in page.find_tables():
                for row in table.extract():
                    values = [cell(c) for c in row]
                    if len(values) != EXPECTED_COLUMNS:
                        fail(f"列数が{len(values)}になっています: {values[:5]}")
                    rows.append(values)

    if not rows:
        fail("入所可能状況の表を取り出せませんでした")
    if len(legend) < 3:
        fail(f"記号の凡例を読み取れませんでした（{len(legend)}件）")

    return {
        "target": target,
        "asOf": as_of,
        "legend": legend,
        "markCounts": {k: v for k, v in mark_counts.items() if v},
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
