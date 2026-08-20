"""
大和市の「保育所等受入可能児童数」Excelを読んでJSONで返す

実行: python scripts/yamato-xlsx-extract.py <xlsx>
出力: 標準出力にJSON（fetch-yamato-vacancy.ts から呼ぶ）

## ファイルの作り
- **1つのファイルに月ごとのシートが並ぶ**（「202609」「202608」…、古いものは数年ぶん）。
- 各シートの1行目に「2026年9月保育所等の受入…」という表題。
- 「№／施 設 名／0歳…5歳／合計」の組が**左右に2つ並ぶ**。
"""

import json
import sys

import openpyxl


def fail(message):
    raise SystemExit(f"[中断] {message}")


def text(v):
    if v is None:
        return ""
    return " ".join(str(v).split())


def extract(path):
    book = openpyxl.load_workbook(path, data_only=True, read_only=True)
    sheets = []
    for ws in book.worksheets:
        rows = [[text(c) for c in r] for r in ws.iter_rows(values_only=True)]
        if not rows:
            continue
        title = next((c for r in rows[:3] for c in r if c), "")
        sheets.append({"name": ws.title, "title": title, "rows": rows})
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
