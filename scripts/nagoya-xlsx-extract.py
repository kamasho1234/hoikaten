"""
名古屋市の「保育所等 募集人数一覧」Excelを読んでJSONで返す

実行: python scripts/nagoya-xlsx-extract.py <xlsx>
出力: 標準出力にJSON（fetch-nagoya-vacancy.ts から呼ぶ）

## ファイルの作り
- シートは1枚（「様式1」）。先頭に表題（「名古屋市 保育所等 令和N年M月募集人数一覧」）と
  「令和N年M月D日時点」、そのあとに注意書きが並ぶ。
- 見出しは2行に分かれている。
  1行目: 施設CD／所在区／施設名／クラス年齢／…／受入可能年齢／備考
  2行目: （クラス年齢の下に）産明け／6ケ月以上／1／2／3／4／5
- **0歳が「産明け」と「6ケ月以上」の2列に分かれている**。1〜5歳は1列ずつ。

## 人数以外に入る値（原典の注記より）
- `-` … 受入可能年齢ではないクラス年齢
- `←` … 左隣のクラス年齢と合わせて募集する（左隣に人数が計上されている）
- `本園に含む` … 分園の人数が本園に含まれている
- `要相談` … 人数が示されていない
いずれも人数が確定しないので、取り込み側で「—」にする。
ここではそのまま文字として返し、判断は fetch 側に任せる。
"""

import json
import re
import sys

import openpyxl

# 産明け・6ケ月以上・1〜5歳の7列
CLASS_COUNT = 7
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def text(v):
    if v is None:
        return ""
    return "".join(str(v).split()).translate(ZEN)


def extract(path):
    book = openpyxl.load_workbook(path, data_only=True)
    if len(book.worksheets) != 1:
        fail(f"シートが{len(book.worksheets)}枚あります（1枚のはず）")
    ws = book.worksheets[0]
    rows = [[text(c) for c in r] for r in ws.iter_rows(values_only=True)]

    header = next((i for i, r in enumerate(rows) if r and r[0] == "施設CD"), None)
    if header is None:
        fail("「施設CD」の見出し行が見つかりません")
    head = rows[header]
    for index, name in ((1, "所在区"), (2, "施設名"), (3, "クラス年齢")):
        if head[index] != name:
            fail(f"見出しが想定と違います（{index}列目が「{head[index]}」）")
    age_col = next((i for i, c in enumerate(head) if c == "受入可能年齢"), None)
    note_col = next((i for i, c in enumerate(head) if c == "備考"), None)
    if age_col is None or note_col is None:
        fail("「受入可能年齢」「備考」の見出しが見つかりません")

    # 2行目のクラス年齢の見出し（産明け／6ケ月以上／1〜5）
    classes = rows[header + 1][3 : 3 + CLASS_COUNT]
    if classes[0] != "産明け" or "6" not in classes[1]:
        fail(f"クラス年齢の見出しが想定と違います: {classes}")
    for age in range(1, 6):
        if classes[1 + age] != str(age):
            fail(f"クラス年齢の見出しが想定と違います: {classes}")

    title = ""
    as_of = None
    target = None
    notes = []
    for row in rows[:header]:
        for cell in row:
            if not cell:
                continue
            if not title and "募集人数一覧" in cell:
                title = cell
                m = re.search(r"令和(\d+)年(\d+)月募集人数一覧", cell)
                if m:
                    target = (int(m.group(1)), int(m.group(2)))
            if as_of is None:
                m = re.search(r"令和(\d+)年(\d+)月(\d+)日時点", cell)
                if m:
                    as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
            if cell.startswith("・") and len(cell) > 5:
                notes.append(cell.lstrip("・").strip())
    if as_of is None:
        fail("「令和N年M月D日時点」を読み取れませんでした")
    if target is None:
        fail("「令和N年M月募集人数一覧」を読み取れませんでした")

    facilities = []
    for row in rows[header + 2 :]:
        if not row or not row[0]:
            continue
        code, ward, name = row[0], row[1], row[2]
        if not ward or not name:
            fail(f"施設CD {code}: 所在区か施設名が空です")
        facilities.append(
            {
                "code": code,
                "ward": ward,
                "name": name,
                "classes": [row[3 + i] if 3 + i < len(row) else "" for i in range(CLASS_COUNT)],
                "acceptAge": row[age_col] if age_col < len(row) else "",
                "note": row[note_col] if note_col < len(row) else "",
            }
        )

    if not facilities:
        fail("施設の行を取り出せませんでした")

    return {
        "title": title,
        "asOf": as_of,
        "target": target,
        "notes": notes,
        "facilities": facilities,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("Excelのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
