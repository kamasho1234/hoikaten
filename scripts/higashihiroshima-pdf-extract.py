"""
東広島市の「入所保育施設空き状況一覧」PDFから表を抜き出す

実行: python scripts/higashihiroshima-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-higashihiroshima-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・**左右2段組み**（16列＝左8列＋右8列）。
  左が公立、右が私立で、いちばん上の行に「公立」「私立」とだけ書いてある
- 1段は 施設コード／施設名／0歳児〜5歳児 の8列
- 公立が先に終わるので、途中から左8列がまるごと空になる
- 空らんは、そのクラスがない施設のもの（地域型保育など）
- 凡例（【表の見方】）と【年齢表】はページ下部の別の表にある。
  空き状況の表とは重ならないので、記号の数え上げに混ざらない
- 時点が「R88.6時点」のように区切りなしで書かれている（令和8年8月6日）。
  年・月・日の切り方が一意になるかを確かめてから使う
"""

import json
import re
import sys

import pdfplumber

COL_CODE = 0
COL_NAME = 1
COL_AGE0 = 2
AGE_COUNT = 6
BLOCK = COL_AGE0 + AGE_COUNT
COLUMN_COUNT = BLOCK * 2

MARKS = "◎○◯〇△×✕"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def parse_as_of(flat):
    """「R88.6時点」を令和8年8月6日と読む。切り方が2通りある場合は中断する"""
    m = re.search(r"R([\d.]+)時点", flat)
    if not m:
        fail("「R…時点」を読み取れませんでした")
    digits = m.group(1)
    found = []
    # 「8.8.6」のように点が2つあるならそのまま。点が1つなら年と月の間で切る
    parts = digits.split(".")
    if len(parts) == 3:
        found.append(tuple(int(p) for p in parts))
    elif len(parts) == 2:
        head, day = parts
        for cut in range(1, len(head)):
            year, month = head[:cut], head[cut:]
            if 1 <= int(month) <= 12 and 1 <= int(day) <= 31 and 1 <= int(year) <= 99:
                found.append((int(year), int(month), int(day)))
    if len(found) != 1:
        fail(f"時点「R{digits}」の区切りが決められません（候補{len(found)}件）")
    return found[0]


def extract(path):
    rows = []
    legend = []
    notes = []
    mark_counts = {}
    blanks = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        as_of = parse_as_of(flat)

        m = re.search(r"令和(\d+)年度(\d+)月入所", flat)
        if not m:
            fail("「令和N年度M月入所」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        for line in text.splitlines():
            line = line.strip()
            if line.startswith("※") and len(line) > 8:
                notes.append(line.lstrip("※").strip())

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")

        # いちばん大きい表が空き状況、そのほかに【年齢表】と【表の見方】がある
        tables.sort(key=lambda t: (t.bbox[2] - t.bbox[0]) * (t.bbox[3] - t.bbox[1]), reverse=True)
        main = tables[0]
        for other in tables[1:]:
            values = [cell(c) for row in other.extract() for c in row]
            if not any(v.startswith("【表の見方】") for v in values):
                continue
            for text_value in values:
                for mark, label in re.findall(rf"([{MARKS}])：([^{MARKS}]+)", text_value):
                    legend.append({"mark": mark, "label": label.strip()})
        if not legend:
            fail("【表の見方】の凡例が見つかりません")

        extracted = main.extract()
        head_index = None
        for index, row in enumerate(extracted[:4]):
            if cell(row[COL_CODE]) == "施設コード":
                head_index = index
                break
        if head_index is None:
            fail("「施設コード」の見出しが見つかりません")

        head = [cell(c) for c in extracted[head_index]]
        if len(head) != COLUMN_COUNT:
            fail(f"列数が{len(head)}です（{COLUMN_COUNT}列のはず）")
        for side in (0, BLOCK):
            if head[side + COL_CODE] != "施設コード" or head[side + COL_NAME] != "施設名":
                fail(f"見出しが想定と違います: {head}")
            for age in range(AGE_COUNT):
                if head[side + COL_AGE0 + age] != f"{age}歳児":
                    fail(f"年齢の見出しが想定と違います: {head}")

        # 「公立」「私立」は見出しの1つ上の行にある
        kinds = ["", ""]
        if head_index > 0:
            above = [cell(c) for c in extracted[head_index - 1]]
            kinds = [above[COL_CODE], above[BLOCK + COL_CODE]]
        if kinds[0] != "公立" or kinds[1] != "私立":
            fail(f"「公立」「私立」の行が想定と違います: {kinds}")

        for values in (list(map(cell, r)) for r in extracted[head_index + 1 :]):
            for side, kind in ((0, kinds[0]), (BLOCK, kinds[1])):
                code = values[side + COL_CODE]
                name = values[side + COL_NAME]
                if not code and not name:
                    continue
                if not code or not name:
                    fail(f"施設コードか施設名が欠けています（{kind} 「{code}」「{name}」）")

                marks = []
                for age in range(AGE_COUNT):
                    value = values[side + COL_AGE0 + age]
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
                rows.append({"code": code, "name": name, "kind": kind, "marks": marks})

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
