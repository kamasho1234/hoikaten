"""
飯塚市の「保育施設の空き状況」PDFから表を抜き出す

実行: python scripts/iizuka-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-iizuka-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・9列（施設名／住所／電話番号／0歳児〜5歳児）
- 空きは記号（○と×だけ）。**凡例がない**
- 空欄はない（記号の数が施設数×6クラスとぴったり合う）
- **基準日が書かれていない**。時点は呼び出し側がPDFの Last-Modified を使う
"""

import json
import re
import sys

import pdfplumber

COL_NAME = 0
COL_ADDRESS = 1
COL_TEL = 2
COL_AGE0 = 3
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

MARKS = ["○", "◯", "〇", "×", "✕", "△"]
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def extract(path):
    target = None
    notes = []
    rows = []
    mark_counts = {}

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        flat = "".join((page.extract_text() or "").split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日入所申込用", flat)
        if not m:
            fail("何月入所申込用かを読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        # 【注意事項】から表の見出しまでの行を注記として拾う
        started = False
        for line in (page.extract_text() or "").splitlines():
            line = line.strip()
            if "注意事項" in line:
                started = True
                continue
            if not started:
                continue
            if line.startswith("施設名") or "入所申込用" in line:
                break
            if len(line) >= 8:
                notes.append(line)

        tables = page.find_tables()
        if len(tables) != 1:
            fail(f"表が{len(tables)}個あります（1個のはず）")
        table = tables[0]
        extracted = table.extract()
        heads = [cell(c) for c in extracted[0]]
        if len(heads) != COLUMN_COUNT:
            fail(f"列数が{len(heads)}になっています（{COLUMN_COUNT}列のはず）")
        if heads[COL_NAME] != "施設名":
            fail(f"1列目の見出しが「{heads[COL_NAME]}」になっています")
        for age in range(AGE_COUNT):
            if heads[COL_AGE0 + age] != f"{age}歳児":
                fail(f"{age}歳児の見出しが「{heads[COL_AGE0 + age]}」になっています")

        for row_index in range(1, len(extracted)):
            values = [cell(c) for c in extracted[row_index]]
            name = values[COL_NAME]
            if not name:
                continue
            marks = [values[COL_AGE0 + a] for a in range(AGE_COUNT)]
            if any(not m for m in marks):
                fail(f"{name}: 空の欄があります（{marks}）")
            rows.append(
                {
                    "name": name,
                    "address": values[COL_ADDRESS],
                    "tel": values[COL_TEL],
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

    return {
        "target": target,
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
