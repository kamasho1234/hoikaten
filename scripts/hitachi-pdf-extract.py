"""
日立市の「保育施設空き状況」PDFから表を抜き出す

実行: python scripts/hitachi-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-hitachi-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ。地区（北部・本庁・多賀・南部）ごとに表が分かれている
- 地区の見出しは表の外にあるので、**表のすぐ上にある見出しを座標で結びつける**
- 8列。公私／施設名／0歳児〜5歳児
- 空きは記号（○＝3人以上、◒＝1〜2人、●＝空きなし）
- **設けていないクラスは空欄ではなくセルに斜線が引いてある**（戸田市と同じ）
- 凡例の「◒」だけが説明から改行で切り離されるので、座標で結びつける
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

MARKS = ["○", "◯", "〇", "◒", "●", "×", "✕", "△"]
ZEN = str.maketrans("０１２３４５６７８９－―ー", "0123456789---")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def has_slash(page, box):
    """セルに斜線が引いてあるか"""
    return any(
        box[0] - 1 <= c["x0"]
        and c["x1"] <= box[2] + 1
        and box[1] - 1 <= c["top"]
        and c["bottom"] <= box[3] + 1
        for c in page.curves
    )


def read_legend(page, words, top_limit):
    """
    凡例を読む。「○…３人以上空きがあります」のように記号と説明がくっついている語と、
    「…１～２人空きがあります」のように記号が別の語になっている場合の両方に対応する
    """
    legend = []
    targets = [w for w in words if w["top"] < top_limit]
    # 単独の記号だけの語（◒ など）
    singles = [w for w in targets if w["text"].strip() in MARKS]
    for w in sorted(targets, key=lambda w: w["x0"]):
        text = w["text"].strip()
        m = re.match(rf"^([{''.join(MARKS)}])…(.+)$", text)
        if m:
            legend.append({"mark": m.group(1), "label": m.group(2)})
            continue
        if text.startswith("…"):
            # 説明だけの語。手前にある単独の記号のうち、いちばん近いものを採る
            before = [s for s in singles if s["x0"] < w["x0"]]
            if not before:
                fail(f"記号の分からない凡例があります: 「{text}」")
            mark = max(before, key=lambda s: s["x0"])["text"].strip()
            legend.append({"mark": mark, "label": text.lstrip("…")})
    return legend


def extract(path):
    as_of = None
    target = None
    wards = []
    notes = []
    rows = []
    mark_counts = {}
    no_class = 0
    curve_count = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        words = page.extract_words()
        curve_count = len(page.curves)
        flat = "".join((page.extract_text() or "").split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日現在", flat)
        if not m:
            fail("基準日（令和N年M月D日現在）を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日入所", flat)
        if not m:
            fail("何月入所ぶんかを読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")

        for line in (page.extract_text() or "").splitlines():
            line = line.strip()
            if line.startswith("※"):
                notes.append(line.lstrip("※").strip())

        legend = read_legend(page, words, tables[0].bbox[1])
        if not legend:
            fail("記号の凡例が見つかりません")

        # 地区の見出し（＜北部地区＞ など）
        headings = [
            {"name": w["text"].strip("＜＞<>"), "top": w["top"]}
            for w in words
            if re.fullmatch(r"[＜<].+地区[＞>]", w["text"].strip())
        ]
        if not headings:
            fail("地区の見出しが見つかりません")

        for table in tables:
            extracted = table.extract()
            if len(extracted[0]) != COLUMN_COUNT:
                fail(f"列数が{len(extracted[0])}になっています（{COLUMN_COUNT}列のはず）")
            heads = [cell(c) for c in extracted[0]]
            if heads[COL_KUBUN] != "保育施設名":
                fail(f"1列目の見出しが「{heads[COL_KUBUN]}」になっています")
            for age in range(AGE_COUNT):
                if heads[COL_AGE0 + age] != f"{age}歳児":
                    fail(f"{age}歳児の見出しが「{heads[COL_AGE0 + age]}」になっています")

            # この表のすぐ上にある地区の見出し
            above = [h for h in headings if h["top"] < table.bbox[1]]
            if not above:
                fail(f"表（top={round(table.bbox[1], 1)}）に対応する地区の見出しがありません")
            ward = max(above, key=lambda h: h["top"])["name"]
            if ward not in wards:
                wards.append(ward)

            for row_index, row in enumerate(table.rows):
                if row_index == 0:
                    continue
                values = [cell(c) for c in extracted[row_index]]
                name = values[COL_NAME]
                if not name:
                    continue
                kubun = values[COL_KUBUN]
                if not kubun:
                    fail(f"{name}: 公立・私立の別が空です")

                marks = []
                for age in range(AGE_COUNT):
                    column = COL_AGE0 + age
                    value = values[column]
                    if value:
                        marks.append(value)
                        continue
                    box = row.cells[column]
                    if box is None:
                        fail(f"{name}: {age}歳児の欄の位置を取れませんでした")
                    # 空の欄には斜線が引いてある＝そのクラスを設けていない
                    if not has_slash(page, box):
                        fail(f"{name}: {age}歳児の欄が空で斜線もありません")
                    no_class += 1
                    marks.append(None)

                rows.append({"ward": ward, "kubun": kubun, "name": name, "marks": marks})

            # 記号の数。歳児の欄のx座標と表の範囲で切り出す
            first = table.rows[0].cells[COL_AGE0]
            last = table.rows[0].cells[COL_AGE0 + AGE_COUNT - 1]
            if first is None or last is None:
                fail("歳児の見出しの位置を取れませんでした")
            for word in page.crop(
                (first[0], table.rows[0].bbox[3], last[2], table.bbox[3])
            ).extract_words():
                for mark in MARKS:
                    n = word["text"].count(mark)
                    if n:
                        mark_counts[mark] = mark_counts.get(mark, 0) + n

    if not rows:
        fail("施設の行を取り出せませんでした")
    # このPDFの curves は空の欄に引かれた斜線しかないので、数が合うことを確かめる
    if no_class != curve_count:
        fail(f"斜線の数（{curve_count}）と空の欄の数（{no_class}）が合いません")

    return {
        "asOf": as_of,
        "target": target,
        "legend": legend,
        "notes": notes,
        "wards": wards,
        "markCounts": {k: v for k, v in mark_counts.items() if v},
        "noClass": no_class,
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
