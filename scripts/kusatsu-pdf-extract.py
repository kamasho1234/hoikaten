"""
草津市の「認可保育施設等の空き状況」PDFから表を抜き出す

実行: python scripts/kusatsu-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kusatsu-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに表が2つ。1つ目が注意事項と凡例、2つ目が空き状況
- 空き状況の表は12列（区分／施設名／定員／0歳児〜5歳児／在籍児童数／受入年齢／備考）
- 区分（公立―保育所、公立―こども園、私立―保育園など）は縦書きの結合セルで、
  グループの先頭の行にだけ入る
- **区分ごとに「公立保育所計」のような小計の行がある**。施設ではないので取り込まず、
  定員と在籍児童数の検算に使う
- 空らんは、そのクラスがない施設のもの（3歳児以上のこども園など）
- 分園や家庭的保育の年齢の欄には「⇒緑波くるみこども園」「→あさひこども園」のように
  進級先が書かれていることがある（矢印は「⇒」と「→」が混ざる）。
  その欄は空らんとして扱い、文は別に返す
- 記号は「〇」(U+3007) と「○」(U+25CB) が混ざっているので、呼び出し側でそろえる
"""

import json
import re
import sys

import pdfplumber

COL_KIND = 0
COL_NAME = 1
COL_CAPACITY = 2
COL_AGE0 = 3
AGE_COUNT = 6
COL_ENROLLED = COL_AGE0 + AGE_COUNT
COL_ACCEPT = COL_ENROLLED + 1
COLUMN_COUNT = COL_ACCEPT + 2

MARKS = "◎○◯〇△×✕□☐"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def number(value, label):
    text = value.replace(",", "")
    if not re.fullmatch(r"\d+", text):
        fail(f"{label}: 数字ではありません（「{value}」）")
    return int(text)


def extract(path):
    legend = []
    notes = []
    rows = []
    subtotals = []
    transfers = []
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

        m = re.search(r"[（(](\d+)月入所調整後[）)]", flat)
        if not m:
            fail("「（N月入所調整後）」を読み取れませんでした")
        target = int(m.group(1))

        tables = page.find_tables()
        if len(tables) < 2:
            fail(f"表が{len(tables)}個しかありません（2個以上のはず）")

        legend_table = None
        main_table = None
        for table in tables:
            head = [cell(c) for c in table.extract()[0]]
            if len(head) == COLUMN_COUNT and head[COL_KIND] == "区分":
                main_table = table
            elif any("空き状況の見方" in v for v in head):
                legend_table = table
        if legend_table is None:
            fail("凡例の表が見つかりません")
        if main_table is None:
            fail("空き状況の表が見つかりません")

        for value in legend_table.extract()[0]:
            value = cell(value)
            if "空き状況の見方" not in value:
                if value.startswith("【申込にあたっての注意事項】"):
                    for line in str(value).split("\n"):
                        line = line.strip()
                        if line.startswith("※") and len(line) > 10:
                            notes.append(line.lstrip("※").strip())
                continue
            for mark, label in re.findall(rf"([{MARKS}])：([^{MARKS}】]+)", value):
                legend.append({"mark": mark, "label": label.strip()})
        if not legend:
            fail("凡例から記号を取り出せませんでした")

        # 注意事項は結合された1つのセルに改行で入っている
        if not notes:
            for value in legend_table.extract()[0]:
                for line in str(value or "").split("\n"):
                    line = line.strip()
                    if line.startswith("※") and len(line) > 10:
                        notes.append(line.lstrip("※").strip())

        extracted = main_table.extract()
        head = [cell(c) for c in extracted[0]]
        if head[COL_NAME] != "認可保育施設名" or head[COL_CAPACITY] != "定員":
            fail(f"見出しが想定と違います: {head}")
        for age in range(AGE_COUNT):
            if head[COL_AGE0 + age] != f"{age}歳児":
                fail(f"年齢の見出しが想定と違います: {head}")

        kind_carry = ""
        for values in (list(map(cell, r)) for r in extracted[1:]):
            name = values[COL_NAME]
            if not name:
                continue
            if values[COL_KIND]:
                kind_carry = values[COL_KIND]

            # 「公立保育所計」「公立＋私立＋小規模＋家庭的合計」などの小計行
            if name.endswith("計"):
                subtotals.append(
                    {
                        "name": name,
                        "capacity": number(values[COL_CAPACITY], name),
                        "enrolled": number(values[COL_ENROLLED], name),
                    }
                )
                continue

            if not kind_carry:
                fail(f"{name}: 区分が分かりません")

            marks = []
            for age in range(AGE_COUNT):
                value = values[COL_AGE0 + age]
                if not value:
                    blanks += 1
                    marks.append(None)
                    continue
                if value not in MARKS:
                    # 分園には「⇒緑波くるみこども園」のように進級先が書かれている
                    if value[0] not in "⇒→":
                        fail(f"{name}: {age}歳児が想定の記号ではありません（「{value}」）")
                    transfers.append(f"{name}の{age}歳児以降は{value.lstrip('⇒→')}")
                    blanks += 1
                    marks.append(None)
                    continue
                marks.append(value)
                mark_counts[value] = mark_counts.get(value, 0) + 1

            if all(m is None for m in marks):
                fail(f"{name}: 全ての年齢が空らんです")
            rows.append(
                {
                    "kind": kind_carry,
                    "name": name,
                    "capacity": number(values[COL_CAPACITY], name),
                    "enrolled": number(values[COL_ENROLLED], name),
                    "acceptAge": values[COL_ACCEPT],
                    "marks": marks,
                }
            )

    if not rows:
        fail("施設の行を取り出せませんでした")
    if not subtotals:
        fail("小計の行が見つかりません")

    return {
        "asOf": as_of,
        "target": target,
        "legend": legend,
        "notes": notes,
        "markCounts": mark_counts,
        "blanks": blanks,
        "subtotals": subtotals,
        "transfers": transfers,
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
