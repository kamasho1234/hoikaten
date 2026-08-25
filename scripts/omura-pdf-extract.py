"""
大村市の「保育所等空き状況一覧表」PDFから表を抜き出す

実行: python scripts/omura-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-omura-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・区分／施設名／0歳児〜5歳児／備考
- **年齢の列が1つあたり複数の列に割れている**（記号がどの列に入るかは行ごとに違う）。
  見出し行の「0歳児」〜「5歳児」「備考」の位置から年齢ごとの列の範囲を決めて、
  その範囲で空でないセルが1つだけあることを確かめてから記号を取る
- 区分（保育所／認定こども園／地域型保育事業）は縦書きの結合セルで、
  グループの先頭の行にだけ入る
- 空らんは、そのクラスがない施設のもの（地域型保育は0〜2歳児まで）
- 凡例は表の上に「【 ○：空き3人以上 △：空き１～２人 ×：空きなし 】」とある
"""

import json
import re
import sys
import unicodedata

import pdfplumber

AGE_COUNT = 6
MARKS = "○◯〇△×✕"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def normalize_glyphs(s):
    """縦書き用の康熙部首（⼊ ⽉ ⽤ など）が混ざるので、その範囲だけ普通の漢字に直す"""
    return "".join(
        unicodedata.normalize("NFKC", ch) if "⺀" <= ch <= "⿟" else ch for ch in s
    )


def cell(s):
    if s is None:
        return ""
    return normalize_glyphs("".join(str(s).split()).translate(ZEN))


def extract(path):
    legend = []
    notes = []
    rows = []
    mark_counts = {}
    blanks = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = normalize_glyphs("".join(text.split()).translate(ZEN))

        m = re.search(r"令和(\d+)年(\d+)月入所希望者用", flat)
        if not m:
            fail("「令和N年M月入所希望者用」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        m = re.search(r"【([^】]*空き[^】]*)】", flat)
        if not m:
            fail("記号の凡例が見つかりません")
        for mark, label in re.findall(rf"([{MARKS}])：([^{MARKS}】]+)", m.group(1)):
            legend.append({"mark": mark, "label": label.strip()})
        if not legend:
            fail("凡例から記号を取り出せませんでした")

        for line in text.splitlines():
            line = line.strip()
            if line.startswith("・") and len(line) > 8:
                notes.append(normalize_glyphs(line.lstrip("・").strip()))

        tables = page.find_tables()
        if not tables:
            fail("表が見つかりません")
        extracted = tables[0].extract()

        head = [cell(c) for c in extracted[0]]
        # 見出しから年齢ごとの列の範囲を決める（1つの年齢が複数の列に割れている）
        starts = []
        for age in range(AGE_COUNT):
            found = [i for i, v in enumerate(head) if v == f"{age}歳児"]
            if len(found) != 1:
                fail(f"「{age}歳児」の見出しが{len(found)}個あります")
            starts.append(found[0])
        remarks = [i for i, v in enumerate(head) if v == "備考"]
        if len(remarks) != 1:
            fail(f"「備考」の見出しが{len(remarks)}個あります")
        bounds = [(starts[age], starts[age + 1] if age + 1 < AGE_COUNT else remarks[0]) for age in range(AGE_COUNT)]
        if starts[0] < 2:
            fail(f"「0歳児」の列が左に寄りすぎています（{starts[0]}列目）")

        kind_carry = ""
        for values in (list(map(cell, r)) for r in extracted[1:]):
            name = values[1]
            if not name:
                continue
            if values[0]:
                kind_carry = values[0]
            if not kind_carry:
                fail(f"{name}: 区分が分かりません")

            marks = []
            for age, (start, end) in enumerate(bounds):
                found = [v for v in values[start:end] if v]
                if not found:
                    blanks += 1
                    marks.append(None)
                    continue
                if len(found) > 1:
                    fail(f"{name}: {age}歳児に値が{len(found)}個あります（{found}）")
                value = found[0]
                if value not in MARKS:
                    fail(f"{name}: {age}歳児が想定の記号ではありません（「{value}」）")
                marks.append(value)
                mark_counts[value] = mark_counts.get(value, 0) + 1

            if all(m is None for m in marks):
                fail(f"{name}: 全ての年齢が空らんです")
            rows.append(
                {
                    "kind": kind_carry,
                    "name": name,
                    "marks": marks,
                    "remark": values[remarks[0]],
                }
            )

    if not rows:
        fail("施設の行を取り出せませんでした")

    return {
        "target": target,
        "legend": legend,
        "notes": notes,
        "markCounts": mark_counts,
        "blanks": blanks,
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
