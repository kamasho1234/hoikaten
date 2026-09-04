"""
盛岡市の「入所選考分空き状況」PDFから表を抜き出してJSONで返す

実行: python scripts/morioka-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-morioka-vacancy.ts から呼ぶ）

## 表の作り
- 2ページ。各ページに「クラス年齢早見表」と本体の2つの表がある
- 本体は22列。見出しは2段で、2段目に「地域／施設類型／施設名／所在地／
  年齢／０歳／／１歳／…／５歳／…」が並ぶ。**年齢の欄の右隣に空の列が挟まる**
- **罫線が引かれず、施設名から先が1つの升目にまとまってしまう行がある。**
  地域のかたまりの先頭と、小規模保育の行がそれにあたる。
  そのままだと27件ほど落ちるので、升目の中の文字を
  見出しの列の位置に合わせて拾い直す
- **地域の欄は縦書きが複数列に折り返されていて、読み順が崩れる**
  （「中心部（盛岡駅周辺）内丸　愛宕　菜園」が
  「中心部盛（岡内駅丸周辺愛）宕菜園」になる）。
  復元が当てにならないので地域は使わず、施設類型で分ける
- 「入所率が既に110％以上」の列があり、そこに印のある園は
  市外に住所がある人を原則受け入れない。施設ごとの注記として持つ
- 空きは記号（○ 3人以上／△ 1〜2人／× 空きなし）
- 条件付きの受入枠には「＊」が付く。
  **これは記号と同じ升目ではなく、右隣の空の列に入ることがある**ので、
  年齢の欄とその右隣を合わせて読む
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
MARKS = {"○": "○", "◯": "○", "〇": "○", "△": "△", "×": "×", "✕": "×"}


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    return "".join(str(s or "").split())


def extract(path):
    rows = []
    as_of = None
    target = None

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            flat = "".join((page.extract_text() or "").split())
            if as_of is None:
                m = re.search(r"[（(]令和(\d+)年(\d{1,2})月(\d{1,2})日時点", flat)
                if m:
                    as_of = [int(g) for g in m.groups()]
            if target is None:
                m = re.search(r"令和(\d+)年(\d{1,2})月入所選考分", flat)
                if m:
                    target = [int(m.group(1)), int(m.group(2))]

            for table in page.find_tables():
                body = [[cell(c) for c in r] for r in table.extract()]
                if len(body) < 3:
                    continue
                head = body[1]
                if head[:3] != ["地域", "施設類型", "施設名"]:
                    continue
                # 年齢の欄の位置。「０歳」〜「５歳」が飛び飛びに並ぶ
                if "110％以上" not in head:
                    fail(f"{page_index + 1}ページ目に「110％以上」の見出しがありません")
                rate_col = head.index("110％以上")
                age_cols = []
                for age in range(AGE_COUNT):
                    label = f"{age}歳".translate(str.maketrans("012345", "０１２３４５"))
                    if label not in head:
                        fail(f"{page_index + 1}ページ目に「{label}」の見出しがありません")
                    age_cols.append(head.index(label))

                # 見出しの行から、各列の左右の位置を取る（罫線の無い行を読み直すため）
                body_rows = len(body) - 2
                picked_rows = 0
                head_cells = table.rows[1].cells
                bounds = {}
                for i, box in enumerate(head_cells):
                    if box is not None:
                        bounds[i] = (box[0], box[2])

                for row_index, raw in enumerate(body[2:], start=2):
                    name = raw[2]
                    kind = raw[1]
                    # 罫線が無い行は、施設名から先が1つの升目にまとまる。
                    # 升目の中の文字を、見出しの列の位置で拾い直す
                    if not raw[3] and raw[1]:
                        merged = table.rows[row_index].cells[1]
                        if merged is None:
                            continue
                        x0, top, x1, bottom = merged
                        picked = {}
                        for w in page.extract_words():
                            cx = (w["x0"] + w["x1"]) / 2
                            cy = (w["top"] + w["bottom"]) / 2
                            if not (x0 <= cx <= x1 and top <= cy <= bottom):
                                continue
                            for i, (bx0, bx1) in bounds.items():
                                if bx0 <= cx <= bx1:
                                    picked[i] = picked.get(i, "") + w["text"]
                                    break
                        if not picked.get(2):
                            continue
                        raw = [picked.get(i, "") for i in range(len(head))]
                        name = raw[2]
                        kind = raw[1]
                    if not name:
                        continue
                    marks = []
                    conditional = []
                    for age in range(AGE_COUNT):
                        col = age_cols[age]
                        # 「＊」は右隣の空の列に入ることがあるので合わせて読む
                        text = raw[col]
                        if col + 1 < len(head) and not head[col + 1]:
                            text += raw[col + 1]
                        if not text:
                            marks.append(None)
                            conditional.append(False)
                            continue
                        star = "＊" in text or "*" in text
                        core = text.replace("＊", "").replace("*", "")
                        mark = MARKS.get(core)
                        if mark is None:
                            fail(f"{name}: {age}歳の欄が記号ではありません（「{text}」）")
                        marks.append(mark)
                        conditional.append(star)
                    if all(m is None for m in marks):
                        continue
                    picked_rows += 1
                    rows.append(
                        {
                            "kind": kind,
                            "overCapacity": "110" in raw[rate_col],
                            "name": name,
                            "address": raw[3],
                            "marks": marks,
                            "conditional": conditional,
                        }
                    )

                # 見出し2行を除いた行が、そのまま施設の行になっているか
                if picked_rows != body_rows:
                    fail(
                        f"{page_index + 1}ページ目: 表の{body_rows}行のうち"
                        f"{picked_rows}行しか取り込めていません"
                    )

    if as_of is None:
        fail("「（令和N年M月D日時点」を読み取れませんでした")
    if target is None:
        fail("「令和N年M月入所選考分」を読み取れませんでした")
    if not rows:
        fail("施設の行を取り出せませんでした")
    return {"asOf": as_of, "target": target, "rows": rows}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
