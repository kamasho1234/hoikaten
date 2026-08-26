"""
蕨市の「保育園の空き状況」PDFから表を抜き出す

実行: python scripts/warabi-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-warabi-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・表が2つ。「認可保育園」（0〜5歳の6列）と「小規模保育園」（0〜2歳の3列）
- 表の左上のセルがそのまま区分の名前になっている
- 数字は空き人数。「×」は空き0人（注記に明記されている）
- 空らんはその年齢のクラスがない園のもの
  （0人なら「×」と書かれるので、空らんは0人ではない）
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
CLOSED_MARKS = "×✕✖"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def extract(path):
    notes = []
    groups = []
    closed = 0
    blanks = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月の利用調整を行った後の保育園の空き状況", flat)
        if not m:
            fail("「令和N年M月の利用調整を行った後の保育園の空き状況」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        m = re.search(r"[（(]令和(\d+)年(\d+)月(\d+)日時点[）)]", flat)
        if not m:
            fail("「（令和N年M月D日時点）」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        # 「※表の中の数字は、空き人数を表しています。「×」は空き人数が０人です。」
        if not re.search(r"表の中の数字は、空き人数を表しています", flat):
            fail("「表の中の数字は、空き人数を表しています」の注記が見つかりません")
        m = re.search(rf"「([{CLOSED_MARKS}])」は空き人数が(\d+)人です", flat)
        if not m:
            fail("「「×」は空き人数が０人です」の注記が見つかりません")
        closed_mark = m.group(1)
        if int(m.group(2)) != 0:
            fail(f"「{closed_mark}」が0人ではありません（{m.group(2)}人）")

        lines = [l.strip() for l in text.splitlines()]
        for i, line in enumerate(lines):
            if not line.startswith("※") or len(line) <= 8:
                continue
            note = line.lstrip("※").strip()
            j = i + 1
            while not note.endswith("。") and j < len(lines) and not lines[j].startswith("※"):
                note += lines[j]
                j += 1
            notes.append(note)

        for table in page.find_tables():
            extracted = table.extract()
            head = [cell(c) for c in extracted[0]]
            kind = head[0]
            if not kind:
                fail(f"区分の名前が空です（{head}）")
            ages = len(head) - 1
            if ages not in (3, AGE_COUNT):
                fail(f"{kind}: 年齢の列が{ages}個です（3個か{AGE_COUNT}個のはず）")
            for age in range(ages):
                if head[1 + age] != f"{age}歳児":
                    fail(f"{kind}: 年齢の見出しが想定と違います（{head}）")

            rows = []
            for values in (list(map(cell, r)) for r in extracted[1:]):
                name = values[0]
                if not name:
                    continue
                counts = []
                for age in range(AGE_COUNT):
                    if age >= ages:
                        # 小規模保育園の表には3〜5歳の欄そのものがない
                        blanks += 1
                        counts.append(None)
                        continue
                    value = values[1 + age]
                    if value == "":
                        blanks += 1
                        counts.append(None)
                        continue
                    if value in CLOSED_MARKS:
                        closed += 1
                        counts.append(0)
                        continue
                    if not re.fullmatch(r"\d+", value):
                        fail(f"{name}: {age}歳児が数でも「{closed_mark}」でもありません（「{value}」）")
                    counts.append(int(value))
                if all(c is None for c in counts):
                    fail(f"{name}: 全ての年齢が空らんです")
                rows.append({"name": name, "counts": counts})

            if not rows:
                fail(f"{kind}: 施設の行を取り出せませんでした")
            groups.append({"kind": kind, "rows": rows})

    if not groups:
        fail("施設の行を取り出せませんでした")

    return {
        "target": target,
        "asOf": as_of,
        "closedMark": closed_mark,
        "notes": notes,
        "closed": closed,
        "blanks": blanks,
        "groups": groups,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
