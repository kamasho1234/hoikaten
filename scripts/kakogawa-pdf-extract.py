"""
加古川市の「保育対応可能状況（概況）」PDFから表を抜き出す

実行: python scripts/kakogawa-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kakogawa-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ。10列（区分／保育所等名／所在地／利用申込可能年齢／0歳〜5歳）
- 記号は☆（調整の余地あり）□（調整できる場合あり）▲（入所が難しい）
  ／（受入ができない年齢）
- **0〜2歳の施設は3歳児の欄から先が「連携施設：〜」の備考になっている**
- 利用申込可能年齢より下の歳児には、凡例にない文字が入っていることがある
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 4 + AGE_COUNT
COL_DIVISION = 0
COL_NAME = 1
COL_TARGET_AGE = 3
COL_AGE0 = 4
MARKS = "☆□▲"


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
            z = str.maketrans("０１２３４５６７８９", "0123456789")

            if page_index == 0:
                m = re.search(r"（令和([０-９\d]+)年([０-９\d]+)月([０-９\d]+)日現在）", flat.translate(z))
                if not m:
                    fail("基準日を読み取れませんでした")
                as_of = tuple(int(g) for g in m.groups())
                m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月入所申込み", flat.translate(z))
                if not m:
                    fail("対象月を読み取れませんでした")
                target = (int(m.group(1)), int(m.group(2)))

            if not legend:
                # 「☆ … 令和８年度８月調整を行った結果、調整の余地があります。」
                for mark, label in re.findall(rf"([{MARKS}])…([^。]+)。", flat):
                    legend.append({"mark": mark, "label": label.translate(z)})

            for table in page.find_tables():
                extracted = table.extract()
                if len(extracted[0]) != EXPECTED_COLUMNS:
                    fail(f"列数が{len(extracted[0])}になっています")
                heads = [cell(c).translate(z) for c in extracted[1][COL_AGE0 : COL_AGE0 + AGE_COUNT]]
                if heads != [f"{i}歳" for i in range(AGE_COUNT)]:
                    fail(f"歳児の見出しが{heads}になっています")

                # 記号の数。注意書きの凡例を拾わないよう歳児の欄のx座標で切り出す
                first = table.rows[1].cells[COL_AGE0]
                last = table.rows[1].cells[COL_AGE0 + AGE_COUNT - 1]
                if first is None or last is None:
                    fail("歳児の見出しの位置を取れませんでした")
                for word in page.crop(
                    (first[0], table.rows[1].bbox[3], last[2], table.bbox[3])
                ).extract_words():
                    for mark in MARKS:
                        mark_counts[mark] = mark_counts.get(mark, 0) + word["text"].count(mark)

                for row in extracted[2:]:
                    values = [cell(c) for c in row]
                    if not values[COL_NAME]:
                        continue
                    rows.append(values)

    if not rows:
        fail("保育対応可能状況の表を取り出せませんでした")
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
