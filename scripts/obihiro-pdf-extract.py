"""
帯広市の「保育所等の空き状況一覧」PDFから表を抜き出す

実行: python scripts/obihiro-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-obihiro-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ。9列（区分／施設名／住所／0歳児〜5歳児）
- 記号は○（空きあり）△（わずかに空きあり）−（空きなし）／（利用不可）
- **「／」は文字ではなくセルいっぱいの斜線で描いてある**ので、
  空のセルに斜線があるかどうかで見分ける
- 区分は縦結合。「認可保育所（公立）」の次が「（私立）」のように、
  2つめからは「認可保育所」が省かれている
- 文字に部首の字（⻄＝西、⻘＝青）が混ざっているので、その字だけ普通の字に直す
"""

import json
import re
import sys
import unicodedata

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 3 + AGE_COUNT
COL_DIVISION = 0
COL_NAME = 1
COL_AGE0 = 3
SLASH = "／"
MARKS = "○◯〇△▲-‐‑‒–—―ー－−"
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


def has_slash(page, box):
    """セルいっぱいに引かれた斜線があるか。同じ線が2本重ねて描かれている"""
    return any(
        box[0] - 1 <= c["x0"] and c["x1"] <= box[2] + 1 and box[1] - 1 <= c["top"] and c["bottom"] <= box[3] + 1
        for c in page.curves
    )


def extract(path):
    rows = []
    legend = []
    target = None
    as_of = None
    mark_counts = {}
    slashes = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        flat = fix("".join((page.extract_text() or "").split())).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月保育所等の空き状況一覧（令和(\d+)年(\d+)月(\d+)日時点）", flat)
        if not m:
            fail("対象月と時点を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))
        as_of = (int(m.group(3)), int(m.group(4)), int(m.group(5)))

        # 「凡例：「○」空きあり「△」わずかに空きあり…」。表の見出しの手前までが凡例
        m = re.search(r"凡例：(.+?)区分施設名", flat)
        if not m:
            fail("凡例の場所が分かりませんでした")
        for mark, label in re.findall(rf"「([{MARK_CLASS}{SLASH}])」([^「]+)", m.group(1)):
            legend.append({"mark": mark, "label": label})

        for table in page.find_tables():
            extracted = table.extract()
            if len(extracted[0]) != EXPECTED_COLUMNS:
                fail(f"列数が{len(extracted[0])}になっています")
            heads = [cell(c).translate(ZEN) for c in extracted[0][COL_AGE0 : COL_AGE0 + AGE_COUNT]]
            if heads != [f"{i}歳児" for i in range(AGE_COUNT)]:
                fail(f"歳児の見出しが{heads}になっています")

            # 記号の数。住所のハイフンを拾わないよう歳児の欄のx座標で切り出す
            first = table.rows[0].cells[COL_AGE0]
            last = table.rows[0].cells[COL_AGE0 + AGE_COUNT - 1]
            if first is None or last is None:
                fail("歳児の見出しの位置を取れませんでした")
            for word in page.crop(
                (first[0], table.rows[0].bbox[3], last[2], table.bbox[3])
            ).extract_words():
                for mark in MARKS:
                    mark_counts[mark] = mark_counts.get(mark, 0) + word["text"].count(mark)

            for row_index, row in enumerate(table.rows):
                if row_index == 0:
                    continue
                values = [cell(c) for c in extracted[row_index]]
                if not values[COL_NAME]:
                    continue
                for age in range(AGE_COUNT):
                    column = COL_AGE0 + age
                    if values[column]:
                        continue
                    box = row.cells[column]
                    if box is None:
                        fail(f"{values[COL_NAME]}: {age}歳児の欄の位置を取れませんでした")
                    if not has_slash(page, box):
                        fail(f"{values[COL_NAME]}: {age}歳児の欄が空で斜線もありません")
                    values[column] = SLASH
                    slashes += 1
                rows.append(values)

    if not rows:
        fail("空き状況の表を取り出せませんでした")
    if len(rows) < 35:
        fail(f"施設が{len(rows)}件しか取れていません")
    if len(legend) != 4:
        fail(f"記号の凡例を読み取れませんでした（{len(legend)}件）")

    return {
        "target": target,
        "asOf": as_of,
        "legend": legend,
        "markCounts": {k: v for k, v in mark_counts.items() if v},
        "slashes": slashes,
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
