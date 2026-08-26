"""
北本市の「認可保育施設等空き状況」PDFから表を抜き出す

実行: python scripts/kitamoto-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kitamoto-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・9列（No.／保育施設名／0歳〜5歳／合計）
- 施設に通し番号が振られているので、1から連番かを確かめられる
- 各行に「合計」の欄があるので、年齢ごとの合計と突き合わせられる
- 空らんは、そのクラスがない施設のもの
"""

import json
import re
import sys

import pdfplumber

COL_NO = 0
COL_NAME = 1
COL_AGE0 = 2
AGE_COUNT = 6
COL_TOTAL = COL_AGE0 + AGE_COUNT
COLUMN_COUNT = COL_TOTAL + 1

ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def extract(path):
    notes = []
    rows = []

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

        m = re.search(r"令和(\d+)年(\d+)月入所向け", flat)
        if not m:
            fail("「令和N年M月入所向け」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        for line in text.splitlines():
            stripped = line.strip()
            if stripped.endswith("空き状況です。") and len(stripped) > 12:
                notes.append(stripped)

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")
        extracted = tables[0].extract()

        head = [cell(c) for c in extracted[0]]
        if len(head) != COLUMN_COUNT:
            fail(f"列数が{len(head)}です（{COLUMN_COUNT}列のはず）")
        if head[COL_NAME] != "保育施設名":
            fail(f"見出しが想定と違います: {head}")
        for age in range(AGE_COUNT):
            if head[COL_AGE0 + age] != f"{age}歳":
                fail(f"年齢の見出しが想定と違います: {head}")

        for values in (list(map(cell, r)) for r in extracted[1:]):
            name = values[COL_NAME]
            no = values[COL_NO]
            if not name:
                continue
            if not re.fullmatch(r"\d+", no):
                fail(f"{name}: 番号が数字ではありません（「{no}」）")

            counts = []
            for age in range(AGE_COUNT):
                value = values[COL_AGE0 + age]
                if value == "":
                    counts.append(None)
                    continue
                if not re.fullmatch(r"\d+", value):
                    fail(f"{name}: {age}歳が数字ではありません（「{value}」）")
                counts.append(int(value))

            total = values[COL_TOTAL]
            if not re.fullmatch(r"\d+", total):
                fail(f"{name}: 合計が数字ではありません（「{total}」）")
            if sum(c for c in counts if c is not None) != int(total):
                fail(f"{name}: 年齢ごとの合計が「合計」の欄と合いません（{counts} / {total}）")

            if all(c is None for c in counts):
                fail(f"{name}: 全ての年齢が空らんです")
            rows.append({"no": int(no), "name": name, "counts": counts})

    if not rows:
        fail("施設の行を取り出せませんでした")

    return {"asOf": as_of, "target": target, "notes": notes, "rows": rows}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
