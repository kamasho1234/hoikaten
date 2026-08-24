"""
熊本市の「保育施設入所可能情報一覧」PDFから表を抜き出す

実行: python scripts/kumamoto-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kumamoto-vacancy.ts から呼ぶ）

## 表の作り
- 14ページ・12列（管理区／校区／種類／施設名称／住所／電話番号／0歳〜5歳）
- 空きは記号。凡例は本文にある
  「"空白"預かりなし ×空き無し △1〜2名空き ○3〜5名空き ◎6名以上空き」
- **空らんは「預かりなし」**（そのクラスがない）。斜線は引かれていない
- 管理区と校区の欄は縦結合なので、ページを跨いで引き継ぐ
"""

import json
import re
import sys

import pdfplumber

COL_WARD = 0
COL_SCHOOL = 1
COL_TYPE = 2
COL_NAME = 3
COL_ADDRESS = 4
COL_TEL = 5
COL_AGE0 = 6
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

MARKS = "○◯〇△×✕◎"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def extract(path):
    as_of = None
    target = None
    legend = []
    empty_label = None
    wards = []
    rows = []
    mark_counts = {}
    blanks = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) < 1:
            fail("ページがありません")
        ward_carry = ""
        school_carry = ""

        for page_index, page in enumerate(pdf.pages):
            flat = "".join((page.extract_text() or "").split()).translate(ZEN)

            if as_of is None:
                m = re.search(r"令和(\d+)年\(?（?\d+年\)?）?(\d+)月(\d+)日更新", flat)
                if m:
                    as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
            if target is None:
                m = re.search(r"令和(\d+)年（\d+年）(\d+)月保育施設入所可能情報一覧", flat)
                if m:
                    target = (int(m.group(1)), int(m.group(2)))

            if not legend:
                # 「“空白”預かりなし ×空き無し △１～2名空き ○3～5名空き ◎6名以上空き」
                for line in (page.extract_text() or "").splitlines():
                    if "空白" not in line:
                        continue
                    m = re.search(r"[“\"”]空白[”\"“]\s*([^\s×○◯〇△◎]+)", line)
                    if m:
                        empty_label = m.group(1).strip()
                    for mark, label in re.findall(
                        rf"([{MARKS}])\s*([^\s{MARKS}]+)", line
                    ):
                        legend.append({"mark": mark, "label": label.strip()})
                    break

            for table in page.find_tables():
                extracted = table.extract()
                if len(extracted[0]) != COLUMN_COUNT:
                    continue
                heads = [cell(c) for c in extracted[0]]
                if heads[COL_NAME] != "施設名称":
                    fail(f"4列目の見出しが「{heads[COL_NAME]}」になっています（施設名称のはず）")

                for row_index, row in enumerate(table.rows):
                    values = [cell(c) for c in extracted[row_index]]
                    name = values[COL_NAME]
                    if not name or name == "施設名称":
                        continue
                    if values[COL_WARD]:
                        ward_carry = values[COL_WARD]
                    if values[COL_SCHOOL]:
                        school_carry = values[COL_SCHOOL]
                    if not ward_carry:
                        fail(f"{name}: 管理区が分かりません")
                    if ward_carry not in wards:
                        wards.append(ward_carry)

                    marks = []
                    for age in range(AGE_COUNT):
                        value = values[COL_AGE0 + age]
                        if not value:
                            # 空らん＝預かりなし（凡例に書いてある）
                            blanks += 1
                            marks.append(None)
                            continue
                        marks.append(value)

                    rows.append(
                        {
                            "ward": ward_carry,
                            "school": school_carry,
                            "type": values[COL_TYPE],
                            "name": name,
                            "marks": marks,
                        }
                    )

                # 記号の数。歳児の欄のx座標と表の範囲で切り出す。
                # 見出しは結合されていてセルが取れないので、列のx座標は他の行から借りる
                ranges = {}
                for row in table.rows:
                    for index, box in enumerate(row.cells):
                        if box is not None and index not in ranges:
                            ranges[index] = (box[0], box[2])
                if COL_AGE0 not in ranges or COL_AGE0 + AGE_COUNT - 1 not in ranges:
                    fail(f"{page_index + 1}ページ目の歳児の列のx座標を取れませんでした")
                first = ranges[COL_AGE0]
                last = ranges[COL_AGE0 + AGE_COUNT - 1]
                head_bottom = table.rows[1].bbox[3] if len(table.rows) > 1 else table.bbox[1]
                for word in page.crop(
                    (first[0], head_bottom, last[1], table.bbox[3])
                ).extract_words():
                    for mark in MARKS:
                        n = word["text"].count(mark)
                        if n:
                            mark_counts[mark] = mark_counts.get(mark, 0) + n

    if not rows:
        fail("施設の行を取り出せませんでした")
    if as_of is None:
        fail("更新日を読み取れませんでした")
    if target is None:
        fail("何月ぶんの入所可能情報かを読み取れませんでした")
    if not legend:
        fail("記号の凡例が見つかりません")
    if not empty_label:
        fail("「空白」の説明が見つかりません。空らんの意味を決められません。")

    return {
        "asOf": as_of,
        "target": target,
        "legend": legend,
        "emptyLabel": empty_label,
        "wards": wards,
        "markCounts": {k: v for k, v in mark_counts.items() if v},
        "blanks": blanks,
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
