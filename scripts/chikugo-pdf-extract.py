"""
筑後市の「保育所・認定こども園（保育部分）・小規模保育施設 空き状況」PDFから表を抜き出す

実行: python scripts/chikugo-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-chikugo-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・8列（施設区分／施設名／0歳〜5歳）
- **空きの表し方が4通りある**
  - ○ … 3人以上空きあり（文字）
  - △ … 1〜2人空きあり（文字）
  - **灰色の塗りつぶし** … 空きなし（`rects` の fill）
  - **灰色の塗りつぶし＋斜線** … 受入れなし（加えて `lines` の斜め線）
- 塗りつぶしの色は空きなしも受入れなしも同じなので、**斜線の有無で分ける**
- 斜線は `curves` ではなく `lines` に入っている
- **施設区分の欄は結合されていない**。罫線は全行に引かれていて、区分名は
  グループの縦中央の行にだけ印字されている。そのまま読むと区分が施設からずれるので、
  **区分の切れ目に引かれた太線（細長い矩形）でグループに区切る**
"""

import json
import re
import sys

import pdfplumber

COL_KUBUN = 0
COL_NAME = 1
COL_AGE0 = 2
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

MARKS = "○◯〇△×✕"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def inside(box, x0, top, x1, bottom):
    return box[0] - 1 <= x0 and x1 <= box[2] + 1 and box[1] - 1 <= top and bottom <= box[3] + 1


def has_fill(page, box):
    """セルが塗りつぶされているか（空きなし・受入れなしの印）"""
    return any(
        r.get("fill")
        and r["width"] > 20
        and r["height"] > 8
        and inside(box, r["x0"], r["top"], r["x1"], r["bottom"])
        for r in page.rects
    )


def overlaps(box, x0, top, x1, bottom):
    """セルと図形が重なっているか（包含ではなく交差で見る）"""
    return not (x1 < box[0] or box[2] < x0 or bottom < box[1] or box[3] < top)


def has_diagonal(page, box):
    """
    セルに斜線が引いてあるか（受入れなしの印）。
    斜線はセルより縦に長く引かれていることがあるので、包含ではなく重なりで見る。
    横のはみ出しは隣の欄と間違えるので、x は中心が入っていることを確かめる
    """
    center = (box[0] + box[2]) / 2
    for line in page.lines:
        if abs(line["x1"] - line["x0"]) <= 5 or abs(line["bottom"] - line["top"]) <= 5:
            continue
        x0, x1 = min(line["x0"], line["x1"]), max(line["x0"], line["x1"])
        if not (x0 - 1 <= center <= x1 + 1):
            continue
        if overlaps(box, x0, line["top"], x1, line["bottom"]):
            return True
    return False


def kubun_bands(page, x0, x1, top, bottom):
    """
    施設区分のグループを、区分の欄に引かれた太線で区切る。
    細い罫線は高さがほぼ0の矩形、区切りの太線は高さのある細長い矩形になっている。
    返すのは (上端, 下端, 区分名) の並び
    """
    width = x1 - x0
    lines = []
    for r in page.rects:
        if r["width"] < width * 0.7 or not (0.3 < r["height"] < 3):
            continue
        if r["x0"] > x0 + 3 or r["x1"] < x1 - 3:
            continue
        y = (r["top"] + r["bottom"]) / 2
        if top - 2 <= y <= bottom + 2:
            lines.append(y)
    edges = sorted({round(y, 1) for y in lines})
    if len(edges) < 3:
        fail(f"施設区分の区切りの太線が{len(edges)}本しかありません")

    bands = []
    for upper, lower in zip(edges, edges[1:]):
        if lower - upper < 5:
            continue
        words = page.crop((x0, upper + 1, x1, lower - 1)).extract_words()
        name = "".join(w["text"] for w in sorted(words, key=lambda w: (w["top"], w["x0"])))
        bands.append((upper, lower, cell(name)))
    return bands


def extract(path):
    as_of = None
    target = None
    legend = []
    notes = []
    rows = []
    mark_counts = {}
    fills = 0
    diagonals = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"(\d{4})年(\d+)月(\d+)日更新", flat)
        if not m:
            fail("更新日（YYYY年M月D日更新）を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"(\d+)月入所選考後", flat)
        if m:
            target = int(m.group(1))

        # 「○：3人以上空きあり △：1～2人空きあり ：空きなし ：受入れなし」
        # 塗りつぶしと斜線の説明は記号が文字として入っていないので、言葉だけを拾う
        for line in text.splitlines():
            if "空きあり" not in line:
                continue
            for mark, label in re.findall(rf"([{MARKS}])：([^\s：]+)", line):
                legend.append({"mark": mark, "label": label.strip()})
            for label in re.findall(r"：([^\s：○◯〇△]+なし)", line):
                legend.append({"mark": None, "label": label.strip()})
            break

        for line in text.splitlines():
            line = line.strip()
            if line.startswith("○") and len(line) >= 15 and "空きあり" not in line:
                notes.append(line.lstrip("○").strip())

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")
        table = tables[0]
        extracted = table.extract()
        if len(extracted[0]) != COLUMN_COUNT:
            fail(f"列数が{len(extracted[0])}になっています（{COLUMN_COUNT}列のはず）")

        # 「0歳」を含む行を見出しとする
        age_row = None
        for index, row in enumerate(extracted[:3]):
            values = [cell(c) for c in row]
            if "0歳" in values:
                age_row = index
                if values.index("0歳") != COL_AGE0:
                    fail(f"0歳の列が{values.index('0歳')}になっています（{COL_AGE0}のはず）")
                break
        if age_row is None:
            fail("「0歳」の見出しが見つかりません")

        kubun_box = None
        for row in table.rows:
            if row.cells and row.cells[COL_KUBUN] is not None:
                kubun_box = row.cells[COL_KUBUN]
                break
        if kubun_box is None:
            fail("施設区分の列の位置を取れませんでした")
        bands = kubun_bands(
            page, kubun_box[0], kubun_box[2], table.rows[age_row].bbox[3], table.bbox[3]
        )

        for row_index, row in enumerate(table.rows):
            if row_index <= age_row:
                continue
            values = [cell(c) for c in extracted[row_index]]
            name = values[COL_NAME]
            if not name:
                continue

            center = (row.bbox[1] + row.bbox[3]) / 2
            kubun = next((b[2] for b in bands if b[0] <= center <= b[1]), "")
            if not kubun:
                fail(f"{name}: 施設区分が分かりません")

            marks = []
            for age in range(AGE_COUNT):
                column = COL_AGE0 + age
                value = values[column]
                if value:
                    marks.append(value)
                    continue
                box = row.cells[column]
                if box is None:
                    fail(f"{name}: {age}歳の欄の位置を取れませんでした")
                if has_diagonal(page, box):
                    # 受入れなし（そのクラスがない）
                    diagonals += 1
                    marks.append(None)
                    continue
                if has_fill(page, box):
                    # 空きなし
                    fills += 1
                    marks.append("")
                    continue
                fail(f"{name}: {age}歳の欄に文字も塗りつぶしも斜線もありません")

            rows.append({"kubun": kubun, "name": name, "marks": marks})

        # 記号の数。歳の欄のx座標と表の範囲で切り出す
        ranges = {}
        for row in table.rows:
            for index, box in enumerate(row.cells):
                if box is not None and index not in ranges:
                    ranges[index] = (box[0], box[2])
        if COL_AGE0 not in ranges or COL_AGE0 + AGE_COUNT - 1 not in ranges:
            fail("歳の列のx座標を取れませんでした")
        head_bottom = table.rows[age_row].bbox[3]
        for word in page.crop(
            (
                ranges[COL_AGE0][0],
                head_bottom,
                ranges[COL_AGE0 + AGE_COUNT - 1][1],
                table.bbox[3],
            )
        ).extract_words():
            for mark in MARKS:
                n = word["text"].count(mark)
                if n:
                    mark_counts[mark] = mark_counts.get(mark, 0) + n

    if not rows:
        fail("施設の行を取り出せませんでした")
    if not legend:
        fail("記号の凡例が見つかりません")

    return {
        "asOf": as_of,
        "target": target,
        "legend": legend,
        "notes": notes,
        "markCounts": {k: v for k, v in mark_counts.items() if v},
        "fills": fills,
        "diagonals": diagonals,
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
