"""
小山市の「市内保育施設空き状況」PDFから表を抜き出す

実行: python scripts/oyama-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-oyama-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・**左右2段組**。左段に公立保育所と私立保育園、右段に認定こども園が入る
- どちらの段も 区分／施設名／0歳〜5歳の8列。区分の欄は縦結合なので段ごとに引き継ぐ
- 記号の凡例がPDFの中に2列の表として入っている
  （〇＝4名以上の空き、△＝1名以上の空き、×＝空きなし、ー＝利用なし、調整中＝…）
- **基準日は書かれていない**（「９月入所向け」だけ）。時点は呼び出し側がページの更新日を使う
"""

import json
import re
import sys

import pdfplumber

COL_KUBUN = 0
COL_NAME = 1
COL_AGE0 = 2
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

# 凡例に出てくる記号。「調整中」のような語も凡例に入っている
MARKS = ["○", "◯", "〇", "△", "×", "✕", "ー", "―", "－", "-"]
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def read_notes(page):
    """
    注記を読む。左右2段組のせいでテキスト抽出では表の行と混ざって文が切れるので、
    「※」で始まる語を起点に、同じ左端から始まる行だけを座標でつないで組み立てる
    """
    words = page.extract_words()
    starts = sorted(
        [w for w in words if w["text"].strip().startswith("※")], key=lambda w: w["top"]
    )
    notes = []
    for index, start in enumerate(starts):
        limit = starts[index + 1]["top"] if index + 1 < len(starts) else None
        parts = []
        for word in sorted(words, key=lambda w: (w["top"], w["x0"])):
            if word["top"] < start["top"] - 1:
                continue
            if limit is not None and word["top"] >= limit - 1:
                continue
            # 同じ左端から始まる行だけを拾う（表の行を巻き込まないため）
            if abs(word["x0"] - start["x0"]) > 2:
                continue
            parts.append(word["text"].strip())
        text = "".join(parts).lstrip("※").strip()
        if text:
            notes.append(text)
    return notes


def extract(path):
    target = None
    legend = []
    notes = []
    rows = []
    mark_counts = {}

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        flat = "".join((page.extract_text() or "").split()).translate(ZEN)

        m = re.search(r"空き状況（(\d+)月入所向け）", flat)
        if not m:
            fail("何月入所向けかを読み取れませんでした")
        target = int(m.group(1))

        notes = read_notes(page)

        bodies = []
        for table in page.find_tables():
            extracted = table.extract()
            heads = [cell(c) for c in extracted[0]]

            # 凡例の表は2列で、1列目が記号（または「調整中」）
            if len(heads) == 2:
                for row in extracted:
                    values = [cell(c) for c in row]
                    if not values[0] or not values[1]:
                        continue
                    legend.append({"mark": values[0], "label": values[1]})
                continue

            if len(heads) != COLUMN_COUNT:
                fail(f"列数が{len(heads)}の表があります（{COLUMN_COUNT}列か2列のはず）")
            if heads[COL_NAME] != "施設名":
                fail(f"2列目の見出しが「{heads[COL_NAME]}」になっています（施設名のはず）")
            for age in range(AGE_COUNT):
                head = cell(heads[COL_AGE0 + age]).translate(ZEN)
                if head != f"{age}歳":
                    fail(f"{age}歳の見出しが「{head}」になっています")
            bodies.append(table)

        if not bodies:
            fail("空き状況の表が見つかりません")
        if not legend:
            fail("記号の凡例が見つかりません")

        # 左の段から右の段の順に読む
        for table in sorted(bodies, key=lambda t: t.bbox[0]):
            extracted = table.extract()
            kubun_carry = ""
            for row_index, row in enumerate(table.rows):
                if row_index == 0:
                    continue
                values = [cell(c) for c in extracted[row_index]]
                if values[COL_KUBUN]:
                    kubun_carry = values[COL_KUBUN]
                name = values[COL_NAME]
                if not name:
                    continue
                if not kubun_carry:
                    fail(f"{name}: 区分が分かりません")
                marks = [values[COL_AGE0 + a] for a in range(AGE_COUNT)]
                if any(not m for m in marks):
                    fail(f"{name}: 空の欄があります（{marks}）")
                rows.append({"kubun": kubun_carry, "name": name, "marks": marks})

            # 記号の数。歳児の欄のx座標と表の範囲で切り出す
            first = table.rows[0].cells[COL_AGE0]
            last = table.rows[0].cells[COL_AGE0 + AGE_COUNT - 1]
            if first is None or last is None:
                fail("歳の見出しの位置を取れませんでした")
            for word in page.crop(
                (first[0], table.rows[0].bbox[3], last[2], table.bbox[3])
            ).extract_words():
                for mark in MARKS:
                    n = word["text"].count(mark)
                    if n:
                        mark_counts[mark] = mark_counts.get(mark, 0) + n

    if not rows:
        fail("施設の行を取り出せませんでした")

    return {
        "target": target,
        "legend": legend,
        "notes": notes,
        "markCounts": {k: v for k, v in mark_counts.items() if v},
        "rows": rows,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
