"""
大崎市の「保育施設空き状況」PDFから表を抜き出す

実行: python scripts/osaki-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-osaki-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・11列（区分／地域／施設名／定員／0歳児〜5歳児／入所対象児）
- 記号は ○＝空きあり、△＝空き枠3以下、×＝空きなし
- **「入所対象児」の列**（「生後2ヶ月以上2歳児」「3歳児以上就学前」など）があり、
  ここから受け入れる年齢が上下とも決まるので、空らんの検算に使える
- 区分と地域の列は結合セルのように見えるが罫線が無く、グループの真ん中の行に
  1回だけ字が置かれている。どの行までがそのグループかを表から決められないので、
  この2つは取り込まない
"""

import json
import re
import sys

import pdfplumber

COL_NAME = 2
COL_CAPACITY = 3
COL_AGE0 = 4
AGE_COUNT = 6
COL_ACCEPT = COL_AGE0 + AGE_COUNT
COLUMN_COUNT = COL_ACCEPT + 1

MARKS = "〇○◯△×✕"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def shape_of(mark):
    if not mark:
        return ""
    if mark in "〇○◯":
        return "○"
    if mark in "×✕":
        return "×"
    return mark


def extract(path):
    notes = []
    rows = []
    mark_counts = {}
    blanks = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"【令和(\d+)年(\d+)月(\d+)日現在】", flat)
        if not m:
            fail("「【令和N年M月D日現在】」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"令和(\d+)年度(\d+)月(\d+)日入所選考後", flat)
        if not m:
            fail("「令和N年度M月D日入所選考後」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        # 「空きあり：○ 空き枠３以下：△ 空きなし：×」
        legend_line = next((l for l in text.splitlines() if l.count("：") >= 3), None)
        if legend_line is None:
            fail("記号の凡例の行が見つかりません")
        legend = {}
        squeezed = "".join(legend_line.split()).translate(ZEN)
        for label, mark in re.findall(rf"([^{MARKS}：]+)：([{MARKS}])", squeezed):
            legend[shape_of(mark)] = label.strip()
        if len(legend) < 3:
            fail(f"記号の凡例が{len(legend)}件しか取れませんでした")

        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith("・") and len(stripped) > 12:
                notes.append(stripped.lstrip("・").strip())

        tables = [t for t in page.find_tables() if len(t.extract()[0]) == COLUMN_COUNT]
        if not tables:
            fail("表が見つかりません")
        extracted = tables[0].extract()

        head = [cell(c) for c in extracted[0]]
        if head[COL_NAME] != "施設名" or head[COL_ACCEPT] != "入所対象児":
            fail(f"見出しが想定と違います: {head}")
        for age in range(AGE_COUNT):
            if head[COL_AGE0 + age] != f"{age}歳児":
                fail(f"年齢の見出しが想定と違います: {head}")

        for values in (list(map(cell, r)) for r in extracted[1:]):
            name = values[COL_NAME]
            accept = values[COL_ACCEPT]
            if not name or not accept:
                # 最後の行は見出しの繰り返し
                continue

            marks = []
            for age in range(AGE_COUNT):
                value = shape_of(values[COL_AGE0 + age])
                if value == "":
                    blanks += 1
                    marks.append(None)
                    continue
                if value not in legend:
                    fail(f"{name}: {age}歳児が凡例にない記号です（「{value}」）")
                marks.append(value)
                mark_counts[value] = mark_counts.get(value, 0) + 1

            if all(m is None for m in marks):
                fail(f"{name}: 全ての年齢が空らんです")
            rows.append(
                {
                    "name": name,
                    "capacity": values[COL_CAPACITY],
                    "accept": accept,
                    "marks": marks,
                }
            )

    if not rows:
        fail("施設の行を取り出せませんでした")

    return {
        "asOf": as_of,
        "target": target,
        "legend": [{"mark": k, "label": v} for k, v in legend.items()],
        "notes": notes,
        "markCounts": mark_counts,
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
