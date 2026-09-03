"""
宜野湾市の「空き状況及び入所待ち児童数」PDFから空き状況の表を抜き出す

実行: python scripts/ginowan-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-ginowan-vacancy.ts から呼ぶ）

## 表の作り
- 2ページ。どちらも9列（校区／保育施設名／0才〜5才／計）で、同じ表の続き
- いちばん下に「計」の行がある
- **校区の名前が縦書きで、行をまたいでばらばらに入る**。
  「宜野湾中」（1行目）＋「学校区」（6行目）で「宜野湾中学校区」のようになるので、
  断片をつないで「〜中学校区」の形になったところで確定し、
  その断片が出はじめた施設までさかのぼって割り当てる。
  ページの先頭では前のページの校区がそのまま続く
- 施設名のセルには「※分園を含む」「【大山小学校 隣接】」が改行で付くことがある。
  「※」「【」で始まる行だけを補足として分け、それ以外は施設名の折り返しとしてつなぐ
- 空らんは、そのクラスがない施設のもの（地域型保育など）
"""

import json
import re
import sys

import pdfplumber

COL_WARD = 0
COL_NAME = 1
AGE_COUNT = 6
# 令和8年9月ぶんから「入所待ち児童数及び空き」の列が加わり、年齢の列が1つ右にずれた。
# 位置は決め打ちにせず、見出しの「0才」から決める

ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def extract(path):
    notes = []
    rows = []
    totals = None
    ward_buffer = ""
    pending = []
    current_ward = ""

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) < 1:
            fail("ページがありません")

        first = pdf.pages[0]
        flat = "".join((first.extract_text() or "").split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日時点", flat)
        if not m:
            fail("「令和N年M月D日時点」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"令和(\d+)年(\d+)月入所", flat)
        if not m:
            fail("「令和N年M月入所」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        for line in (first.extract_text() or "").splitlines():
            stripped = line.strip()
            if stripped.startswith("●") and len(stripped) > 12:
                notes.append(stripped.lstrip("●").strip())

        for index, page in enumerate(pdf.pages):
            # 見出しの無い空の表や、末尾の「計」の表が混じることがあるので、
            # 「校区」「保育施設名」の見出しを持つ表だけを本体とみなす
            body = []
            body_rows = []
            for t in page.find_tables():
                e = t.extract()
                if not e:
                    continue
                h = [cell(c) for c in e[0]]
                if len(h) > COL_NAME and h[COL_WARD] == "校区" and h[COL_NAME] == "保育施設名":
                    body.append(e)
                    body_rows.append(t.rows)
                    continue
                # 「計」は別の表として最後のページに置かれるようになった。
                # 「計／空き／年齢ごとの数」の並びなので、そこから空きの合計を採る
                if h and h[0] == "計" and len(h) >= 2 and h[1] == "空き":
                    nums = [cell(c) for c in e[0][2 : 2 + AGE_COUNT]]
                    if all(re.fullmatch(r"\d+", n) for n in nums):
                        totals = [int(n) for n in nums]
            if len(body) != 1:
                fail(f"{index + 1}ページ目に施設の表が{len(body)}個あります（1個のはず）")
            extracted = body[0]

            head = [cell(c) for c in extracted[0]]
            if head[COL_WARD] != "校区" or head[COL_NAME] != "保育施設名":
                fail(f"{index + 1}ページ目の見出しが想定と違います: {head}")
            if "0才" not in head:
                fail(f"{index + 1}ページ目に「0才」の見出しがありません: {head}")
            col_age0 = head.index("0才")
            col_total = col_age0 + AGE_COUNT
            if len(head) != col_total + 1:
                fail(f"{index + 1}ページ目の列数が{len(head)}です（{col_total + 1}列のはず）")
            for age in range(AGE_COUNT):
                if head[col_age0 + age] != f"{age}才":
                    fail(f"{index + 1}ページ目の年齢の見出しが想定と違います: {head}")

            # 令和8年9月ぶんから、1つの升目に「空き」「入所待ち」
            # 「入所待ち（第1希望）」の3つが縦に並ぶ形になった。
            # **当サイトが載せるのは空き**なので、いちばん上の段だけを採る。
            # （見出しの「空き／入所待ち／…」は別の行に分かれて入ることがあるので、
            #   年齢の欄が何段に分かれているかで見分ける）
            # 校区は縦書き。表の抽出だけでは文字の順が崩れることがある
            # （「真志喜中学校区」が「中真区学志校喜」になった）。
            # **右の列から左へ、各列は上から下**に並べ直す
            def vertical_text(bbox):
                if bbox is None:
                    return ""
                x0, top, x1, bottom = bbox
                chars = [
                    c
                    for c in page.chars
                    if x0 <= c["x0"] <= x1 and top <= c["top"] <= bottom and cell(c["text"])
                ]
                if not chars:
                    return ""
                chars.sort(key=lambda c: (-round(c["x0"], 1), c["top"]))
                return "".join(c["text"] for c in chars)

            table_rows = body_rows[0]
            for row_index, raw_row in enumerate(extracted[1:], start=1):
                values = list(map(cell, raw_row))
                age_parts = [
                    [cell(x) for x in str(raw_row[col_age0 + a] or "").split(chr(10)) if cell(x)]
                    for a in range(AGE_COUNT)
                ]
                if any(len(p) > 1 for p in age_parts):
                    for a in range(AGE_COUNT):
                        values[col_age0 + a] = age_parts[a][0] if age_parts[a] else ""
                    tot = [
                        cell(x) for x in str(raw_row[col_total] or "").split(chr(10)) if cell(x)
                    ]
                    values[col_total] = tot[0] if tot else ""
                ward_cell = (
                    table_rows[row_index].cells[COL_WARD]
                    if row_index < len(table_rows)
                    else None
                )
                ward_part = vertical_text(ward_cell) or cell(raw_row[COL_WARD])
                raw_name = raw_row[COL_NAME] or ""
                parts = [cell(p) for p in str(raw_name).split("\n") if cell(p)]

                # 「計」の行
                if ward_part == "計" and not parts:
                    counts = []
                    for age in range(AGE_COUNT):
                        value = values[col_age0 + age]
                        if not re.fullmatch(r"\d+", value):
                            fail(f"合計の{age}才が数字ではありません（「{value}」）")
                        counts.append(int(value))
                    totals = counts
                    continue

                if ward_part:
                    if not ward_buffer:
                        pending = []
                    ward_buffer += ward_part

                if not parts:
                    continue

                # 「※分園を含む」「【大山小学校 隣接】」は補足。
                # それ以外の行は施設名が折り返されているだけなのでつなぐ
                extra = [p for p in parts[1:] if p.startswith(("※", "【"))]
                name = "".join(p for p in parts if p not in extra)

                counts = []
                for age in range(AGE_COUNT):
                    value = values[col_age0 + age]
                    if value == "":
                        counts.append(None)
                        continue
                    if not re.fullmatch(r"\d+", value):
                        fail(f"{name}: {age}才が数字ではありません（「{value}」）")
                    counts.append(int(value))

                total = values[col_total]
                if not re.fullmatch(r"\d+", total):
                    fail(f"{name}: 計が数字ではありません（「{total}」）")
                if sum(c for c in counts if c is not None) != int(total):
                    fail(f"{name}: 年齢ごとの合計が計と合いません（{counts} / {total}）")

                if all(c is None for c in counts):
                    fail(f"{name}: 全ての年齢が空らんです")

                row = {"name": name, "extra": extra, "counts": counts, "ward": current_ward}
                rows.append(row)
                if ward_buffer:
                    pending.append(row)

                # 「〜中学校区」の形になったら校区の名前が決まる
                if ward_buffer.endswith("区"):
                    for target_row in pending:
                        target_row["ward"] = ward_buffer
                    current_ward = ward_buffer
                    ward_buffer = ""
                    pending = []

    if ward_buffer:
        fail(f"校区の名前が途中で終わっています（「{ward_buffer}」）")
    if not rows:
        fail("施設の行を取り出せませんでした")
    if totals is None:
        fail("「計」の行が見つかりません")
    for row in rows:
        if not row["ward"]:
            fail(f"{row['name']}: 校区が決まりませんでした")

    return {
        "asOf": as_of,
        "target": target,
        "notes": notes,
        "totals": totals,
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
