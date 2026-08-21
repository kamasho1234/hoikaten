"""
平塚市の「受入状況表」PDFから表を抜き出す

実行: python scripts/hiratsuka-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-hiratsuka-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに表が3つ（公立／私立／小規模）。10列
  （区分／施設種別／地区／園名／0歳〜5歳）
- 受け入れがあるところに「有」。**空欄は受入なし**と本文に書かれている
- 区分・施設種別・地区は縦結合。地区は複数の地区がひとつのセルにまとまって
  いるので、施設ごとの地区は決められない
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 4 + AGE_COUNT
COL_DIVISION = 0
COL_KIND = 1
COL_NAME = 3
COL_AGE0 = 4
YES = "有"


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def extract(path):
    tables = []
    target = None
    as_of = None
    yes_count = 0

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            flat = "".join(text.split())
            z = str.maketrans("０１２３４５６７８９", "0123456789")

            if page_index == 0:
                m = re.search(r"([０-９\d]+)月受入状況表", flat.translate(z))
                if not m:
                    fail("対象月を読み取れませんでした")
                target = int(m.group(1))
                m = re.search(r"R([０-９\d]+)\.([０-９\d]+)\.([０-９\d]+)掲載", flat.translate(z))
                if not m:
                    fail("掲載日を読み取れませんでした")
                as_of = tuple(int(g) for g in m.groups())

            for table in page.find_tables():
                extracted = table.extract()
                if len(extracted[0]) != EXPECTED_COLUMNS:
                    fail(f"列数が{len(extracted[0])}になっています")
                heads = [cell(c).translate(z) for c in extracted[1][COL_AGE0 : COL_AGE0 + AGE_COUNT]]
                if heads != [f"{i}歳" for i in range(AGE_COUNT)]:
                    fail(f"歳児の見出しが{heads}になっています")

                # 「有」の数。注意書きの「受入有無」も拾ってしまうので、
                # 歳児の欄のx座標の中だけを切り出して数える
                first = table.rows[1].cells[COL_AGE0]
                last = table.rows[1].cells[COL_AGE0 + AGE_COUNT - 1]
                if first is None or last is None:
                    fail("歳児の見出しの位置を取れませんでした")
                for word in page.crop((first[0], table.rows[1].bbox[3], last[2], table.bbox[3])).extract_words():
                    yes_count += word["text"].count(YES)

                # 区分（公立・私立）は表ごとにひとつ。罫線で区切られていないので、
                # その表の中に出てくる値をそのまま表全体のものとして使う
                divisions = {cell(r[COL_DIVISION]) for r in extracted[2:]} - {""}
                if len(divisions) != 1:
                    fail(f"区分を1つに決められません: {sorted(divisions)}")
                division = divisions.pop()

                # 施設種別は縦結合。値はセルの真ん中あたりの行にしか入らないので、
                # セルの範囲を見て、その中に入る行に配る
                spans = []
                for row_index, row in enumerate(table.rows):
                    c = row.cells[COL_KIND]
                    value = cell(extracted[row_index][COL_KIND])
                    if c is None or not value or value == "施設種別":
                        continue
                    spans.append((c[1], c[3], value))

                def kind_at(top, bottom):
                    middle = (top + bottom) / 2
                    for span_top, span_bottom, value in spans:
                        if span_top <= middle <= span_bottom:
                            return value
                    return ""

                rows = []
                for row_index, row in enumerate(table.rows):
                    if row_index < 2:
                        continue
                    values = [cell(c) for c in extracted[row_index]]
                    if not values[COL_NAME]:
                        continue
                    name_cell = row.cells[COL_NAME]
                    top, bottom = (name_cell[1], name_cell[3]) if name_cell else (row.bbox[1], row.bbox[3])
                    values[COL_DIVISION] = division
                    values[COL_KIND] = kind_at(top, bottom)
                    rows.append(values)
                if not rows:
                    fail("施設の行がありません")
                tables.append(rows)

    if not tables:
        fail("受入状況の表を取り出せませんでした")

    return {"target": target, "asOf": as_of, "yesCount": yes_count, "tables": tables}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
