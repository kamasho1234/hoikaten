"""
木津川市の「保育施設の空き状況」PDFから表を抜き出す

実行: python scripts/kizugawa-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kizugawa-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ・9列（区分／施設名／0歳児〜5歳児／備考）
- 記号は 〇＝3人以上、△＝1〜2人、×＝0人
- 空らんはその年齢の受け入れがないことを表す（0人のときは「×」と書かれる）
- **凡例と注記は「備考」の列に縦に入っている**。行ごとに断片化しているので、
  上から順につなげると全文が戻る
- 区分（公立保育所・公立認定こども園・認定こども園・小規模保育事業・
  家庭的保育事業）は縦書きで、断片が複数行に散らばるうえ
  グループの境目を表から決められないので取り込まない
"""

import json
import re
import sys

import pdfplumber

COL_KIND = 0
COL_NAME = 1
COL_AGE0 = 2
AGE_COUNT = 6
COL_REMARK = COL_AGE0 + AGE_COUNT
COLUMN_COUNT = COL_REMARK + 1

MARKS = "〇○◯△×✕"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def shape_of(mark):
    if not mark:
        return ""
    if mark in "〇○◯":
        return "○"
    if mark in "×✕":
        return "×"
    return mark


def extract(path):
    rows = []
    mark_counts = {}
    blanks = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"[（(]令和(\d+)年(\d+)月(\d+)日時点[）)]", flat)
        if not m:
            fail("「（令和N年M月D日時点）」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"令和(\d+)年度木津川市保育施設の空き状況", flat)
        if not m:
            fail("「令和N年度木津川市保育施設の空き状況」を読み取れませんでした")
        fiscal = int(m.group(1))

        tables = [t for t in page.find_tables() if len(t.extract()[0]) == COLUMN_COUNT]
        if not tables:
            fail("表が見つかりません")
        extracted = tables[0].extract()

        head_index = next(
            (i for i, r in enumerate(extracted) if cell(r[COL_AGE0]) == "0歳児"), None
        )
        if head_index is None:
            fail("「0歳児」の見出しの行が見つかりません")
        head = [cell(c) for c in extracted[head_index]]
        for age in range(AGE_COUNT):
            if head[COL_AGE0 + age] != f"{age}歳児":
                fail(f"年齢の見出しが想定と違います: {head}")

        # 備考の列は行ごとに断片化しているので、上から順につないで全文に戻す
        remark = "".join(cell(r[COL_REMARK]) for r in extracted)
        remark = re.sub(r"^備考", "", remark)

        # 「表の見方「×」…0人「△」1～2人「〇」…3人以上」
        legend = {}
        for mark, label in re.findall(rf"「([{MARKS}])」…?([^「※]+)", remark):
            legend[shape_of(mark)] = label.strip()
        if len(legend) < 3:
            fail(f"備考から記号の凡例を{len(legend)}件しか取れませんでした（{remark[:80]}）")

        # 注記は句点で切る
        notes = [n.strip() + "。" for n in remark.split("。") if len(n.strip()) > 12]

        for values in (list(map(cell, r)) for r in extracted[head_index + 1 :]):
            name = values[COL_NAME]
            if not name:
                continue

            marks = []
            for age in range(AGE_COUNT):
                value = shape_of(values[COL_AGE0 + age])
                if value == "":
                    blanks += 1
                    marks.append(None)
                    continue
                if value not in legend:
                    fail(f"{name}: {age}歳児が凡例にない記号です（「{value}」）")
                marks.append(value)
                mark_counts[value] = mark_counts.get(value, 0) + 1

            if all(m is None for m in marks):
                fail(f"{name}: 全ての年齢が空らんです")
            rows.append({"name": name, "marks": marks})

    if not rows:
        fail("施設の行を取り出せませんでした")

    return {
        "fiscal": fiscal,
        "asOf": as_of,
        "legend": [{"mark": k, "label": v} for k, v in legend.items()],
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
