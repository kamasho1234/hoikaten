"""
印西市の「保育園 空き状況」PDFから表を抜き出す

実行: python scripts/inzai-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-inzai-vacancy.ts から呼ぶ）

## 表の作り
- 2ページ。どちらも11列（区分／園コード／保育園名／区分／0歳児〜5歳児／計）で
  同じ表の続き
- **1施設が2行**（在園児数と空き状況）。空き状況は記号、在園児数は人数
- 区分（公立認可保育園・私立認可保育園・小規模保育事業所など）は縦書きの結合セルで、
  グループの先頭の行にだけ入る
- いちばん下に「合 計」の在園児数の行があるので検算に使う
- 空らんは、そのクラスがない施設のもの
- 施設名が2行に折り返されることがある（「コスモスの丘」＋「ひがし野保育園」）
"""

import json
import re
import sys

import pdfplumber

COL_KIND = 0
COL_CODE = 1
COL_NAME = 2
COL_ROW_KIND = 3
COL_AGE0 = 4
AGE_COUNT = 6
COL_TOTAL = COL_AGE0 + AGE_COUNT
COLUMN_COUNT = COL_TOTAL + 1

ROW_ENROLLED = "在園児数"
ROW_VACANCY = "空き状況"
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
    rows = []
    totals = None
    mark_counts = {}
    blanks = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) < 1:
            fail("ページがありません")

        first = pdf.pages[0]
        text = first.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日現在", flat)
        if not m:
            fail("「令和N年M月D日現在」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"令和(\d+)年(\d+)月入園", flat)
        if not m:
            fail("「令和N年M月入園」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        # 「「○＝4人以上空きあり」 「△＝1～3人の空きあり」 「×＝空きなし」」
        for mark, label in re.findall(rf"「([{MARKS}])＝([^」]+)」", flat):
            legend.append({"mark": mark, "label": label})
        if not legend:
            fail("記号の凡例が見つかりません")

        current = None
        kind_carry = ""
        for page in pdf.pages:
            tables = page.find_tables()
            if len(tables) != 1:
                fail(f"表が{len(tables)}個あるページがあります（1個のはず）")
            extracted = tables[0].extract()

            head = [cell(c) for c in extracted[0]]
            if len(head) != COLUMN_COUNT:
                fail(f"列数が{len(head)}です（{COLUMN_COUNT}列のはず）")
            for age in range(AGE_COUNT):
                if head[COL_AGE0 + age] != f"{age}歳児":
                    fail(f"年齢の見出しが想定と違います: {head}")

            for raw_row in extracted[1:]:
                values = list(map(cell, raw_row))
                row_kind = values[COL_ROW_KIND]
                if row_kind not in (ROW_ENROLLED, ROW_VACANCY):
                    if not any(values):
                        continue
                    fail(f"行の区分が想定と違います（「{row_kind}」）")

                if values[COL_KIND]:
                    kind_carry = values[COL_KIND]

                if row_kind == ROW_ENROLLED:
                    name = "".join(
                        cell(p) for p in str(raw_row[COL_NAME] or "").split("\n") if cell(p)
                    )
                    code = values[COL_CODE]
                    counts = []
                    for age in range(AGE_COUNT):
                        value = values[COL_AGE0 + age]
                        if value == "":
                            counts.append(None)
                            continue
                        if not re.fullmatch(r"[\d,]+", value):
                            fail(f"{name or code}: 在園児数が数字ではありません（「{value}」）")
                        counts.append(int(value.replace(",", "")))

                    if values[COL_KIND].startswith("合計") or (not name and not code):
                        totals = counts
                        current = None
                        continue
                    if not name:
                        fail(f"施設名が空の行があります（コード{code}）")
                    current = {
                        "kind": kind_carry,
                        "code": code,
                        "name": name,
                        "enrolled": counts,
                        "marks": None,
                    }
                    rows.append(current)
                    continue

                # 空き状況の行
                if current is None:
                    continue
                marks = []
                for age in range(AGE_COUNT):
                    value = values[COL_AGE0 + age]
                    if value == "":
                        blanks += 1
                        marks.append(None)
                        continue
                    if value not in MARKS:
                        fail(f"{current['name']}: {age}歳児が想定の記号ではありません（「{value}」）")
                    marks.append(value)
                    mark_counts[value] = mark_counts.get(value, 0) + 1
                if all(m is None for m in marks):
                    fail(f"{current['name']}: 全ての年齢が空らんです")
                current["marks"] = marks
                current = None

    if not rows:
        fail("施設の行を取り出せませんでした")
    if totals is None:
        fail("「合 計」の行が見つかりません")
    for row in rows:
        if row["marks"] is None:
            fail(f"{row['name']}: 空き状況の行がありません")

    return {
        "asOf": as_of,
        "target": target,
        "legend": legend,
        "markCounts": mark_counts,
        "blanks": blanks,
        "totals": totals,
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
