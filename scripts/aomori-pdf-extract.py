"""
青森市の「保育所等空き状況一覧」PDFから表を抜き出す

実行: python scripts/aomori-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-aomori-vacancy.ts から呼ぶ）

## 表の作り
- 4ページ。10列（地区／施設名／住所／電話番号／0歳児〜5歳児）。見出しは各ページ2行
- 記号は◎（7人以上空きあり）○（4人〜6人分）△（1人〜3人分）－（空きなし）
- 地区は縦結合
- 文字に部首の字（⻘＝青、⼀＝一）が混ざっているので、その字だけ普通の字に直す
"""

import json
import re
import sys
import unicodedata

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 4 + AGE_COUNT
HEADER_ROWS = 2
COL_AREA = 0
COL_NAME = 1
COL_AGE0 = 4
MARKS = "◎○◯〇△▲-‐‑‒–—―ー－"
# ハイフンをそのまま文字クラスに入れると範囲の指定になってしまう
MARK_CLASS = "".join(re.escape(c) for c in MARKS)
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


# NFKCでは直らない部首の字（CJK Radicals Supplement）。出てきたら足す
RADICALS = {
    "⻂": "衣", "⻄": "西", "⻅": "見", "⻆": "角", "⻈": "言", "⻉": "貝", "⻊": "足",
    "⻋": "車", "⻐": "金", "⻑": "長", "⻒": "門", "⻘": "青", "⻛": "風", "⻜": "飛",
    "⻝": "食", "⻟": "食", "⻡": "首", "⻢": "馬", "⻣": "骨", "⻤": "鬼", "⻥": "魚",
    "⻦": "鳥", "⻨": "麦", "⻩": "黄", "⻪": "黒", "⻫": "斉", "⻭": "歯", "⻯": "竜",
    "⻲": "亀",
}


def fix(s):
    """
    康熙部首（⼀＝一）やCJK部首（⻘＝青）を普通の字に直す。他の字は変えない。
    康熙部首はNFKCで直るが、CJK部首のほうは直らないので表で持つ。
    知らない字が来たら黙って通さずに止める
    """
    out = []
    for c in str(s):
        if 0x2E80 <= ord(c) <= 0x2FDF:
            normalized = unicodedata.normalize("NFKC", c)
            if normalized == c:
                normalized = RADICALS.get(c)
                if normalized is None:
                    fail(f"表にない部首の字が入っています: {c}（U+{ord(c):04X}）")
            out.append(normalized)
        else:
            out.append(c)
    return "".join(out)


def cell(s):
    if s is None:
        return ""
    return fix("".join(str(s).split()))


def extract(path):
    rows = []
    legend = []
    as_of = None
    mark_counts = {}

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            flat = fix("".join((page.extract_text() or "").split())).translate(ZEN)

            if page_index == 0:
                m = re.search(r"令和(\d+)年(\d+)月(\d+)日現在", flat)
                if not m:
                    fail("基準日を読み取れませんでした")
                as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
                # 「◎＝7人以上空きあり○＝4人〜6人分の空きあり」
                for mark, label in re.findall(
                    rf"([{MARK_CLASS}])＝([^※]*?空き(?:あり|なし))", flat
                ):
                    legend.append({"mark": mark, "label": label})

            for table in page.find_tables():
                extracted = table.extract()
                if len(extracted[0]) != EXPECTED_COLUMNS:
                    fail(f"列数が{len(extracted[0])}になっています")
                heads = [
                    cell(c).translate(ZEN)
                    for c in extracted[HEADER_ROWS - 1][COL_AGE0 : COL_AGE0 + AGE_COUNT]
                ]
                if heads != [f"{i}歳児" for i in range(AGE_COUNT)]:
                    fail(f"歳児の見出しが{heads}になっています")

                # 記号の数。住所や電話番号のハイフンを拾わないよう歳児の欄で切り出す
                first = table.rows[HEADER_ROWS - 1].cells[COL_AGE0]
                last = table.rows[HEADER_ROWS - 1].cells[COL_AGE0 + AGE_COUNT - 1]
                if first is None or last is None:
                    fail("歳児の見出しの位置を取れませんでした")
                for word in page.crop(
                    (first[0], table.rows[HEADER_ROWS - 1].bbox[3], last[2], table.bbox[3])
                ).extract_words():
                    for mark in MARKS:
                        mark_counts[mark] = mark_counts.get(mark, 0) + word["text"].count(mark)

                for row in extracted[HEADER_ROWS:]:
                    values = [cell(c) for c in row]
                    if not values[COL_NAME]:
                        continue
                    rows.append(values)

    if not rows:
        fail("空き状況の表を取り出せませんでした")
    if len(rows) < 90:
        fail(f"施設が{len(rows)}件しか取れていません")
    if len(legend) != 4:
        fail(f"記号の凡例を読み取れませんでした（{len(legend)}件）")

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
