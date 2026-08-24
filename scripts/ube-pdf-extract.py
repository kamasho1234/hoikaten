"""
宇部市の「空き状況一覧表」PDFから表を抜き出す

実行: python scripts/ube-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-ube-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・13列（区分／施設名／公私／所在地／電話番号／定員／0歳〜5歳／保育開始年齢）
- 空きは記号（○＝空きあり、△＝若干名空きあり、×＝空きなし）。凡例は本文にある
- **空らんはその年齢の保育の受け入れをしていない**ことを示す（公式に説明はないが、
  同じ表の「保育開始年齢」と照らすと整合する）。斜線は引かれていない
- 区分の欄は縦結合で文字が混ざる（「こど認も定園」）ので、
  既知の区分名と文字の集合で照合して直す
"""

import json
import re
import sys

import pdfplumber

COL_KUBUN = 0
COL_NAME = 1
COL_PUBLIC = 2
COL_CAPACITY = 5
COL_AGE0 = 6
AGE_COUNT = 6
COL_START = 12
COLUMN_COUNT = 13

KNOWN_KUBUN = ["保育所", "小規模事業保育所", "認定こども園"]
MARKS = "○◯〇△×✕◎"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def normalize_kubun(raw):
    """縦結合で文字の並びが崩れることがあるので、文字の集合で照合して直す"""
    letters = set(raw)
    for known in KNOWN_KUBUN:
        if letters == set(known):
            return known
    return None


def extract(path):
    target = None
    legend = []
    notes = []
    rows = []
    mark_counts = {}
    blanks = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        flat = "".join((page.extract_text() or "").split()).translate(ZEN)

        m = re.search(r"令和(\d+)年度(\d+)月入所", flat)
        if not m:
            fail("何月入所ぶんかを読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        for line in (page.extract_text() or "").splitlines():
            line = line.strip()
            if line.startswith("表の見方"):
                for mark, label in re.findall(
                    rf"「([{MARKS}])」\s*…\s*([^「]+?)(?=\s*「|$)", line
                ):
                    legend.append({"mark": mark, "label": label.strip()})
                continue
            if line.startswith("クラス年齢") or line.startswith("この表は") or (
                line.startswith("施設の状況") or line.startswith("また、")
            ):
                if line not in notes:
                    notes.append(line)

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")
        table = tables[0]
        extracted = table.extract()
        heads = [cell(c) for c in extracted[0]]
        if len(heads) != COLUMN_COUNT:
            fail(f"列数が{len(heads)}になっています（{COLUMN_COUNT}列のはず）")
        if heads[COL_NAME] != "施設名":
            fail(f"2列目の見出しが「{heads[COL_NAME]}」になっています（施設名のはず）")
        for age in range(AGE_COUNT):
            if heads[COL_AGE0 + age] != f"{age}歳":
                fail(f"{age}歳の見出しが「{heads[COL_AGE0 + age]}」になっています")
        if heads[COL_START] != "保育開始年齢":
            fail(f"いちばん右の見出しが「{heads[COL_START]}」になっています")

        kubun_carry = ""
        for row_index in range(1, len(extracted)):
            values = [cell(c) for c in extracted[row_index]]
            if values[COL_KUBUN]:
                kubun = normalize_kubun(values[COL_KUBUN])
                if kubun is None:
                    fail(f"分からない区分です: 「{values[COL_KUBUN]}」")
                kubun_carry = kubun
            name = values[COL_NAME]
            if not name:
                continue
            if not kubun_carry:
                fail(f"{name}: 区分が分かりません")

            marks = []
            for age in range(AGE_COUNT):
                value = values[COL_AGE0 + age]
                if not value:
                    # 空らん＝その年齢の保育の受け入れをしていない
                    blanks += 1
                    marks.append(None)
                    continue
                marks.append(value)

            rows.append(
                {
                    "kubun": kubun_carry,
                    "name": name,
                    "public": values[COL_PUBLIC],
                    "capacity": values[COL_CAPACITY],
                    "start": values[COL_START],
                    "marks": marks,
                }
            )

        # 記号の数。歳児の欄のx座標と表の範囲で切り出す
        ranges = {}
        for row in table.rows:
            for index, box in enumerate(row.cells):
                if box is not None and index not in ranges:
                    ranges[index] = (box[0], box[2])
        if COL_AGE0 not in ranges or COL_AGE0 + AGE_COUNT - 1 not in ranges:
            fail("歳の列のx座標を取れませんでした")
        for word in page.crop(
            (
                ranges[COL_AGE0][0],
                table.rows[0].bbox[3],
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
        "target": target,
        "legend": legend,
        "notes": notes,
        "markCounts": {k: v for k, v in mark_counts.items() if v},
        "blanks": blanks,
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
