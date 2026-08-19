"""
船橋市の「保育所等の受入れ可能性一覧」Excelを読んでJSONで返す

実行: python scripts/funabashi-xlsx-extract.py <xlsx>
出力: 標準出力にJSON（fetch-funabashi-vacancy.ts から呼ぶ）

## ファイルの作り
- シート1枚。1行目に「令和8年9月」「保育所等の受入れ可能性一覧」と作成日（日付の値）。
- 4行目に凡例（空白＝受入れ見込みなし、／＝該当クラスなし）。
- 5行目が見出し「地区／保育所等の種別／／／保育所等の名称（略称）／地名／定員／0歳…5歳」。
- **地区の列は縦に結合**されていて、変わるときだけ値が入る。
"""

import datetime
import json
import sys

import openpyxl


def fail(message):
    raise SystemExit(f"[中断] {message}")


def text(v):
    if v is None:
        return ""
    if isinstance(v, (datetime.datetime, datetime.date)):
        return v.strftime("%Y-%m-%d")
    return " ".join(str(v).split())


def extract(path):
    book = openpyxl.load_workbook(path, data_only=True)
    ws = book.worksheets[0]
    rows = [[text(c) for c in r] for r in ws.iter_rows(values_only=True)]

    header = next((i for i, r in enumerate(rows) if r and r[0] == "地区"), None)
    if header is None:
        fail("「地区」の見出し行が見つかりません")

    title = " ".join(c for c in rows[0] if c and not c.startswith("20"))
    created = next((c for c in rows[0] if c.startswith("20")), "")
    legend = ""
    for r in rows[:header]:
        for c in r:
            if "【凡例】" in c:
                legend = c
                break
        if legend:
            break
    if not legend:
        fail("凡例が見つかりません")

    return {
        "title": title,
        "lead": created,
        "legend": legend,
        "head": rows[header],
        "rows": rows[header + 1 :],
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("Excelのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
