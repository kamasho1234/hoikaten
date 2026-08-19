"""
葛飾区の「募集予定人数（空き状況）」PDFから表を抜き出してJSONで返す

実行: python scripts/katsushika-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-katsushika-vacancy.ts から呼ぶ）

## 表の作り
- **1本のPDFに3種類の表が入る**。認可保育園・認定こども園（13列、0〜5歳）が数ページ続き、
  そのあとに小規模保育事業所（7列、0〜2歳）と保育ママ（7列、0〜2歳）が1ページずつ来る。
  どの表かは見出しの「保育園名 / 事業所名 / 保育ママ名」で見分ける。
- 認可の表があるページの末尾には**凡例の2列表**（開所時間・延長保育の記号表）が混ざる。
  年齢の見出しを持たない表として弾く。
- **地域と「公・私」は縦に結合されたセル**で、値は結合範囲のどこか1行にしか入らないので
  セルの bbox を見て同じセルに属する行へ配る。
- **年齢見出しの全角・半角が混ざる**（認可は「０歳〜４歳」が全角で「5歳」だけ半角、
  小規模は全部半角、保育ママは「0歳」だけ半角）。正規化してから照合する。
- `-` はそのクラスを設けていない。数字は募集人数で、0は「募集予定なし」。

## 検算
`extract_tables()` とは別に、**語の x 座標から年齢列を割り当てて数え直した合計**を
`crossCheck` に入れて返す。取り込み側で表から積み上げた合計と突き合わせる。
"""

import json
import re
import sys

import pdfplumber

Z = str.maketrans("０１２３４５６７８９－ー", "0123456789--")
AGE6 = ["0歳", "1歳", "2歳", "3歳", "4歳", "5歳"]
AGE3 = ["0歳", "1歳", "2歳"]
# 表の種類は見出しの施設名カラムで決まる
KIND_BY_HEAD = {
    "保育園名": "認可保育園・認定こども園",
    "事業所名": "小規模保育事業所",
    "保育ママ名": "保育ママ",
}


def fail(message):
    raise SystemExit(f"[中断] {message}")


def normalize(s):
    """改行と空白を落として全角数字を半角にする（見出し照合と値の判定に使う）"""
    if s is None:
        return ""
    return "".join(str(s).split()).translate(Z)


def cell_text(s):
    """表示に使う値。改行だけ潰し、全角はそのまま残す"""
    if s is None:
        return ""
    return " ".join(str(s).split())


def cell_chars(page, bbox):
    """
    セルの矩形に載っている文字を上から順に連結する。

    **地域と「公・私」の列は縦書き**で、`extract()` では「金 町 ・ 東 金 」のように
    末尾が欠けたり空白が混ざったりする。文字を座標から拾い直すと正しく読める。
    """
    x0, top, x1, bottom = bbox
    chars = [
        ch
        for ch in page.chars
        if x0 <= (ch["x0"] + ch["x1"]) / 2 <= x1 and top <= (ch["top"] + ch["bottom"]) / 2 <= bottom
    ]
    chars.sort(key=lambda ch: (round(ch["top"], 1), ch["x0"]))
    return "".join(ch["text"] for ch in chars).strip()


def resolve_merged(table_obj, rows, col, page=None):
    """
    縦に結合されたセルの値を、そのセルに属する全行へ配る。

    pdfplumber は**結合セルの先頭行にだけ bbox を入れ、続きの行は None** にする。
    そこで bbox がある行を区切りにして、次の区切りの手前までを同じセルとみなす。
    区切り直後の行が空でも、同じセルの範囲内に値があればそれを使う
    （地域名が結合範囲の途中の行に置かれている表があるため）。
    """
    cells = [row_obj.cells[col] if col < len(row_obj.cells) else None for row_obj in table_obj.rows]
    resolved = [""] * len(rows)
    starts = [i for i, c in enumerate(cells) if c is not None]
    if not starts:
        return resolved
    for si, start in enumerate(starts):
        end = min(starts[si + 1] - 1 if si + 1 < len(starts) else len(rows) - 1, len(rows) - 1)
        # 縦書きセルは extract() だと欠けるので、まず座標から読む
        value = cell_chars(page, cells[start]) if page is not None else ""
        if not value:
            value = next((cell_text(rows[j][col]) for j in range(start, end + 1) if cell_text(rows[j][col])), "")
        for j in range(start, end + 1):
            resolved[j] = value
    # 先頭のセルより前の行（見出しなど）と、値が空のセルは直前の値を引き継ぐ
    carried = ""
    for ri in range(len(rows)):
        if resolved[ri]:
            carried = resolved[ri]
        else:
            resolved[ri] = carried
    return resolved


def find_age_columns(rows, head_index, labels):
    """見出しの下の行から年齢列の位置を拾う。見つからなければ None"""
    for r in rows[head_index : head_index + 2]:
        norm = [normalize(c) for c in r]
        if all(label in norm for label in labels):
            return [norm.index(label) for label in labels]
    return None


def cross_check(page, table_obj, age_cols, body_start):
    """
    セルの座標から年齢列の x 範囲を求め、そこに載る数値を数え直す（表抽出とは別経路の検算）。

    **認可の表は見出しの「０歳」「募集人数」が縦に重なって語が分断される**ため、
    見出し語ではなくデータ行のセル bbox を基準にする。
    表の bbox で y も絞るので、同じページに凡例表があっても混ざらない。
    """
    ranges = []
    for col in age_cols:
        xs = []
        for row_obj in table_obj.rows[body_start:]:
            cell = row_obj.cells[col] if col < len(row_obj.cells) else None
            if cell:
                xs.append((cell[0], cell[2]))
        if not xs:
            return None
        ranges.append((min(x0 for x0, _ in xs), max(x1 for _, x1 in xs)))

    top = table_obj.rows[body_start].cells[age_cols[0]]
    if not top:
        return None
    y_top = top[1]
    _, _, _, y_bottom = table_obj.bbox
    totals = [0] * len(age_cols)
    for w in page.extract_words(keep_blank_chars=False, use_text_flow=False):
        if w["top"] < y_top or w["bottom"] > y_bottom + 1:
            continue
        text = normalize(w["text"])
        if not re.fullmatch(r"\d+", text):
            continue
        center = (w["x0"] + w["x1"]) / 2
        for i, (x0, x1) in enumerate(ranges):
            if x0 <= center <= x1:
                totals[i] += int(text)
                break
    return totals


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
            m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月\s*募集予定人数", text)
            if m:
                target.add(tuple(int(g.translate(Z)) for g in m.groups()))

            for table_obj in page.find_tables():
                table = table_obj.extract()
                rows = [list(r) for r in table]
                if len(rows) < 3:
                    continue
                head_norm = [normalize(c) for c in rows[0]]
                kind = next((k for h, k in KIND_BY_HEAD.items() if h in head_norm), None)
                if kind is None:
                    continue  # 凡例の2列表など
                labels = AGE6 if kind == "認可保育園・認定こども園" else AGE3
                age_cols = find_age_columns(rows, 0, labels)
                if age_cols is None:
                    fail(f"{kind}: 年齢の見出し {labels} が見つかりません: {rows[:2]}")

                name_col = next(i for i, h in enumerate(head_norm) if h in KIND_BY_HEAD)
                area_col = head_norm.index("地域") if "地域" in head_norm else None
                if area_col is None:
                    fail(f"{kind}: 「地域」の列がありません: {head_norm}")
                # 「公・私」は認可の表にだけある
                kubun_col = next((i for i, h in enumerate(head_norm) if h in ("公・私", "公私")), None)

                areas = resolve_merged(table_obj, rows, area_col, page)
                kubuns = (
                    resolve_merged(table_obj, rows, kubun_col, page) if kubun_col is not None else None
                )
                # 見出しは2行（1行目が項目、2行目が年齢）。データはその次から
                body_start = 2
                tables.append(
                    {
                        "kind": kind,
                        "columns": {
                            "area": area_col,
                            "kubun": kubun_col,
                            "name": name_col,
                            "address": head_norm.index("所在地") if "所在地" in head_norm else None,
                            "ages": age_cols,
                        },
                        "areaByRow": areas[body_start:],
                        "kubunByRow": kubuns[body_start:] if kubuns else None,
                        "rows": [[cell_text(c) for c in r] for r in rows[body_start:]],
                        "crossCheck": cross_check(page, table_obj, age_cols, body_start),
                    }
                )
    return {"asOf": sorted(as_of), "target": sorted(target), "tables": tables}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
