"""
木更津市の「保育施設空き状況表」PDFから表を抜き出す

実行: python scripts/kisarazu-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kisarazu-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ。9列（保育施設名／所在地／施設形態／0歳〜5歳）
- 記号は〇（空き3枠以上）△（空き1〜2枠程度）✕（空きなし）
- 空欄はそのクラスを設けていない
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 3 + AGE_COUNT
COL_NAME = 0
COL_FORM = 2
COL_AGE0 = 3
MARKS = "○◯〇△×✕"


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
            flat = "".join((page.extract_text() or "").split())
            z = str.maketrans("０１２３４５６７８９", "0123456789")

            if page_index == 0:
                m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月入園分", flat.translate(z))
                if not m:
                    fail("対象月を読み取れませんでした")
                target = (int(m.group(1)), int(m.group(2)))
                m = re.search(r"([０-９\d]+)月([０-９\d]+)日現在", flat.translate(z))
                if not m:
                    fail("基準日を読み取れませんでした")
                as_of = (int(m.group(1)), int(m.group(2)))

            if not legend:
                # 「〇…空き３枠以上 △…空き１～２枠程度 ✕…空きなし」。
                # ラベルはどれも「空き〜」で始まるので、そこだけを取る
                for mark, label in re.findall(
                    rf"([{MARKS}])…(空き(?:なし|\d+枠以上|\d+～\d+枠程度))", flat.translate(z)
                ):
                    legend.append({"mark": mark, "label": label})

            for table in page.find_tables():
                extracted = table.extract()
                if len(extracted[0]) != EXPECTED_COLUMNS:
                    fail(f"列数が{len(extracted[0])}になっています")
                heads = [cell(c).translate(z) for c in extracted[0][COL_AGE0 : COL_AGE0 + AGE_COUNT]]
                if heads != [f"{i}歳" for i in range(AGE_COUNT)]:
                    fail(f"歳児の見出しが{heads}になっています")

                # 記号の数。凡例や注意書きを拾わないよう歳児の欄のx座標で切り出す
                first = table.rows[0].cells[COL_AGE0]
                last = table.rows[0].cells[COL_AGE0 + AGE_COUNT - 1]
                if first is None or last is None:
                    fail("歳児の見出しの位置を取れませんでした")
                for word in page.crop(
                    (first[0], table.rows[0].bbox[3], last[2], table.bbox[3])
                ).extract_words():
                    for mark in MARKS:
                        mark_counts[mark] = mark_counts.get(mark, 0) + word["text"].count(mark)

                for row in extracted[1:]:
                    values = [cell(c) for c in row]
                    if not values[COL_NAME]:
                        continue
                    rows.append(values)

    if not rows:
        fail("空き状況の表を取り出せませんでした")
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
