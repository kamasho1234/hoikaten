"""
伊豆市の「市内認定こども園・保育園空き状況」Excelから表を抜き出してJSONで返す

実行: python scripts/izu-xlsx-extract.py <xlsx>
出力: 標準出力にJSON（fetch-izu-vacancy.ts から呼ぶ）

## 表の作り
- シート1枚。認定こども園と保育園で表が分かれ、その間に空の行が入る
- それぞれの表の見出しは「＜類型＞／（公立私立）／所在地／電話番号／受入年齢／
  ０歳児クラス〜５歳児クラス」
- 空きは記号（◎余裕あり／〇若干名／△残りわずか／要相談）
- 1行目が表題で、そこに対象月（令和8年10月入園）が入る
"""

import json
import re
import sys

import openpyxl

AGE_COUNT = 6


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(v):
    return "".join(str(v if v is not None else "").split())


def extract(path):
    book = openpyxl.load_workbook(path, data_only=True)
    sheet = book.worksheets[0]
    grid = [[cell(c) for c in row] for row in sheet.iter_rows(values_only=True)]
    if not grid:
        fail("シートが空です")

    title = grid[0][0] if grid[0] else ""
    m = re.search(r"令和(\d+)年(\d{1,2})月入園", title.translate(str.maketrans("０１２３４５６７８９", "0123456789")))
    if not m:
        fail(f"表題から対象月を読み取れませんでした（「{title}」）")
    target = [int(m.group(1)), int(m.group(2))]

    rows = []
    category = None
    age_start = -1
    for row in grid:
        if not row or not row[0]:
            continue
        # 見出しの行（同じ行に「所在地」と「０歳児クラス」が並ぶ）で節が変わる
        if "所在地" in row:
            zero = next(
                (i for i, c in enumerate(row) if re.fullmatch(r"[０0]歳児クラス", c)), -1
            )
            if zero < 0:
                continue
            category = row[0]
            age_start = zero
            continue
        if category is None or age_start < 0:
            continue
        values = []
        for age in range(AGE_COUNT):
            i = age_start + age
            values.append(row[i] if i < len(row) else "")
        if not any(values):
            continue
        rows.append({"category": category, "name": row[0], "values": values})

    if not rows:
        fail("施設の行を取り出せませんでした")
    return {"target": target, "rows": rows}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("Excelのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
