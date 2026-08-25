"""
守山市の「保育所等の空き状況」PDFから表を抜き出す

実行: python scripts/moriyama-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-moriyama-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・12列（施設名／住所／電話番号／定員／時間／入園対象年齢／0歳児〜5歳児）
- 記号は ○＝4名以上、△＝1〜3名程度、×＝空きなし、
  ▲＝保育士の雇用状況や園体制等により変動あり。凡例は表の上の行にある
- **0〜2歳が合同の施設は年齢の欄が結合されている**（家庭的保育など）。
  欄の位置がなくなるので、直前の欄がその年齢の列を覆っていれば記号を広げる。
  覆っていなければ、その年齢の欄そのものがない
- 空らんは、そのクラスがない施設のもの。
  「入園対象年齢」の欄に「３歳児～」「満６か月～(０～２歳児)」と書かれているので、
  空らんの意味はその欄と突き合わせて確かめられる
"""

import json
import re
import sys

import pdfplumber

COL_NAME = 0
COL_ACCEPT = 5
COL_AGE0 = 6
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

MARKS = "○◯〇△×✕▲"
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
    expanded = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"[（(]令和(\d+)年(\d+)月(\d+)日時点[）)]", flat)
        if not m:
            fail("「（令和N年M月D日時点）」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        # 「○・・・4名以上空きあり △・・・1～3名程度空きあり ×・・・空きなし ▲・・・…」
        # flat 全体で探すと最後の記号のラベルが表の見出しまで飲み込むので、行を選んでから探す
        legend_line = next((l for l in text.splitlines() if l.count("・・・") >= 2), None)
        if legend_line is None:
            fail("記号の凡例の行が見つかりません")
        for mark, label in re.findall(
            rf"([{MARKS}])・・・([^{MARKS}]+)", "".join(legend_line.split()).translate(ZEN)
        ):
            legend.append({"mark": mark, "label": label.strip()})
        if not legend:
            fail("記号の凡例が見つかりません")

        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith("「") and len(stripped) > 15:
                notes.append(stripped)
            elif stripped.startswith("入所の可否") and len(stripped) > 15:
                notes.append(stripped)

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")
        extracted = tables[0].extract()

        head = [cell(c) for c in extracted[0]]
        if len(head) != COLUMN_COUNT:
            fail(f"列数が{len(head)}です（{COLUMN_COUNT}列のはず）")
        if head[COL_NAME] != "施設名" or head[COL_ACCEPT] != "入園対象年齢":
            fail(f"見出しが想定と違います: {head}")
        for age in range(AGE_COUNT):
            if head[COL_AGE0 + age] != f"{age}歳児":
                fail(f"年齢の見出しが想定と違います: {head}")

        # 年齢の列の位置を見出しの行から取る（欄が結合されているかの判定に使う）
        head_cells = tables[0].rows[0].cells
        for age in range(AGE_COUNT):
            if head_cells[COL_AGE0 + age] is None:
                fail(f"見出しの{age}歳児の位置が取れません")

        for index in range(1, len(extracted)):
            values = list(map(cell, extracted[index]))
            cells = tables[0].rows[index].cells
            name = values[COL_NAME]
            if not name:
                continue

            marks = []
            carried = None
            carried_box = None
            for age in range(AGE_COUNT):
                column = COL_AGE0 + age
                box = cells[column]
                if box is None:
                    # セルの位置がない理由は2つある。
                    # 左の欄が結合されて伸びている（0〜2歳が合同の家庭的保育など）か、
                    # そもそもその年齢の欄がない（3歳児以降の罫線がない）か。
                    # 直前の欄がこの年齢の列を覆っているかで見分ける
                    head_box = head_cells[column]
                    center = (head_box[0] + head_box[2]) / 2
                    if carried and carried_box and carried_box[0] <= center <= carried_box[2]:
                        expanded += 1
                        marks.append(carried)
                        continue
                    blanks += 1
                    marks.append(None)
                    continue
                value = values[column]
                if not value:
                    carried = None
                    carried_box = None
                    blanks += 1
                    marks.append(None)
                    continue
                if value not in MARKS:
                    fail(f"{name}: {age}歳児が想定の記号ではありません（「{value}」）")
                carried = value
                carried_box = box
                marks.append(value)
                mark_counts[value] = mark_counts.get(value, 0) + 1

            if all(m is None for m in marks):
                fail(f"{name}: 全ての年齢が空らんです")
            rows.append({"name": name, "acceptAge": values[COL_ACCEPT], "marks": marks})

    if not rows:
        fail("施設の行を取り出せませんでした")

    return {
        "asOf": as_of,
        "legend": legend,
        "notes": notes,
        "markCounts": mark_counts,
        "blanks": blanks,
        "expanded": expanded,
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
