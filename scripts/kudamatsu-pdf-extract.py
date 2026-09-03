"""
下松市の「市内保育所等入所状況」PDFから表を抜き出してJSONで返す

実行: python scripts/kudamatsu-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kudamatsu-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ。年齢ごとに「入所児童数」と「受入可能数」の2列が並ぶ（0歳〜5歳で12列）
- **空きは書かれていない。受入可能数から入所児童数を引いて出す**
- 空きが無い欄は黄色く塗られている（凡例「■…空きなし」）。読み違いの検算に使う
- 「16(1)」の括弧は「うち市外児童」の内数。入所児童数から引かない
- 左端に「公立保育所」「私立保育所」などの区分が縦書きで入る。
  施設名は縦書きより右、数字より左の帯にあり、**2行に折り返すことがある**
  （「アイグラン保育園 潮音」）ので、行の範囲にある文字をつないで名前にする
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
# 施設名の帯（縦書きの区分より右、数字より左）
NAME_X = (156, 205)
# 空きなしの塗り
YELLOW = (1.0, 1.0, 0.0)


def fail(message):
    raise SystemExit(f"[中断] {message}")


def number(text):
    """「16(1)」のような内数つきの表記から、外側の数だけを取る"""
    t = text.replace("（", "(").replace("）", ")")
    m = re.match(r"^(\d+)(?:\(\d+\))?$", t)
    return int(m.group(1)) if m else None


def extract(path):
    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"PDFが{len(pdf.pages)}ページあります（1ページのはず）")
        page = pdf.pages[0]
        words = page.extract_words()
        flat = "".join((page.extract_text() or "").split())

        m = re.search(r"令和(\d+)年(\d{1,2})月(\d{1,2})日時点", flat)
        if not m:
            fail("「令和N年M月D日時点」を読み取れませんでした")
        as_of = [int(g) for g in m.groups()]

        # 年齢ごとの「入所児童数」「受入可能数」の列。合計欄の「入所児童数」も同じ名前なので、
        # 対で並んでいるものだけを採る
        enrolled = sorted(w["x0"] for w in words if w["text"] == "入所児童数")
        capacity = sorted(w["x0"] for w in words if w["text"] == "受入可能数")
        if len(capacity) != AGE_COUNT:
            fail(f"「受入可能数」の列が{len(capacity)}個です（{AGE_COUNT}個のはず）")
        enrolled = [x for x in enrolled if any(abs(x - c) < 40 and x < c for c in capacity)]
        if len(enrolled) != AGE_COUNT:
            fail(f"「入所児童数」の列が{len(enrolled)}個です（{AGE_COUNT}個のはず）")
        columns = []
        for age in range(AGE_COUNT):
            columns.append((enrolled[age], capacity[age]))
        right = capacity[-1] + 34  # 合計欄より左まで

        # 数字を行にまとめる。行の高さはおよそ20ptなので、10pt以内を同じ行とみなす
        values = []
        for w in words:
            if w["x0"] < enrolled[0] - 12 or w["x0"] > right:
                continue
            n = number(w["text"])
            if n is None:
                continue
            values.append((w["top"], (w["x0"] + w["x1"]) / 2, n, w["text"]))
        if not values:
            fail("数字を1つも読み取れませんでした")
        values.sort()
        rows = []
        for top, x, n, raw in values:
            if rows and abs(rows[-1]["top"] - top) <= 10:
                rows[-1]["cells"].append((x, n, raw))
                rows[-1]["top"] = (rows[-1]["top"] + top) / 2
            else:
                rows.append({"top": top, "cells": [(x, n, raw)]})

        # 黄色く塗られた升目の中心。空きなしの印
        yellow = []
        for r in page.rects:
            color = r.get("non_stroking_color")
            if isinstance(color, (list, tuple)) and len(color) == 3:
                if all(abs(a - b) < 0.05 for a, b in zip(color, YELLOW)):
                    yellow.append((r["x0"], r["top"], r["x1"], r["bottom"]))

        out = []
        for row in rows:
            top = row["top"]
            # 施設名は、その行の高さにある文字をつないだもの
            name = "".join(
                w["text"]
                for w in sorted(
                    (
                        w
                        for w in words
                        if NAME_X[0] <= w["x0"] <= NAME_X[1] and abs(w["top"] - top) <= 12
                    ),
                    key=lambda w: (round(w["top"] / 6), w["x0"]),
                )
            )
            if not name:
                continue
            cells = {}
            for x, n, raw in row["cells"]:
                for age, (ex, cx) in enumerate(columns):
                    if abs(x - (ex + 16)) < 17:
                        cells.setdefault(("enrolled", age), []).append((n, raw, x))
                    elif abs(x - (cx + 16)) < 17:
                        cells.setdefault(("capacity", age), []).append((n, raw, x))
            enrolled_row, capacity_row, shaded_row = [], [], []
            for age in range(AGE_COUNT):
                e = cells.get(("enrolled", age))
                c = cells.get(("capacity", age))
                if e and len(e) > 1:
                    fail(f"{name}: {age}歳の入所児童数が{len(e)}個あります")
                if c and len(c) > 1:
                    fail(f"{name}: {age}歳の受入可能数が{len(c)}個あります")
                enrolled_row.append(e[0][0] if e else None)
                capacity_row.append(c[0][0] if c else None)
                # その年齢の欄が黄色く塗られているか
                cx = columns[age][1] + 16
                shaded_row.append(
                    any(x0 <= cx <= x1 and y0 - 4 <= top <= y1 + 4 for x0, y0, x1, y1 in yellow)
                )
            out.append(
                {
                    "name": name,
                    "enrolled": enrolled_row,
                    "capacity": capacity_row,
                    "shaded": shaded_row,
                }
            )

        return {"asOf": as_of, "rows": out}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
