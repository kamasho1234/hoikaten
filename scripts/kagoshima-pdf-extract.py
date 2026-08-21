"""
鹿児島市の「認可保育所等（2・3号）空き状況一覧」PDFから表を抜き出してJSONで返す

実行: python scripts/kagoshima-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kagoshima-vacancy.ts から呼ぶ）

## 表の作り
- 6ページ。「地区／区分／保育所等名／所在地／定員／電話番号／保育年齢／0歳児〜5歳児」の13列
- 見出しは2行に分かれ、ページごとに出てくる
- 空きは記号（○＝受け入れが可能、×＝受入が困難）だけ。その施設にないクラスは空欄
- 地区は縦結合で、いちばん上の行にしか入らない
- 凡例は1ページめの本文
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 7 + AGE_COUNT


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
            flat = "".join(text.split())

            if page_index == 0:
                m = re.search(r"令和([０-９\d]+)年度([０-９\d]+)月期", flat)
                if not m:
                    fail("対象の期を読み取れませんでした")
                z = str.maketrans("０１２３４５６７８９", "0123456789")
                target = (int(m.group(1).translate(z)), int(m.group(2).translate(z)))
                m = re.search(r"※([０-９\d]+)月([０-９\d]+)日時点", flat)
                if not m:
                    fail("基準日を読み取れませんでした")
                as_of = (int(m.group(1).translate(z)), int(m.group(2).translate(z)))
                # 「受け入れが可能な年齢には「○」、今月の利用調整で受入が困難な年齢には「×」」
                for label, mark in re.findall(r"([^、。」]+?)年齢には「(.)」", flat):
                    legend.append({"mark": mark, "label": label})

            # 表の部分に出てくる記号の数（見出しより後ろ）
            head = "0歳児1歳児2歳児3歳児４歳児５歳児"
            body = flat.split(head, 1)[1] if head in flat else ""
            for mark in ("○", "◯", "〇", "×", "✕"):
                mark_counts[mark] = mark_counts.get(mark, 0) + body.count(mark)

            for table in page.find_tables():
                for row in table.extract():
                    values = [cell(c) for c in row]
                    if len(values) != EXPECTED_COLUMNS:
                        fail(f"列数が{len(values)}になっています: {values[:3]}")
                    rows.append(values)

    if not rows:
        fail("空き状況の表を取り出せませんでした")
    if len(legend) < 2:
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
