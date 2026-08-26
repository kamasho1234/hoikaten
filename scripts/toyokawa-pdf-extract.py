"""
豊川市の「保育施設途中入所空き状況表」PDFから表を抜き出す

実行: python scripts/toyokawa-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-toyokawa-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・10列（区分／保育施設名／小学校区／設置・経営主体／0歳児〜5歳児）
- 区分（保育所・認定こども園・小規模保育事業所・事業所内保育事業所）は
  縦書きの結合セルで、**縦書きのせいで文字の並びが崩れる**
  （「事業所内保育事業所」が「育事業所事業所内保」になる）ので、
  分かっている区分名と文字の集合で照合する
- 記号は「○空きあり」だけが凡例にある。「-」は空きなし
- **空きの記号ではなく「※１」だけが入っている欄がある**（東上・萩の0歳児）。
  ※１は給食についての注記で、空きの有無は書かれていないので、印のまま持つ
- 0〜2歳しか受け入れない施設は3〜5歳の欄がそもそも無い（セルが空になる）
- 施設名は字の間が空いている（「国 府」）ので詰める
- 設置・経営主体の「〃」は上の行の繰り返し
"""

import json
import re
import sys

import pdfplumber

COL_KIND = 0
COL_NAME = 1
COL_SCHOOL = 2
COL_OWNER = 3
COL_AGE0 = 4
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

KNOWN_KINDS = ("保育所", "認定こども園", "小規模保育事業所", "事業所内保育事業所")
OPEN_MARKS = "○◯〇"
# ハイフンは文字クラスで範囲と解釈されるので末尾に置く
CLOSED_MARKS = "－―—-"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return None
    return "".join(str(s).split()).translate(ZEN)


def extract(path):
    notes = []
    rows = []
    blanks = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"[（(](\d+)月(\d+)日現在[）)]", flat)
        if not m:
            fail("「（M月D日現在）」を読み取れませんでした")
        as_of_md = (int(m.group(1)), int(m.group(2)))

        m = re.search(r"令和(\d+)年度保育施設途中入所空き状況表", flat)
        if not m:
            fail("「令和N年度保育施設途中入所空き状況表」を読み取れませんでした")
        fiscal = int(m.group(1))

        m = re.search(rf"([{OPEN_MARKS}])空きあり", flat)
        if not m:
            fail("「○空きあり」の凡例が見つかりません")
        open_mark = m.group(1)

        # 注記は「①」「※1」で始まるが、1つの注記が2行に折り返されていることがある。
        # 句点で終わるまで次の行をつなぐ
        lines = [l.strip() for l in text.splitlines()]
        for i, line in enumerate(lines):
            if not re.match(r"^[①-⑨※]", line) or len(line) <= 8:
                continue
            note = line
            j = i + 1
            while not note.endswith("。") and j < len(lines) and not re.match(r"^[①-⑨※]", lines[j]):
                note += lines[j]
                j += 1
            notes.append(note)

        # 記号の数を、表とは別に文字から数えて検算に使う。
        # 凡例の「○空きあり」の分は数に入れない
        open_in_text = sum(1 for c in page.chars if c["text"] in OPEN_MARKS) - 1
        closed_in_text = sum(1 for c in page.chars if c["text"] in CLOSED_MARKS)

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")
        extracted = tables[0].extract()

        head = [cell(c) or "" for c in extracted[0]]
        if len(head) != COLUMN_COUNT:
            fail(f"列数が{len(head)}です（{COLUMN_COUNT}列のはず）")
        if head[COL_NAME] != "保育施設名" or head[COL_SCHOOL] != "小学校区":
            fail(f"見出しが想定と違います: {head}")
        for age in range(AGE_COUNT):
            if head[COL_AGE0 + age] != f"{age}歳児":
                fail(f"年齢の見出しが想定と違います: {head}")

        kind_carry = ""
        owner_carry = ""
        for values in (list(map(cell, r)) for r in extracted[1:]):
            name = values[COL_NAME]
            if not name:
                continue

            raw_kind = values[COL_KIND]
            if raw_kind:
                # 縦書きで文字の並びが崩れるので、文字の集合で照合して長いものを採る
                matched = [k for k in KNOWN_KINDS if set(k) <= set(raw_kind)]
                if not matched:
                    fail(f"{name}: 区分「{raw_kind}」が分かりません")
                kind_carry = max(matched, key=len)
            if not kind_carry:
                fail(f"{name}: 区分が分かりません")

            owner = values[COL_OWNER]
            if owner and owner not in ("〃", "″"):
                owner_carry = owner
            if not owner_carry:
                fail(f"{name}: 設置・経営主体が分かりません")

            marks = []
            for age in range(AGE_COUNT):
                value = values[COL_AGE0 + age]
                if value is None or value == "":
                    # 0〜2歳しか受け入れない施設は3〜5歳の欄がない
                    blanks += 1
                    marks.append(None)
                    continue
                if value in OPEN_MARKS:
                    marks.append(open_mark)
                elif value in CLOSED_MARKS:
                    marks.append("-")
                elif re.fullmatch(r"※\d+", value):
                    # 空きの記号ではなく注の番号だけが入っている欄がある
                    marks.append(value)
                else:
                    fail(f"{name}: {age}歳児が想定の記号ではありません（「{value}」）")

            if all(m is None for m in marks):
                fail(f"{name}: 全ての年齢が空らんです")
            rows.append(
                {
                    "kind": kind_carry,
                    "name": name,
                    "school": values[COL_SCHOOL],
                    "owner": owner_carry,
                    "marks": marks,
                }
            )

    if not rows:
        fail("施設の行を取り出せませんでした")

    return {
        "fiscal": fiscal,
        "asOf": as_of_md,
        "openMark": open_mark,
        "notes": notes,
        "openInText": open_in_text,
        "closedInText": closed_in_text,
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
