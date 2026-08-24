"""
山口市の「認可保育施設 空き状況一覧」PDFから表を抜き出す

実行: python scripts/yamaguchi-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-yamaguchi-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・10列（地域／公立私立／保育施設名／入所可能年（月）齢／0歳児〜5歳児）
- 凡例は本文に書いてある「○：3人以上空きあり △：1〜2人空きあり 空欄：空きなし」
- **空らんは空きなし**（凡例に明記）。**そのクラスがない欄には斜線**が引いてある
- 地域の欄は縦結合なので値を引き継ぐ
"""

import json
import re
import sys

import pdfplumber

COL_WARD = 0
COL_KUBUN = 1
COL_NAME = 2
COL_AGE_LIMIT = 3
COL_AGE0 = 4
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

MARKS = ["○", "◯", "〇", "△", "◎", "×", "✕"]
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
    empty_label = None
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

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日時点", flat)
        if not m:
            fail("基準日（令和N年M月D日時点）を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"令和(\d+)年(\d+)月入所調整(前|後)", flat)
        if not m:
            fail("何月入所ぶんかを読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)), m.group(3))

        # 凡例は「○：3人以上空きあり △：1～2人空きあり 空欄：空きなし」という1行にまとまっている。
        # 空白を潰した文字列で探すと後ろの表まで飲み込むので、行のまま読む
        for line in (page.extract_text() or "").splitlines():
            if "空欄：" not in line:
                continue
            for mark, label in re.findall(
                r"([○◯〇△◎])：(.+?)(?=\s*[○◯〇△◎]：|\s*空欄：|$)", line
            ):
                legend.append({"mark": mark, "label": label.strip()})
            m = re.search(r"空欄：(.+?)(?=\s*[○◯〇△◎]：|$)", line)
            if m:
                empty_label = m.group(1).strip()
            break

        for line in (page.extract_text() or "").splitlines():
            line = line.strip()
            if line.startswith("各園における") or line.startswith("以下の表は"):
                notes.append(line)

        tables = page.find_tables()
        if len(tables) != 1:
            fail(f"表が{len(tables)}個あります（1個のはず）")
        table = tables[0]
        extracted = table.extract()
        heads = [cell(c) for c in extracted[0]]
        if len(heads) != COLUMN_COUNT:
            fail(f"列数が{len(heads)}になっています（{COLUMN_COUNT}列のはず）")
        if heads[COL_NAME] != "保育施設名":
            fail(f"3列目の見出しが「{heads[COL_NAME]}」になっています")
        for age in range(AGE_COUNT):
            if heads[COL_AGE0 + age] != f"{age}歳児":
                fail(f"{age}歳児の見出しが「{heads[COL_AGE0 + age]}」になっています")

        ward_carry = ""
        for row_index, row in enumerate(table.rows):
            if row_index == 0:
                continue
            values = [cell(c) for c in extracted[row_index]]
            if values[COL_WARD]:
                ward_carry = values[COL_WARD]
            name = values[COL_NAME]
            if not name:
                continue
            if not ward_carry:
                fail(f"{name}: 地域が分かりません")
            if ward_carry not in wards:
                wards.append(ward_carry)

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
                if has_slash(page, box):
                    # そのクラスがない
                    slashes += 1
                    marks.append(None)
                else:
                    # 空らん＝空きなし（凡例に明記されている）
                    blanks += 1
                    marks.append("")
            rows.append(
                {
                    "ward": ward_carry,
                    "kubun": values[COL_KUBUN],
                    "name": name,
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
    if not empty_label:
        fail("「空欄：…」の説明が見つかりません。空らんの意味を決められません。")

    return {
        "asOf": as_of,
        "target": target,
        "legend": legend,
        "emptyLabel": empty_label,
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
