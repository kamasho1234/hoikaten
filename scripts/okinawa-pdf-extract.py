"""
沖縄市の「認可保育所空き状況一覧」PDFから表を抜き出す

実行: python scripts/okinawa-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-okinawa-vacancy.ts から呼ぶ）

## 表の作り
- 3ページ・9列（地区／種別／施設名／0歳〜5歳）
- 空きは人数。**そのクラスがない欄には斜線**が引いてある（空らんはない）
- 種別（公立／保育所(園)／認定こども園／小規模／事業所内）は縦に並ぶので引き継ぐ
- **地区は1文字ずつ別の行のセルに入っている**（縦書き）。行の範囲との対応を
  決めるのが難しいので取り込まない
"""

import json
import re
import sys

import pdfplumber

COL_WARD = 0
COL_TYPE = 1
COL_NAME = 2
COL_AGE0 = 3
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def has_slash(page, box):
    return any(
        box[0] - 1 <= c["x0"]
        and c["x1"] <= box[2] + 1
        and box[1] - 1 <= c["top"]
        and c["bottom"] <= box[3] + 1
        for c in page.curves
    )


def extract(path):
    as_of = None
    notes = []
    rows = []
    slashes = 0
    numbers = 0
    type_carry = ""

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) < 1:
            fail("ページがありません")

        for page_index, page in enumerate(pdf.pages):
            flat = "".join((page.extract_text() or "").split()).translate(ZEN)

            if as_of is None:
                m = re.search(r"R(\d+)\.(\d+)\.(\d+)時点", flat)
                if m:
                    as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

            for line in (page.extract_text() or "").splitlines():
                line = line.strip()
                if line.startswith("↓") or line.startswith("※"):
                    text = line.lstrip("↓※").strip()
                    if len(text) >= 8 and text not in notes:
                        notes.append(text)

            for table in page.find_tables():
                extracted = table.extract()
                if len(extracted[0]) != COLUMN_COUNT:
                    continue
                heads = [cell(c) for c in extracted[0]]
                if heads[COL_NAME] != "施設名":
                    fail(f"3列目の見出しが「{heads[COL_NAME]}」になっています（施設名のはず）")
                for age in range(AGE_COUNT):
                    if heads[COL_AGE0 + age] != f"{age}歳":
                        fail(f"{age}歳の見出しが「{heads[COL_AGE0 + age]}」になっています")

                for row_index, row in enumerate(table.rows):
                    if row_index == 0:
                        continue
                    values = [cell(c) for c in extracted[row_index]]
                    if values[COL_TYPE]:
                        type_carry = values[COL_TYPE]
                    name = values[COL_NAME]
                    if not name:
                        continue
                    if not type_carry:
                        fail(f"{name}: 種別が分かりません")

                    counts = []
                    for age in range(AGE_COUNT):
                        column = COL_AGE0 + age
                        value = values[column]
                        if value:
                            if not re.fullmatch(r"\d+", value):
                                fail(f"{name}: {age}歳が数ではありません: 「{value}」")
                            numbers += 1
                            counts.append(int(value))
                            continue
                        box = row.cells[column]
                        if box is None:
                            fail(f"{name}: {age}歳の欄の位置を取れませんでした")
                        if not has_slash(page, box):
                            fail(f"{name}: {age}歳の欄が空で斜線もありません")
                        slashes += 1
                        counts.append(None)

                    rows.append({"type": type_carry, "name": name, "counts": counts})

    if not rows:
        fail("施設の行を取り出せませんでした")
    if as_of is None:
        fail("基準日（RN.M.D時点）を読み取れませんでした")

    return {
        "asOf": as_of,
        "notes": notes,
        "slashes": slashes,
        "numbers": numbers,
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
