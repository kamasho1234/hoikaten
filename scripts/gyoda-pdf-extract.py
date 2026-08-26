"""
行田市の「保育所等の受入枠の状況」PDFから表を抜き出す

実行: python scripts/gyoda-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-gyoda-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに表が2つ。1つ目が受入枠の状況、2つ目はクラスと生年月日の対応表
- 受入枠の表は8列（区分／施設名／0歳〜5歳）
- 区分（保育所・認定こども園・地域型保育事業所）は縦書きの結合セルで、
  グループの先頭の行にだけ入る
- 記号は ○＝あり、×＝なし。凡例は表の上の行にある
- 空らんは、そのクラスがない施設のもの
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

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日時点", flat)
        if not m:
            fail("「令和N年M月D日時点」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"令和(\d+)年(\d+)月入所", flat)
        if not m:
            fail("「令和N年M月入所」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        # 「表の見方 ： ○…あり ×･･･なし」
        # flat 全体で探すと最後のラベルが表の見出しまで飲み込むので、行を選んでから探す
        legend_line = next((l for l in text.splitlines() if "表の見方" in l), None)
        if legend_line is None:
            fail("「表の見方」の行が見つかりません")
        for mark, label in re.findall(
            rf"([{MARKS}])[…･・]+([^{MARKS}\s]{{1,6}})", "".join(legend_line.split())
        ):
            legend.append({"mark": mark, "label": label})
        if not legend:
            fail("記号の凡例が見つかりません")

        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith("※") and len(stripped) > 10:
                notes.append(stripped.lstrip("※").strip())

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")

        main = None
        for table in tables:
            head = [cell(c) for c in table.extract()[0]]
            if len(head) == COLUMN_COUNT and head[COL_NAME].startswith("施設名"):
                main = table
                break
        if main is None:
            fail("受入枠の表が見つかりません")

        extracted = main.extract()
        head = [cell(c) for c in extracted[0]]
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
                    marks.append(None)
                    continue
                if value not in MARKS:
                    fail(f"{name}: {age}歳が想定の記号ではありません（「{value}」）")
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
