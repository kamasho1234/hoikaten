"""
尾道市の「保育施設空き状況一覧」PDFから表を抜き出す

実行: python scripts/onomichi-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-onomichi-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・9列（施設名／地域／保育年齢／0歳児〜5歳児）
- 空きは記号（○＝空きあり、△＝空きわずか、×＝空きなし、／＝受入なし）
- 地域（尾道・向島・因島・瀬戸田・御調など）が施設ごとに入っている
- 「保育年齢」は「６カ月～５歳」「８週～５歳」のような受け入れの範囲
"""

import json
import re
import sys

import pdfplumber

COL_NAME = 0
COL_AREA = 1
COL_AGE_RANGE = 2
COL_AGE0 = 3
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

MARKS = "○◯〇△×✕／/"
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

        m = re.search(r"[（(]令和(\d+)年度(\d+)月入所[）)]", flat)
        if m:
            target = (int(m.group(1)), int(m.group(2)))

        # 「○・・・空きあり △・・・空きわずか ×・・・空きなし ／・・・受入なし」
        for line in text.splitlines():
            if "記号の見方" not in line:
                continue
            for mark, label in re.findall(rf"([{MARKS}])・・・([^\s・]+)", line):
                legend.append({"mark": mark, "label": label.strip()})
            break

        for line in text.splitlines():
            line = line.strip()
            if line.startswith("①") or line.startswith("②") or line.startswith("上記確認日"):
                notes.append(re.sub(r"^[①②]\s*", "", line))

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")
        table = tables[0]
        extracted = table.extract()

        # 「0歳児」を含む行を見出しとする
        head = None
        for index, row in enumerate(extracted[:4]):
            values = [cell(c) for c in row]
            if "0歳児" in values:
                head = index
                if values.index("0歳児") != COL_AGE0:
                    fail(f"0歳児の列が{values.index('0歳児')}です（{COL_AGE0}のはず）")
                if values[COL_NAME] != "施設名" or values[COL_AREA] != "地域":
                    fail(f"見出しが想定と違います: {values[:3]}")
                break
        if head is None:
            fail("「0歳児」の見出しが見つかりません")
        if len(extracted[head]) != COLUMN_COUNT:
            fail(f"列数が{len(extracted[head])}です（{COLUMN_COUNT}列のはず）")

        for values in (list(map(cell, r)) for r in extracted[head + 1 :]):
            name = values[COL_NAME]
            if not name:
                continue
            area = values[COL_AREA]
            if not area:
                fail(f"{name}: 地域が空です")
            marks = []
            for age in range(AGE_COUNT):
                value = values[COL_AGE0 + age]
                if not value:
                    fail(f"{name}: {age}歳児の欄が空です")
                marks.append(value)
            rows.append(
                {
                    "name": name,
                    "area": area,
                    "ageRange": values[COL_AGE_RANGE],
                    "marks": marks,
                }
            )

        # 記号の数。歳児の欄のx座標と表の範囲で切り出す
        ranges = {}
        for row in table.rows:
            for index, box in enumerate(row.cells):
                if box is not None and index not in ranges:
                    ranges[index] = (box[0], box[2])
        if COL_AGE0 not in ranges or COL_AGE0 + AGE_COUNT - 1 not in ranges:
            fail("歳児の列のx座標を取れませんでした")
        head_bottom = table.rows[head].bbox[3]
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
        "target": target,
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
