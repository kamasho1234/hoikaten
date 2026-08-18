"""
練馬区の「認可保育園入園空き状況表」PDFから表を抜き出してJSONで返す

実行: python scripts/nerima-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-nerima-vacancy.ts から呼ぶ）

## この表がやっかいな理由
1. **空欄が「空きなし」で、黒塗りが「そのクラスを実施していない」**。
   extract_tables ではどちらも空文字になるので区別がつかない。
   **塗りつぶし矩形（non_stroking_color が 0.502 のグレー）の座標を年齢列の範囲と突き合わせて判別する**。
2. **0歳が「100日以上 / 6か月以上 / 8か月以上」の3列に分かれる**。
   園ごとに受け入れる月齢が違うだけで、値はどれか1つにしか入らないので合算して0歳とする。
3. **「産3」「産」が空き数と同じセルに入る**（産休明け保育の実施と受入上限を示す表記）。
   数字だけを空き数として取り、産休明けの表記は別に持つ。
4. 表の最終行に凡例が紛れ込む。施設コードの形（10-0001）を持たない行は捨てる。

## ページ構成
1〜4ページが認可保育園（地区別）、5〜7ページが小規模保育など、8〜9ページが家庭的保育事業、
10ページが認定こども園、11ページが居宅訪問型保育事業。表の種類は各ページの見出しで決める。
"""

import json
import re
import sys

import pdfplumber

# セルの塗り色。グレーが「実施していないクラス」
GRAY = "0.502"
CODE = re.compile(r"^\d{2}-\d{4}$")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def normalize(s):
    """見出しの比較用。空白をすべて落とす"""
    if s is None:
        return ""
    return "".join(str(s).split())


def cell_text(s):
    """
    セルの値用。**空白は1つに詰めるが残す**。
    「産3 1」の空白を落とすと「産31」になり、産休明けの上限と空き数を分けられなくなる
    """
    if s is None:
        return ""
    return " ".join(str(s).split())


def parse_cell(v, where):
    """
    セルから空き数と産休明けの表記を取り出す。
    「産3 1」なら産休明け上限3・空き1、「産3」なら産休明け上限3・空き0、「2」なら空き2。
    """
    v = normalize(v)
    if v == "":
        return 0, None
    m = re.fullmatch(r"産(\d*)(\d*)", v)
    if v.startswith("産"):
        rest = v[1:]
        m2 = re.fullmatch(r"(\d*)", rest)
        if m2:
            # 「産」だけ、または「産3」。数字は産休明けの受入上限で、空きは0
            return 0, ("産" + rest) if rest else "産"
        m3 = re.match(r"^(\d+)\s*(\d+)$", rest)
        if m3:
            return int(m3.group(2)), "産" + m3.group(1)
        fail(f"{where}: 産休明けの表記を読めません: 「{v}」")
    if re.fullmatch(r"\d+", v):
        return int(v), None
    fail(f"{where}: 空き数として読めません: 「{v}」")


ZEN_NUM = str.maketrans("０１２３４５", "012345")


def column_ranges(page, table):
    """
    ヘッダー行の各セルを実際に切り出して見出しを読み、年齢列の x 範囲を決める。
    extract() は列数を揃えて返すので、結合セルのあるヘッダー行とは対応が取れない。
    セルの bbox から直接読むこと。
    """
    ranges = {}
    for cell in table.rows[0].cells:
        if not cell:
            continue
        x0, top, x1, bottom = cell
        try:
            t = normalize(page.crop((x0, top, x1, bottom)).extract_text() or "")
        except ValueError:
            continue
        t = t.translate(ZEN_NUM)
        m = re.fullmatch(r"([0-5])歳", t)
        if m:
            ranges[f"{m.group(1)}歳"] = (x0, x1)
    return ranges


def gray_rects(page):
    return [r for r in page.rects if str(r.get("non_stroking_color")) == GRAY]


def extract(path):
    out = {"asOf": set(), "target": set(), "sections": []}
    with pdfplumber.open(path) as pdf:
        for pi, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            head = text.split("\n")[0] if text else ""
            m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月", head)
            z = str.maketrans("０１２３４５６７８９", "0123456789")
            if m:
                out["target"].add((int(m.group(1).translate(z)), int(m.group(2).translate(z))))
            m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月([０-９\d]+)日公表", text)
            if m:
                out["asOf"].add(
                    (
                        int(m.group(1).translate(z)),
                        int(m.group(2).translate(z)),
                        int(m.group(3).translate(z)),
                    )
                )
            # 見出しから表の種類を決める
            if "認可保育園入園空き状況表" in head:
                kind = "認可保育園"
            elif "家庭的保育事業" in text[:200]:
                kind = "家庭的保育事業"
            elif "認定こども園" in text[:200]:
                kind = "認定こども園"
            elif "居宅訪問型保育事業" in text[:200]:
                kind = "居宅訪問型保育事業"
            else:
                kind = "小規模保育事業等"
            area = head.split()[0] if head else ""

            grays = gray_rects(page)
            for table in page.find_tables():
                data = table.extract()
                if not data:
                    continue
                header = [normalize(c) for c in data[0]]
                if "施設名" not in header and "保育園名" not in header and "家庭的保育事業者名" not in header:
                    continue
                ranges = column_ranges(page, table)
                rows_out = []
                for ri, row in enumerate(table.rows):
                    if ri == 0:
                        continue
                    cells = [cell_text(c) for c in data[ri]]
                    if not any(cells):
                        continue
                    # 施設コードを持たない行（凡例など）は捨てる
                    code = next((c for c in cells if CODE.fullmatch(c)), None)
                    name = cells[0]
                    if not name:
                        continue
                    if kind != "認定こども園" and not code:
                        continue
                    top, bottom = row.bbox[1], row.bbox[3]
                    # この行にかかるグレー矩形
                    row_grays = [
                        g for g in grays if g["top"] < bottom - 1 and g["bottom"] > top + 1
                    ]
                    rows_out.append(
                        {
                            "name": name,
                            "code": code,
                            "cells": cells,
                            "header": header,
                            "grayRanges": [(g["x0"], g["x1"]) for g in row_grays],
                            "colRanges": {k: list(v) for k, v in ranges.items()},
                        }
                    )
                if rows_out:
                    out["sections"].append({"page": pi + 1, "kind": kind, "area": area, "rows": rows_out})
    out["asOf"] = sorted(out["asOf"])
    out["target"] = sorted(out["target"])
    return out


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
