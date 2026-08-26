"""
摂津市の「空き状況表」PDFから表を抜き出す

実行: python scripts/settsu-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-settsu-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・9列（区分／種別／施設名／0歳児〜5歳児）
- 見出しが2行に分かれている（1行目に「空き状況（クラス年齢）」、2行目に年齢）
- 区分（公立・私立）と種別（認定こども園・保育所・小規模保育事業）は
  結合セルで、変わるときだけ値が入る
- 記号は 〇＝空きが3人以上、△＝空きが1〜2人、×＝空き無し
- 空らんはその年齢の受け入れがないことを表す（空きが無いときは「×」と書かれる）
"""

import json
import re
import sys

import pdfplumber

COL_KIND = 0
COL_TYPE = 1
COL_NAME = 2
COL_AGE0 = 3
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

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

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日時点", flat)
        if not m:
            fail("「令和N年M月D日時点」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"令和(\d+)年(\d+)月入所空き状況表", flat)
        if not m:
            fail("「令和N年M月入所 空き状況表」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        # 「〇：空きが3人以上、△：空きが1～2人、×：空き無し」
        legend_line = next((l for l in text.splitlines() if l.count("：") >= 3), None)
        if legend_line is None:
            fail("記号の凡例の行が見つかりません")
        legend = {}
        squeezed = "".join(legend_line.split()).translate(ZEN)
        for mark, label in re.findall(rf"([{MARKS}])：([^、。{MARKS}]+)", squeezed):
            legend[shape_of(mark)] = label.strip()
        if len(legend) < 3:
            fail(f"記号の凡例が{len(legend)}件しか取れませんでした")

        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith("※") and len(stripped) > 12:
                notes.append(stripped.lstrip("※").strip())

        tables = [t for t in page.find_tables() if len(t.extract()[0]) == COLUMN_COUNT]
        if not tables:
            fail("表が見つかりません")
        extracted = tables[0].extract()

        # 見出しは2行。年齢は2行目に入る
        head_index = next(
            (i for i, r in enumerate(extracted) if cell(r[COL_AGE0]) == "0歳児"), None
        )
        if head_index is None:
            fail("「0歳児」の見出しの行が見つかりません")
        head = [cell(c) for c in extracted[head_index]]
        for age in range(AGE_COUNT):
            if head[COL_AGE0 + age] != f"{age}歳児":
                fail(f"年齢の見出しが想定と違います: {head}")

        kind_carry = ""
        type_carry = ""
        for values in (list(map(cell, r)) for r in extracted[head_index + 1 :]):
            name = values[COL_NAME]
            if not name:
                continue
            if values[COL_KIND]:
                kind_carry = values[COL_KIND]
            if values[COL_TYPE]:
                type_carry = values[COL_TYPE]
            if not kind_carry or not type_carry:
                fail(f"{name}: 区分か種別が分かりません")

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
            rows.append({"kind": kind_carry, "type": type_carry, "name": name, "marks": marks})

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
