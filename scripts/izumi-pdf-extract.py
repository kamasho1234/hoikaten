"""
和泉市の「保育所・認定こども園・小規模保育事業予定人数」PDFから表を抜き出す

実行: python scripts/izumi-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-izumi-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ。9列（区分／施設名／空き列／0歳〜5歳）
- 空きは人数。**設けていないクラスは空欄ではなくセルに斜線が引いてある**
- 夜間保育園だけ0歳から5歳の欄がひとつに結合されていて、年齢別に分かれていない
- 区分（公立・民間）は縦書き。行ごとにセルが切れているので、
  列全体を見て縦の隙間でまとまりに分ける
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 3 + AGE_COUNT
COL_DIVISION = 0
COL_NAME = 1
COL_AGE0 = 3
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


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


def division_blocks(page, box):
    """
    縦書きの区分。行ごとにセルが切れているので列全体の文字を見て、
    縦に大きく離れているところでまとまりに分ける
    """
    chars = sorted(page.crop(box).chars, key=lambda c: c["top"])
    blocks = []
    for char in chars:
        if not char["text"].strip():
            continue
        height = char["bottom"] - char["top"]
        # 同じ語の中は文字の高さの3倍まで（間に空白が入ることがある）、
        # 語どうしはもっと大きく離れている
        if blocks and char["top"] - blocks[-1]["bottom"] < height * 3:
            blocks[-1]["chars"].append(char)
            blocks[-1]["bottom"] = max(blocks[-1]["bottom"], char["bottom"])
        else:
            blocks.append({"chars": [char], "top": char["top"], "bottom": char["bottom"]})
    if not blocks:
        fail("区分の欄が読めませんでした")

    spans = []
    for i, block in enumerate(blocks):
        top = box[1] if i == 0 else (blocks[i - 1]["bottom"] + block["top"]) / 2
        bottom = box[3] if i == len(blocks) - 1 else (block["bottom"] + blocks[i + 1]["top"]) / 2
        spans.append((top, bottom, "".join(c["text"] for c in block["chars"])))
    return spans


def extract(path):
    rows = []
    target = None
    as_of = None

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        flat = "".join((page.extract_text() or "").split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日現在", flat)
        if not m:
            fail("基準日を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
        m = re.search(r"令和(\d+)年度(\d+)月保育所", flat)
        if not m:
            fail("対象月を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        for table in page.find_tables():
            extracted = table.extract()
            if len(extracted[0]) != EXPECTED_COLUMNS:
                fail(f"列数が{len(extracted[0])}になっています")
            heads = [cell(c) for c in extracted[0][COL_AGE0 : COL_AGE0 + AGE_COUNT]]
            if heads != [f"{i}歳" for i in range(AGE_COUNT)]:
                fail(f"歳児の見出しが{heads}になっています")

            head_cell = table.rows[0].cells[COL_AGE0]
            division_cell = next((r.cells[COL_DIVISION] for r in table.rows[1:] if r.cells[COL_DIVISION]), None)
            if head_cell is None or division_cell is None:
                fail("見出しの位置を取れませんでした")
            age_width = head_cell[2] - head_cell[0]

            body = [r for i, r in enumerate(table.rows) if i > 0 and cell(extracted[i][COL_NAME])]
            if not body:
                fail("施設の行が見つかりません")
            spans = division_blocks(
                page,
                (division_cell[0], body[0].bbox[1], division_cell[2], body[-1].bbox[3]),
            )

            for row_index, row in enumerate(table.rows):
                if row_index == 0:
                    continue
                values = [cell(c) for c in extracted[row_index]]
                name = values[COL_NAME]
                if not name:
                    continue

                middle = (row.bbox[1] + row.bbox[3]) / 2
                division = next((t for top, bottom, t in spans if top <= middle <= bottom), "")

                first = row.cells[COL_AGE0]
                if first is None:
                    fail(f"{name}: 0歳の欄の位置を取れませんでした")
                # 夜間保育園は0歳から5歳がひとつの欄にまとまっている
                if first[2] - first[0] > age_width * 1.5:
                    rows.append(
                        {
                            "division": division,
                            "name": name,
                            "values": None,
                            "total": values[COL_AGE0],
                        }
                    )
                    continue

                ages = []
                for age in range(AGE_COUNT):
                    column = COL_AGE0 + age
                    box = row.cells[column]
                    if box is None:
                        fail(f"{name}: {age}歳の欄の位置を取れませんでした")
                    if values[column]:
                        ages.append(values[column])
                        continue
                    # 空の欄には斜線が引いてある＝そのクラスを設けていない
                    if not has_slash(page, box):
                        fail(f"{name}: {age}歳の欄が空で斜線もありません")
                    ages.append(None)
                rows.append({"division": division, "name": name, "values": ages, "total": None})

    if not rows:
        fail("予定人数の表を取り出せませんでした")
    if len(rows) < 30:
        fail(f"施設が{len(rows)}件しか取れていません")

    return {"target": target, "asOf": as_of, "rows": rows}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
