"""
栃木市の「受入可能数」PDFから表を抜き出す

実行: python scripts/tochigi-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-tochigi-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・8列（番号／保育園名／0歳〜5歳）
- 空きは記号（○＝3名以上受入可、△＝1〜2名受入可）。**空らんは「受入なし」**と
  凡例に書いてある（クラスがないという意味ではない）
- 番号は途中で1に戻る（区分ごとの通し番号）が、区分名が表にないので持たない
"""

import json
import re
import sys

import pdfplumber

COL_NO = 0
COL_NAME = 1
COL_AGE0 = 2
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

MARKS = "○◯〇△×✕"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def extract(path):
    target = None
    legend = []
    empty_label = None
    rows = []
    mark_counts = {}
    blanks = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"令和(\d+)年度(\d+)月受入可能数", flat)
        if not m:
            fail("何月ぶんの受入可能数かを読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        # 「○：3名以上受入可 △：1～2名受入可 空欄：受入なし」
        for line in text.splitlines():
            if "空欄" not in line:
                continue
            for mark, label in re.findall(rf"([{MARKS}])\s*[：:]\s*([^\s]+)", line):
                legend.append({"mark": mark, "label": label.strip()})
            m = re.search(r"空欄\s*[：:]\s*([^\s]+)", line)
            if m:
                empty_label = m.group(1).strip()
            break

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")
        table = tables[0]
        extracted = table.extract()
        # 見出しは2行にまたがる（2行目に「保育園名」「0歳」…）
        head = None
        for row in extracted[:3]:
            values = [cell(c) for c in row]
            if values[COL_NAME] == "保育園名":
                head = values
                break
        if head is None:
            fail("「保育園名」の見出しが見つかりません")
        if len(head) != COLUMN_COUNT:
            fail(f"列数が{len(head)}になっています（{COLUMN_COUNT}列のはず）")
        for age in range(AGE_COUNT):
            if head[COL_AGE0 + age] != f"{age}歳":
                fail(f"{age}歳の見出しが「{head[COL_AGE0 + age]}」になっています")

        for row_index in range(len(extracted)):
            values = [cell(c) for c in extracted[row_index]]
            name = values[COL_NAME]
            if not name or name == "保育園名":
                continue

            marks = []
            for age in range(AGE_COUNT):
                value = values[COL_AGE0 + age]
                if not value:
                    # 空らん＝受入なし（凡例に書いてある）
                    blanks += 1
                    marks.append("")
                    continue
                marks.append(value)
            rows.append({"no": values[COL_NO], "name": name, "marks": marks})

        # 記号の数。歳の欄のx座標と表の範囲で切り出す
        ranges = {}
        for row in table.rows:
            for index, box in enumerate(row.cells):
                if box is not None and index not in ranges:
                    ranges[index] = (box[0], box[2])
        if COL_AGE0 not in ranges or COL_AGE0 + AGE_COUNT - 1 not in ranges:
            fail("歳の列のx座標を取れませんでした")
        for word in page.crop(
            (
                ranges[COL_AGE0][0],
                table.bbox[1],
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
    if not empty_label:
        fail("「空欄：…」の説明が見つかりません。空らんの意味を決められません。")

    return {
        "target": target,
        "legend": legend,
        "emptyLabel": empty_label,
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
