"""
綾瀬市の「入所見込み状況（認可）」PDFから表を抜き出す

実行: python scripts/ayase-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-ayase-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・7列（施設名／0歳〜5歳）
- 記号は4つ。◎＝5人以上、○＝入所見込みあり、△＝若干名、×＝入所見込みなし
- 空らんはその年齢のクラスがない施設のもの
  （0人なら「×」と書かれるので、空らんは0人ではない）
- 凡例は1行にまとめて書かれている
  「◎…５人以上入所見込みあり○…入所見込みあり△…若干名入所見込みあり×…入所見込みなし」
"""

import json
import re
import sys

import pdfplumber

COL_NAME = 0
COL_AGE0 = 1
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

MARKS = "◎〇○◯△×✕"
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

        m = re.search(r"令和(\d+)年度(\d+)月入所見込み状況[（(]認可[）)]令和(\d+)年(\d+)月(\d+)日時点", flat)
        if not m:
            fail("「令和N年度M月入所見込み状況（認可）令和N年M月D日時点」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))
        as_of = (int(m.group(3)), int(m.group(4)), int(m.group(5)))

        # 「◎…５人以上入所見込みあり○…入所見込みあり△……」
        # 表の中身まで飲み込まないように、凡例の行だけを見る
        legend_line = next(
            (l for l in text.splitlines() if re.search(rf"[{MARKS}]…", l)), None
        )
        if legend_line is None:
            fail("記号の凡例の行が見つかりません")
        legend = []
        squeezed = "".join(legend_line.split()).translate(ZEN)
        for mark, label in re.findall(rf"([{MARKS}])…([^{MARKS}]+)", squeezed):
            legend.append({"mark": shape_of(mark), "label": label.strip()})
        if not legend:
            fail("記号の凡例が見つかりません")

        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith("※") and len(stripped) > 8:
                notes.append(stripped.lstrip("※").strip())

        # 検算のために、表の中にある記号だけを文字から数える
        tables = [t for t in page.find_tables() if len(t.extract()[0]) == COLUMN_COUNT]
        if not tables:
            fail("表が見つかりません")
        marks_in_text = {}
        for table in tables:
            for char in page.crop(table.bbox).chars:
                if char["text"] in MARKS:
                    key = shape_of(char["text"])
                    marks_in_text[key] = marks_in_text.get(key, 0) + 1

        known = {l["mark"] for l in legend}
        for table in tables:
            extracted = table.extract()
            head = [cell(c) for c in extracted[0]]
            for age in range(AGE_COUNT):
                if head[COL_AGE0 + age] != f"{age}歳":
                    fail(f"年齢の見出しが想定と違います: {head}")

            for values in (list(map(cell, r)) for r in extracted[1:]):
                name = values[COL_NAME]
                if not name:
                    continue

                marks = []
                for age in range(AGE_COUNT):
                    value = shape_of(values[COL_AGE0 + age])
                    if value == "":
                        blanks += 1
                        marks.append(None)
                        continue
                    if value not in known:
                        fail(f"{name}: {age}歳が凡例にない記号です（「{value}」）")
                    marks.append(value)
                    mark_counts[value] = mark_counts.get(value, 0) + 1

                if all(m is None for m in marks):
                    fail(f"{name}: 全ての年齢が空らんです")
                rows.append({"name": name, "marks": marks})

    if not rows:
        fail("施設の行を取り出せませんでした")

    return {
        "target": target,
        "asOf": as_of,
        "legend": legend,
        "notes": notes,
        "markCounts": mark_counts,
        "marksInText": marks_in_text,
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
