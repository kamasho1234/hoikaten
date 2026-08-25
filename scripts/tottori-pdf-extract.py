"""
鳥取市の「保育園等の空き状況一覧」PDFから表を抜き出す

実行: python scripts/tottori-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-tottori-vacancy.ts から呼ぶ）

## 表の作り
- 2ページ・9列（区分／園名／所在／0歳児〜5歳児）
- **空きは文字ではなくセルの色で表される**
  - 黄色 (1, 1, 0) … 受入れ可能
  - グレー (0.75, 0.75, 0.75) … 受入れが難しい又は受入れできない
  - 白 (1, 1, 1) … その年齢のクラスがない（小規模保育の3〜5歳、幼稚園型の0〜1歳など）
- `＊` は「空き待ちしている児童がいる」印。色とは別に付く
- 区分と園名は行ごとに入っている（結合セルではない）
"""

import json
import re
import sys

import pdfplumber

COL_KUBUN = 0
COL_NAME = 1
COL_AGE0 = 3
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

YELLOW = (1.0, 1.0, 0.0)
GRAY = (0.75, 0.75, 0.75)
WHITE = (1.0, 1.0, 1.0)
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def color_of(page, box):
    """セルを塗っている色。塗りがなければ None"""
    for rect in page.rects:
        if not rect.get("fill"):
            continue
        if (
            rect["x0"] <= box[0] + 2
            and rect["x1"] >= box[2] - 2
            and rect["top"] <= box[1] + 2
            and rect["bottom"] >= box[3] - 2
        ):
            color = rect.get("non_stroking_color")
            if color:
                return tuple(round(v, 2) for v in color)
    return None


def name_of(color):
    if color == YELLOW:
        return "yellow"
    if color == GRAY:
        return "gray"
    if color == WHITE:
        return "white"
    return None


def extract(path):
    as_of = None
    target = None
    legend = {}
    notes = []
    rows = []
    counts = {"yellow": 0, "gray": 0, "white": 0}
    stars = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) < 1:
            fail("ページがありません")

        for page_index, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            flat = "".join(text.split()).translate(ZEN)

            if as_of is None:
                m = re.search(r"令和(\d+)年度保育園等の空き状況一覧[（(](\d+)月(\d+)日現在", flat)
                if m:
                    as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
            if target is None:
                m = re.search(r"令和(\d+)年(\d+)月途中入所", flat)
                if m:
                    target = (int(m.group(1)), int(m.group(2)))

            if not legend:
                for line in text.splitlines():
                    line = line.strip()
                    if "黄色" in line and "グレー" in line:
                        m = re.search(r"黄色[^、。]*が([^、。]+)、グレーは([^、。]+?)状態", line)
                        if m:
                            legend["yellow"] = m.group(1).strip()
                            legend["gray"] = m.group(2).strip()
                    if line.startswith("＊") or line.startswith("*"):
                        notes.append(line.lstrip("＊*").strip())

            tables = page.find_tables()
            if not tables:
                fail(f"{page_index + 1}ページ目に表が見つかりません")
            table = tables[0]
            extracted = table.extract()
            if len(extracted[0]) != COLUMN_COUNT:
                fail(
                    f"{page_index + 1}ページ目の列数が{len(extracted[0])}です（{COLUMN_COUNT}列のはず）"
                )

            # 「0歳児」を含む行を見出しとする
            age_row = None
            for index, row in enumerate(extracted[:3]):
                values = [cell(c) for c in row]
                if "0歳児" in values:
                    age_row = index
                    if values.index("0歳児") != COL_AGE0:
                        fail(
                            f"{page_index + 1}ページ目の0歳児の列が{values.index('0歳児')}です"
                            f"（{COL_AGE0}のはず）"
                        )
                    break
            if age_row is None:
                fail(f"{page_index + 1}ページ目に「0歳児」の見出しがありません")

            for row_index in range(age_row + 1, len(table.rows)):
                values = [cell(c) for c in extracted[row_index]]
                name = values[COL_NAME]
                if not name:
                    continue
                kubun = values[COL_KUBUN]
                if not kubun:
                    fail(f"{name}: 区分が空です")

                marks = []
                for age in range(AGE_COUNT):
                    box = table.rows[row_index].cells[COL_AGE0 + age]
                    if box is None:
                        fail(f"{name}: {age}歳児の欄の位置を取れませんでした")
                    color = name_of(color_of(page, box))
                    if color is None:
                        fail(f"{name}: {age}歳児の欄が色分けされていません")
                    counts[color] += 1
                    star = "＊" in values[COL_AGE0 + age]
                    if star:
                        stars += 1
                    marks.append({"color": color, "star": star})

                rows.append(
                    {
                        "kubun": kubun,
                        "name": name,
                        "place": values[COL_AGE0 - 1],
                        "marks": marks,
                    }
                )

    if not rows:
        fail("施設の行を取り出せませんでした")
    if as_of is None:
        fail("「令和N年度 保育園等の空き状況一覧（M月D日現在）」を読み取れませんでした")
    if target is None:
        fail("「令和N年M月途中入所」を読み取れませんでした")
    if "yellow" not in legend or "gray" not in legend:
        fail("黄色とグレーの意味を読み取れませんでした")

    return {
        "asOf": as_of,
        "target": target,
        "legend": legend,
        "notes": notes,
        "counts": counts,
        "stars": stars,
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
