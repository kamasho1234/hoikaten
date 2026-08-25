"""
刈谷市の「空き枠情報」PDFから表を抜き出す

実行: python scripts/kariya-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kariya-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・5列（園名／0歳児クラス／1歳児クラス／2歳児クラス／定員）
- **0〜2歳児クラスしかない**。刈谷市は3歳児クラス以上を幼児園等が受け持っていて、
  「3歳児クラス以上は幼児園等に十分な空き枠があります」と注記されている
- 空きは記号（〇＝5枠以上、▲＝残りわずか、×＝なし）。凡例は表の下にある
"""

import json
import re
import sys

import pdfplumber

COL_NAME = 0
COL_AGE0 = 1
AGE_COUNT = 3
COLUMN_COUNT = 5

MARKS = "○◯〇△▲×✕"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def extract(path):
    as_of = None
    legend = []
    notes = []
    rows = []
    mark_counts = {}

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日時点", flat)
        if not m:
            fail("「令和N年M月D日時点」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        # 「〇（５枠以上） ▲（残りわずか） ×（なし）」
        for line in text.splitlines():
            found = re.findall(rf"([{MARKS}])\s*[（(]([^）)]+)[）)]", line)
            if len(found) >= 2:
                legend = [{"mark": mark, "label": label.strip()} for mark, label in found]
                break

        for line in text.splitlines():
            line = line.strip()
            if line.startswith("※"):
                notes.append(line.lstrip("※").strip())

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")
        table = tables[0]
        extracted = table.extract()
        if len(extracted[0]) != COLUMN_COUNT:
            fail(f"列数が{len(extracted[0])}です（{COLUMN_COUNT}列のはず）")

        head = [cell(c) for c in extracted[0]]
        if head[COL_NAME] != "園名":
            fail(f"見出しが想定と違います: {head}")
        ages = [h for h in head[COL_AGE0 : COL_AGE0 + AGE_COUNT] if "歳児" in h]
        if len(ages) != AGE_COUNT:
            fail(f"年齢の見出しが{len(ages)}個です（{AGE_COUNT}個のはず）: {head}")

        for values in (list(map(cell, r)) for r in extracted[1:]):
            name = values[COL_NAME]
            if not name:
                continue
            marks = []
            for age in range(AGE_COUNT):
                value = values[COL_AGE0 + age]
                if not value:
                    fail(f"{name}: {age}歳児クラスの欄が空です")
                marks.append(value)
            rows.append(
                {
                    "name": name,
                    "marks": marks,
                    "capacity": values[COL_AGE0 + AGE_COUNT],
                }
            )

        # 記号の数。歳児クラスの欄のx座標と表の範囲で切り出す
        ranges = {}
        for row in table.rows:
            for index, box in enumerate(row.cells):
                if box is not None and index not in ranges:
                    ranges[index] = (box[0], box[2])
        if COL_AGE0 not in ranges or COL_AGE0 + AGE_COUNT - 1 not in ranges:
            fail("歳児クラスの列のx座標を取れませんでした")
        head_bottom = table.rows[0].bbox[3]
        for word in page.crop(
            (
                ranges[COL_AGE0][0],
                head_bottom,
                ranges[COL_AGE0 + AGE_COUNT - 1][1],
                table.bbox[3],
            )
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
        "legend": legend,
        "notes": notes,
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
