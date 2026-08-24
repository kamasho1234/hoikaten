"""
入間市の「受入状況表」PDFから表を抜き出す

実行: python scripts/iruma-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-iruma-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ。8列（No./施設名（所在地）／0歳〜5歳）
- 記号は*（受入年齢対象外）×（受入枠がない）▲（ごくわずかにある）
  △（わずかにある）○（余裕がある）
- 空欄はそのクラスを設けていない（小規模保育は0〜2歳）
- いちばん下の行に表の見方と注意書きが入っている
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 2 + AGE_COUNT
COL_NUMBER = 0
COL_NAME = 1
COL_AGE0 = 2
MARKS = "*＊○◯〇△▲×✕"
# *は文字クラスの中では意味を持たないが、正規表現に埋めるときは逃がしておく
MARK_CLASS = "".join(re.escape(c) for c in MARKS)
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
    as_of = None
    mark_counts = {}

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        flat = "".join((page.extract_text() or "").split()).translate(ZEN)

        m = re.search(r"受入状況表（令和(\d+)年(\d+)月(\d+)日現在）", flat)
        if not m:
            fail("基準日を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        # 「【表の見方】*：受入年齢対象外×：受入枠がない…」。※の注意書きの手前まで
        m = re.search(r"【表の見方】(.+?)※", flat)
        if not m:
            fail("表の見方が見つかりません")
        for mark, label in re.findall(rf"([{MARK_CLASS}])：([^{MARK_CLASS}]+)", m.group(1)):
            legend.append({"mark": mark, "label": label})

        for table in page.find_tables():
            extracted = table.extract()
            if len(extracted[0]) != EXPECTED_COLUMNS:
                fail(f"列数が{len(extracted[0])}になっています")
            heads = [cell(c).translate(ZEN) for c in extracted[0][COL_AGE0 : COL_AGE0 + AGE_COUNT]]
            if heads != [f"{i}歳" for i in range(AGE_COUNT)]:
                fail(f"歳児の見出しが{heads}になっています")

            first = table.rows[0].cells[COL_AGE0]
            last = table.rows[0].cells[COL_AGE0 + AGE_COUNT - 1]
            if first is None or last is None:
                fail("歳児の見出しの位置を取れませんでした")

            bottom = None
            for row_index, row in enumerate(table.rows):
                if row_index == 0:
                    continue
                values = [cell(c) for c in extracted[row_index]]
                # いちばん下の表の見方の行は通し番号がない
                if not re.fullmatch(r"\d+", values[COL_NUMBER].translate(ZEN)):
                    continue
                rows.append(values)
                bottom = row.bbox[3]
            if bottom is None:
                fail("施設の行が見つかりません")

            # 記号の数。いちばん下の表の見方の行は数えないよう、
            # 歳児の欄のx座標と最後の施設の行までで切り出す
            for word in page.crop(
                (first[0], table.rows[0].bbox[3], last[2], bottom)
            ).extract_words():
                for mark in MARKS:
                    mark_counts[mark] = mark_counts.get(mark, 0) + word["text"].count(mark)

    if not rows:
        fail("受入状況の表を取り出せませんでした")
    if len(rows) < 30:
        fail(f"施設が{len(rows)}件しか取れていません")
    if len(legend) != 5:
        fail(f"記号の凡例を読み取れませんでした（{len(legend)}件）")
    numbers = [int(r[COL_NUMBER].translate(ZEN)) for r in rows]
    if numbers != list(range(1, len(rows) + 1)):
        fail(f"通し番号が1から{len(rows)}まで続いていません")

    return {
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
