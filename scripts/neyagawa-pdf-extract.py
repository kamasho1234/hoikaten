"""
寝屋川市の「選考受入れ状況」PDFから表を抜き出す

実行: python scripts/neyagawa-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-neyagawa-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・8列（エリア／施設名／0歳児クラス〜5歳児クラス）
- エリア（西北・東北・東・南など）は縦書きの結合セルで、
  グループの先頭の行にだけ入る
- 記号は ◎＝6人以上、○＝3〜5人、△＝1〜2人、×＝受入枠なし。
  凡例は表の下の行にある
- 空らんは、そのクラスがない施設のもの
"""

import json
import re
import sys

import pdfplumber

COL_AREA = 0
COL_NAME = 1
COL_AGE0 = 2
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

MARKS = "◎○◯〇△×✕"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def extract(path):
    legend = []
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

        m = re.search(r"令和(\d+)年(\d+)月選考", flat)
        if not m:
            fail("「令和N年M月選考」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        # 「◎：6人以上 ○：3～5人 △：1～2人 ×：受入枠なし」
        legend_line = next(
            (l for l in text.splitlines() if l.count("：") >= 3 and l.strip()[0] in MARKS), None
        )
        if legend_line is None:
            fail("記号の凡例の行が見つかりません")
        for mark, label in re.findall(
            rf"([{MARKS}])：([^{MARKS}※]+)", "".join(legend_line.split()).translate(ZEN)
        ):
            legend.append({"mark": mark, "label": label.strip()})
        if not legend:
            fail("凡例から記号を取り出せませんでした")
        note = re.search(r"※(.+)$", "".join(legend_line.split()))
        if note:
            notes.append(note.group(1))

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")
        extracted = tables[0].extract()

        head = [cell(c) for c in extracted[0]]
        if len(head) != COLUMN_COUNT:
            fail(f"列数が{len(head)}です（{COLUMN_COUNT}列のはず）")
        if head[COL_AREA] != "エリア" or head[COL_NAME] != "施設名":
            fail(f"見出しが想定と違います: {head}")
        for age in range(AGE_COUNT):
            if head[COL_AGE0 + age] != f"{age}歳児クラス":
                fail(f"年齢の見出しが想定と違います: {head}")

        area_carry = ""
        for values in (list(map(cell, r)) for r in extracted[1:]):
            name = values[COL_NAME]
            if not name:
                continue
            if values[COL_AREA]:
                area_carry = values[COL_AREA]
            if not area_carry:
                fail(f"{name}: エリアが分かりません")

            marks = []
            for age in range(AGE_COUNT):
                value = values[COL_AGE0 + age]
                if not value:
                    blanks += 1
                    marks.append(None)
                    continue
                if value not in MARKS:
                    fail(f"{name}: {age}歳児が想定の記号ではありません（「{value}」）")
                marks.append(value)
                mark_counts[value] = mark_counts.get(value, 0) + 1

            if all(m is None for m in marks):
                fail(f"{name}: 全ての年齢が空らんです")
            rows.append({"area": area_carry, "name": name, "marks": marks})

    if not rows:
        fail("施設の行を取り出せませんでした")

    return {
        "target": target,
        "legend": legend,
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
