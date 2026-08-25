"""
亀岡市の「入所受入可能状況」PDFから表を抜き出す

実行: python scripts/kameoka-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kameoka-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに表が2つ。1つ目が凡例（記号／受入可能人数）、2つ目が空き状況
- 空き状況の表は 区分／施設名／0歳〜5歳 の8列。区分（公立・私立・小規模保育）は
  縦書きの結合セルで、グループの先頭の行にだけ入る
- **合同学級の施設は年齢の欄が結合されている**（東本梅の1・2歳と3〜5歳など）。
  結合された欄はセルの位置がなくなるので、直前の年齢の記号を引き継いで広げる
- 空らんは、そのクラスがない施設のもの
- 「※満1歳から受入可能」のような施設ごとの但し書きが、空らんの欄に
  縦書きで重ねて印字されている。文字の順序が崩れていて復元できないので取らない
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

# 電話番号のハイフンを拾わないよう、全角の「－」だけを記号として見る
MARKS = "○◯〇△×✕□－"
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

        # 検算用に、ページ全体に印字されている記号の数を数えておく（凡例のぶんも入る）
        text_mark_counts = {}
        for ch in flat:
            if ch in MARKS:
                text_mark_counts[ch] = text_mark_counts.get(ch, 0) + 1

        m = re.search(r"令和(\d+)年度.*?(\d+)月入所希望用", flat)
        if not m:
            fail("「令和N年度…M月入所希望用」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        # 施設ごとの但し書きは文字の順序が崩れるので、文として通っている行だけ拾う
        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith("※") and stripped.endswith("。") and len(stripped) > 10:
                notes.append(stripped.lstrip("※").strip())

        tables = page.find_tables()
        if len(tables) < 2:
            fail(f"表が{len(tables)}個しかありません（2個以上のはず）")

        legend_table = None
        main_table = None
        for table in tables:
            head = [cell(c) for c in table.extract()[0]]
            if head and head[0] == "記号":
                legend_table = table
            elif len(head) == COLUMN_COUNT:
                main_table = table
        if legend_table is None:
            fail("凡例の表が見つかりません")
        if main_table is None:
            fail("空き状況の表が見つかりません")

        marks_row, labels_row = (list(map(cell, r)) for r in legend_table.extract()[:2])
        for mark, label in zip(marks_row[1:], labels_row[1:]):
            if not mark:
                continue
            if mark not in MARKS:
                fail(f"凡例に想定外の記号があります（「{mark}」）")
            legend.append({"mark": mark, "label": label})
        if not legend:
            fail("凡例から記号を取り出せませんでした")

        extracted = main_table.extract()
        head_index = None
        for index, row in enumerate(extracted[:3]):
            if cell(row[COL_AGE0]) == "0歳":
                head_index = index
                break
        if head_index is None:
            fail("「0歳」の見出しが見つかりません")
        head = [cell(c) for c in extracted[head_index]]
        for age in range(AGE_COUNT):
            if head[COL_AGE0 + age] != f"{age}歳":
                fail(f"年齢の見出しが想定と違います: {head}")

        kind_carry = ""
        for index in range(head_index + 1, len(extracted)):
            values = list(map(cell, extracted[index]))
            cells = main_table.rows[index].cells
            name = values[COL_NAME]
            if not name:
                continue
            if values[COL_KIND]:
                kind_carry = values[COL_KIND]
            if not kind_carry:
                fail(f"{name}: 区分が分かりません")

            marks = []
            carried = None
            for age in range(AGE_COUNT):
                column = COL_AGE0 + age
                if cells[column] is None:
                    # 合同学級で欄が結合されている。左どなりの記号をそのまま広げる
                    if carried is None:
                        fail(f"{name}: {age}歳の欄が結合されていますが、元の記号がありません")
                    expanded += 1
                    marks.append(carried)
                    continue
                value = values[column]
                if not value:
                    carried = None
                    blanks += 1
                    marks.append(None)
                    continue
                if value not in MARKS:
                    fail(f"{name}: {age}歳が想定の記号ではありません（「{value}」）")
                carried = value
                marks.append(value)
                mark_counts[value] = mark_counts.get(value, 0) + 1

            if all(m is None for m in marks):
                fail(f"{name}: 全ての年齢が空らんです")
            rows.append({"kind": kind_carry, "name": name, "marks": marks})

    if not rows:
        fail("施設の行を取り出せませんでした")

    return {
        "target": target,
        "legend": legend,
        "notes": notes,
        "markCounts": mark_counts,
        "textMarkCounts": text_mark_counts,
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
