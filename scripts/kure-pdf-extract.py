"""
呉市の「入所可能施設（保育所・認定こども園等）」PDFから表を抜き出す

実行: python scripts/kure-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kure-vacancy.ts から呼ぶ）

## 表の作り
- 2ページ。9列（地区／区分／施設名／0歳児〜5歳児）。見出しは各ページの先頭
- 記号は〇（申込できます）×（入所できません）の2つだけ。空欄はない
- 地区は縦結合。2つの地区をまとめた枠があり、セルの中で改行して並べてある
- 区分（公・私・認・幼・小・事）の意味は最後の2列の表に書いてある
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 3 + AGE_COUNT
COL_AREA = 0
COL_DIVISION = 1
COL_NAME = 2
COL_AGE0 = 3
MARKS = "○◯〇×✕"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def area_of(page, box):
    """地区の欄。2つの地区をまとめた枠は改行して並べてあるので、行ごとに分ける"""
    words = sorted(page.crop(box).extract_words(), key=lambda w: w["top"])
    lines = []
    for word in words:
        # 同じ行の文字は上端がほぼ揃う。行が変わればその半分以上ずれる
        height = word["bottom"] - word["top"]
        if lines and word["top"] - lines[-1]["top"] < height / 2:
            lines[-1]["words"].append(word)
        else:
            lines.append({"words": [word], "top": word["top"]})
    return [
        "".join(w["text"] for w in sorted(line["words"], key=lambda w: w["x0"])) for line in lines
    ]


def extract(path):
    rows = []
    legend = []
    divisions = {}
    target = None
    reception = None
    mark_counts = {}

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            flat = "".join((page.extract_text() or "").split()).translate(ZEN)

            if page_index == 0:
                m = re.search(r"令和(\d+)年(\d+)月入所可能施設", flat)
                if not m:
                    fail("対象月を読み取れませんでした")
                target = (int(m.group(1)), int(m.group(2)))
                m = re.search(r"受付期間令和(\d+)年(\d+)月(\d+)日", flat)
                if not m:
                    fail("受付期間を読み取れませんでした")
                reception = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
                # 「【○】のついた施設・年齢クラスに申込できます。」
                for mark, label in re.findall(
                    rf"【([{MARKS}])】のついた[^。]*?((?:申込|入所)でき(?:ます|ません))", flat
                ):
                    legend.append({"mark": mark, "label": label})

            for table in page.find_tables():
                extracted = table.extract()
                columns = len(extracted[0])

                if columns == 2:
                    # 最後にある区分の説明。「公 公立保育所」など
                    for row in extracted:
                        mark, label = cell(row[0]), cell(row[1])
                        if len(mark) == 1 and label:
                            divisions.setdefault(mark, label)
                    continue
                if columns != EXPECTED_COLUMNS:
                    continue

                header = next(
                    (
                        i
                        for i, r in enumerate(extracted)
                        if cell(r[COL_AGE0]).translate(ZEN) == "0歳児"
                    ),
                    None,
                )
                if header is None:
                    fail("歳児の見出しの行が見つかりません")
                heads = [
                    cell(c).translate(ZEN)
                    for c in extracted[header][COL_AGE0 : COL_AGE0 + AGE_COUNT]
                ]
                if heads != [f"{i}歳児" for i in range(AGE_COUNT)]:
                    fail(f"歳児の見出しが{heads}になっています")

                # 記号の数。注意書きを拾わないよう歳児の欄のx座標で切り出して数える
                first = table.rows[header].cells[COL_AGE0]
                last = table.rows[header].cells[COL_AGE0 + AGE_COUNT - 1]
                if first is None or last is None:
                    fail("歳児の見出しの位置を取れませんでした")
                body_top = table.rows[header].bbox[3]
                for word in page.crop(
                    (first[0], body_top, last[2], table.bbox[3])
                ).extract_words():
                    for mark in MARKS:
                        mark_counts[mark] = mark_counts.get(mark, 0) + word["text"].count(mark)

                for row_index, row in enumerate(table.rows):
                    if row_index <= header:
                        continue
                    values = [cell(c) for c in extracted[row_index]]
                    if not values[COL_NAME]:
                        continue
                    area = row.cells[COL_AREA]
                    values[COL_AREA] = area_of(page, area) if area else []
                    rows.append(values)

    if not rows:
        fail("空き状況の表を取り出せませんでした")
    if len(rows) < 60:
        fail(f"施設が{len(rows)}件しか取れていません")
    if len(legend) != 2:
        fail(f"記号の凡例を読み取れませんでした（{len(legend)}件）")
    if len(divisions) < 4:
        fail(f"区分の説明を読み取れませんでした（{len(divisions)}件）")

    return {
        "target": target,
        "reception": reception,
        "legend": legend,
        "divisions": divisions,
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
