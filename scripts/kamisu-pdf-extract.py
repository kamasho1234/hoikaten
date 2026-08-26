"""
神栖市の「保育所等の空き状況表」PDFから表を抜き出す

実行: python scripts/kamisu-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kamisu-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・12列。**「０歳」の見出しが「０」と「歳」の2列に割れている**ので、
  0歳の値は5列目か6列目のどちらかに入る
- 区分（公立／私立認定こども園／私立保育園）は縦書きの結合セル
- 施設名が2行にわたることがある（「(幼保連携型認定こども園)」＋「波崎こども園」）。
  値が全て空の行は次の行の施設名の一部なので、つなげてから括弧書きを落とす
- 記号は ◎＝空き3枠以上、○＝空き1〜2枠、×＝空きなし
- 「受入対象」の列（「６か月～」「２歳～」など）があるので、
  空らんがその園の受けていない年齢かどうかを確かめられる
"""

import json
import re
import sys

import pdfplumber

COL_KIND = 0
COL_NAME = 1
COL_ADDRESS = 2
COL_TEL = 3
COL_ACCEPT = 4
# 「０歳」の見出しが2列に割れているので、0歳だけ2つの列を見る
COL_AGE0_A = 5
COL_AGE0_B = 6
COL_AGE1 = 7
AGE_COUNT = 6
COLUMN_COUNT = 12

MARKS = "◎〇○◯×✕"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def shape_of(mark):
    if not mark:
        return ""
    if mark in "〇○◯":
        return "○"
    if mark in "×✕":
        return "×"
    return mark


def extract(path):
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

        m = re.search(r"《令和(\d+)年(\d+)月(\d+)日時点》", flat)
        if not m:
            fail("「《令和N年M月D日時点》」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"[【]\s*(\d+)月入所の申請の締め切り", flat)
        if not m:
            fail("「【N月入所の申請の締め切り…】」を読み取れませんでした")
        target_month = int(m.group(1))

        # 「◎ →空き３枠以上 ○ →空き１～２枠 × →空きなし」
        # 表の中身まで飲み込まないように、凡例の行だけを見る
        legend_line = next(
            (l for l in text.splitlines() if l.count("→") >= 3), None
        )
        if legend_line is None:
            fail("記号の凡例の行が見つかりません")
        legend = {}
        squeezed = "".join(legend_line.split()).translate(ZEN)
        for mark, label in re.findall(rf"([{MARKS}])→([^{MARKS}]+)", squeezed):
            legend[shape_of(mark)] = label.strip()
        if len(legend) < 3:
            fail(f"記号の凡例が{len(legend)}件しか取れませんでした")

        # 注記は折り返されていることがあるので、句点で終わるまで次の行をつなぐ。
        # 2行つないでも句点で終わらないものは、見出しだけの行なので捨てる
        lines = [l.strip() for l in text.splitlines()]
        for i, line in enumerate(lines):
            if not line.startswith("※") or len(line) <= 12:
                continue
            note = line.lstrip("※").strip()
            for j in range(i + 1, min(i + 3, len(lines))):
                if note.endswith("。") or lines[j].startswith("※"):
                    break
                note += lines[j]
            if note.endswith("。"):
                notes.append(note)

        tables = [t for t in page.find_tables() if len(t.extract()[0]) == COLUMN_COUNT]
        if not tables:
            fail("表が見つかりません")
        extracted = tables[0].extract()

        head_index = next(
            (i for i, r in enumerate(extracted) if cell(r[COL_NAME]) == "施設名"), None
        )
        if head_index is None:
            fail("「施設名」の見出しの行が見つかりません")
        head = [cell(c) for c in extracted[head_index]]
        if head[COL_ACCEPT] != "受入対象":
            fail(f"「受入対象」の列が見つかりません: {head}")
        if head[COL_AGE0_A] != "0" or head[COL_AGE0_B] != "歳":
            fail(f"「０歳」の見出しが2列に割れていません: {head}")
        for age in range(1, AGE_COUNT):
            if head[COL_AGE1 + age - 1] != f"{age}歳":
                fail(f"年齢の見出しが想定と違います: {head}")

        kind_carry = ""
        name_carry = ""
        for raw_row in extracted[head_index + 1 :]:
            values = [cell(c) for c in raw_row]
            name = "".join(str(raw_row[COL_NAME] or "").split())

            if values[COL_KIND]:
                kind_carry = values[COL_KIND]

            marks = []
            for age in range(AGE_COUNT):
                if age == 0:
                    a = shape_of(values[COL_AGE0_A])
                    b = shape_of(values[COL_AGE0_B])
                    if a and b:
                        fail(f"{name}: 0歳の欄が2つとも埋まっています（「{a}」「{b}」）")
                    value = a or b
                else:
                    value = shape_of(values[COL_AGE1 + age - 1])
                marks.append(value)

            if all(v == "" for v in marks):
                # 値が無い行は、次の行の施設名の一部
                if name:
                    name_carry += name
                continue
            if not name and not name_carry:
                continue

            full_name = f"{name_carry}{name}"
            name_carry = ""
            if not kind_carry:
                fail(f"{full_name}: 区分が分かりません")

            counted = []
            for age, value in enumerate(marks):
                if value == "":
                    blanks += 1
                    counted.append(None)
                    continue
                if value not in legend:
                    fail(f"{full_name}: {age}歳が凡例にない記号です（「{value}」）")
                counted.append(value)
                mark_counts[value] = mark_counts.get(value, 0) + 1

            rows.append(
                {
                    "kind": kind_carry,
                    "name": full_name,
                    "address": values[COL_ADDRESS],
                    "accept": values[COL_ACCEPT],
                    "marks": counted,
                }
            )

    if not rows:
        fail("施設の行を取り出せませんでした")

    return {
        "asOf": as_of,
        "targetMonth": target_month,
        "legend": [{"mark": k, "label": v} for k, v in legend.items()],
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
