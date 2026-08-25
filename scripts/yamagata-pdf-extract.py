"""
山形市の「受入可能予定人数」PDFから表を抜き出す

実行: python scripts/yamagata-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-yamagata-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに**4つの表**が2段組みで置かれている
  1. 認可保育所（公立・民間立）
  2. 認定こども園（保育所型・幼保連携型・幼稚園型）
  3. 小規模保育事業
  4. 家庭的保育事業（保育ママ）… **0〜2歳児がひとまとめの1列**で、年齢別ではない
- どの表にも末尾に「◯◯計」の行があり、年齢ごとの合計が入っている（検算に使える）
- 空らんは空きなし（0人）。数字が入っているところだけ空きがある
- 施設名の末尾の「※」はページ下部の注記への印なので、施設名からは落とす
- 本文の「（年齢は令和８年４月１日現在の年齢となります）」は**クラス年齢の基準日**で、
  データの時点ではない。時点は表題の右にある「令和８年８月１８日現在」
- 施設の分類（1列目）は結合セルだが、幼保連携型のように**縦書きで文字が混ざる**ものがある。
  最初に現れた分類から「（…）」を落として大分類だけを使う
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def read_table(table, index):
    extracted = table.extract()
    head = [cell(c) for c in extracted[0]]
    if len(head) < 3 or not head[1].startswith("施設名"):
        return None

    # 年齢の見出し。認可保育所などは「0歳児」〜「5歳児」、
    # 家庭的保育事業は「0～2歳児」の1列だけ
    ages = [h for h in head[2:] if h.endswith("歳児")]
    if not ages:
        fail(f"{index}番目の表に年齢の見出しがありません: {head}")
    grouped = len(ages) == 1
    if not grouped and len(ages) != AGE_COUNT:
        fail(f"{index}番目の表の年齢の見出しが{len(ages)}個です: {ages}")

    rows = []
    totals = None
    category = ""
    for values in (list(map(cell, r)) for r in extracted[1:]):
        name = values[1]
        if not name:
            continue
        if not category and values[0]:
            # 「認可保育所（公立）」→「認可保育所」
            category = re.sub(r"[（(].*", "", values[0]).strip()
        marks = values[2 : 2 + len(ages)]
        if name.endswith("計"):
            if totals is not None:
                fail(f"{index}番目の表に合計の行が2つあります")
            totals = marks
            continue
        rows.append({"name": name.rstrip("※").strip(), "marks": marks})

    if totals is None:
        fail(f"{index}番目の表に合計の行がありません")
    if not category:
        fail(f"{index}番目の表の分類が空です")
    return {"category": category, "grouped": grouped, "rows": rows, "totals": totals}


def extract(path):
    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月の受入可能予定人数", flat)
        if not m:
            fail("表題（令和N年M月の受入可能予定人数）を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        # 「（年齢は令和８年４月１日現在の年齢となります）」はクラス年齢の基準日で、
        # データの時点ではない。かっこの中を落としてから探す
        without_ages = re.sub(r"[（(]年齢は[^）)]*[）)]", "", flat)
        m = re.search(r"令和(\d+)年(\d+)月(\d+)日現在", without_ages)
        if not m:
            fail("「令和N年M月D日現在」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        notes = []
        for line in text.splitlines():
            line = line.strip()
            if line.startswith("※") or line.startswith("・"):
                notes.append(line.lstrip("※・").strip())

        groups = []
        for index, table in enumerate(page.find_tables()):
            got = read_table(table, index)
            if got:
                groups.append(got)

    if len(groups) < 3:
        fail(f"表が{len(groups)}個しか取れていません")

    return {
        "asOf": as_of,
        "target": target,
        "notes": [n for n in notes if len(n) > 8],
        "groups": groups,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
