"""
知多市の「保育所等空き状況」PDFと「保育所等入所案内」PDFから表を抜き出す

実行: python scripts/chita-pdf-extract.py <空き状況PDF> <入所案内PDF>
出力: 標準出力にJSON（fetch-chita-vacancy.ts から呼ぶ）

## 空き状況PDFの作り
- 1ページ・9列（公私／施設種別／園名／0歳児〜5歳児）
- 「公私」と「施設種別」は結合セルで、変わるときだけ値が入る
- 記号は「空きあり○」「空き無し×」の2つだけ
- 空らんはその年齢のクラスがない園のもの（0歳児を受けない園、3歳未満までの園）

## 入所案内PDFを一緒に読む理由
空き状況PDFには空らんの意味が書かれていない。入所案内の施設一覧には
「保育年齢」（「1～5」「5か月～2」など）があるので、
**空らんがその園の受けていない年齢かどうか**を確かめるために使う。
一覧の表は列がそろっていないので、値の形（「N～M」「Nか月～M」）で列を見つける。
"""

import json
import re
import sys

import pdfplumber

COL_PUBLIC = 0
COL_KIND = 1
COL_NAME = 2
COL_AGE0 = 3
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

OPEN_MARKS = "○◯〇"
CLOSED_MARKS = "×✕✖"
AGE_RANGE = re.compile(r"^(\d+)(か月|ヶ月|カ月)?[～〜~](\d+)$")
ZEN = str.maketrans("０１２３４５６７８９ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ",
                    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def extract_vacancy(path):
    notes = []
    rows = []
    mark_counts = {}
    blanks = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"空き状況PDFのページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日現在", flat)
        if not m:
            fail("「令和N年M月D日現在」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"令和(\d+)年度保育所等空き状況", flat)
        if not m:
            fail("「令和N年度保育所等空き状況」を読み取れませんでした")
        fiscal = int(m.group(1))

        m = re.search(rf"空きあり「([{OPEN_MARKS}])」空き無し「([{CLOSED_MARKS}])」", flat)
        if not m:
            fail("「空きあり「○」 空き無し「×」」の凡例が見つかりません")
        open_mark, closed_mark = m.group(1), m.group(2)

        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith("※") and len(stripped) > 8:
                notes.append(stripped)

        tables = [t for t in page.find_tables() if len(t.extract()[0]) == COLUMN_COUNT]
        if not tables:
            fail("空き状況の表が見つかりません")
        extracted = tables[0].extract()

        head_index = next(
            (i for i, r in enumerate(extracted) if cell(r[COL_NAME]) == "園名"), None
        )
        if head_index is None:
            fail("「園名」の見出しの行が見つかりません")
        head = [cell(c) for c in extracted[head_index]]
        if head[COL_PUBLIC] != "公私" or head[COL_KIND] != "施設種別":
            fail(f"見出しが想定と違います: {head}")
        for age in range(AGE_COUNT):
            if head[COL_AGE0 + age] != f"{age}歳児":
                fail(f"年齢の見出しが想定と違います: {head}")

        public_carry = ""
        kind_carry = ""
        for values in (list(map(cell, r)) for r in extracted[head_index + 1 :]):
            name = values[COL_NAME]
            if not name:
                continue
            if values[COL_PUBLIC]:
                public_carry = values[COL_PUBLIC]
            if values[COL_KIND]:
                kind_carry = values[COL_KIND]
            if not public_carry or not kind_carry:
                fail(f"{name}: 公私か施設種別が分かりません")

            marks = []
            for age in range(AGE_COUNT):
                value = values[COL_AGE0 + age]
                if value == "":
                    blanks += 1
                    marks.append(None)
                    continue
                if value in OPEN_MARKS:
                    marks.append(open_mark)
                elif value in CLOSED_MARKS:
                    marks.append(closed_mark)
                else:
                    fail(f"{name}: {age}歳児が想定の記号ではありません（「{value}」）")
                mark_counts[marks[-1]] = mark_counts.get(marks[-1], 0) + 1

            if all(m is None for m in marks):
                fail(f"{name}: 全ての年齢が空らんです")
            rows.append(
                {
                    "public": public_carry,
                    "kind": kind_carry,
                    "name": name,
                    "marks": marks,
                }
            )

    if not rows:
        fail("施設の行を取り出せませんでした")

    return {
        "fiscal": fiscal,
        "asOf": as_of,
        "openMark": open_mark,
        "closedMark": closed_mark,
        "notes": notes,
        "markCounts": mark_counts,
        "blanks": blanks,
        "rows": rows,
    }


def extract_guide(path):
    """入所案内PDFの施設一覧から、施設名と保育年齢を拾う"""
    found = []
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            for table in page.find_tables():
                for row in table.extract():
                    cells = [cell(c) for c in row]
                    index = next(
                        (i for i, c in enumerate(cells) if AGE_RANGE.match(c)), None
                    )
                    if index is None:
                        continue
                    # 保育年齢より前で、電話番号も数字も入っていない最後のセルが施設名
                    names = [
                        c
                        for c in cells[:index]
                        if c and "☎" not in c and not re.search(r"\d", c)
                    ]
                    if not names:
                        continue
                    m = AGE_RANGE.match(cells[index])
                    start = 0 if m.group(2) else int(m.group(1))
                    end = int(m.group(3))
                    found.append({"name": names[-1], "start": start, "end": end})
    if not found:
        fail("入所案内PDFから施設一覧を読み取れませんでした")
    return found


def main():
    paths = sys.argv[1:]
    if len(paths) != 2:
        fail("空き状況PDFと入所案内PDFのパスを指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    result = extract_vacancy(paths[0])
    result["guide"] = extract_guide(paths[1])
    json.dump(result, sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
