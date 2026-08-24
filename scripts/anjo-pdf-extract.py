"""
安城市の「保育園・認定こども園（保育園コース）空き状況一覧」PDFから表を抜き出す

実行: python scripts/anjo-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-anjo-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ。11列（区分／公私／マップの園番号／番号／園名／5歳〜0歳）。見出しは2行
- **歳児の並びが5歳から0歳の逆順**
- 記号は○（余裕があります）△（少なくなっています）×（空きはありません）。
  空欄はそのクラスを設けていない
- 区分（保育園・認定こども園）と公私（公立・私立）はどちらも縦書きの縦結合
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 5 + AGE_COUNT
HEADER_ROWS = 2
COL_DIVISION = 0
COL_PUBLIC = 1
COL_NAME = 4
COL_AGE0 = 5  # ここから5歳→0歳の順に並ぶ
MARKS = "○◯〇△×✕"


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def vertical_blocks(page, box):
    """縦書きの欄を、縦に離れているところで区切って [(top, bottom, 文字列)] にする"""
    words = sorted(page.crop(box).extract_words(), key=lambda w: w["top"])
    blocks = []
    for word in words:
        height = word["bottom"] - word["top"]
        # 同じ語の中の隙間は文字の高さより狭く、語どうしはそれ以上あく
        if blocks and word["top"] - blocks[-1]["bottom"] < height:
            blocks[-1]["words"].append(word)
            blocks[-1]["bottom"] = max(blocks[-1]["bottom"], word["bottom"])
        else:
            blocks.append({"words": [word], "top": word["top"], "bottom": word["bottom"]})
    for block in blocks:
        block["text"] = "".join(w["text"] for w in sorted(block["words"], key=lambda w: w["top"]))
    spans = []
    for i, block in enumerate(blocks):
        top = box[1] if i == 0 else (blocks[i - 1]["bottom"] + block["top"]) / 2
        bottom = box[3] if i == len(blocks) - 1 else (block["bottom"] + blocks[i + 1]["top"]) / 2
        spans.append((top, bottom, block["text"]))
    return spans


def extract(path):
    rows = []
    legend = []
    target = None
    as_of = None
    mark_counts = {}

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            flat = "".join((page.extract_text() or "").split())
            z = str.maketrans("０１２３４５６７８９", "0123456789")

            if page_index == 0:
                m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月入園調整後", flat.translate(z))
                if not m:
                    fail("対象月を読み取れませんでした")
                target = (int(m.group(1)), int(m.group(2)))
                m = re.search(r"利用調整終了（([０-９\d]+)月([０-９\d]+)日）時点", flat.translate(z))
                if not m:
                    fail("時点を読み取れませんでした")
                as_of = (int(m.group(1)), int(m.group(2)))
                # 「○…余裕があります △…少なくなっています ×…空きはありません」
                for mark, label in re.findall(rf"([{MARKS}])…([^{MARKS}\s]+?ま[すせ]ん?)", flat):
                    legend.append({"mark": mark, "label": label})

            for table in page.find_tables():
                extracted = table.extract()
                if len(extracted[0]) != EXPECTED_COLUMNS:
                    continue
                heads = [cell(c).translate(z) for c in extracted[1][COL_AGE0 : COL_AGE0 + AGE_COUNT]]
                expected = [f"{i}歳" for i in range(AGE_COUNT - 1, -1, -1)]
                if heads != expected:
                    fail(f"歳児の見出しが{heads}になっています（{expected} のはず）")

                # 記号の数。凡例を拾わないよう歳児の欄のx座標で切り出して数える
                first = table.rows[1].cells[COL_AGE0]
                last = table.rows[1].cells[COL_AGE0 + AGE_COUNT - 1]
                if first is None or last is None:
                    fail("歳児の見出しの位置を取れませんでした")
                body_top = table.rows[1].bbox[3]
                for word in page.crop((first[0], body_top, last[2], table.bbox[3])).extract_words():
                    for mark in MARKS:
                        mark_counts[mark] = mark_counts.get(mark, 0) + word["text"].count(mark)

                spans = {}
                for col in (COL_DIVISION, COL_PUBLIC):
                    target_cell = next(
                        (r.cells[col] for r in table.rows[HEADER_ROWS:] if r.cells[col]), None
                    )
                    if target_cell is None:
                        fail(f"{col}番めの縦書きの欄の位置を取れませんでした")
                    spans[col] = vertical_blocks(
                        page, (target_cell[0], body_top, target_cell[2], table.bbox[3])
                    )

                for row_index, row in enumerate(table.rows):
                    if row_index < HEADER_ROWS:
                        continue
                    values = [cell(c) for c in extracted[row_index]]
                    if not values[COL_NAME]:
                        continue
                    name_cell = row.cells[COL_NAME]
                    top, bottom = (
                        (name_cell[1], name_cell[3]) if name_cell else (row.bbox[1], row.bbox[3])
                    )
                    middle = (top + bottom) / 2
                    for col in (COL_DIVISION, COL_PUBLIC):
                        found = ""
                        for span_top, span_bottom, text in spans[col]:
                            if span_top <= middle <= span_bottom:
                                found = text
                                break
                        values[col] = found
                    rows.append(values)

    if not rows:
        fail("空き状況の表を取り出せませんでした")
    if len(rows) < 30:
        fail(f"施設が{len(rows)}件しか取れていません")
    if len(legend) < 3:
        fail(f"記号の凡例を読み取れませんでした（{len(legend)}件）")

    return {
        "target": target,
        "asOf": as_of,
        "legend": legend,
        "markCounts": {k: v for k, v in mark_counts.items() if v},
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
