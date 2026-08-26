"""
ふじみ野市の「市内保育所等における空き状況」PDFから表を抜き出す

実行: python scripts/fujimino-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-fujimino-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ。【市立保育所】【私立保育所】【認定こども園】【地域型保育所】の
  4つの見出しごとに表が分かれている。見出しと表は上から順に対応する
- 地域型保育所の表だけ0〜2歳の3列（他は0〜5歳の6列）
- 空き数は人数。0も書かれるので、**空らんはその年齢のクラスがない**ことを表す
- 表の下に「空き数」の合計行と「保留児童」の行がある。合計行は検算に使う
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
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
    blanks = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日", flat)
        if not m:
            fail("「令和N年M月D日」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        # 数字の区切りが要るので、詰めた文字列ではなく行のまま読む
        lines = [l.strip().translate(ZEN) for l in text.splitlines()]

        def numbers_after(label):
            """「空き数 0 1 0 12 40 32」のように、見出しに続く数を年齢の数だけ拾う"""
            for i, line in enumerate(lines):
                if not line.startswith(label):
                    continue
                rest = line[len(label) :].split()
                # 「保留児童」のように数が次の行に入っていることがある
                if len(rest) < AGE_COUNT and i + 1 < len(lines):
                    rest += lines[i + 1].split()
                if len(rest) < AGE_COUNT:
                    continue
                if all(re.fullmatch(r"\d+", v) for v in rest[:AGE_COUNT]):
                    return [int(v) for v in rest[:AGE_COUNT]]
            return None

        totals = numbers_after("空き数")
        if totals is None:
            fail("「空き数」の合計の行を読み取れませんでした")
        waiting = numbers_after("保留児童")

        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith("※") and len(stripped) > 10:
                notes.append(stripped.lstrip("※").strip())

        # 「【市立保育所】 令和8年9月1日」のように後ろに日付が続くことがある
        headings = [
            m.group(1)
            for m in (re.match(r"^【(.+?)】", l) for l in lines)
            if m is not None
        ]
        if not headings:
            fail("「【区分名】」の見出しが見つかりません")

        tables = [t for t in page.find_tables() if cell(t.extract()[0][0]) == "施設名"]
        if len(tables) != len(headings):
            fail(f"表が{len(tables)}個、見出しが{len(headings)}個で数が合いません")
        tables.sort(key=lambda t: t.bbox[1])

        for heading, table in zip(headings, tables):
            extracted = table.extract()
            head = [cell(c) for c in extracted[0]]
            ages = len(head) - 1
            if ages not in (3, AGE_COUNT):
                fail(f"{heading}: 年齢の列が{ages}個です（3個か{AGE_COUNT}個のはず）")
            for age in range(ages):
                if head[1 + age] != f"{age}歳":
                    fail(f"{heading}: 年齢の見出しが想定と違います（{head}）")

            rows = []
            for values in (list(map(cell, r)) for r in extracted[1:]):
                name = values[0]
                if not name:
                    continue
                counts = []
                for age in range(AGE_COUNT):
                    if age >= ages:
                        # 地域型保育所の表には3〜5歳の欄そのものがない
                        blanks += 1
                        counts.append(None)
                        continue
                    value = values[1 + age]
                    if value == "":
                        blanks += 1
                        counts.append(None)
                        continue
                    if not re.fullmatch(r"\d+", value):
                        fail(f"{name}: {age}歳が数ではありません（「{value}」）")
                    counts.append(int(value))
                if all(c is None for c in counts):
                    fail(f"{name}: 全ての年齢が空らんです")
                rows.append({"name": name, "counts": counts})

            if not rows:
                fail(f"{heading}: 施設の行を取り出せませんでした")
            groups.append({"kind": heading, "rows": rows})

    if not groups:
        fail("施設の行を取り出せませんでした")

    return {
        "asOf": as_of,
        "totals": totals,
        "waiting": waiting,
        "notes": notes,
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
