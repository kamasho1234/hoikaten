"""
文京区の「募集予定人数・申込者数一覧」PDFから表を抜き出してJSONで返す

実行: python scripts/bunkyo-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-bunkyo-vacancy.ts から呼ぶ）

## 表の作り
- **1ページに表が2つ**。左が「募集予定人数」（11列＝エリア／施設区分／№／園名／0〜5歳／延長保育）、
  右が「締切後申込者数」（6列＝0〜5歳）。**行は同じ並び**なので、行位置で対応づける。
- **エリア（駅周辺）と施設区分（区立／私立）は縦書きの結合セル**。値の入る行が飛ぶので引き継ぐ。
- **№がある**（区の施設マップの番号）ので施設IDに使える。ただし
  「柳町幼稚園(長時間保育)」のように №のない行が混ざる。
- **末尾に合計行がある**ので検算に使える。
- 空欄は「募集を行っていないクラス」。0という数値は出てこない。
"""

import json
import re
import sys

import pdfplumber

Z = str.maketrans("０１２３４５６７８９", "0123456789")
AGE_HEADS = ["0歳", "1歳", "2歳", "3歳", "4歳", "5歳"]


def fail(message):
    raise SystemExit(f"[中断] {message}")


def normalize(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(Z)


def cell_text(s):
    if s is None:
        return ""
    return " ".join(str(s).split())


def resolve_merged(table_obj, rows, col, page):
    """縦書きの結合セル（エリア・施設区分）を各行へ配る。文字は座標から読み直す"""
    cells = [r.cells[col] if col < len(r.cells) else None for r in table_obj.rows]
    resolved = [""] * len(rows)
    starts = [i for i, c in enumerate(cells) if c is not None]
    for si, start in enumerate(starts):
        end = min(starts[si + 1] - 1 if si + 1 < len(starts) else len(rows) - 1, len(rows) - 1)
        bbox = cells[start]
        chars = [
            ch
            for ch in page.chars
            if bbox[0] <= (ch["x0"] + ch["x1"]) / 2 <= bbox[2]
            and bbox[1] <= (ch["top"] + ch["bottom"]) / 2 <= bbox[3]
        ]
        chars.sort(key=lambda ch: (round(ch["top"], 1), ch["x0"]))
        value = "".join(ch["text"] for ch in chars).strip()
        if not value:
            value = next((cell_text(rows[j][col]) for j in range(start, end + 1) if cell_text(rows[j][col])), "")
        for j in range(start, end + 1):
            resolved[j] = value
    carried = ""
    for ri in range(len(rows)):
        if resolved[ri]:
            carried = resolved[ri]
        else:
            resolved[ri] = carried
    return resolved


def extract(path):
    pages_out = []
    as_of = set()
    target = set()
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月([０-９\d]+)日現在", text)
            if m:
                as_of.add(tuple(int(g.translate(Z)) for g in m.groups()))
            m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月入所募集予定人数", text)
            if m:
                target.add(tuple(int(g.translate(Z)) for g in m.groups()))

            found = page.find_tables()
            # 左（募集予定人数・11列）と右（申込者数・6列）を x 座標で見分ける
            main = None
            sub = None
            for to in found:
                rows = to.extract()
                if not rows:
                    continue
                width = len(rows[0])
                if width >= 10 and main is None:
                    main = to
                elif width <= 7 and sub is None:
                    sub = to
            if main is None:
                continue

            rows = [list(r) for r in main.extract()]
            head = [normalize(c) for c in rows[0]]
            head2 = [normalize(c) for c in rows[1]] if len(rows) > 1 else []
            # 年齢の見出しは2行目にある
            ages = [head2.index(a) for a in AGE_HEADS] if all(a in head2 for a in AGE_HEADS) else None
            if ages is None:
                fail(f"募集予定人数の年齢見出しが見つかりません: {head2}")

            name_col = head.index("園（室）名") if "園（室）名" in head else 3
            no_col = head.index("№") if "№" in head else 2

            sub_rows = [list(r) for r in sub.extract()] if sub is not None else []
            sub_ages = None
            if sub_rows:
                sh = [normalize(c) for c in sub_rows[1]] if len(sub_rows) > 1 else []
                if all(a in sh for a in AGE_HEADS):
                    sub_ages = [sh.index(a) for a in AGE_HEADS]

            pages_out.append(
                {
                    "columns": {
                        "area": 0,
                        "kubun": 1,
                        "no": no_col,
                        "name": name_col,
                        "ages": ages,
                        "subAges": sub_ages,
                    },
                    "areaByRow": resolve_merged(main, rows, 0, page)[2:],
                    "kubunByRow": resolve_merged(main, rows, 1, page)[2:],
                    "rows": [[cell_text(c) for c in r] for r in rows[2:]],
                    "subRows": [[cell_text(c) for c in r] for r in sub_rows[2:]] if sub_rows else [],
                }
            )
    if not pages_out:
        fail("施設の表を1つも取り出せませんでした")
    return {"asOf": sorted(as_of), "target": sorted(target), "pages": pages_out}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
