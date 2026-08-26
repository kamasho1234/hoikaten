"""
新居浜市の「保育所等入所（園）受入可能児童数情報」PDFから表を抜き出す

実行: python scripts/niihama-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-niihama-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに表が2つ。1つ目が市全体の入所待ち人数と待機児童人数、
  2つ目が施設ごとの受入可能児童数
- 施設の表は8列（区分／保育所名／0歳児〜5歳児）
- 区分（公立保育所・私立保育所・認定こども園・地域型保育事業所）は
  縦書きの結合セルで、グループの先頭の行に入る
- **全ての年齢が空らんの施設がある**（新居浜保育園など）。
  受入可能児童数が示されていないだけなので、そのまま空らんとして持つ
- 空らんは、そのクラスがない施設のものでもある（地域型保育は0〜2歳まで）
"""

import json
import re
import sys

import pdfplumber

COL_KIND = 0
COL_NAME = 1
COL_AGE0 = 2
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

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
    waiting = None
    waiting_total = None
    taiki = None

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日時点", flat)
        if not m:
            fail("「令和N年M月D日時点」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"(\d+)月(\d+)日入所希望用", flat)
        if not m:
            fail("「N月D日入所希望用」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith("※") and len(stripped) > 12:
                notes.append(stripped.lstrip("※").strip())

        tables = page.find_tables()
        if len(tables) < 2:
            fail(f"表が{len(tables)}個しかありません（2個以上のはず）")

        summary = None
        main = None
        for table in tables:
            head = [cell(c) for c in table.extract()[0]]
            if len(head) == COLUMN_COUNT and head[COL_NAME] == "保育所名":
                main = table
            elif head and head[-1] == "計":
                summary = table
        if summary is None:
            fail("入所待ち人数の表が見つかりません")
        if main is None:
            fail("受入可能児童数の表が見つかりません")

        for values in (list(map(cell, r)) for r in summary.extract()[1:]):
            label = values[0]
            if label.startswith("入所待ち人数"):
                counts = []
                for age in range(AGE_COUNT):
                    value = values[age + 1]
                    if not re.fullmatch(r"\d+", value):
                        fail(f"入所待ち人数の{age}歳児が数字ではありません（「{value}」）")
                    counts.append(int(value))
                total = values[AGE_COUNT + 1]
                if not re.fullmatch(r"\d+", total):
                    fail(f"入所待ち人数の計が数字ではありません（「{total}」）")
                if sum(counts) != int(total):
                    fail(f"入所待ち人数の合計が計と合いません（{counts} / {total}）")
                waiting = counts
                waiting_total = int(total)
            elif label.startswith("待機児童人数"):
                value = values[AGE_COUNT + 1]
                if re.fullmatch(r"\d+", value):
                    taiki = int(value)

        if waiting is None:
            fail("「入所待ち人数」の行が見つかりません")

        extracted = main.extract()
        head = [cell(c) for c in extracted[0]]
        for age in range(AGE_COUNT):
            if head[COL_AGE0 + age] != f"{age}歳児":
                fail(f"年齢の見出しが想定と違います: {head}")

        kind_carry = ""
        for values in (list(map(cell, r)) for r in extracted[1:]):
            name = values[COL_NAME]
            if not name:
                continue
            if values[COL_KIND]:
                kind_carry = values[COL_KIND]
            if not kind_carry:
                fail(f"{name}: 区分が分かりません")

            counts = []
            for age in range(AGE_COUNT):
                value = values[COL_AGE0 + age]
                if value == "":
                    counts.append(None)
                    continue
                if not re.fullmatch(r"\d+", value):
                    fail(f"{name}: {age}歳児が数字ではありません（「{value}」）")
                counts.append(int(value))

            rows.append({"kind": kind_carry, "name": name, "counts": counts})

    if not rows:
        fail("施設の行を取り出せませんでした")

    return {
        "asOf": as_of,
        "target": target,
        "notes": notes,
        "waiting": waiting,
        "waitingTotal": waiting_total,
        "taiki": taiki,
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
