"""
鎌倉市の「認可保育所等入所 受入可能状況」PDFから表を抜き出す

実行: python scripts/kamakura-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kamakura-vacancy.ts から呼ぶ）

## 表の作り
- 2ページ（表面・裏面）。11列（地域／No./種別／施設名／見学必須／0歳〜5歳）
- 受入可能数は人数。空欄はそのクラスを設けていない
- **地域は縦書きで縦結合**。セルの値が「大船地」「域」のように分かれるので、
  セルの範囲を切り出して文字をつなぐ
- 分園にはNo.と種別が振られていない行がある

## 検算のための持ち出し
- 歳児の欄のx座標の中にある数字を、表とは別に語の単位で拾って合計する
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 5 + AGE_COUNT
COL_AREA = 0
COL_NO = 1
COL_KIND = 2
COL_NAME = 3
COL_AGE0 = 5


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def words_in(page, box):
    ws = sorted(page.crop(box).extract_words(), key=lambda w: (round(w["top"], 1), w["x0"]))
    return "".join(w["text"] for w in ws)


def extract(path):
    rows = []
    legend = []
    target = None
    as_of = None
    word_sum = 0

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            flat = "".join((page.extract_text() or "").split())
            z = str.maketrans("０１２３４５６７８９", "0123456789")

            if page_index == 0:
                m = re.search(r"（([０-９\d]+)月入所審査）", flat.translate(z))
                if not m:
                    fail("対象月を読み取れませんでした")
                target = int(m.group(1))
                m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月([０-９\d]+)日時点", flat.translate(z))
                if not m:
                    fail("基準日を読み取れませんでした")
                as_of = tuple(int(g) for g in m.groups())

            # 「保＝認可保育所、認＝認定こども園、小規模=小規模保育施設、…」
            if not legend:
                for mark, label in re.findall(r"([保認事家]|小規模)[＝=]([^、\s]+)", flat):
                    legend.append({"mark": mark[0], "label": label})

            for table in page.find_tables():
                extracted = table.extract()
                if len(extracted[0]) != EXPECTED_COLUMNS:
                    fail(f"{page_index + 1}ページめの列数が{len(extracted[0])}になっています")
                heads = [cell(c).translate(z) for c in extracted[0][COL_AGE0 : COL_AGE0 + AGE_COUNT]]
                if heads != [f"{i}歳" for i in range(AGE_COUNT)]:
                    fail(f"{page_index + 1}ページめの歳児の見出しが{heads}になっています")

                spans = []
                for i in range(AGE_COUNT):
                    c = table.rows[0].cells[COL_AGE0 + i]
                    if c is None:
                        fail(f"{page_index + 1}ページめの歳児の見出しの位置を取れませんでした")
                    spans.append((c[0], c[2]))
                for word in page.crop(
                    (spans[0][0], table.rows[0].bbox[3], spans[-1][1], table.bbox[3])
                ).extract_words():
                    if re.fullmatch(r"\d+", word["text"]):
                        word_sum += int(word["text"])

                # 地域は縦書き。行ごとに罫線が入っていて文字が分かれるので、
                # 欄のx座標でまとめて切り出し、縦に離れているところで区切る
                # 見出しの行は「施設名」が横に広がっているので、2行めから探す
                area_cell = next((r.cells[COL_AREA] for r in table.rows[1:] if r.cells[COL_AREA]), None)
                if area_cell is None:
                    fail(f"{page_index + 1}ページめの地域の欄の位置を取れませんでした")
                area_words = sorted(
                    page.crop(
                        (area_cell[0], table.rows[0].bbox[3], area_cell[2], table.bbox[3])
                    ).extract_words(),
                    key=lambda w: w["top"],
                )
                groups = []
                for word in area_words:
                    height = word["bottom"] - word["top"]
                    if groups and word["top"] - groups[-1]["bottom"] < height * 2:
                        groups[-1]["text"] += word["text"]
                        groups[-1]["bottom"] = word["bottom"]
                    else:
                        groups.append(
                            {"text": word["text"], "top": word["top"], "bottom": word["bottom"]}
                        )
                # 区切りは、となりあう文字のかたまりの中間
                area_spans = []
                for i, group in enumerate(groups):
                    top = table.rows[0].bbox[3] if i == 0 else (groups[i - 1]["bottom"] + group["top"]) / 2
                    bottom = (
                        table.bbox[3]
                        if i == len(groups) - 1
                        else (group["bottom"] + groups[i + 1]["top"]) / 2
                    )
                    area_spans.append((top, bottom, group["text"]))

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
                    area = ""
                    for span_top, span_bottom, text in area_spans:
                        if span_top <= middle <= span_bottom:
                            area = text
                            break
                    rows.append(
                        {
                            "area": area,
                            "no": values[COL_NO],
                            "kind": values[COL_KIND],
                            "name": name,
                            "values": values[COL_AGE0 : COL_AGE0 + AGE_COUNT],
                        }
                    )

    if not rows:
        fail("受入可能状況の表を取り出せませんでした")
    if len(legend) < 4:
        fail(f"施設の種類の凡例を読み取れませんでした（{len(legend)}件）")

    return {
        "target": target,
        "asOf": as_of,
        "legend": legend,
        "wordSum": word_sum,
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
