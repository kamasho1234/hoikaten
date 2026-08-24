"""
佐世保市の「保育所等施設一覧（受入可否情報）」PDFから表を抜き出す

実行: python scripts/sasebo-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-sasebo-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・**左右2段組の16列**（地区／施設名／0歳児〜5歳児 が2組）
- 公式は「受け入れができない学齢（クラス年齢）に×を表示」と書いている
  - **×** … 受け入れできない
  - **空らん** … 受け入れ可能
  - **斜線** … そのクラスがない（幼稚園型こども園の低年齢、0〜2歳の事業所内保育の3〜5歳）
- 地区の欄は縦結合なので、左右それぞれで値を引き継ぐ
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
# 左右2段。それぞれ「地区・施設名・0〜5歳児」の8列
SIDES = [(0, 1, 2), (8, 9, 10)]
COLUMN_COUNT = 16

MARKS = ["×", "✕", "○", "◯", "〇", "△"]
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
    target = None
    notes = []
    wards = []
    rows = []
    mark_counts = {}
    slashes = 0
    blanks = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        flat = "".join((page.extract_text() or "").split()).translate(ZEN)

        m = re.search(r"受入可否情報【(\d+)月(\d+)日時点】", flat)
        if not m:
            fail("基準日（受入可否情報【M月D日時点】）を読み取れませんでした")
        as_of_month, as_of_day = int(m.group(1)), int(m.group(2))

        m = re.search(r"令和(\d+)年(\d+)月利用希望分", flat)
        if not m:
            fail("何月の利用希望分かを読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))
        as_of = (target[0], as_of_month, as_of_day)

        for line in (page.extract_text() or "").splitlines():
            line = line.strip()
            if line.startswith("◆") or "×」を表示" in line:
                notes.append(line.lstrip("◆").strip())

        tables = page.find_tables()
        if len(tables) != 1:
            fail(f"表が{len(tables)}個あります（1個のはず）")
        table = tables[0]
        extracted = table.extract()
        if len(extracted[0]) != COLUMN_COUNT:
            fail(f"列数が{len(extracted[0])}になっています（{COLUMN_COUNT}列のはず）")

        # 見出しの2行目に歳児が並ぶ
        head2 = [cell(c) for c in extracted[1]]
        for _, _, age0 in SIDES:
            for age in range(AGE_COUNT):
                if head2[age0 + age] != f"{age}歳児":
                    fail(
                        f"{age0 + age + 1}列目の見出しが「{head2[age0 + age]}」に"
                        f"なっています（{age}歳児のはず）"
                    )

        ward_carry = {index: "" for index, _, _ in SIDES}
        for row_index, row in enumerate(table.rows):
            if row_index < 2:
                continue
            values = [cell(c) for c in extracted[row_index]]
            for ward_col, name_col, age0 in SIDES:
                if values[ward_col]:
                    ward_carry[ward_col] = values[ward_col]
                name = values[name_col]
                if not name:
                    continue
                ward = ward_carry[ward_col]
                if not ward:
                    fail(f"{name}: 地区が分かりません")
                if ward not in wards:
                    wards.append(ward)

                marks = []
                for age in range(AGE_COUNT):
                    column = age0 + age
                    value = values[column]
                    if value:
                        marks.append(value)
                        continue
                    box = row.cells[column]
                    if box is None:
                        fail(f"{name}: {age}歳児の欄の位置を取れませんでした")
                    if has_slash(page, box):
                        # そのクラスがない
                        slashes += 1
                        marks.append(None)
                    else:
                        # 空らん＝受け入れ可能
                        blanks += 1
                        marks.append("")
                rows.append({"ward": ward, "name": name, "marks": marks})

        # 記号の数。左右それぞれの歳児の欄のx座標で切り出す
        for _, _, age0 in SIDES:
            first = table.rows[1].cells[age0]
            last = table.rows[1].cells[age0 + AGE_COUNT - 1]
            if first is None or last is None:
                fail("歳児の見出しの位置を取れませんでした")
            for word in page.crop(
                (first[0], table.rows[1].bbox[3], last[2], table.bbox[3])
            ).extract_words():
                for mark in MARKS:
                    n = word["text"].count(mark)
                    if n:
                        mark_counts[mark] = mark_counts.get(mark, 0) + n

    if not rows:
        fail("施設の行を取り出せませんでした")

    return {
        "asOf": as_of,
        "target": target,
        "notes": notes,
        "wards": wards,
        "markCounts": {k: v for k, v in mark_counts.items() if v},
        "slashes": slashes,
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
