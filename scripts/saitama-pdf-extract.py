"""
さいたま市の「認可保育所等 空き状況」PDFから表を抜き出してJSONで返す

実行: python scripts/saitama-pdf-extract.py <pdf> [<pdf> ...]
出力: 標準出力にJSON（fetch-saitama-vacancy.ts から呼ぶ）

## 川崎市のPDFと違うところ
- **1つのPDFに表が3〜5個ある**。「認可保育園」「認定こども園」「地域型保育事業所」で、
  地域型はさらに「○小規模保育事業」「○事業所内保育事業（地域枠）」「○家庭的保育事業」に分かれる。
  **どの事業があるかは区によって違う**。
- **地域型の表は0〜2歳しかない**。年齢列の数が表ごとに違う。
- **列数が 7/8/10/11 とばらつく**（施設種別の列が有る表と無い表がある）ので、
  川崎市と同じく**見出し名から列位置を引く**。

## 表がどの種別かは「直前の見出し行」で決める
表そのものに種別は書かれていない。page.find_tables() の bbox と、
語句を行単位に束ねた top 座標を比べ、**表より上にある最後の見出し**をその表の種別とする。

## ページまたぎの継続表
南区の認可保育園は1ページに収まらず、2ページ目の先頭に**ヘッダー行も見出しも無い表**として続く。
表より上に見出しが1つも無ければ「前ページの続き」と判定し、呼び出し側が直前の表に連結する。
"""

import json
import re
import sys

import pdfplumber

# 「さいたま市○区認可保育園利用可能人数」「○小規模保育事業」などを拾う。
# 南区のPDFは見出しが「さいたま南区…」と市が抜けているので「市」は任意にする
HEADING = re.compile(r"さいたま市?.+?(認可保育園|認定こども園|地域型保育事業所)利用可能人数|^○(.+?事業)")
# 基準日（R8.8.1）
AS_OF = re.compile(r"R(\d+)\.(\d+)\.(\d+)")

AGE_LABELS_6 = ["０歳児", "１歳児", "２歳児", "３歳児", "４歳児", "５歳児"]
AGE_LABELS_3 = AGE_LABELS_6[:3]
KEY_COLUMNS = ["区", "保育所コード", "施設名"]


def fail(message):
    raise SystemExit(f"[中断] {message}")


def normalize(s):
    """セルの改行と前後の空白を落とす"""
    if s is None:
        return ""
    return "".join(str(s).split())


def heading_lines(page):
    """見出しの (top座標, 文字列) を上から順に返す"""
    rows = {}
    for w in page.extract_words():
        rows.setdefault(round(w["top"]), []).append(w)
    found = []
    for top in sorted(rows):
        text = "".join(x["text"] for x in sorted(rows[top], key=lambda x: x["x0"]))
        if HEADING.search(text):
            found.append((top, text))
    return found


def split_total_row(cells, header):
    """
    合計行の1セル目が「合計 41」のように結合されていることがある（南区の小規模保育）。
    「合計」と数値に割り、数値は**年齢列のうち空いているところ**に入れ直す。

    どの年齢の値かは、行の「合計」列から他の年齢の和を引いた値と一致するかで確かめる。
    一致しなければ当てずっぽうになるので中断する。
    """
    m = re.fullmatch(r"合計(\d+)", cells[0])
    if not m:
        return cells
    if header is None:
        fail(f"ヘッダーの無い表に結合された合計行があります: {cells}")
    cells = list(cells)
    cells[0] = "合計"
    value = int(m.group(1))

    ages = [a for a in (AGE_LABELS_6 if "３歳児" in header else AGE_LABELS_3) if a in header]
    total_index = header.index("合計")
    total = cells[total_index] if total_index < len(cells) else ""
    if not re.fullmatch(r"\d+", total):
        fail(f"合計行に合計値がありません: {cells}")

    known = 0
    blanks = []
    for a in ages:
        i = header.index(a)
        v = cells[i] if i < len(cells) else ""
        if v == "":
            blanks.append(i)
        else:
            known += int(v)
    if len(blanks) != 1:
        fail(f"合計行の空き列が1つに定まりません（{len(blanks)}個）: {cells}")
    if known + value != int(total):
        fail(f"結合された合計値 {value} が合計 {total} と整合しません: {cells}")
    cells[blanks[0]] = str(value)
    return cells


def extract(path):
    tables = []
    as_of = set()
    last_header = None
    with pdfplumber.open(path) as pdf:
        page_count = len(pdf.pages)
        for page in pdf.pages:
            text = page.extract_text() or ""
            for m in AS_OF.finditer(text):
                as_of.add(m.group(0))
            heads = heading_lines(page)
            found = page.find_tables()
            for t in found:
                above = [h for h in heads if h[0] < t.bbox[1]]
                kind = above[-1][1] if above else None
                rows = t.extract()
                if not rows:
                    continue
                header = [normalize(c) for c in rows[0]]
                if header[:3] == KEY_COLUMNS:
                    body = rows[1:]
                elif kind is None:
                    # 見出しもヘッダーも無い＝前ページからの続き
                    header = None
                    body = rows
                else:
                    fail(f"{path}: 表の1行目が見出し行ではありません: {header}")
                if header is not None:
                    ages = AGE_LABELS_6 if "３歳児" in header else AGE_LABELS_3
                    missing = [c for c in ages + ["合計"] if c not in header]
                    if missing:
                        fail(f"{path}: 必要な列がありません: {missing} / 実際: {header}")
                # 継続表はヘッダーが無いので、直前の表の見出しで合計行を割る
                current_header = header if header is not None else last_header
                rows_out = []
                for r in body:
                    cells = [normalize(c) for c in r]
                    if cells and cells[0].startswith("合計"):
                        cells = split_total_row(cells, current_header)
                    rows_out.append(cells)
                if header is not None:
                    last_header = header
                tables.append({"kind": kind, "header": header, "rows": rows_out})
    return {"pageCount": page_count, "asOf": sorted(as_of), "tables": tables}


def main():
    paths = sys.argv[1:]
    if not paths:
        fail("PDFのパスを引数で指定してください。")
    out = {p: extract(p) for p in paths}
    # Windowsの既定は cp932 で、施設名がそのままでは壊れる
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(out, sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
