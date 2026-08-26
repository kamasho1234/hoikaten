"""
ひたちなか市の「保育所(園)別受け入れ見込み状況一覧表」PDFから表を抜き出す

実行: python scripts/hitachinaka-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-hitachinaka-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに表が2つ。1つ目が受入状況、2つ目はクラスと生年月日の対応表
- 受入状況の表は10列（施設名／定員／0歳児クラスの受入可能月齢／0歳児〜5歳児／計）で、
  見出しは2段
- いちばん下に「ひたちなか市内 合計」の行があるので検算に使う。
  **その行の「受入可能月齢」の欄には「産休明けとは生後8週間経過後です。」という
  注記が入る**ので、数として読まない
- 各行にも「計」の欄があるので、年齢ごとの合計と突き合わせられる
- 空らんは、そのクラスがない施設のもの（小規模保育など）
"""

import json
import re
import sys

import pdfplumber

COL_NAME = 0
COL_CAPACITY = 1
COL_ACCEPT = 2
COL_AGE0 = 3
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


def number(value, label):
    text = value.replace(",", "")
    if not re.fullmatch(r"\d+", text):
        fail(f"{label}: 数字ではありません（「{value}」）")
    return int(text)


def extract(path):
    notes = []
    rows = []
    totals = None

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"【令和(\d+)年(\d+)月(\d+)日時点】", flat)
        if not m:
            fail("「【令和N年M月D日時点】」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"令和(\d+)年度(\d+)月入所", flat)
        if not m:
            fail("「令和N年度M月入所」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        for line in text.splitlines():
            stripped = line.strip()
            if re.match(r"^\d[.．]", stripped) and len(stripped) > 12:
                notes.append(re.sub(r"^\d[.．]", "", stripped).strip())

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")

        main = None
        for table in tables:
            head = [cell(c) for c in table.extract()[0]]
            if len(head) == COLUMN_COUNT and "市内施設名" in head[COL_NAME]:
                main = table
                break
        if main is None:
            fail("受入状況の表が見つかりません")

        extracted = main.extract()
        second = [cell(c) for c in extracted[1]]
        for age in range(AGE_COUNT):
            if second[COL_AGE0 + age] != f"{age}歳児":
                fail(f"年齢の見出しが想定と違います: {second}")
        if not second[COL_TOTAL].startswith("計"):
            fail(f"「計」の見出しが見つかりません: {second}")

        for values in (list(map(cell, r)) for r in extracted[2:]):
            name = values[COL_NAME]
            if not name:
                continue

            counts = []
            for age in range(AGE_COUNT):
                value = values[COL_AGE0 + age]
                if value == "":
                    counts.append(None)
                    continue
                counts.append(number(value, f"{name} {age}歳児"))

            total = number(values[COL_TOTAL], f"{name} 計")
            if sum(c for c in counts if c is not None) != total:
                fail(f"{name}: 年齢ごとの合計が計と合いません（{counts} / {total}）")

            if name.endswith("合計"):
                totals = counts
                continue
            if all(c is None for c in counts):
                fail(f"{name}: 全ての年齢が空らんです")
            rows.append(
                {
                    "name": name,
                    "capacity": values[COL_CAPACITY],
                    "acceptAge": values[COL_ACCEPT],
                    "counts": counts,
                }
            )

    if not rows:
        fail("施設の行を取り出せませんでした")
    if totals is None:
        fail("「合計」の行が見つかりません")

    return {"asOf": as_of, "target": target, "notes": notes, "totals": totals, "rows": rows}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
