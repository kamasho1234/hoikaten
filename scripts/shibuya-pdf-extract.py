"""
渋谷区の「保育所利用申込み 申込み・内定状況一覧」PDFから表を抜き出す

実行: python scripts/shibuya-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-shibuya-vacancy.ts から呼ぶ）

## 表の作り
- 2ページ。20列（区分／保育所等名／0歳児〜5歳児それぞれ募集数・申込数・倍率）
- 施設ごとに2行あり、下の行は「最後に内定された方の指数等」。数字は上の行にだけ入る
- 空欄はそのクラスを設けていない施設
- **園名の欄の罫線がページの終わりで途切れる**ことがあり、そこだけ名前が
  セルとして取れない。園名の欄のx座標で切り出して拾い直す
- **区分の欄は縦書き**で、しかもページをまたぐブロックがある。
  罫線で区切られた領域ごとに文字を拾い、文字のない領域は前から引き継ぐ

## 検算のための持ち出し
- 募集数と申込数の欄のx座標の中にある数字を、表とは別に語の単位で拾って合計する
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 2 + AGE_COUNT * 3
COL_KIND = 0
COL_NAME = 1
COL_AGE0 = 2


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def words_in(page, box):
    """縦書きも読めるように、上から順に語をつなぐ"""
    ws = sorted(page.crop(box).extract_words(), key=lambda w: (round(w["top"], 1), w["x0"]))
    return "".join(w["text"] for w in ws)


def kind_regions(page, table):
    """区分の欄を、罫線で区切られた領域に分けて [(top, bottom, 名前)] を返す"""
    bounds = []
    x0 = x1 = None
    for row in table.rows:
        c = row.cells[COL_KIND]
        if c is None:
            continue
        x0, x1 = c[0], c[2]
        bounds.append((c[1], c[3]))
    if not bounds:
        return []
    # 罫線が途切れて表の終わりまで区切りがない部分も、ひとつの領域として扱う
    if bounds[-1][1] < table.bbox[3] - 1:
        bounds.append((bounds[-1][1], table.bbox[3]))
    regions = []
    for top, bottom in bounds:
        name = words_in(page, (x0, top, x1, bottom))
        regions.append((top, bottom, name))
    return regions


def extract(path):
    rows = []
    target = None
    as_of = None
    word_sum = 0
    kind = ""

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            flat = "".join((page.extract_text() or "").split())
            z = str.maketrans("０１２３４５６７８９", "0123456789")

            if page_index == 0:
                m = re.search(
                    r"令和([０-９\d]+)年([０-９\d]+)月([０-９\d]+)日保育所利用申込み", flat.translate(z)
                )
                if not m:
                    fail("対象の月を読み取れませんでした")
                target = tuple(int(g) for g in m.groups())
                m = re.search(r"一覧令和([０-９\d]+)年([０-９\d]+)月([０-９\d]+)日", flat.translate(z))
                if not m:
                    fail("作成日を読み取れませんでした")
                as_of = tuple(int(g) for g in m.groups())

            tables = page.find_tables()
            if len(tables) != 1:
                fail(f"{page_index + 1}ページめの表が{len(tables)}件あります")
            table = tables[0]
            extracted = table.extract()
            if len(extracted[0]) != EXPECTED_COLUMNS:
                fail(f"{page_index + 1}ページめの列数が{len(extracted[0])}になっています")
            heads = [cell(c) for c in extracted[1][COL_AGE0 : COL_AGE0 + AGE_COUNT * 3]]
            if heads != ["募集数", "申込数", "倍率"] * AGE_COUNT:
                fail(f"{page_index + 1}ページめの見出しが{heads}になっています")

            # 募集数と申込数の欄だけを切り出して、数字を数える
            for age in range(AGE_COUNT):
                for offset in (0, 1):
                    c = table.rows[1].cells[COL_AGE0 + age * 3 + offset]
                    if c is None:
                        fail(f"{page_index + 1}ページめの{age}歳児の見出しの位置を取れませんでした")
                    for word in page.crop((c[0], table.rows[1].bbox[3], c[2], table.bbox[3])).extract_words():
                        if re.fullmatch(r"\d+", word["text"]):
                            word_sum += int(word["text"])

            regions = kind_regions(page, table)
            name_cell = next((r.cells[COL_NAME] for r in table.rows if r.cells[COL_NAME]), None)
            if name_cell is None:
                fail(f"{page_index + 1}ページめの園名の欄の位置を取れませんでした")

            for row_index, row in enumerate(table.rows):
                values = [cell(c) for c in extracted[row_index]]
                # 倍率の欄に小数が入っている行が施設の行。もう一方は指数の行
                ratios = [values[COL_AGE0 + age * 3 + 2] for age in range(AGE_COUNT)]
                if not any(re.fullmatch(r"\d+\.\d+", r) for r in ratios):
                    continue

                name = values[COL_NAME]
                if not name:
                    name = "".join(
                        words_in(page, (name_cell[0], row.bbox[1], name_cell[2], row.bbox[3])).split()
                    )
                if not name:
                    fail(f"{page_index + 1}ページめに園名を読めない行があります")

                middle = (row.bbox[1] + row.bbox[3]) / 2
                for top, bottom, region_name in regions:
                    if top <= middle <= bottom and region_name and region_name != "区分":
                        kind = region_name
                        break
                rows.append(
                    {
                        "kind": kind,
                        "name": name,
                        "values": values[COL_AGE0 : COL_AGE0 + AGE_COUNT * 3],
                    }
                )

    if not rows:
        fail("申込み・内定状況の表を取り出せませんでした")

    return {"target": target, "asOf": as_of, "wordSum": word_sum, "rows": rows}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
