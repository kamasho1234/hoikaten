"""
川西市の「市内保育施設の2・3号入所（園）可能人数（空き状況）」PDFから表を抜き出す

実行: python scripts/kawanishi-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kawanishi-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ。9列（区分／保育施設名／5歳〜0歳／0歳児の受け入れ可能時期）
- **歳児の並びが5歳から0歳の逆順**
- 空きは人数。空欄はそのクラスを設けていない（分園や満1歳からの施設）
- 区分（公立保育所・こども園・民間保育園など）は縦書きの縦結合

## 検算のための持ち出し
- 歳児の欄のx座標の中にある数字を、表とは別に語の単位で拾って合計する
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 2 + AGE_COUNT + 1
COL_DIVISION = 0
COL_NAME = 1
COL_AGE0 = 2  # ここから5歳→0歳の順に並ぶ


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def extract(path):
    rows = []
    target = None
    as_of = None
    word_sum = 0

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            flat = "".join((page.extract_text() or "").split())
            z = str.maketrans("０１２３４５６７８９", "0123456789")

            if page_index == 0:
                m = re.search(r"([０-９\d]+)月([０-９\d]+)日時点空き状況", flat.translate(z))
                if not m:
                    fail("時点を読み取れませんでした")
                as_of = (int(m.group(1)), int(m.group(2)))
                m = re.search(r"（([０-９\d]+)月入所選考用）", flat.translate(z))
                if not m:
                    fail("対象月を読み取れませんでした")
                target = int(m.group(1))

            for table in page.find_tables():
                extracted = table.extract()
                # 表の下に「0歳児の受け入れ可能時期」の早見表もあるので、列数で見分ける
                if len(extracted[0]) != EXPECTED_COLUMNS:
                    continue
                heads = [cell(c).translate(z) for c in extracted[0][COL_AGE0 : COL_AGE0 + AGE_COUNT]]
                expected = [f"{i}歳" for i in range(AGE_COUNT - 1, -1, -1)]
                if heads != expected:
                    fail(f"歳児の見出しが{heads}になっています（{expected} のはず）")

                # 歳児の欄のx座標。数字の合計を出すのに使う
                first = table.rows[0].cells[COL_AGE0]
                last = table.rows[0].cells[COL_AGE0 + AGE_COUNT - 1]
                if first is None or last is None:
                    fail("歳児の見出しの位置を取れませんでした")
                for word in page.crop(
                    (first[0], table.rows[0].bbox[3], last[2], table.bbox[3])
                ).extract_words():
                    if re.fullmatch(r"\d+", word["text"]):
                        word_sum += int(word["text"])

                # 区分は縦書き。欄のx座標で切り出して、縦に離れているところで区切る
                division_cell = next(
                    (r.cells[COL_DIVISION] for r in table.rows[1:] if r.cells[COL_DIVISION]), None
                )
                if division_cell is None:
                    fail("区分の欄の位置を取れませんでした")
                words = sorted(
                    page.crop(
                        (division_cell[0], table.rows[0].bbox[3], division_cell[2], table.bbox[3])
                    ).extract_words(),
                    key=lambda w: w["top"],
                )
                # 区分の欄は縦書き。しかも「こども園」のところだけ
                # 左に種類・右に公私と2列になる。
                # まず縦に離れているところでブロックに分け、
                # ブロックの中は右の列から先に読む（公立 → こども園）
                blocks = []
                for word in words:
                    height = word["bottom"] - word["top"]
                    # 同じ区分の中の文字の隙間は文字の高さの7割ほど、
                    # 区分どうしの隙間はそれ以上あく。文字1つぶんを境目にする
                    if blocks and word["top"] - blocks[-1]["bottom"] < height:
                        blocks[-1]["words"].append(word)
                        blocks[-1]["bottom"] = max(blocks[-1]["bottom"], word["bottom"])
                    else:
                        blocks.append(
                            {"words": [word], "top": word["top"], "bottom": word["bottom"]}
                        )
                for block in blocks:
                    by_column = {}
                    for word in sorted(block["words"], key=lambda w: w["top"]):
                        key = round((word["x0"] + word["x1"]) / 2)
                        by_column.setdefault(key, []).append(word["text"])
                    block["text"] = "".join(
                        "".join(by_column[key]) for key in sorted(by_column, reverse=True)
                    )

                division_spans = []
                for i, block in enumerate(blocks):
                    top = (
                        table.rows[0].bbox[3]
                        if i == 0
                        else (blocks[i - 1]["bottom"] + block["top"]) / 2
                    )
                    bottom = (
                        table.bbox[3]
                        if i == len(blocks) - 1
                        else (block["bottom"] + blocks[i + 1]["top"]) / 2
                    )
                    division_spans.append((top, bottom, block["text"]))

                for row_index, row in enumerate(table.rows):
                    if row_index == 0:
                        continue
                    values = [cell(c) for c in extracted[row_index]]
                    if not values[COL_NAME]:
                        continue
                    name_cell = row.cells[COL_NAME]
                    top, bottom = (
                        (name_cell[1], name_cell[3]) if name_cell else (row.bbox[1], row.bbox[3])
                    )
                    middle = (top + bottom) / 2
                    division = ""
                    for span_top, span_bottom, text in division_spans:
                        if span_top <= middle <= span_bottom:
                            division = text
                            break
                    values[COL_DIVISION] = division
                    rows.append(values)

    if not rows:
        fail("空き状況の表を取り出せませんでした")
    if len(rows) < 20:
        fail(f"施設が{len(rows)}件しか取れていません")

    return {"target": target, "asOf": as_of, "wordSum": word_sum, "rows": rows}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
