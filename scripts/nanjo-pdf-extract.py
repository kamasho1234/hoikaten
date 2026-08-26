"""
南城市の「入所状況」PDFから表を抜き出す

実行: python scripts/nanjo-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-nanjo-vacancy.ts から呼ぶ）

## 表の作り
- 4ページ。どのページも10列（区分／保育所名／行の種類／0歳児〜5歳児／計）
- **1施設が5行**（定員・受入可能人数・入所人数・入所待ち人数・空き状況）
- 施設名のセルに「め ば え 保 育 園（ 地 域 ： 佐 敷 ）」のように
  名前と地域が改行で入る
- 区分（認可保育所・小規模保育所・公立認定こども園など）は縦書きの結合セルで、
  グループの先頭の行に入る
- いちばん下に「合 計」の5行があるので検算に使う。
  **合計の行は施設名の列ではなく区分の列に「合 計」と入る**（大里こども園1号を除く）
- 空らんは、そのクラスがない施設のもの
- 「入所待ち人数」は第1〜第4希望のいずれかにその施設を希望している人数
"""

import json
import re
import sys

import pdfplumber

COL_KIND = 0
COL_NAME = 1
COL_ROW = 2
COL_AGE0 = 3
AGE_COUNT = 6
COL_TOTAL = COL_AGE0 + AGE_COUNT
COLUMN_COUNT = COL_TOTAL + 1

ROW_CAPACITY = "定員"
ROW_ACCEPTABLE = "受入可能人数"
ROW_ENROLLED = "入所人数"
ROW_WAITING = "入所待ち人数"
ROW_VACANCY = "空き状況"
ROW_KINDS = (ROW_CAPACITY, ROW_ACCEPTABLE, ROW_ENROLLED, ROW_WAITING, ROW_VACANCY)

ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def numbers(values, label):
    counts = []
    for age in range(AGE_COUNT):
        value = values[COL_AGE0 + age].replace(",", "")
        if value == "":
            counts.append(None)
            continue
        if not re.fullmatch(r"\d+", value):
            fail(f"{label}: {age}歳児が数字ではありません（「{value}」）")
        counts.append(int(value))
    total = values[COL_TOTAL].replace(",", "")
    if not re.fullmatch(r"\d+", total):
        fail(f"{label}: 計が数字ではありません（「{values[COL_TOTAL]}」）")
    if sum(c for c in counts if c is not None) != int(total):
        fail(f"{label}: 年齢ごとの合計が計と合いません（{counts} / {total}）")
    return counts


def extract(path):
    notes = []
    rows = []
    totals = {}

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) < 1:
            fail("ページがありません")

        first = pdf.pages[0]
        flat = "".join((first.extract_text() or "").split()).translate(ZEN)
        m = re.search(r"R(\d+)\.(\d+)\.(\d+)入所状況", flat)
        if not m:
            fail("「R08.8.01入所状況」の形を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        last = pdf.pages[-1]
        for line in (last.extract_text() or "").splitlines():
            stripped = line.strip()
            if stripped.startswith("※") and len(stripped) > 12:
                notes.append(stripped.lstrip("※").strip())

        kind_carry = ""
        current = None
        for page in pdf.pages:
            tables = page.find_tables()
            if len(tables) != 1:
                fail(f"表が{len(tables)}個あるページがあります（1個のはず）")
            for raw_row in tables[0].extract():
                values = list(map(cell, raw_row))
                if len(values) != COLUMN_COUNT:
                    fail(f"列数が{len(values)}の行があります（{COLUMN_COUNT}列のはず）")
                row_kind = values[COL_ROW]
                if row_kind not in ROW_KINDS:
                    continue

                # 合計の行は施設名の列ではなく区分の列に「合 計※大里こ…」と入る
                if values[COL_KIND].startswith("合計"):
                    current = {"kind": "合計", "name": "合計", "area": "", "values": {}}
                    rows.append(current)
                elif values[COL_KIND]:
                    kind_carry = values[COL_KIND]

                # 施設名は「め ば え 保 育 園（ 地 域 ： 佐 敷 ）」の形
                raw_name = str(raw_row[COL_NAME] or "")
                if cell(raw_name):
                    parts = [cell(p) for p in raw_name.split("\n") if cell(p)]
                    name = ""
                    area = ""
                    for part in parts:
                        m2 = re.fullmatch(r"[（(]地域[：:](.+)[）)]", part)
                        if m2:
                            area = m2.group(1)
                        else:
                            name += part
                    if not name:
                        fail(f"施設名を取り出せません（「{raw_name}」）")
                    current = {
                        "kind": kind_carry,
                        "name": name,
                        "area": area,
                        "values": {},
                    }
                    rows.append(current)

                if current is None:
                    continue
                if row_kind in current["values"]:
                    fail(f"{current['name']}: 「{row_kind}」の行が2つあります")
                current["values"][row_kind] = numbers(values, f"{current['name']} {row_kind}")

    if not rows:
        fail("施設の行を取り出せませんでした")

    facilities = []
    for row in rows:
        missing = [k for k in ROW_KINDS if k not in row["values"]]
        if missing:
            fail(f"{row['name']}: 「{'」「'.join(missing)}」の行がありません")
        if row["name"].startswith("合計"):
            totals = row["values"]
            continue
        facilities.append(
            {
                "kind": row["kind"],
                "name": row["name"],
                "area": row["area"],
                "capacity": row["values"][ROW_CAPACITY],
                "acceptable": row["values"][ROW_ACCEPTABLE],
                "enrolled": row["values"][ROW_ENROLLED],
                "waiting": row["values"][ROW_WAITING],
                "vacancy": row["values"][ROW_VACANCY],
            }
        )

    if not totals:
        fail("「合 計」の行が見つかりません")

    return {"asOf": as_of, "notes": notes, "totals": totals, "rows": facilities}


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
