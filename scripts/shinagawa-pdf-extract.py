"""
品川区の「入園可能数（予定）」PDFから表を抜き出してJSONで返す

実行: python scripts/shinagawa-pdf-extract.py <保育園PDF> <小規模保育事業等PDF>
出力: 標準出力にJSON（fetch-shinagawa-vacancy.ts から呼ぶ）

## 表の作り
- **保育園のPDFは17列**。番号／夜間保育／０歳児園／保育園名／定員3列／
  入園可能数（０歳・１歳・２歳・小計・３歳・４歳・５歳・小計・合計）／備考。
- **区立と私立でセクションが分かれ**、各ページの本文に「●区立保育園」「●私立保育園（続き）」が出る。
  表と見出しの対応は**表の上端より上にある直近の見出し**で決める。
- **認定こども園は「伊藤（短時間）」という行が続く**。番号が空で、定員も空。
  同じ園の短時間認定枠なので、別の行として名前ごと持つ。
- **「区 立 小 計」「私 立 小 計」「合 計」の行がある**ので検算に使える（施設としては除外する）。
- 小規模保育事業等のPDFは6列で、家庭的保育事業と小規模保育事業の2表。こちらも合計行を持つ。
- `-` は対象年齢外。数字は入園可能数で、0は「空き0」。
"""

import json
import re
import sys

import pdfplumber

Z = str.maketrans("０１２３４５６７８９－ー", "0123456789--")
AGE6 = ["0歳", "1歳", "2歳", "3歳", "4歳", "5歳"]
AGE3 = ["0歳", "1歳", "2歳"]
# 合計行の名前（空白を潰して判定する）
TOTAL_LABELS = re.compile(r"^(区立小計|私立小計|合計|小計)$")


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


def age_columns(rows, labels):
    """
    見出し2行目から年齢列の位置を拾う。

    **「小計」を挟むので単純な連番ではない**（０歳・１歳・２歳・小計・３歳…）。
    ラベルごとに位置を引く。同じラベルが複数あることはない。
    """
    for r in rows[:3]:
        norm = [normalize(c) for c in r]
        if all(label in norm for label in labels):
            return [norm.index(label) for label in labels]
    return None


def section_of(headings, table_top):
    """表の上端より上にある直近の見出しを返す"""
    above = [h for h in headings if h["top"] < table_top]
    if not above:
        return ""
    return max(above, key=lambda h: h["top"])["text"]


def extract_facility_tables(pdf, labels, name_key, kind_default):
    """保育園・小規模のどちらも同じ手順で取り出す"""
    out = []
    for page in pdf.pages:
        # 見出しは行の y 座標ごと拾う。**語単位だと「（小規模保育事業）」が分割されて
        # 見つからず、直前の見出しに引きずられる**ので extract_text_lines を使う
        headings = [
            {"text": ln["text"].strip(), "top": ln["top"]}
            for ln in page.extract_text_lines()
            if ln["text"].strip().startswith(("●", "（"))
        ]

        for table_obj in page.find_tables():
            rows = [list(r) for r in table_obj.extract()]
            if len(rows) < 3:
                continue
            head = [normalize(c) for c in rows[0]]
            if name_key not in head:
                continue
            cols = age_columns(rows, labels)
            if cols is None:
                continue
            out.append(
                {
                    "section": section_of(headings, table_obj.bbox[1]) or kind_default,
                    "columns": {"name": head.index(name_key), "ages": cols},
                    "rows": [[cell_text(c) for c in r] for r in rows[2:]],
                }
            )
    return out


def extract(nursery_path, small_path):
    as_of = set()
    target = set()
    tables = []

    with pdfplumber.open(nursery_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月([０-９\d]+)日", text)
            if m:
                as_of.add(tuple(int(g.translate(Z)) for g in m.groups()))
            m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月入園可能数", text)
            if m:
                target.add(tuple(int(g.translate(Z)) for g in m.groups()))
        tables += [
            {**t, "kind": "認可保育園・認定こども園"}
            for t in extract_facility_tables(pdf, AGE6, "保育園名", "●保育園")
        ]

    with pdfplumber.open(small_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月([０-９\d]+)日", text)
            if m:
                as_of.add(tuple(int(g.translate(Z)) for g in m.groups()))
        tables += [
            {**t, "kind": "小規模保育事業等"}
            for t in extract_facility_tables(pdf, AGE3, "名称", "（小規模保育事業）")
        ]

    if not tables:
        fail("表を1つも取り出せませんでした")
    return {"asOf": sorted(as_of), "target": sorted(target), "tables": tables}


def main():
    paths = sys.argv[1:]
    if len(paths) != 2:
        fail("保育園PDFと小規模保育事業等PDFのパスを指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0], paths[1]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
