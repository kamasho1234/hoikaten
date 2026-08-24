"""
稲沢市の「保育園入園空き状況」PDFから表を抜き出す

実行: python scripts/inazawa-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-inazawa-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ。11列（施設名／利用定員／住所／受入予定数／備考／保育時間）の表が
  種類ごとに4つ並ぶ。種類（【公立保育園】など）は表のすぐ上に書いてあるだけ
- **受入予定数は5歳から0歳の逆順**
- 記号は×（空き0人）△（空き1人〜3人）〇（空き4人以上）。
  空欄はそのクラスを設けていない
- 施設ごとに2行あり、2行目は電話番号と1号認定（幼稚園部分）の行
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 5 + AGE_COUNT
HEADER_ROWS = 2
COL_NAME = 0
COL_CAPACITY = 1
COL_AGE0 = 3  # ここから5歳→0歳の順に並ぶ
MARKS = "○◯〇△▲×✕"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def caption_of(page, table, others):
    """表の題（【公立保育園】）は表のすぐ上にある。左端が表とほぼ揃っている語を探す"""
    best = None
    for word in page.extract_words():
        if word["bottom"] > table.bbox[1] or abs(word["x0"] - table.bbox[0]) > 5:
            continue
        if any(
            o.bbox[1] <= word["top"] <= o.bbox[3] and o.bbox[0] <= word["x0"] <= o.bbox[2]
            for o in others
        ):
            continue
        if best is None or word["bottom"] > best["bottom"]:
            best = word
    if best is None:
        fail(f"表の題が見つかりません（{[round(v, 1) for v in table.bbox]}）")
    return "".join(best["text"].split())


def extract(path):
    tables = []
    legend = []
    as_of = None
    mark_counts = {}
    cell_counts = {}

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        flat = "".join((page.extract_text() or "").split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日現在", flat)
        if not m:
            fail("基準日を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        # 「「×」…空き0人「△」…空き1人～3人「〇」…空き4人以上」。
        # 最後のラベルは表の見出しに続いてしまうので、数と人の並びだけを取る
        for mark, label in re.findall(rf"「([{MARKS}])」…(空き[0-9～人以上]+)", flat):
            legend.append({"mark": mark, "label": label})

        found = page.find_tables()
        for table in found:
            extracted = table.extract()
            if len(extracted[0]) != EXPECTED_COLUMNS:
                fail(f"列数が{len(extracted[0])}になっています")
            heads = [
                cell(c).translate(ZEN)
                for c in extracted[HEADER_ROWS - 1][COL_AGE0 : COL_AGE0 + AGE_COUNT]
            ]
            expected = [f"{i}歳" for i in range(AGE_COUNT - 1, -1, -1)]
            if heads != expected:
                fail(f"歳児の見出しが{heads}になっています（{expected} のはず）")

            first = table.rows[HEADER_ROWS - 1].cells[COL_AGE0]
            last = table.rows[HEADER_ROWS - 1].cells[COL_AGE0 + AGE_COUNT - 1]
            if first is None or last is None:
                fail("歳児の見出しの位置を取れませんでした")

            # 記号の数。注意書きを混ぜないよう歳児の欄のx座標で切り出して数える。
            # ここには1号認定（幼稚園部分）の行のぶんも入る
            for word in page.crop(
                (first[0], table.rows[HEADER_ROWS - 1].bbox[3], last[2], table.bbox[3])
            ).extract_words():
                for mark in MARKS:
                    mark_counts[mark] = mark_counts.get(mark, 0) + word["text"].count(mark)

            rows = []
            for values in ([cell(c) for c in row] for row in extracted[HEADER_ROWS:]):
                for value in values[COL_AGE0 : COL_AGE0 + AGE_COUNT]:
                    if value:
                        cell_counts[value] = cell_counts.get(value, 0) + 1
                # 2行目は電話番号と1号認定（幼稚園部分）の行なので取り込まない
                if not values[COL_NAME]:
                    continue
                rows.append(values)
            tables.append(
                {
                    "caption": caption_of(page, table, [t for t in found if t is not table]),
                    "rows": rows,
                }
            )

    if not tables:
        fail("空き状況の表を取り出せませんでした")
    total = sum(len(t["rows"]) for t in tables)
    if total < 25:
        fail(f"施設が{total}件しか取れていません")
    if len(legend) != 3:
        fail(f"記号の凡例を読み取れませんでした（{len(legend)}件）")
    # 切り出した表の中身が、印字されている記号とそっくり同じか確かめる
    printed = {k: v for k, v in mark_counts.items() if v}
    if printed != cell_counts:
        fail(f"記号の数が合いません（印字 {printed} / 読み取り {cell_counts}）")

    # 1号認定の行を除いた、施設の行だけの数。取り込む側はこれと突き合わせる
    row_counts = {}
    for table in tables:
        for row in table["rows"]:
            for value in row[COL_AGE0 : COL_AGE0 + AGE_COUNT]:
                if value:
                    row_counts[value] = row_counts.get(value, 0) + 1

    return {
        "asOf": as_of,
        "legend": legend,
        "markCounts": row_counts,
        "tables": tables,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
