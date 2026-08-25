"""
中津市の「認可保育施設 受入可能枠一覧」PDFから表を抜き出す

実行: python scripts/nakatsu-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-nakatsu-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・10列（番号／施設名／施設類型／空き列／0歳児〜5歳児）
- 見出しが2段（1行目に「空き状況」、2行目に「0歳児」〜「5歳児」）
- いちばん下に「合 計」の行があるので、検算に使う
- 2・3号認定（保育を必要とする枠）だけの数。1号認定は載っていない
- 施設類型は「保育所（公立)」「認定こども園(私立) 幼保連携型」のように
  カッコの全角半角がそろっていない
"""

import json
import re
import sys

import pdfplumber

COL_NO = 0
COL_NAME = 1
COL_KIND = 2
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
    rows = []
    totals = None

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日現在", flat)
        if not m:
            fail("「令和N年M月D日現在」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"【(\d+)月利用調整後】", flat)
        if not m:
            fail("「【N月利用調整後】」を読み取れませんでした")
        target = int(m.group(1))

        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith("♪") and len(stripped) > 10:
                notes.append(stripped.lstrip("♪").strip())

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")
        extracted = tables[0].extract()

        # 見出しは2段。「0歳児」がある行を見つけて年齢の列を決める
        head_index = None
        ages = {}
        for index, row in enumerate(extracted[:3]):
            values = [cell(c) for c in row]
            found = {}
            for column, value in enumerate(values):
                m = re.fullmatch(r"(\d)歳児", value)
                if m:
                    found[int(m.group(1))] = column
            if len(found) == AGE_COUNT:
                head_index = index
                ages = found
                break
        if head_index is None:
            fail("0歳児〜5歳児の見出しが見つかりません")

        for values in (list(map(cell, r)) for r in extracted[head_index + 1 :]):
            name = values[COL_NAME]
            no = values[COL_NO]
            if no.startswith("合計") or no.startswith("合"):
                counts = []
                for age in range(AGE_COUNT):
                    value = values[ages[age]]
                    if not re.fullmatch(r"\d+", value):
                        fail(f"合計の{age}歳児が数字ではありません（「{value}」）")
                    counts.append(int(value))
                totals = counts
                continue
            if not name:
                continue
            if not re.fullmatch(r"\d+", no):
                fail(f"{name}: 番号が数字ではありません（「{no}」）")

            counts = []
            for age in range(AGE_COUNT):
                value = values[ages[age]]
                if value == "":
                    counts.append(None)
                    continue
                if not re.fullmatch(r"\d+", value):
                    fail(f"{name}: {age}歳児が数字ではありません（「{value}」）")
                counts.append(int(value))

            if all(c is None for c in counts):
                fail(f"{name}: 全ての年齢が空らんです")
            rows.append({"no": int(no), "name": name, "kind": values[COL_KIND], "counts": counts})

    if not rows:
        fail("施設の行を取り出せませんでした")
    if totals is None:
        fail("合計の行が見つかりません")

    return {
        "asOf": as_of,
        "target": target,
        "notes": notes,
        "totals": totals,
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
