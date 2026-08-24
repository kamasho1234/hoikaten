"""
津市の「保育所等空き状況一覧」PDFから表を抜き出す

実行: python scripts/tsu-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-tsu-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ。9列（地域／施設名／住所／0歳〜5歳）の表が種類ごとに5つ並ぶ
- 種類（私立保育所・公立認定こども園など）は表のすぐ上に書いてあるだけで、
  表の中には入っていない
- 記号は○（若干名の空きがある状況）－（現時点において空きが無い状況）。
  空欄はそのクラスを設けていない
- 地域は縦結合
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 3 + AGE_COUNT
COL_AGE0 = 3
MARKS = "○◯〇-‐‑‒–—―ー－"
# ハイフンをそのまま文字クラスに入れると範囲の指定になってしまう
MARK_CLASS = "".join(re.escape(c) for c in MARKS)
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def caption_of(page, table, others):
    """表の題は表のすぐ上にある。左端が表とほぼ揃っている語を探す"""
    best = None
    for word in page.extract_words():
        if word["bottom"] > table.bbox[1] or abs(word["x0"] - table.bbox[0]) > 5:
            continue
        # 上の段の表に属する語は拾わない
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

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        flat = "".join((page.extract_text() or "").split()).translate(ZEN)

        m = re.search(r"(\d+)月(\d+)日入所調整直後の状況", flat)
        if not m:
            fail("基準日を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)))
        # 「「〇」…若干名の空きがある状況」
        for mark, label in re.findall(rf"「([{MARK_CLASS}])」…([^「]+?状況)", flat):
            legend.append({"mark": mark, "label": label})

        found = page.find_tables()
        for table in found:
            extracted = table.extract()
            if len(extracted[0]) != EXPECTED_COLUMNS:
                fail(f"列数が{len(extracted[0])}になっています")
            heads = [
                cell(c).translate(ZEN) for c in extracted[0][COL_AGE0 : COL_AGE0 + AGE_COUNT]
            ]
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

            rows = [[cell(c) for c in row] for row in extracted[1:]]
            tables.append(
                {
                    "caption": caption_of(page, table, [t for t in found if t is not table]),
                    "rows": [r for r in rows if r[1]],
                }
            )

    if not tables:
        fail("空き状況の表を取り出せませんでした")
    total = sum(len(t["rows"]) for t in tables)
    if total < 50:
        fail(f"施設が{total}件しか取れていません")
    if len(legend) != 2:
        fail(f"記号の凡例を読み取れませんでした（{len(legend)}件）")

    return {
        "asOf": as_of,
        "legend": legend,
        "markCounts": {k: v for k, v in mark_counts.items() if v},
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
