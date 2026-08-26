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
COL_AGE0 = 2
AGE_COUNT = 6
COL_TOTAL = COL_AGE0 + AGE_COUNT
COLUMN_COUNT = COL_TOTAL + 1

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
            tables = page.find_tables()
            if len(tables) != 1:
                fail(f"{index + 1}ページ目の表が{len(tables)}個です（1個のはず）")
            extracted = tables[0].extract()

            head = [cell(c) for c in extracted[0]]
            if len(head) != COLUMN_COUNT:
                fail(f"{index + 1}ページ目の列数が{len(head)}です（{COLUMN_COUNT}列のはず）")
            if head[COL_WARD] != "校区" or head[COL_NAME] != "保育施設名":
                fail(f"{index + 1}ページ目の見出しが想定と違います: {head}")
            for age in range(AGE_COUNT):
                if head[COL_AGE0 + age] != f"{age}才":
                    fail(f"{index + 1}ページ目の年齢の見出しが想定と違います: {head}")

            for raw_row in extracted[1:]:
                values = list(map(cell, raw_row))
                ward_part = values[COL_WARD]
                raw_name = raw_row[COL_NAME] or ""
                parts = [cell(p) for p in str(raw_name).split("\n") if cell(p)]

                # 「計」の行
                if ward_part == "計" and not parts:
                    counts = []
                    for age in range(AGE_COUNT):
                        value = values[COL_AGE0 + age]
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
                    value = values[COL_AGE0 + age]
                    if value == "":
                        counts.append(None)
                        continue
                    if not re.fullmatch(r"\d+", value):
                        fail(f"{name}: {age}才が数字ではありません（「{value}」）")
                    counts.append(int(value))

                total = values[COL_TOTAL]
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
