"""
磐田市の「保育園等募集状況」PDFから表を抜き出す

実行: python scripts/iwata-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-iwata-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ。8列（区分／施設名／0歳児〜5歳児）。区分は行ごとに書いてある
- 記号は◎（10人以上）〇（5〜9人）△（1〜4人）×（募集なし）
- 空欄はそのクラスを設けていない（地域型保育は0〜2歳、幼稚園型のこども園は3歳以上）
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 2 + AGE_COUNT
COL_DIVISION = 0
COL_NAME = 1
COL_AGE0 = 2
MARKS = "◎○◯〇△▲×✕"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


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
    mark_counts = {}

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        flat = "".join((page.extract_text() or "").split()).translate(ZEN)

        m = re.search(r"募集状況（令和(\d+)年(\d+)月入園）", flat)
        if not m:
            fail("対象月を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        # 「◎：10人以上〇：5～9人△：1～4人×：募集なし」。※で始まる注意書きの手前まで
        m = re.search(r"☆募集人数について(.+?)※", flat)
        if not m:
            fail("凡例の場所が分かりませんでした")
        for mark, label in re.findall(rf"([{MARKS}])：([^{MARKS}]+)", m.group(1)):
            legend.append({"mark": mark, "label": label})

        for table in page.find_tables():
            extracted = table.extract()
            if len(extracted[0]) != EXPECTED_COLUMNS:
                fail(f"列数が{len(extracted[0])}になっています")
            heads = [cell(c).translate(ZEN) for c in extracted[0][COL_AGE0 : COL_AGE0 + AGE_COUNT]]
            if heads != [f"{i}歳児" for i in range(AGE_COUNT)]:
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
    if len(rows) < 40:
        fail(f"施設が{len(rows)}件しか取れていません")
    if len(legend) != 4:
        fail(f"記号の凡例を読み取れませんでした（{len(legend)}件）")

    return {
        "target": target,
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
