"""
尼崎市の「保育施設等受入状況」PDFから表を抜き出す

実行: python scripts/amagasaki-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-amagasaki-vacancy.ts から呼ぶ）

## 表の作り
- 4ページ・11列（地区／類型／設置／保育施設名／所在地／0歳〜5歳）
- 地区（中央・小田・大庄・立花・武庫・園田）は結合セルで先頭の行にだけ入る
- 記号は「×」0人、「△」1〜3人、「〇」4人以上。空らんはその年齢の受け入れなし
  （0人なら「×」と書かれるので、空らんは0人ではない）
- **本園と分園の施設名が1つのセルに2行で入っている**ことがある
  （「尼崎ひまわり保育園／〃 分園」）。次の行の施設名がNoneになるので、
  セルの中の改行で分けて順に割り当てる
- 施設名は字の間が空いている（「北 難 波 保 育 所」）ので詰める
"""

import json
import re
import sys

import pdfplumber

COL_AREA = 0
COL_TYPE = 1
COL_OWNER = 2
COL_NAME = 3
COL_ADDRESS = 4
COL_AGE0 = 5
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

MARKS = "〇○◯△×✕"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def shape_of(mark):
    """凡例と表で「○」(U+25CB)と「〇」(U+3007)が混ざるのでそろえる"""
    # 空文字は「in」がどの文字列にも当たってしまうので先に返す
    if not mark:
        return ""
    if mark in "〇○◯":
        return "○"
    if mark in "×✕✖":
        return "×"
    return mark


def extract(path):
    notes = []
    rows = []
    mark_counts = {}
    marks_in_text = {}
    blanks = 0
    legend = {}

    with pdfplumber.open(path) as pdf:
        first = pdf.pages[0]
        flat = "".join((first.extract_text() or "").split()).translate(ZEN)

        m = re.search(r"令和(\d+)年\(\d+年\)(\d+)月(\d+)日保育施設等受入状況", flat)
        if not m:
            fail("「令和N年(YYYY年)M月D日保育施設等受入状況」を読み取れませんでした")
        fiscal_reiwa, target_month, target_day = (
            int(m.group(1)),
            int(m.group(2)),
            int(m.group(3)),
        )

        # 「受入可能人数が０人の場合「×」、１～３人の場合「△」、４人以上の場合は「○」」
        m = re.search(
            rf"受入可能人数が(\d+)人の場合「([{MARKS}])」、(\d+)～(\d+)人の場合「([{MARKS}])」、"
            rf"(\d+)人以上の場合は「([{MARKS}])」",
            flat,
        )
        if not m:
            fail("記号の凡例を読み取れませんでした")
        legend = {
            shape_of(m.group(2)): f"{m.group(1)}人",
            shape_of(m.group(5)): f"{m.group(3)}〜{m.group(4)}人",
            shape_of(m.group(7)): f"{m.group(6)}人以上",
        }

        for line in (first.extract_text() or "").splitlines():
            stripped = line.strip()
            if stripped.startswith("・") and len(stripped) > 10:
                notes.append(stripped.lstrip("・").strip())

        last_full_name = ""
        for page in pdf.pages:
            tables = [t for t in page.find_tables() if len(t.extract()[0]) == COLUMN_COUNT]
            if not tables:
                fail(f"{page.page_number}ページ: 表が見つかりません")

            # 検算のために、表の中にある記号だけを文字から数える。
            # ページの全体で数えると凡例の記号まで入ってしまう
            for table in tables:
                for char in page.crop(table.bbox).chars:
                    if char["text"] in MARKS:
                        key = shape_of(char["text"])
                        marks_in_text[key] = marks_in_text.get(key, 0) + 1

            for table in tables:
                extracted = table.extract()
                head = [cell(c) for c in extracted[0]]
                if head[COL_NAME] == "保育施設名":
                    if head[COL_AREA] != "地区" or head[COL_TYPE] != "類型":
                        fail(f"見出しが想定と違います: {head}")
                    for age in range(AGE_COUNT):
                        if head[COL_AGE0 + age] != f"{age}歳":
                            fail(f"年齢の見出しが想定と違います: {head}")
                    body = extracted[1:]
                else:
                    body = extracted

                area_carry = ""
                pending_names = []
                for raw_row in body:
                    values = [cell(c) for c in raw_row]
                    raw_name = raw_row[COL_NAME]
                    if raw_name:
                        # 本園と分園が1つのセルに入っていることがある
                        pending_names = [
                            "".join(part.split())
                            for part in str(raw_name).split("\n")
                            if part.strip()
                        ]
                    if not pending_names:
                        continue
                    name = pending_names.pop(0)
                    if "〃" in name:
                        if not last_full_name:
                            fail(f"「〃」の前に施設名がありません（「{name}」）")
                        name = name.replace("〃", last_full_name)
                    else:
                        last_full_name = name

                    if values[COL_AREA]:
                        area_carry = values[COL_AREA]
                    if not area_carry:
                        fail(f"{name}: 地区が分かりません")
                    if not values[COL_TYPE] or not values[COL_OWNER]:
                        fail(f"{name}: 類型か設置が空です")

                    marks = []
                    for age in range(AGE_COUNT):
                        value = shape_of(values[COL_AGE0 + age])
                        if value == "":
                            blanks += 1
                            marks.append(None)
                            continue
                        if value not in legend:
                            fail(f"{name}: {age}歳が凡例にない記号です（「{value}」）")
                        marks.append(value)
                        mark_counts[value] = mark_counts.get(value, 0) + 1

                    if all(m is None for m in marks):
                        fail(f"{name}: 全ての年齢が空らんです")
                    rows.append(
                        {
                            "area": area_carry,
                            "type": values[COL_TYPE],
                            "owner": values[COL_OWNER],
                            "name": name,
                            "address": values[COL_ADDRESS],
                            "marks": marks,
                        }
                    )

    if not rows:
        fail("施設の行を取り出せませんでした")

    return {
        "target": (fiscal_reiwa, target_month, target_day),
        "legend": [{"mark": k, "label": v} for k, v in legend.items()],
        "notes": notes,
        "markCounts": mark_counts,
        "marksInText": marks_in_text,
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
