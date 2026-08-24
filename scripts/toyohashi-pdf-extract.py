"""
豊橋市の「受入可能月齢・受入可能人数」PDFから表を抜き出す

実行: python scripts/toyohashi-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-toyohashi-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに表が2つ（私立・公立）。**見出しの1列目が区分名**になっている
- 9列（施設名／ローマ字／0歳児クラス受入可能月齢／0歳児クラス〜5歳児クラス）
- 空きは記号（×＝0人、△＝1〜2人、○＝3〜5人、◎＝6人以上）。凡例は本文にある
- そのクラスがない欄には斜線
- **保育園ぶんと認定こども園ぶんでPDFが分かれていて、基準日も別**
"""

import json
import re
import sys

import pdfplumber

COL_NAME = 0
COL_ROMAN = 1
COL_AGE_LIMIT = 2
COL_AGE0 = 3
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
    legend = []
    rows = []
    mark_counts = {}
    slashes = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        flat = "".join((page.extract_text() or "").split()).translate(ZEN)

        m = re.search(r"令和(\d+)年（\d+年）(\d+)月(\d+)日", flat)
        if not m:
            fail("基準日（令和N年（YYYY年）M月D日）を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"令和(\d+)年（\d+年）(\d+)月入園申込", flat)
        if not m:
            fail("何月入園申込ぶんかを読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        # 「「×」０人、「△」１〜２人、「○」３〜５人、「◎」６人以上」
        for line in (page.extract_text() or "").splitlines():
            if "」" not in line or "人" not in line:
                continue
            found = re.findall(rf"「([{MARKS}])」\s*([^「]+?)(?=\s*、|\s*「|$)", line)
            if len(found) >= 3:
                for mark, label in found:
                    legend.append({"mark": mark, "label": label.strip("、 ")})
                break

        for table in page.find_tables():
            extracted = table.extract()
            if len(extracted[0]) != COLUMN_COUNT:
                continue
            heads = [cell(c) for c in extracted[0]]
            kubun = heads[COL_NAME]
            if not kubun:
                fail("表の1列目の見出し（区分名）が空です")
            if heads[COL_AGE_LIMIT] != "0歳児クラス受入可能月齢":
                fail(f"3列目の見出しが「{heads[COL_AGE_LIMIT]}」になっています")
            for age in range(AGE_COUNT):
                head = heads[COL_AGE0 + age]
                if not head.startswith(f"{age}歳児クラス"):
                    fail(f"{age}歳児の見出しが「{head}」になっています")

            for row_index, row in enumerate(table.rows):
                if row_index == 0:
                    continue
                values = [cell(c) for c in extracted[row_index]]
                name = values[COL_NAME]
                if not name:
                    continue

                marks = []
                for age in range(AGE_COUNT):
                    column = COL_AGE0 + age
                    value = values[column]
                    if value:
                        marks.append(value)
                        continue
                    box = row.cells[column]
                    if box is None:
                        fail(f"{name}: {age}歳児の欄の位置を取れませんでした")
                    if not has_slash(page, box):
                        fail(f"{name}: {age}歳児の欄が空で斜線もありません")
                    slashes += 1
                    marks.append(None)

                rows.append(
                    {
                        "kubun": kubun,
                        "name": name,
                        "roman": values[COL_ROMAN],
                        "ageLimit": values[COL_AGE_LIMIT],
                        "marks": marks,
                    }
                )

            # 記号の数。歳児の欄のx座標と表の範囲で切り出す
            first = table.rows[0].cells[COL_AGE0]
            last = table.rows[0].cells[COL_AGE0 + AGE_COUNT - 1]
            if first is None or last is None:
                fail("歳児の見出しの位置を取れませんでした")
            for word in page.crop(
                (first[0], table.rows[0].bbox[3], last[2], table.bbox[3])
            ).extract_words():
                for mark in MARKS:
                    n = word["text"].count(mark)
                    if n:
                        mark_counts[mark] = mark_counts.get(mark, 0) + n

    if not rows:
        fail("施設の行を取り出せませんでした")
    if not legend:
        fail("記号の凡例が見つかりません")

    return {
        "asOf": as_of,
        "target": target,
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
