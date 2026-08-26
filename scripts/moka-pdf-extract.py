"""
真岡市の「市内保育施設等受け入れ可能状況」PDFから表を抜き出す

実行: python scripts/moka-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-moka-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに表が2つ。1つ目が受入状況、2つ目はクラスと生年月日の対応表
- 受入状況の表は10列（施設名／区分／0〜5／合計／備考）
- **1施設が2行**。1行目が「受入可能」の人数（クラスごとの受入枠の大きさ）、
  2行目が記号（新規に受け入れられるかどうか）で、区分の欄は空になる
- 記号は 〇＝5人以上、△＝5人未満（ほとんど1人か2人）、×＝受入なし。
  凡例はいちばん上の行にある
- 「受入可能」の人数はクラスの定員にあたるもので、空き人数ではないことに注意
"""

import json
import re
import sys

import pdfplumber

COL_NAME = 0
COL_KIND = 1
COL_AGE0 = 2
AGE_COUNT = 6
COL_TOTAL = COL_AGE0 + AGE_COUNT
COL_REMARK = COL_TOTAL + 1
COLUMN_COUNT = COL_REMARK + 1

ROW_CAPACITY = "受入可能"
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

        m = re.search(r"(\d+)月入所", flat)
        if not m:
            fail("「N月入所」を読み取れませんでした")
        target = int(m.group(1))

        # 「○5人以上 △5人未満（ほとんど1人か2人）」
        legend_line = next((l for l in text.splitlines() if "新規受入可能" in l), None)
        if legend_line is None:
            fail("「新規受入可能」の行が見つかりません")
        squeezed = "".join(legend_line.split()).translate(ZEN)
        for mark, label in re.findall(rf"([{MARKS}])([^{MARKS}]{{2,20}}?)(?=[{MARKS}]|\d+月入所|$)", squeezed):
            legend.append({"mark": mark, "label": label})
        if not legend:
            fail("凡例から記号を取り出せませんでした")

        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith("保育士数") and len(stripped) > 10:
                notes.append(stripped)

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")

        main = None
        for table in tables:
            head = [cell(c) for c in table.extract()[0]]
            if len(head) == COLUMN_COUNT and head[COL_KIND] == "クラス":
                main = table
                break
        if main is None:
            fail("受入状況の表が見つかりません")

        extracted = main.extract()
        head = [cell(c) for c in extracted[0]]
        for age in range(AGE_COUNT):
            if head[COL_AGE0 + age] != str(age):
                fail(f"年齢の見出しが想定と違います: {head}")

        current = None
        for values in (list(map(cell, r)) for r in extracted[1:]):
            name = values[COL_NAME]
            kind = values[COL_KIND]

            if kind == ROW_CAPACITY:
                if not name:
                    fail("施設名が空の行があります")
                capacity = []
                for age in range(AGE_COUNT):
                    value = values[COL_AGE0 + age]
                    if value == "":
                        capacity.append(None)
                        continue
                    if not re.fullmatch(r"\d+", value):
                        fail(f"{name}: {age}歳の受入可能数が数字ではありません（「{value}」）")
                    capacity.append(int(value))
                total = values[COL_TOTAL]
                if not re.fullmatch(r"\d+", total):
                    fail(f"{name}: 合計が数字ではありません（「{total}」）")
                if sum(c for c in capacity if c is not None) != int(total):
                    fail(f"{name}: 受入可能数の合計が合計欄と合いません（{capacity} / {total}）")
                current = {
                    "name": name,
                    "capacity": capacity,
                    "remark": values[COL_REMARK],
                    "marks": None,
                }
                rows.append(current)
                continue

            # 記号の行（区分の欄が空）
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
                    fail(f"{current['name']}: {age}歳が想定の記号ではありません（「{value}」）")
                marks.append(value)
                mark_counts[value] = mark_counts.get(value, 0) + 1
            if all(m is None for m in marks):
                fail(f"{current['name']}: 全ての年齢が空らんです")
            current["marks"] = marks
            current = None

    if not rows:
        fail("施設の行を取り出せませんでした")
    for row in rows:
        if row["marks"] is None:
            fail(f"{row['name']}: 記号の行がありません")

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
