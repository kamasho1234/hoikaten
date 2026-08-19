"""
江東区の「募集人員一覧表」PDFから表を抜き出してJSONで返す

実行: python scripts/koto-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-koto-vacancy.ts から呼ぶ）

## 表の作り
- **地区ごとにページが分かれた1本のPDF**。各ページの本文に
  「令和8年9月入所募集人員一覧表 （白河・富岡地区）」のように地区名が入る。
- 施設の表は17列。地区／施設名／区分／施設コード／所在地／電話／
  ０〜５歳＋合計／入園可能年齢（月齢）／開所時間／小規模連携園／MAP番号。
- ページ先頭に**開所時間の凡例（5列の表）**が入るページがあるので、
  「施設コード」を持つ表だけを採る。
- **施設コードがある**ので施設IDに使える。所在地と電話も載っている。

## 「空欄」と「斜線」の区別（ここが肝）
凡例に **「斜線は定員設定なし、空欄は空き（募集）予定なし」** と書かれている。
`extract()` ではどちらも空文字になるため、**セルの矩形に斜めの curve があるか**で判定する。
斜線があれば「そのクラスを設けていない」= null、無ければ 0（募集予定なし）。

判定の妥当性は「入園可能年齢（月齢）」で裏が取れる。
「3歳～」の園は0〜2歳に斜線、「1歳～」の園は0歳に斜線が引かれている。

## 検算
**各行に合計列がある**ので、年齢別の和と突き合わせる（取り込み側で実施）。
"""

import json
import re
import sys

import pdfplumber

# 数字だけを半角にする。**長音符「ー」は変換しない**
# （変換すると見出しの「施設コード」が「施設コ-ド」になって照合できなくなる）
Z = str.maketrans("０１２３４５６７８９", "0123456789")
AGE_HEADS = ["0歳", "1歳", "2歳", "3歳", "4歳", "5歳"]


def fail(message):
    raise SystemExit(f"[中断] {message}")


def normalize(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(Z)


def cell_text(s):
    if s is None:
        return ""
    return " ".join(str(s).split())


def diagonal_curves(page):
    """斜め線として引かれている curve だけを集める"""
    return [
        c
        for c in page.curves
        if abs(c["x0"] - c["x1"]) > 1 and abs(c["top"] - c["bottom"]) > 1
    ]


def has_diagonal(cell, curves):
    """セルの矩形に収まる斜め線があるか"""
    if not cell:
        return False
    x0, top, x1, bottom = cell
    return any(
        x0 - 1 <= c["x0"] and c["x1"] <= x1 + 1 and top - 1 <= c["top"] and c["bottom"] <= bottom + 1
        for c in curves
    )


def resolve_merged(table_obj, rows, col, page):
    """
    縦に結合されたセル（地区）の値を配る。

    地区は縦書きなので `extract()` だと文字が欠ける。**セルの矩形内の文字を
    上から順に連結し直す**（葛飾区と同じ対処）。
    """
    cells = [r.cells[col] if col < len(r.cells) else None for r in table_obj.rows]
    resolved = [""] * len(rows)
    starts = [i for i, c in enumerate(cells) if c is not None]
    for si, start in enumerate(starts):
        end = min(starts[si + 1] - 1 if si + 1 < len(starts) else len(rows) - 1, len(rows) - 1)
        bbox = cells[start]
        chars = [
            ch
            for ch in page.chars
            if bbox[0] <= (ch["x0"] + ch["x1"]) / 2 <= bbox[2]
            and bbox[1] <= (ch["top"] + ch["bottom"]) / 2 <= bbox[3]
        ]
        chars.sort(key=lambda ch: (round(ch["top"], 1), ch["x0"]))
        value = "".join(ch["text"] for ch in chars).strip()
        if not value:
            value = next((cell_text(rows[j][col]) for j in range(start, end + 1) if cell_text(rows[j][col])), "")
        for j in range(start, end + 1):
            resolved[j] = value
    carried = ""
    for ri in range(len(rows)):
        if resolved[ri]:
            carried = resolved[ri]
        else:
            resolved[ri] = carried
    return resolved


def extract(path):
    tables = []
    as_of = set()
    target = set()
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月([０-９\d]+)日現在", text)
            if m:
                as_of.add(tuple(int(g.translate(Z)) for g in m.groups()))
            m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月入所募集人員一覧表", text)
            if m:
                target.add(tuple(int(g.translate(Z)) for g in m.groups()))
            # 「令和8年9月入所募集人員一覧表 （白河・富岡地区）」から地区名を拾う
            area = ""
            am = re.search(r"入所募集人員一覧表\s*[（(]([^）)]+)[）)]", text)
            if am:
                area = am.group(1).strip()

            curves = diagonal_curves(page)
            for table_obj in page.find_tables():
                rows = [list(r) for r in table_obj.extract()]
                if len(rows) < 3:
                    continue
                head = [normalize(c) for c in rows[0]]
                if "施設コード" not in head:
                    continue  # 開所時間の凡例など
                ages = [normalize(c) for c in rows[1]]
                if not all(a in ages for a in AGE_HEADS):
                    fail(f"年齢の見出しが見つかりません: {ages}")
                age_cols = [ages.index(a) for a in AGE_HEADS]

                body_start = 2
                # 年齢セルの斜線（=定員設定なし）を行ごとに記録する
                diag = []
                for row_obj in table_obj.rows[body_start:]:
                    diag.append([has_diagonal(row_obj.cells[c] if c < len(row_obj.cells) else None, curves) for c in age_cols])

                tables.append(
                    {
                        "area": area,
                        "columns": {
                            "name": head.index("施設名"),
                            "kubun": head.index("施設名") + 1,
                            "code": head.index("施設コード"),
                            "address": head.index("所在地") if "所在地" in head else None,
                            "tel": head.index("電話") if "電話" in head else None,
                            "ages": age_cols,
                            "total": ages.index("合計") if "合計" in ages else None,
                            "minAge": head.index("入園可能年齢（月齢）") if "入園可能年齢（月齢）" in head else None,
                        },
                        "areaByRow": resolve_merged(table_obj, rows, 0, page)[body_start:],
                        "rows": [[cell_text(c) for c in r] for r in rows[body_start:]],
                        "noClass": diag,
                    }
                )
    if not tables:
        fail("施設の表を1つも取り出せませんでした")
    return {"asOf": sorted(as_of), "target": sorted(target), "tables": tables}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
