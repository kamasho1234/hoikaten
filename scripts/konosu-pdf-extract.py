"""
鴻巣市の「入所受入可能状況」PDFから表を抜き出す

実行: python scripts/konosu-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-konosu-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・8列（区分／保育施設名／0歳児〜5歳児）
- 記号は ○＝3人以上の受入れ可、△＝1〜2人程度の受入れ可、×＝受入れ不可
- 空らんはその年齢の受け入れがないことを表す。
  **小規模保育施設と事業所内保育は3歳児以上を受け入れない**と本文に明記がある
- 区分は縦書きの結合セルで文字の並びが崩れる（「認定こども園」が「こど認も定園」）
"""

import json
import re
import sys

import pdfplumber

COL_KIND = 0
COL_NAME = 1
COL_AGE0 = 2
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

KNOWN_KINDS = ("公立保育所", "私立保育所", "認定こども園", "小規模保育施設", "事業所内保育")
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

        m = re.search(r"受入可能状況は令和(\d+)年(\d+)月(\d+)日時点", flat)
        if not m:
            fail("「受入可能状況は令和N年M月D日時点」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"令和(\d+)年度(\d+)月入所受入可能状況", flat)
        if not m:
            fail("「令和N年度M月入所受入可能状況」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        # 「表の見方 ： ○…3人以上の受入れ可 △…1～2人程度の受入れ可 ×･･･受入れ不可」
        legend_line = next((l for l in text.splitlines() if "表の見方" in l), None)
        if legend_line is None:
            fail("「表の見方」の行が見つかりません")
        legend = {}
        squeezed = "".join(legend_line.split()).translate(ZEN)
        # 区切りが「…」だったり半角カタカナ中黒の「･･･」だったりする
        for mark, label in re.findall(rf"([{MARKS}])[…・･·]+([^{MARKS}]+)", squeezed):
            legend[shape_of(mark)] = label.strip()
        if len(legend) < 3:
            fail(f"記号の凡例が{len(legend)}件しか取れませんでした")

        # 「※小規模保育施設、事業所内保育では３歳児以上の受入れはしておりません。」
        if not re.search(r"小規模保育施設.*事業所内保育では(\d+)歳児以上の受入れはしておりません", flat):
            fail("「小規模保育施設、事業所内保育では3歳児以上の受入れはしておりません」の断りがありません")

        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith("※") and len(stripped) > 10:
                notes.append(stripped.lstrip("※").strip())

        tables = [t for t in page.find_tables() if len(t.extract()[0]) == COLUMN_COUNT]
        if not tables:
            fail("表が見つかりません")
        extracted = tables[0].extract()

        head_index = next(
            (i for i, r in enumerate(extracted) if cell(r[COL_NAME]) == "保育施設名"), None
        )
        if head_index is None:
            fail("「保育施設名」の見出しの行が見つかりません")
        head = [cell(c) for c in extracted[head_index]]
        for age in range(AGE_COUNT):
            if head[COL_AGE0 + age] != f"{age}歳児":
                fail(f"年齢の見出しが想定と違います: {head}")

        kind_carry = ""
        for values in (list(map(cell, r)) for r in extracted[head_index + 1 :]):
            name = values[COL_NAME]
            if not name:
                continue

            raw_kind = values[COL_KIND]
            if raw_kind:
                matched = [k for k in KNOWN_KINDS if set(k) <= set(raw_kind)]
                if not matched:
                    fail(f"{name}: 区分「{raw_kind}」が分かりません")
                kind_carry = max(matched, key=len)
            if not kind_carry:
                fail(f"{name}: 区分が分かりません")

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
            rows.append({"kind": kind_carry, "name": name, "marks": marks})

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
