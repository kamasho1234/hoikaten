"""
野洲市の「保育所等の空き状況」PDFから表を抜き出す

実行: python scripts/yasu-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-yasu-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・7列（園名／0歳児〜5歳児）。1行目のセルにタイトルと凡例がまとめて入る
- 記号は ○＝入所できる可能性があります、△＝若干数程度の空きあり、
  ×＝現在空きはありません
- **記号の文字が混ざっている**。凡例は「○」(U+25CB)「×」(U+00D7)、
  表の中は「〇」(U+3007)「✕」(U+2715) なので、呼び出し側で形をそろえる
- 空らんは、そのクラスがない施設のもの（小規模保育など）
- PDFに時点の日付がない。年度はタイトルの「令和８年度」から分かる
"""

import json
import re
import sys

import pdfplumber

COL_NAME = 0
COL_AGE0 = 1
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

        m = re.search(r"令和(\d+)年度", flat)
        if not m:
            fail("「令和N年度」を読み取れませんでした")
        fiscal_year = int(m.group(1))

        m = re.search(r"[（(](\d+)月入所", flat)
        if not m:
            fail("「（N月入所」を読み取れませんでした")
        target = int(m.group(1))

        for mark, label in re.findall(rf"([{MARKS}])：([^{MARKS}\n]+)", text):
            legend.append({"mark": mark, "label": "".join(label.split())})
        if not legend:
            fail("記号の凡例が見つかりません")

        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith("※") and len(stripped) > 10:
                notes.append(stripped.lstrip("※").strip())
            elif stripped.startswith("受付締切"):
                notes.append(stripped)

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")
        extracted = tables[0].extract()

        head_index = None
        for index, row in enumerate(extracted[:3]):
            if cell(row[COL_NAME]) == "園名":
                head_index = index
                break
        if head_index is None:
            fail("「園名」の見出しが見つかりません")
        head = [cell(c) for c in extracted[head_index]]
        if len(head) != COLUMN_COUNT:
            fail(f"列数が{len(head)}です（{COLUMN_COUNT}列のはず）")
        for age in range(AGE_COUNT):
            if head[COL_AGE0 + age] != f"{age}歳児":
                fail(f"年齢の見出しが想定と違います: {head}")

        for values in (list(map(cell, r)) for r in extracted[head_index + 1 :]):
            name = values[COL_NAME]
            if not name:
                continue

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
            rows.append({"name": name, "marks": marks})

    if not rows:
        fail("施設の行を取り出せませんでした")

    return {
        "fiscalYear": fiscal_year,
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
