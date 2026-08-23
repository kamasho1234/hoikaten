"""
宇治市の「保育所等の空き情報」PDFから表を抜き出す

実行: python scripts/uji-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-uji-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ。10列（区分／施設名／定数／0歳〜5歳／備考）
- 記号は○（受入枠に1名以上の受け入れが可能）と×（受け入れできない）
- **表として読むと記号が1つ左にずれる行がある**ので、
  記号は欄ではなくx座標で振り分ける
- 区分は縦書きの縦結合。欄のx座標で切り出し、縦に離れているところで区切る
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 3 + AGE_COUNT + 1
COL_DIVISION = 0
COL_NAME = 1
COL_AGE0 = 3
MARKS = "○◯〇×✕"


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def extract(path):
    rows = []
    legend = []
    target = None
    as_of = None
    mark_counts = {}
    spread = 0  # 結合された欄で配った、余分な記号の数

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            flat = "".join((page.extract_text() or "").split())
            z = str.maketrans("０１２３４５６７８９", "0123456789")

            if page_index == 0:
                m = re.search(r"【([０-９\d]+)月入所申込用】", flat.translate(z))
                if not m:
                    fail("対象月を読み取れませんでした")
                target = int(m.group(1))
                m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月([０-９\d]+)日現在", flat.translate(z))
                if not m:
                    fail("基準日を読み取れませんでした")
                as_of = tuple(int(g) for g in m.groups())

            for table in page.find_tables():
                extracted = table.extract()
                if len(extracted[0]) != EXPECTED_COLUMNS:
                    fail(f"列数が{len(extracted[0])}になっています")
                heads = [cell(c).translate(z) for c in extracted[0][COL_AGE0 : COL_AGE0 + AGE_COUNT]]
                if heads != [f"{i}歳" for i in range(AGE_COUNT)]:
                    fail(f"歳児の見出しが{heads}になっています")

                # 凡例は右端の備考欄にある。ページ全体の文だと表の行と交ざって
                # 読めないので、備考欄のx座標で切り出してから読む
                if not legend:
                    note_cell = next(
                        (r.cells[-1] for r in table.rows[1:] if r.cells[-1]), None
                    )
                    if note_cell is None:
                        fail("備考の欄の位置を取れませんでした")
                    note_words = sorted(
                        page.crop(
                            (note_cell[0], table.rows[0].bbox[3], note_cell[2], table.bbox[3])
                        ).extract_words(),
                        key=lambda w: (round(w["top"], 1), w["x0"]),
                    )
                    note = "".join(w["text"] for w in note_words)
                    for label, mark in re.findall(rf"([^、。※]+)場合には「([{MARKS}])」", note):
                        legend.append({"mark": mark, "label": label + "場合"})

                spans = []
                for i in range(AGE_COUNT):
                    c = table.rows[0].cells[COL_AGE0 + i]
                    if c is None:
                        fail("歳児の見出しの位置を取れませんでした")
                    spans.append((c[0], c[2]))

                # 記号の数。備考の長い文にも「○」「×」が出てくるので歳児の欄の中だけ数える
                for word in page.crop(
                    (spans[0][0], table.rows[0].bbox[3], spans[-1][1], table.bbox[3])
                ).extract_words():
                    for mark in MARKS:
                        mark_counts[mark] = mark_counts.get(mark, 0) + word["text"].count(mark)

                # 区分は縦書き。欄のx座標で切り出して、縦に離れているところで区切る
                division_cell = next(
                    (r.cells[COL_DIVISION] for r in table.rows[1:] if r.cells[COL_DIVISION]), None
                )
                if division_cell is None:
                    fail("区分の欄の位置を取れませんでした")
                words = sorted(
                    page.crop(
                        (division_cell[0], table.rows[0].bbox[3], division_cell[2], table.bbox[3])
                    ).extract_words(),
                    key=lambda w: w["top"],
                )
                groups = []
                for word in words:
                    height = word["bottom"] - word["top"]
                    if groups and word["top"] - groups[-1]["bottom"] < height * 2:
                        groups[-1]["text"] += word["text"]
                        groups[-1]["bottom"] = word["bottom"]
                    else:
                        groups.append(
                            {"text": word["text"], "top": word["top"], "bottom": word["bottom"]}
                        )
                division_spans = []
                for i, group in enumerate(groups):
                    top = (
                        table.rows[0].bbox[3]
                        if i == 0
                        else (groups[i - 1]["bottom"] + group["top"]) / 2
                    )
                    bottom = (
                        table.bbox[3]
                        if i == len(groups) - 1
                        else (group["bottom"] + groups[i + 1]["top"]) / 2
                    )
                    division_spans.append((top, bottom, group["text"]))

                for row_index, row in enumerate(table.rows):
                    if row_index == 0:
                        continue
                    values = [cell(c) for c in extracted[row_index]]
                    name = values[COL_NAME]
                    if not name:
                        continue
                    name_cell = row.cells[COL_NAME]
                    top, bottom = (
                        (name_cell[1], name_cell[3]) if name_cell else (row.bbox[1], row.bbox[3])
                    )
                    middle = (top + bottom) / 2
                    division = ""
                    for span_top, span_bottom, text in division_spans:
                        if span_top <= middle <= span_bottom:
                            division = text
                            break

                    # 混合保育のクラスは歳児の欄が結合されていて、記号が
                    # 結合された範囲の真ん中に置かれる。結合の幅ぶんだけ同じ記号を配る
                    marks = ["" for _ in range(AGE_COUNT)]
                    joined = [0 for _ in range(AGE_COUNT)]
                    for i in range(AGE_COUNT):
                        c = row.cells[COL_AGE0 + i]
                        if c is None:
                            continue
                        # この欄がいくつぶんの幅か（結合されていれば2以上）
                        width = c[2] - c[0]
                        unit = spans[i][1] - spans[i][0]
                        span = max(1, round(width / unit))
                        center = (c[0] + c[2]) / 2
                        found = ""
                        for word in page.crop((c[0], top, c[2], bottom)).extract_words():
                            if word["text"] in MARKS:
                                if found:
                                    fail(f"{name}: {i}歳の欄に記号が2つあります")
                                found = word["text"]
                        for k in range(span):
                            if i + k >= AGE_COUNT:
                                fail(f"{name}: 結合された欄が歳児の数を超えています")
                            marks[i + k] = found
                            joined[i + k] = span
                        if found and span > 1:
                            spread += span - 1
                    rows.append(
                        {"division": division, "name": name, "marks": marks, "joined": joined}
                    )

    if not rows:
        fail("空き情報の表を取り出せませんでした")
    if len(legend) < 2:
        fail(f"記号の凡例を読み取れませんでした（{len(legend)}件）")

    return {
        "target": target,
        "asOf": as_of,
        "legend": legend,
        "markCounts": {k: v for k, v in mark_counts.items() if v},
        "spread": spread,
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
