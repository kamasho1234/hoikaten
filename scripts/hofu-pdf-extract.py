"""
防府市の「受入可能状況」PDFから表を抜き出す

実行: python scripts/hofu-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-hofu-vacancy.ts から呼ぶ）

## 表の作り
- 2ページ。施設の種類ごと（認定こども園／保育所／地域型保育／事業所内保育）に
  表が分かれ、**表によって年齢の列数が違う**（0〜2歳だけの表がある）
- 各表は 地区／公私／保育施設名／年齢…
- 地区は縦書きの結合セルで、グループの先頭の行に入る
- 記号は6段階。「－」＝受入なし、「×」＝現時点で入所不可、
  「▲」＝1〜2人、「△」＝3〜5人、「■」＝6〜10人、「□」＝11人以上
- 施設名は「松 崎 幼 稚 園」のように1文字ずつ空きが入る
- 年齢の見出しは「０歳児（令和８…年４月２日～…）」と長いので、先頭で見る
"""

import json
import re
import sys

import pdfplumber

COL_AREA = 0
COL_PUBLIC = 1
COL_NAME = 2
COL_AGE0 = 3
AGE_COUNT = 6

# ハイフンは文字クラスで範囲と解釈されるので末尾に置く
MARKS = "－―—×✕▲△■□-"
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
        if len(pdf.pages) < 1:
            fail("ページがありません")

        first = pdf.pages[0]
        text = first.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月入所", flat)
        if not m:
            fail("「令和N年M月入所」を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        # 「「－」・・・受入なし 【０】 「×」・・・現時点で入所不可 【０】 …」
        # 最後の「□」だけ【】が付かず注意書きまで続くので、そこで切る
        for mark, label in re.findall(rf"「([{MARKS}])」・+([^【」]+)", flat):
            label = re.split(r"＜注意＞|※", label)[0].strip()
            if not label:
                fail(f"「{mark}」のラベルを読み取れませんでした")
            legend.append({"mark": mark, "label": label})
        if not legend:
            fail("記号の凡例が見つかりません")

        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith("※") and len(stripped) > 12:
                notes.append(stripped.lstrip("※").strip())

        for page in pdf.pages:
            for table in page.find_tables():
                extracted = table.extract()
                head = [cell(c) for c in extracted[0]]
                if len(head) <= COL_AGE0 or head[COL_NAME] != "保育施設名":
                    continue

                ages = {}
                for column in range(COL_AGE0, len(head)):
                    m = re.match(r"(\d)歳児", head[column])
                    if m:
                        ages[int(m.group(1))] = column
                if not ages:
                    fail(f"年齢の見出しが見つかりません: {head}")

                area_carry = ""
                for values in (list(map(cell, r)) for r in extracted[1:]):
                    name = values[COL_NAME]
                    if not name:
                        continue
                    if values[COL_AREA]:
                        area_carry = values[COL_AREA]
                    if not area_carry:
                        fail(f"{name}: 地区が分かりません")

                    marks = []
                    for age in range(AGE_COUNT):
                        if age not in ages:
                            blanks += 1
                            marks.append(None)
                            continue
                        value = values[ages[age]]
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
                            "area": area_carry,
                            "public": values[COL_PUBLIC],
                            "name": name,
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
