"""
弘前市の「市内保育施設の空き状況一覧」PDFから表を抜き出す

実行: python scripts/hirosaki-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-hirosaki-vacancy.ts から呼ぶ）

## 表の作り
- 2ページ。10列（小学校区／施設名／施設区分／住所／電話番号／
  3~5歳児クラス／0~2歳児クラス／乳児室／ほふく室／兼室）。見出しは各ページ3行
- 市は空き数を年齢別ではなく「3~5歳児クラス」「0~2歳児クラス」の2つでしか出していない
- 部屋の空きは記号（〇＝5人分以上、△＝1~4人分、×＝なし）で、満2歳未満の児童にだけ関わる
- 小学校区は縦結合
"""

import json
import re
import sys

import pdfplumber

EXPECTED_COLUMNS = 10
HEADER_ROWS = 3
COL_AREA = 0
COL_NAME = 1
COL_CATEGORY = 2
COL_ADDRESS = 3
COL_TEL = 4
COL_OLDER = 5
COL_YOUNGER = 6
COL_ROOM0 = 7
ROOM_COUNT = 3
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    if len(sys.argv) != 2:
        fail("使い方: python scripts/hirosaki-pdf-extract.py <pdf>")

    rows = []
    full_text = []
    with pdfplumber.open(sys.argv[1]) as pdf:
        for page in pdf.pages:
            full_text.append(page.extract_text() or "")
            for table in page.extract_tables():
                if not table:
                    continue
                if len(table[0]) != EXPECTED_COLUMNS:
                    fail(f"列が{len(table[0])}個です（{EXPECTED_COLUMNS}個のはず）")
                head = [cell(c) for c in table[0]]
                if head[COL_NAME] != "施設名":
                    fail(f"見出しの2列目が「{head[COL_NAME]}」です（「施設名」のはず）")
                for raw in table[HEADER_ROWS:]:
                    row = [cell(c) for c in raw]
                    if not row[COL_NAME]:
                        continue
                    rows.append(row)

    text = "\n".join(full_text)

    # 「令和８年９月分 利用調整直後（令和８年８月１９日現在）」から基準日を取る
    m = re.search(
        r"（\s*令和\s*([０-９\d]+)\s*年\s*([０-９\d]{1,2})\s*月\s*([０-９\d]{1,2})\s*日現在\s*）",
        text,
    )
    if not m:
        fail("「（令和◯年◯月◯日現在）」が見つかりません")
    as_of = [int(x.translate(ZEN)) for x in m.groups()]

    # 「令和８年９月分」＝どの月の入所ぶんかも一緒に持って、注記に使う
    m2 = re.search(r"令和\s*([０-９\d]+)\s*年\s*([０-９\d]{1,2})\s*月分", text)
    for_month = [int(x.translate(ZEN)) for x in m2.groups()] if m2 else None

    # 部屋の空き記号の凡例を本文から読む
    legend = []
    for mark, label in re.findall(
        r"「([〇○◯×△])」…([^「\n]+)", text.replace("　", " ")
    ):
        label = label.strip().strip("　 ")
        if mark in [x["mark"] for x in legend]:
            continue
        legend.append({"mark": mark, "label": label})
    if not legend:
        fail("記号の凡例が見つかりません")

    # 表の記号の数を、PDFの文字そのものの数と突き合わせるために数えておく
    mark_counts = {}
    for row in rows:
        for i in range(ROOM_COUNT):
            v = row[COL_ROOM0 + i]
            mark_counts[v] = mark_counts.get(v, 0) + 1

    if len(rows) < 60:
        fail(f"施設が{len(rows)}件しか取れていません")

    json.dump(
        {
            "asOf": as_of,
            "forMonth": for_month,
            "legend": legend,
            "markCounts": mark_counts,
            "rows": rows,
        },
        sys.stdout,
        ensure_ascii=False,
    )


if __name__ == "__main__":
    main()
