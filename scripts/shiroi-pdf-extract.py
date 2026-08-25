"""
白井市の「保育所等空き状況」PDFから表を抜き出す

実行: python scripts/shiroi-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-shiroi-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・10列（施設名／再掲の施設名／区分／0歳児〜5歳児／計）
- **1施設が3行**（在園児数・空き状況・保留者数）。「在園児数」の行で次の施設に移る
- 施設名のセルは3行ぶんが結合されているが、値が入る行は一定でない
  （「空き状況」の行に名前が入っている施設がある）ので、
  区分が「在園児数」の行を区切りにして、そのかたまりの中から名前を拾う
- **「送迎ステーション」のセルには、後ろに続く（再掲）の幼稚園名がまとめて入る**。
  改行で分けていちばん上だけを名前にする
- 幼稚園の（再掲）行は別の施設の内訳なので取り込まない（2列目に名前が入る）
- いちばん下に合計の行があるので、検算に使う
"""

import json
import re
import sys

import pdfplumber

COL_NAME = 0
COL_SUB = 1
COL_KIND = 2
COL_AGE0 = 3
AGE_COUNT = 6
COL_TOTAL = COL_AGE0 + AGE_COUNT
COLUMN_COUNT = COL_TOTAL + 1

KIND_ENROLLED = "在園児数"
KIND_VACANCY = "空き状況"
KIND_WAITING = "保留者数"
KINDS = (KIND_ENROLLED, KIND_VACANCY, KIND_WAITING)

ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def numbers(values, label):
    """年齢の欄と計の欄を数値にする。空らんは None"""
    counts = []
    for age in range(AGE_COUNT):
        value = cell(values[COL_AGE0 + age])
        if value == "":
            counts.append(None)
            continue
        if not re.fullmatch(r"\d+", value):
            fail(f"{label}: {age}歳児が数字ではありません（「{value}」）")
        counts.append(int(value))
    total = cell(values[COL_TOTAL])
    if not re.fullmatch(r"\d+", total):
        fail(f"{label}: 計が数字ではありません（「{total}」）")
    if sum(c for c in counts if c is not None) != int(total):
        fail(f"{label}: 年齢ごとの合計が計と合いません（{counts} / {total}）")
    return counts


def extract(path):
    notes = []
    rows = []
    totals = {}

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日現在", flat)
        if not m:
            fail("「令和N年M月D日現在」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"令和(\d+)年度(\d+)月入所希望者", flat)
        if not m:
            fail("「令和N年度M月入所希望者」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith("・") and len(stripped) > 10:
                notes.append(stripped.lstrip("・").strip())

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")
        extracted = tables[0].extract()

        head = [cell(c) for c in extracted[0]]
        if len(head) != COLUMN_COUNT:
            fail(f"列数が{len(head)}です（{COLUMN_COUNT}列のはず）")
        if head[COL_NAME] != "施設名" or head[COL_KIND] != "区分" or head[COL_TOTAL] != "計":
            fail(f"見出しが想定と違います: {head}")
        for age in range(AGE_COUNT):
            if head[COL_AGE0 + age] != f"{age}歳児":
                fail(f"年齢の見出しが想定と違います: {head}")

        # 「在園児数」の行を区切りにして、施設ごとのかたまりに分ける
        blocks = []
        for row in extracted[1:]:
            kind = cell(row[COL_KIND])
            if kind not in KINDS:
                fail(f"区分が想定と違います（「{kind}」）")
            if kind == KIND_ENROLLED or not blocks:
                blocks.append([])
            blocks[-1].append(row)

        for block in blocks:
            names = []
            sub_names = []
            for row in block:
                raw = row[COL_NAME]
                if raw and cell(raw):
                    # 送迎ステーションのセルには（再掲）の幼稚園名がまとめて入る
                    parts = [cell(p) for p in str(raw).split("\n") if cell(p)]
                    keep = [p for p in parts if not p.startswith("（再掲）")]
                    if len(keep) != 1:
                        fail(f"施設名を1つに決められません（{parts}）")
                    names.append(keep[0])
                if row[COL_SUB] and cell(row[COL_SUB]):
                    sub_names.append(cell(row[COL_SUB]))
            if sub_names:
                # 幼稚園の（再掲）は別の施設の内訳なので取り込まない
                continue
            if len(names) != 1:
                fail(f"施設名が{len(names)}個あるかたまりがあります（{names}）")
            name = names[0]

            values = {}
            for row in block:
                kind = cell(row[COL_KIND])
                if kind in values:
                    fail(f"{name}: 「{kind}」の行が2つあります")
                values[kind] = numbers(row, f"{name} {kind}")

            if name == "合計":
                totals = values
                continue
            missing = [k for k in KINDS if k not in values]
            if missing:
                fail(f"{name}: 「{'」「'.join(missing)}」の行がありません")
            rows.append(
                {
                    "name": name,
                    "enrolled": values[KIND_ENROLLED],
                    "vacancy": values[KIND_VACANCY],
                    "waiting": values[KIND_WAITING],
                }
            )

    if not rows:
        fail("施設の行を取り出せませんでした")
    if not totals:
        fail("合計の行が見つかりません")

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
