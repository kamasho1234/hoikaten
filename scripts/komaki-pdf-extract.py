"""
小牧市の「入所空き状況」PDFから表を抜き出す

実行: python scripts/komaki-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-komaki-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ。9列（区分／園名／所在／0歳児〜5歳児）
- 1つの表の中に「保育園」「認定こども園」「小規模保育事業」の3つのまとまりがあり、
  それぞれの先頭に見出しの行が入る。見出しの行の1列目がそのまとまりの種類
- データの行の1列目は私立・公立で、縦結合になっている
- 記号は○（3名以上の空きあり）△（1〜2名の空きあり）×（空きなし）。
  空欄はそのクラスを設けていない（小規模保育事業は0〜2歳）
- 「※」は凡例になく、下の注意書きでその園だけの事情が説明されている
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 3 + AGE_COUNT
COL_DIVISION = 0
COL_NAME = 1
COL_PLACE = 2
COL_AGE0 = 3
NOTE_MARK = "※"
MARKS = "○◯〇△▲×✕"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def extract(path):
    groups = []
    legend = []
    target = None
    as_of = None
    mark_counts = {}

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        flat = "".join((page.extract_text() or "").split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月入所空き状況（(\d+)月(\d+)日現在）", flat)
        if not m:
            fail("対象月と基準日を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))
        as_of = (int(m.group(3)), int(m.group(4)))

        # 「○・・・3名以上の空きあり、△・・・1～2名の空きあり、×・・・空きなし」。
        # 最後の「空きなし」で切らないと、続く表の中身まで飲み込んでしまう
        for mark, label in re.findall(
            rf"([{MARKS}])・+([^、。{MARKS}]*?空き(?:あり|なし))", flat
        ):
            legend.append({"mark": mark, "label": label})

        # 「※北里保育園の0才児クラスについては、園の統合により入園を制限します。」
        note = re.search(rf"{NOTE_MARK}([^{NOTE_MARK}]*入園を制限します)", flat)

        for table in page.find_tables():
            extracted = table.extract()
            if len(extracted[0]) != EXPECTED_COLUMNS:
                fail(f"列数が{len(extracted[0])}になっています")

            heads = None
            for row_index, row in enumerate(extracted):
                values = [cell(c) for c in row]
                if values[COL_PLACE] == "所在":
                    # まとまりの先頭。ここから次の見出しまでが1つの種類
                    kind = values[COL_DIVISION]
                    if not kind:
                        fail(f"{row_index}行目のまとまりの種類が空です")
                    heads = [v.translate(ZEN) for v in values[COL_AGE0 : COL_AGE0 + AGE_COUNT]]
                    ages = [i for i, h in enumerate(heads) if h == f"{i}歳児"]
                    if not ages or heads[: len(ages)] != [f"{i}歳児" for i in ages]:
                        fail(f"{kind}: 歳児の見出しが{heads}になっています")
                    groups.append({"kind": kind, "ages": ages, "rows": []})
                    continue
                if not values[COL_NAME]:
                    continue
                if heads is None:
                    fail("見出しの行より前にデータの行があります")
                groups[-1]["rows"].append(values)

            # 記号の数。注意書きを拾わないよう歳児の欄のx座標で切り出す
            header = next(
                (r for i, r in enumerate(table.rows) if cell(extracted[i][COL_PLACE]) == "所在"),
                None,
            )
            if header is None:
                fail("歳児の見出しの位置を取れませんでした")
            first = header.cells[COL_AGE0]
            last = header.cells[COL_AGE0 + AGE_COUNT - 1]
            if first is None or last is None:
                fail("歳児の見出しの位置を取れませんでした")
            for word in page.crop(
                (first[0], header.bbox[3], last[2], table.bbox[3])
            ).extract_words():
                for mark in MARKS + NOTE_MARK:
                    mark_counts[mark] = mark_counts.get(mark, 0) + word["text"].count(mark)

    if not groups:
        fail("空き状況の表を取り出せませんでした")
    total = sum(len(g["rows"]) for g in groups)
    if total < 40:
        fail(f"施設が{total}件しか取れていません")
    if len(legend) != 3:
        fail(f"記号の凡例を読み取れませんでした（{len(legend)}件）")
    if mark_counts.get(NOTE_MARK) and note is None:
        fail(f"表に「{NOTE_MARK}」があるのに、その説明が見つかりません")

    return {
        "target": target,
        "asOf": as_of,
        "legend": legend,
        "note": note.group(1) if note else None,
        "markCounts": {k: v for k, v in mark_counts.items() if v},
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
