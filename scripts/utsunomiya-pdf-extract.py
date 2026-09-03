"""
宇都宮市の「教育・保育施設等受入れ状況一覧」PDFから表を抜き出す

実行: python scripts/utsunomiya-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-utsunomiya-vacancy.ts から呼ぶ）

## 表の作り
- 5ページ。1ページの中に表が複数ある（生年月日の表・凡例の表・本体・送迎保育ステーションの表）
- 本体は 施設類型／NO.／施設名／町名／0歳〜5歳。受入れ状況は記号（○△×／）
- **ページによって列が1つ多い**（先頭に空の列が入る）ので、列位置は見出しから決める
- **類型のセルが縦結合でページを跨ぐ**ので、類型はページを跨いで引き継ぐ
- NO.が1から欠けずに続くので、それを検算に使う
- 休園中の施設は記号の代わりに「※休園中」が横結合で入っている
- 送迎保育ステーション事業の表は施設一覧ではないので取り込まない

## 0歳児クラスが月齢で2つに分かれた
令和8年10月ぶんから、0歳児の欄が「0-0歳」と「0-1歳」に分かれた。
公式の説明では
- 0-0歳 … 令和8年4月2日以降に生まれた子
- 0-1歳 … 令和7年4月2日〜令和8年4月1日に生まれた子
当サイトの「0歳児」は他の自治体と同じく**4月1日時点で0歳の子**を指すので、
**0-1歳の欄を0歳として採る**。0-0歳の欄は別に返し、施設ごとの備考に載せる。
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
LEGEND_HEAD = ("記号", "説明", "受入れの目安")
MARKS = ["○", "◯", "〇", "△", "×", "✕", "／", "/"]
CLOSED = "休園"
ZEN = str.maketrans("０１２３４５６７８９－―ー", "0123456789---")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def find_columns(head1, head2):
    """見出し2行から列の位置を決める。本体の表でなければ None を返す"""
    if "NO." not in head1 or "施設名" not in head1 or "町名" not in head1:
        return None
    ages = []
    for age in range(AGE_COUNT):
        # 0歳は「0-1歳」（4月1日までに生まれた子）を採る。分かれる前の資料では「0歳」
        labels = ["0-1歳", "0歳"] if age == 0 else [f"{age}歳"]
        label = next((l for l in labels if l in head2), None)
        if label is None:
            return None
        ages.append(head2.index(label))
    if ages != list(range(ages[0], ages[0] + AGE_COUNT)):
        fail(f"歳児の欄が並んでいません（{ages}）")
    kubun = [i for i, v in enumerate(head1) if v.startswith("施設類型")]
    return {
        "no": head1.index("NO."),
        "name": head1.index("施設名"),
        "town": head1.index("町名"),
        "age0": ages[0],
        # 0歳が月齢で分かれている資料でだけ、もう一方（0-0歳）の位置を持つ
        "age0Young": head2.index("0-0歳") if "0-0歳" in head2 else None,
        # 縦結合で「施設類型地域型」のようにくっつくことがある。値はページを跨いで引き継ぐ
        "kubun": kubun[0] if kubun else None,
    }


def count_marks(page, table, columns, top, bottom):
    """歳児の欄のx座標と施設の行の範囲で切り出して記号を数える。凡例を数えないため"""
    # 歳児の見出しは2行目にある（1行目は「受入れ状況」が横に結合されている）
    first = table.rows[1].cells[columns["age0"]]
    last = table.rows[1].cells[columns["age0"] + AGE_COUNT - 1]
    if first is None or last is None:
        fail("歳児の見出しの位置を取れませんでした")
    counts = {}
    for word in page.crop((first[0], top, last[2], bottom)).extract_words():
        for mark in MARKS:
            n = word["text"].count(mark)
            if n:
                counts[mark] = counts.get(mark, 0) + n
    return counts


def extract(path):
    as_of = None
    target = None
    legend = []
    notes = []
    rows = []
    mark_counts = {}
    closed = []
    kubun_carry = ""

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) < 2:
            fail(f"ページ数が{len(pdf.pages)}になっています")

        for page_index, page in enumerate(pdf.pages):
            flat = "".join((page.extract_text() or "").split()).translate(ZEN)

            if as_of is None:
                m = re.search(r"令和(\d+)年(\d+)月(\d+)日現在", flat)
                if m:
                    as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
            if target is None:
                m = re.search(r"令和(\d+)年(\d+)月の宇都宮市内", flat)
                if m:
                    target = (int(m.group(1)), int(m.group(2)))

            # 注意書きは1ページ目にまとまっている（送迎保育ステーションの注釈は入れない）
            if page_index == 0:
                for line in (page.extract_text() or "").split("\n"):
                    line = line.strip()
                    if line.startswith("※") or "公表時点での目安" in line:
                        notes.append(line.lstrip("※").strip())

            for table in page.find_tables():
                extracted = table.extract()
                if len(extracted) < 2:
                    continue
                head1 = [cell(c) for c in extracted[0]]
                head2 = [cell(c) for c in extracted[1]]

                if tuple(head1[:3]) == LEGEND_HEAD:
                    for row in extracted[1:]:
                        values = [cell(c) for c in row]
                        if not values[0]:
                            continue
                        legend.append(
                            {"mark": values[0], "label": values[1], "guide": values[2]}
                        )
                    continue

                columns = find_columns(head1, head2)
                if columns is None:
                    continue
                if len(extracted) < 3:
                    fail(f"{page_index + 1}ページ目の表に施設の行がありません")

                bottom = None
                for row_index, row in enumerate(table.rows):
                    if row_index < 2:
                        continue
                    values = [cell(c) for c in extracted[row_index]]
                    if columns["kubun"] is not None and values[columns["kubun"]]:
                        kubun_carry = values[columns["kubun"]]
                    no = values[columns["no"]]
                    if not no:
                        continue
                    if not re.fullmatch(r"\d+", no):
                        fail(f"NO.が数ではありません: 「{no}」")
                    name = values[columns["name"]]
                    if not name:
                        fail(f"施設名が空の行があります（NO. {no}）")
                    if not kubun_carry:
                        fail(f"{name}: 施設類型が分かりません")

                    marks = [values[columns["age0"] + a] for a in range(AGE_COUNT)]
                    young = (
                        values[columns["age0Young"]]
                        if columns["age0Young"] is not None
                        else None
                    )
                    # 「※休園中」は横に結合して入る。0歳が月齢で分かれた資料では
                    # その印が0-0歳の欄に載るので、そちらも見る
                    is_closed = any(CLOSED in m for m in marks) or (
                        young is not None and CLOSED in young
                    )
                    if is_closed:
                        closed.append(name)
                    rows.append(
                        {
                            "no": int(no),
                            "kubun": kubun_carry,
                            "name": name,
                            "town": values[columns["town"]],
                            "marks": marks,
                            "young": young,
                            "closed": is_closed,
                        }
                    )
                    bottom = row.bbox[3]

                if bottom is None:
                    fail(f"{page_index + 1}ページ目の施設の行が見つかりません")
                for mark, count in count_marks(
                    page, table, columns, table.rows[1].bbox[3], bottom
                ).items():
                    mark_counts[mark] = mark_counts.get(mark, 0) + count

    if as_of is None:
        fail("基準日（令和N年M月D日現在）を読み取れませんでした")
    if target is None:
        fail("何月ぶんの受入れ状況かを読み取れませんでした")
    if not legend:
        fail("記号の凡例が見つかりません")
    if not rows:
        fail("施設の行を取り出せませんでした")

    numbers = [r["no"] for r in rows]
    if numbers != list(range(1, len(rows) + 1)):
        fail(f"NO.が1から{len(rows)}まで続いていません（最後は{numbers[-1]}）")

    return {
        "asOf": as_of,
        "target": target,
        "legend": legend,
        "notes": notes,
        "markCounts": {k: v for k, v in mark_counts.items() if v},
        "closed": closed,
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
