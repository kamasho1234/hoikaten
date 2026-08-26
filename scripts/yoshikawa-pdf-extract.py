"""
吉川市の「保育施設における募集予定人数」PDFから表を抜き出す

実行: python scripts/yoshikawa-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-yoshikawa-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ目に区分ごとの表が3つ（認可保育所／認定こども園／小規模保育施設）。
  区分の名前は「１．認可保育所」のような見出しから取る
- 各表は11列（設置／運営／保育施設名／認可定員／0歳〜5歳／計）で、見出しは2段
- 各行に「計」の欄があるので、年齢ごとの合計と突き合わせられる
- **数字が全角と半角で混ざる**（「０」と「0」）ので、そろえてから読む
- 空らんは、そのクラスがない施設のもの（小規模保育は0〜2歳まで）
- 2ページ目は施設の番号だけの表なので使わない
"""

import json
import re
import sys

import pdfplumber

COL_NAME = 2
COL_CAPACITY = 3
COL_AGE0 = 4
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
    groups = []

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) < 1:
            fail("ページがありません")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"[（(]令和(\d+)年(\d+)月(\d+)日現在[）)]", flat)
        if not m:
            fail("「（令和N年M月D日現在）」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"[（(](\d+)月入所[）)]", flat)
        if not m:
            fail("「（N月入所）」を読み取れませんでした")
        target = int(m.group(1))

        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith("※") and len(stripped) > 10:
                notes.append(stripped.lstrip("※").strip())

        # 「１．認可保育所」のような見出しを座標つきで拾う
        headings = []
        for word in page.extract_words():
            value = cell(word["text"])
            m = re.fullmatch(r"(\d)[.．](.{3,12})", value)
            if m:
                headings.append({"no": int(m.group(1)), "name": m.group(2), "top": word["top"]})
        if not headings:
            fail("「N．認可保育所」のような見出しが見つかりません")
        headings.sort(key=lambda h: h["top"])

        for table in page.find_tables():
            extracted = table.extract()
            head = [cell(c) for c in extracted[0]]
            if len(head) != COLUMN_COUNT or head[COL_NAME] != "保育施設名":
                continue

            # 2段目の見出しに年齢が入る
            second = [cell(c) for c in extracted[1]]
            for age in range(AGE_COUNT):
                if second[COL_AGE0 + age] != f"{age}歳":
                    fail(f"年齢の見出しが想定と違います: {second}")
            if second[COL_TOTAL] != "計":
                fail(f"「計」の見出しが見つかりません: {second}")

            # この表の上にある見出しのうち、いちばん近いものが区分
            above = [h for h in headings if h["top"] < table.bbox[1]]
            if not above:
                fail(f"表（{[round(v) for v in table.bbox]}）に対応する見出しが見つかりません")
            kind = max(above, key=lambda h: h["top"])["name"]

            rows = []
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
                    if not re.fullmatch(r"\d+", value):
                        fail(f"{name}: {age}歳が数字ではありません（「{value}」）")
                    counts.append(int(value))

                total = values[COL_TOTAL]
                if not re.fullmatch(r"\d+", total):
                    fail(f"{name}: 計が数字ではありません（「{total}」）")
                if sum(c for c in counts if c is not None) != int(total):
                    fail(f"{name}: 年齢ごとの合計が計と合いません（{counts} / {total}）")

                if all(c is None for c in counts):
                    fail(f"{name}: 全ての年齢が空らんです")
                rows.append({"kind": kind, "name": name, "counts": counts})

            if rows:
                groups.append({"kind": kind, "rows": rows})

    if not groups:
        fail("施設の行を取り出せませんでした")

    return {"asOf": as_of, "target": target, "notes": notes, "groups": groups}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
