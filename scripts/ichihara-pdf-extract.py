"""
市原市の「空き状況一覧表」PDFから表を抜き出す

実行: python scripts/ichihara-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-ichihara-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・8列（施設分類／施設名／0歳〜5歳）
- 空きは記号（○＝3人以上、△＝1,2人、×＝空きなし）。凡例は表の下にある
- **施設分類は結合セル**で、グループの先頭の行にだけ入る（公立保育施設／私立保育園／
  小規模／家庭的／こども園／事業所）。値を持ち越して各施設に割り当てる
- 空らんはその年齢の受け入れがないことを示すが、**公式は空らんの意味を書いていない**
- 表題は「（令和N年M月入所審査後）」で、日付は入っていない
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
        text = page.extract_text() or ""

        flat = "".join(text.split()).translate(ZEN)
        m = re.search(r"[（(]令和(\d+)年(\d+)月入所審査後[）)]", flat)
        if not m:
            fail("表題（令和N年M月入所審査後）を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        # 「○・・・3人以上空きあり △・・・1,2人の空きあり ×・・・空きなし」
        for line in text.splitlines():
            if "・・・" not in line:
                continue
            for mark, label in re.findall(rf"([{MARKS}])・・・([^\s]+)", line):
                legend.append({"mark": mark, "label": label.strip()})
            break

        for line in text.splitlines():
            line = line.strip()
            if line.startswith("※") and len(line) > 5:
                notes.append(line.lstrip("※").strip())

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")
        table = tables[0]
        extracted = table.extract()
        if len(extracted[0]) != COLUMN_COUNT:
            fail(f"列数が{len(extracted[0])}になっています（{COLUMN_COUNT}列のはず）")

        # 「0歳」を含む行を見出しとする
        age_row = None
        for index, row in enumerate(extracted[:4]):
            values = [cell(c) for c in row]
            if "0歳" in values:
                age_row = index
                if values.index("0歳") != COL_AGE0:
                    fail(f"0歳の列が{values.index('0歳')}になっています（{COL_AGE0}のはず）")
                break
        if age_row is None:
            fail("「0歳」の見出しが見つかりません")

        kubun_carry = ""
        for row_index in range(age_row + 1, len(extracted)):
            values = [cell(c) for c in extracted[row_index]]
            if values[COL_KUBUN]:
                kubun_carry = values[COL_KUBUN]
            name = values[COL_NAME]
            if not name:
                continue
            if not kubun_carry:
                fail(f"{name}: 施設分類が分かりません")

            marks = []
            for age in range(AGE_COUNT):
                value = values[COL_AGE0 + age]
                if not value:
                    blanks += 1
                    marks.append(None)
                    continue
                marks.append(value)
            rows.append({"kubun": kubun_carry, "name": name, "marks": marks})

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
