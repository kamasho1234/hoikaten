"""
伊勢崎市の「保育所（園）・認定こども園（2・3号）空き情報」PDFから表を抜き出す

実行: python scripts/isesaki-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-isesaki-vacancy.ts から呼ぶ）

## 表の作り
- 2ページ・各1表・11列
- 列: 地区／公立・私立／保育所・認定こども園／施設名／受入年齢（備考）／0歳〜5歳
- 空きは記号（◎○△×）。凡例は表の外の注意事項に書いてある
- **地区の欄は縦結合**なので、値をページを跨いで引き継ぐ
- **設けていないクラスは空らんではなくセルに斜線**が引いてある
"""

import json
import re
import sys

import pdfplumber

COL_WARD = 0
COL_KUBUN = 1
COL_TYPE = 2
COL_NAME = 3
COL_AGE0 = 5
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

MARKS = ["◎", "○", "◯", "〇", "△", "×", "✕"]
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def has_slash(page, box):
    return any(
        box[0] - 1 <= c["x0"]
        and c["x1"] <= box[2] + 1
        and box[1] - 1 <= c["top"]
        and c["bottom"] <= box[3] + 1
        for c in page.curves
    )


def extract(path):
    target = None
    legend = []
    notes = []
    wards = []
    rows = []
    mark_counts = {}
    slashes = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) < 1:
            fail("ページがありません")
        ward_carry = ""

        for page_index, page in enumerate(pdf.pages):
            flat = "".join((page.extract_text() or "").split()).translate(ZEN)

            if target is None:
                m = re.search(r"令和(\d+)年(\d+)月随時入所", flat)
                if not m:
                    fail("何月の随時入所ぶんかを読み取れませんでした")
                target = (int(m.group(1)), int(m.group(2)))

            if not legend:
                # 「目安として△が1名程度、○が3名程度、◎が5名程度の入所受入可能数を示して」
                for mark, label in re.findall(
                    r"([◎○◯〇△])が(\d+名程度)", flat
                ):
                    legend.append({"mark": mark, "label": f"{label}の入所受入可能数"})

            if not notes:
                for line in (page.extract_text() or "").splitlines():
                    line = line.strip()
                    if line.startswith("※") and len(line) >= 10:
                        notes.append(line.lstrip("※").strip())

            tables = page.find_tables()
            if len(tables) != 1:
                fail(f"{page_index + 1}ページ目の表が{len(tables)}個あります（1個のはず）")
            table = tables[0]
            extracted = table.extract()
            heads = [cell(c) for c in extracted[0]]
            if len(heads) != COLUMN_COUNT:
                fail(f"列数が{len(heads)}になっています（{COLUMN_COUNT}列のはず）")
            if heads[COL_NAME] != "施設名":
                fail(f"4列目の見出しが「{heads[COL_NAME]}」になっています（施設名のはず）")
            for age in range(AGE_COUNT):
                if heads[COL_AGE0 + age] != f"{age}歳":
                    fail(f"{age}歳の見出しが「{heads[COL_AGE0 + age]}」になっています")

            for row_index, row in enumerate(table.rows):
                if row_index == 0:
                    continue
                values = [cell(c) for c in extracted[row_index]]
                if values[COL_WARD]:
                    ward_carry = values[COL_WARD]
                name = values[COL_NAME]
                if not name:
                    continue
                if not ward_carry:
                    fail(f"{name}: 地区が分かりません")
                if ward_carry not in wards:
                    wards.append(ward_carry)

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
                    if not has_slash(page, box):
                        fail(f"{name}: {age}歳の欄が空で斜線もありません")
                    slashes += 1
                    marks.append(None)

                rows.append(
                    {
                        "ward": ward_carry,
                        "kubun": values[COL_KUBUN],
                        "type": values[COL_TYPE],
                        "name": name,
                        "marks": marks,
                    }
                )

            # 記号の数。歳児の欄のx座標と表の範囲で切り出す
            first = table.rows[0].cells[COL_AGE0]
            last = table.rows[0].cells[COL_AGE0 + AGE_COUNT - 1]
            if first is None or last is None:
                fail("歳の見出しの位置を取れませんでした")
            for word in page.crop(
                (first[0], table.rows[0].bbox[3], last[2], table.bbox[3])
            ).extract_words():
                for mark in MARKS:
                    n = word["text"].count(mark)
                    if n:
                        mark_counts[mark] = mark_counts.get(mark, 0) + n

    if not rows:
        fail("施設の行を取り出せませんでした")
    if not legend:
        fail("記号の凡例（△が1名程度…）が見つかりません")

    return {
        "target": target,
        "legend": legend,
        "notes": notes,
        "wards": wards,
        "markCounts": {k: v for k, v in mark_counts.items() if v},
        "slashes": slashes,
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
