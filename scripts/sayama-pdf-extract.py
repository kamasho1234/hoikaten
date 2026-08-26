"""
狭山市の「入所審査用空き状況」PDFから表を抜き出す

実行: python scripts/sayama-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-sayama-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・10列（区分／保育所名／定員／対象年齢／0歳〜5歳）
- 区分（公立・民間・認定こども園・地域型保育事業所）は縦書きの結合セルで、
  グループの先頭の行に入る
- 記号は 〇＝空きあり、△＝若干名の空きあり。
  **空白＝空きなし**なので、空らんはそのまま「空きなし」を表す
  （クラスがないことを表す欄も同じ空白なので、
  「対象年齢」の欄と突き合わせて見分ける）
- 「対象年齢」は「産休明け～」「１１か月～２歳」「３歳～」のように書かれている
"""

import json
import re
import sys

import pdfplumber

COL_KIND = 0
COL_NAME = 1
COL_CAPACITY = 2
COL_ACCEPT = 3
COL_AGE0 = 4
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

        m = re.search(r"(\d+)月入所審査用空き状況", flat)
        if not m:
            fail("「N月入所審査用空き状況」を読み取れませんでした")
        target = int(m.group(1))

        # 「〇 ＝ 空きあり △ ＝ 若干名の空きあり 空白 ＝ 空きなし」
        legend_line = next((l for l in text.splitlines() if "＝" in l and "空き" in l), None)
        if legend_line is None:
            fail("記号の凡例の行が見つかりません")
        squeezed = "".join(legend_line.split()).translate(ZEN)
        for mark, label in re.findall(rf"([{MARKS}])＝([^{MARKS}空]*空[^{MARKS}]*?)(?=[{MARKS}]＝|空白＝|$)", squeezed):
            legend.append({"mark": mark, "label": label})
        if not legend:
            fail("凡例から記号を取り出せませんでした")
        if "空白＝空きなし" not in squeezed:
            fail("「空白＝空きなし」の説明が見つかりません")

        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith("・") and len(stripped) > 12:
                notes.append(stripped.lstrip("・").strip())

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")
        extracted = tables[0].extract()

        head = [cell(c) for c in extracted[0]]
        if len(head) != COLUMN_COUNT:
            fail(f"列数が{len(head)}です（{COLUMN_COUNT}列のはず）")
        if head[COL_ACCEPT] != "対象年齢":
            fail(f"見出しが想定と違います: {head}")
        for age in range(AGE_COUNT):
            if head[COL_AGE0 + age] != f"{age}歳":
                fail(f"年齢の見出しが想定と違います: {head}")

        kind_carry = ""
        for values in (list(map(cell, r)) for r in extracted[1:]):
            name = values[COL_NAME]
            if not name:
                continue
            if values[COL_KIND]:
                kind_carry = values[COL_KIND]
            if not kind_carry:
                fail(f"{name}: 区分が分かりません")

            marks = []
            for age in range(AGE_COUNT):
                value = values[COL_AGE0 + age]
                if not value:
                    blanks += 1
                    marks.append("")
                    continue
                if value not in MARKS:
                    fail(f"{name}: {age}歳が想定の記号ではありません（「{value}」）")
                marks.append(value)
                mark_counts[value] = mark_counts.get(value, 0) + 1

            rows.append(
                {
                    "kind": kind_carry,
                    "name": name,
                    "capacity": values[COL_CAPACITY],
                    "acceptAge": values[COL_ACCEPT],
                    "marks": marks,
                }
            )

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
