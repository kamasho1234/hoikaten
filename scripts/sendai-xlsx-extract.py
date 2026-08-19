"""
仙台市の「利用調整後の空枠情報」Excelを読んでJSONで返す

実行: python scripts/sendai-xlsx-extract.py <xlsx>
出力: 標準出力にJSON（fetch-sendai-vacancy.ts から呼ぶ）

## ファイルの作り
- **区ごとにシートが分かれる**（（青葉区）（宮城総合支所）（宮城野区）（若林区）（太白区）（泉区））。
- 各シートの先頭に表題と注記があり、「種別」で始まる行が見出し。その次から施設が並ぶ。
- 列は「種別／保育施設等名／住所／受入可能年・月齢／0歳児…5歳児」。
- **種別の列は縦に結合**されていて、変わるときだけ値が入る。
- 表題の右に「（令和8年8月17日時点）」が入る。これがデータの時点。
"""

import json
import re
import sys

import openpyxl


def fail(message):
    raise SystemExit(f"[中断] {message}")


def text(v):
    if v is None:
        return ""
    return str(v).strip()


def reiwa_to_year(reiwa):
    return 2018 + reiwa


def find_as_of(rows):
    """「（令和8年8月17日時点）」を探して YYYY-MM-DD にする"""
    for row in rows[:12]:
        for cell in row:
            m = re.search(r"令和(\d+)年(\d+)月(\d+)日時点", text(cell))
            if m:
                y = reiwa_to_year(int(m.group(1)))
                return f"{y}-{int(m.group(2)):02d}-{int(m.group(3)):02d}"
    return ""


def extract(path):
    book = openpyxl.load_workbook(path, data_only=True)
    sheets = []
    for ws in book.worksheets:
        rows = [list(r) for r in ws.iter_rows(values_only=True)]
        header = next((i for i, r in enumerate(rows) if r and text(r[0]) == "種別"), None)
        if header is None:
            fail(f"{ws.title}: 「種別」の見出し行が見つかりません")
        head = [text(c) for c in rows[header]]
        expected = ["種別", "保育施設等名", "住所"]
        if head[:3] != expected:
            fail(f"{ws.title}: 見出しが想定と違います: {head[:6]}")
        for i in range(6):
            if f"{i}歳児" not in "".join(head[4 + i].split()):
                fail(f"{ws.title}: {i}歳児の見出しが {head[4 + i]!r} になっています")
        title = next((text(c) for c in rows[0] if text(c)), "")
        sheets.append(
            {
                "name": ws.title,
                "title": title,
                "asOf": find_as_of(rows),
                # セル内改行を1行に詰めてから渡す
                "rows": [[" ".join(text(c).split()) for c in r] for r in rows[header + 1 :]],
            }
        )
    if not sheets:
        fail("シートが1枚もありません")
    return {"sheets": sheets}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("Excelのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
