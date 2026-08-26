"""
宗像市の「認可保育所・認定こども園 受入可能状況」PDFから表を抜き出す

実行: python scripts/munakata-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-munakata-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに表が3つ。前の2つはクラスと生年月日の対応表、3つ目が受入可能状況
- 受入可能状況の表は9列（区分／施設名／受入可能月齢／0歳児〜5歳児）で、見出しは2段
- 区分（認可保育所・認定こども園）は縦書きの結合セルで、グループの先頭の行に入る。
  **縦書きが2列に分かれていて「認定(保こ育ど利用も)園」のように文字が混ざる**ので、
  含まれる文字から知っている区分名に寄せる
- 記号は 〇＝3名以上受入可、△＝1〜2名受入可、－＝新規受入不可。
  **凡例はいちばん下の行にある**
- 施設名は「赤 間 保 育 園」のように1文字ずつ空きが入る
- 「受入可能月齢」は「生後3ヶ月たった翌月～」「1歳児～」「2歳児～」のように書かれる
"""

import json
import re
import sys

import pdfplumber

COL_KIND = 0
COL_NAME = 1
COL_ACCEPT = 2
COL_AGE0 = 3
AGE_COUNT = 6
COLUMN_COUNT = COL_AGE0 + AGE_COUNT

MARKS = "○◯〇△×✕－―—"
# 縦書きの区分名は文字が入り混じって読まれるので、含まれる文字で見分ける
KNOWN_KINDS = ("認可保育所", "認定こども園(保育利用)", "認定こども園")
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


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
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月", flat)
        if not m:
            fail("「令和N年M月」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        # 「○：３名以上受入可 △：１～２名受入可 －：新規受入不可」
        legend_line = next(
            (l for l in text.splitlines() if l.count("：") >= 2 and "受入" in l), None
        )
        if legend_line is None:
            fail("記号の凡例の行が見つかりません")
        squeezed = "".join(legend_line.split()).translate(ZEN)
        for mark, label in re.findall(rf"([{MARKS}])：([^{MARKS}]+)", squeezed):
            legend.append({"mark": mark, "label": label})
        if not legend:
            fail("凡例から記号を取り出せませんでした")

        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith("□") and len(stripped) > 12:
                notes.append(stripped.lstrip("□").strip())

        main = None
        for table in page.find_tables():
            head = [cell(c) for c in table.extract()[0]]
            if len(head) == COLUMN_COUNT:
                main = table
                break
        if main is None:
            fail("受入可能状況の表が見つかりません")

        extracted = main.extract()
        second = [cell(c) for c in extracted[1]]
        for age in range(AGE_COUNT):
            if second[COL_AGE0 + age] != f"{age}歳児":
                fail(f"年齢の見出しが想定と違います: {second}")

        kind_carry = ""
        for values in (list(map(cell, r)) for r in extracted[2:]):
            name = values[COL_NAME]
            if not name:
                continue
            if values[COL_KIND]:
                # 縦書きが2列に分かれて「認定(保こ育ど利用も)園」のように混ざるので、
                # 知っている区分名のどれかに寄せる
                raw_kind = values[COL_KIND]
                matched = [k for k in KNOWN_KINDS if set(k) <= set(raw_kind)]
                if not matched:
                    fail(f"区分の名前が想定と違います（「{raw_kind}」）")
                kind_carry = max(matched, key=len)
            if not kind_carry:
                fail(f"{name}: 区分が分かりません")

            marks = []
            for age in range(AGE_COUNT):
                value = values[COL_AGE0 + age]
                if value == "":
                    blanks += 1
                    marks.append(None)
                    continue
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
                    "acceptAge": values[COL_ACCEPT],
                    "marks": marks,
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
