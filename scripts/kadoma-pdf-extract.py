"""
門真市の「教育・保育施設等の空き状況・申込み人数」PDFから表を抜き出す

実行: python scripts/kadoma-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kadoma-vacancy.ts から呼ぶ）

## 表の作り
- 2ページ。**1ページ目が空き状況（記号）、2ページ目が申込み人数（数）**で、
  施設の並びは同じ。どちらも8列（分類／施設名／0歳児〜5歳児）
- 記号は ○＝4人以上、△＝1〜3人、×＝0人。
  **「-」は凡例に「利用定員の設定なし」と書かれている**（＝その年齢のクラスがない）
- 凡例の表で「-」の記号の欄だけ罫線と重なって空になるので、
  記号が空でラベルだけある行を拾って、表の中で凡例にない記号と1対1で結びつける
- 1ページ目の施設名には「★」（1号認定の定員を別途設けている施設）が付く。
  2ページ目には付かないので、照合するときは外す
- 分類は縦書きの結合セルで、注記が混ざって崩れる
  （「私立認定こども園★は１号認定の」）ので、文字の集合で照合する
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

KNOWN_KINDS = ("市立認定こども園", "私立保育所", "私立認定こども園", "私立地域型保育事業")
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
    if mark in "-－―—‐":
        return "-"
    return mark


def read_facility_table(extracted, want_numbers):
    """施設の表を読む。want_numbers が True なら値は数、False なら記号"""
    rows = []
    kind_carry = ""
    for values in (list(map(cell, r)) for r in extracted[1:]):
        name = values[COL_NAME]
        if not name or name == "施設名":
            continue

        raw_kind = values[COL_KIND]
        if raw_kind:
            matched = [k for k in KNOWN_KINDS if set(k) <= set(raw_kind)]
            if not matched:
                fail(f"{name}: 分類「{raw_kind}」が分かりません")
            kind_carry = max(matched, key=len)
        if not kind_carry:
            fail(f"{name}: 分類が分かりません")

        cells = []
        for age in range(AGE_COUNT):
            value = values[COL_AGE0 + age]
            if want_numbers:
                if not re.fullmatch(r"\d+", value):
                    fail(f"{name}: {age}歳児の申込み人数が数ではありません（「{value}」）")
                cells.append(int(value))
            else:
                cells.append(shape_of(value))
        rows.append({"kind": kind_carry, "name": name, "cells": cells})
    return rows


def extract(path):
    notes = []

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 2:
            fail(f"ページ数が{len(pdf.pages)}になっています（2ページのはず）")
        first, second = pdf.pages
        text = first.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日現在", flat)
        if not m:
            fail("「令和N年M月D日現在」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"[（(]令和(\d+)年(\d+)月入所[）)]", flat)
        if not m:
            fail("「（令和N年M月入所）」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith("◆") and len(stripped) > 12:
                notes.append(stripped.lstrip("◆").strip())

        # 凡例の表（2列）
        legend_tables = [t for t in first.find_tables() if len(t.extract()[0]) == 2]
        if not legend_tables:
            fail("凡例の表が見つかりません")
        legend = {}
        no_mark_labels = []
        for values in (list(map(cell, r)) for r in legend_tables[0].extract()):
            mark, label = shape_of(values[0]), values[1]
            if not label or label == "説明":
                continue
            if mark:
                legend[mark] = label
            else:
                # 「-」は罫線と重なって記号の欄が空になる
                no_mark_labels.append(label)
        if len(legend) < 3:
            fail(f"記号の凡例が{len(legend)}件しか取れませんでした")

        facility_tables = [t for t in first.find_tables() if len(t.extract()[0]) == COLUMN_COUNT]
        if len(facility_tables) != 1:
            fail(f"1ページ目の施設の表が{len(facility_tables)}個です（1個のはず）")
        head = [cell(c) for c in facility_tables[0].extract()[0]]
        if head[COL_NAME] != "施設名":
            fail(f"見出しが想定と違います: {head}")
        for age in range(AGE_COUNT):
            if head[COL_AGE0 + age] != f"{age}歳児":
                fail(f"年齢の見出しが想定と違います: {head}")
        vacancy_rows = read_facility_table(facility_tables[0].extract(), want_numbers=False)

        applied_tables = [t for t in second.find_tables() if len(t.extract()[0]) == COLUMN_COUNT]
        if len(applied_tables) != 1:
            fail(f"2ページ目の表が{len(applied_tables)}個です（1個のはず）")
        applied_rows = read_facility_table(applied_tables[0].extract(), want_numbers=True)

        # 表の中に出てくる記号のうち、凡例に無いもの（「-」）を数える
        unknown = set()
        mark_counts = {}
        for row in vacancy_rows:
            for value in row["cells"]:
                if not value:
                    fail(f"{row['name']}: 空の欄があります")
                mark_counts[value] = mark_counts.get(value, 0) + 1
                if value not in legend:
                    unknown.add(value)
        if len(unknown) > 1:
            fail(f"凡例にない記号が{len(unknown)}種類あります（{'、'.join(sorted(unknown))}）")
        if unknown and len(no_mark_labels) != 1:
            fail(
                f"凡例にない記号「{unknown.pop()}」に結びつく説明が{len(no_mark_labels)}件です（1件のはず）"
            )
        no_class_mark = next(iter(unknown)) if unknown else ""

    return {
        "asOf": as_of,
        "target": target,
        "legend": [{"mark": k, "label": v} for k, v in legend.items()],
        "noClassMark": no_class_mark,
        "noClassLabel": no_mark_labels[0] if no_mark_labels else "",
        "notes": notes,
        "markCounts": mark_counts,
        "vacancyRows": vacancy_rows,
        "appliedRows": applied_rows,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
