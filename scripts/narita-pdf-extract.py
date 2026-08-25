"""
成田市の「入所受入れ状況」PDFから表を抜き出す

実行: python scripts/narita-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-narita-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに**7つの表**が2段組みで置かれている。表の上に
  【公立・保育所】【私立・認定こども園】…のように施設の種類が書いてある
- 表によって年齢の列数が違う
  - 保育所・認定こども園・小規模（私立）… 0歳児〜5歳児の6列
  - 事業所内保育・家庭的保育 … 0歳児〜2歳児の3列
  - **【公立・小規模保育事業所】だけ見出しの行がなく**、
    0・1・2歳児の3列に加えて**3〜5歳児がひとつのセルにまとまっている**
- 空らんはその年齢のクラスがないことを表す（幼稚園型の0〜2歳、小規模の3〜5歳など）
- 建て替え工事などで休園している園は、年齢の欄に文章が入る

見出しのない表は、年齢の欄（園名の列の右端から表の右端まで）を6等分し、
セルがどの年齢に重なるかで割り当てる。ひとつのセルが3〜5歳にまたがるときは
その3つの年齢すべてに同じ記号を入れる。
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
MARKS = "○◯〇△×✕"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def title_of(page, table):
    """表の上に書いてある施設の種類（【公立・保育所】など）"""
    words = page.crop(
        (table.bbox[0] - 6, max(0, table.bbox[1] - 20), table.bbox[2], table.bbox[1] - 1)
    ).extract_words()
    for word in words:
        text = cell(word["text"])
        m = re.fullmatch(r"【(.+)】", text)
        if m:
            return m.group(1)
    return ""


def read_table(page, table, index, stats):
    extracted = table.extract()
    head = [cell(c) for c in extracted[0]]
    has_head = "地区" in head and "園名" in head

    # 年齢の列。見出しがあればそこから、なければセルの位置から決める
    cells = [b for b in table.rows[0].cells if b is not None]
    if len(cells) < 4:
        fail(f"{index}番目の表の列が{len(cells)}しかありません")

    if has_head:
        ages = [i for i, h in enumerate(head) if re.fullmatch(r"\d歳児", h)]
        if not ages:
            fail(f"{index}番目の表に年齢の見出しがありません: {head}")
        columns = [(i, [int(head[i][0])]) for i in ages]
        start = min(ages)
    else:
        # 年齢の欄を6等分して、セルが重なる年齢を割り当てる
        start = 2
        left = cells[start][0]
        right = cells[-1][2]
        width = (right - left) / AGE_COUNT
        columns = []
        for i in range(start, len(cells)):
            box = cells[i]
            hit = []
            for age in range(AGE_COUNT):
                lo, hi = left + width * age, left + width * (age + 1)
                overlap = min(box[2], hi) - max(box[0], lo)
                if overlap > width * 0.5:
                    hit.append(age)
            if not hit:
                fail(f"{index}番目の表の{i}列目がどの年齢にも当てはまりません")
            columns.append((i, hit))

    rows = []
    ward_carry = ""
    for values in (list(map(cell, r)) for r in extracted[1 if has_head else 0 :]):
        if len(values) < 3:
            continue
        name = values[1]
        if not name or name == "園名":
            continue
        if values[0]:
            ward_carry = values[0]
        if not ward_carry:
            fail(f"{name}: 地区が分かりません")

        marks = [None] * AGE_COUNT
        closed = ""
        for column, ages in columns:
            value = values[column] if column < len(values) else ""
            if not value:
                continue
            if not all(ch in MARKS for ch in value):
                # 「施設建て替え工事のため…」のような文章
                closed = value
                continue
            for age in ages:
                marks[age] = value
            # ひとつのセルを複数の年齢に広げたぶんは、印字された記号より多くなる
            stats["expanded"] = stats.get("expanded", 0) + len(ages) - 1
        rows.append({"ward": ward_carry, "name": name, "marks": marks, "closed": closed})

    return rows


def extract(path):
    as_of = None
    target = None
    legend = []
    notes = []
    groups = []
    mark_counts = {}
    stats = {}

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"ページ数が{len(pdf.pages)}になっています")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.split()).translate(ZEN)

        m = re.search(r"令和(\d+)年(\d+)月入所受入れ状況", flat)
        if not m:
            fail("表題（令和N年M月入所受入れ状況）を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        m = re.search(r"令和(\d+)年(\d+)月(\d+)日現在", flat)
        if not m:
            fail("「令和N年M月D日現在」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        # 「○…3名以上可能 △…1～２名程度可能 ×…現状受入れ予定はないが、…」
        for line in text.splitlines():
            if "…" not in line:
                continue
            for mark, label in re.findall(rf"([{MARKS}])…([^…]+?)(?=\s*[{MARKS}]…|$)", line):
                legend.append({"mark": mark, "label": label.strip()})
            if legend:
                break

        for line in text.splitlines():
            line = line.strip()
            if line.startswith("※") or line.startswith("成田市内の認可"):
                notes.append(line.lstrip("※").strip())

        tables = page.find_tables()
        if len(tables) < 5:
            fail(f"表が{len(tables)}個しかありません")
        for index, table in enumerate(tables):
            category = title_of(page, table)
            if not category:
                fail(f"{index}番目の表の種類（【…】）が見つかりません")
            rows = read_table(page, table, index, stats)
            if rows:
                groups.append({"category": category, "rows": rows})

        # 記号の数。表の範囲だけを見る
        for table in tables:
            cells = [b for b in table.rows[0].cells if b is not None]
            if len(cells) < 3:
                continue
            for word in page.crop(
                (cells[2][0], table.bbox[1], table.bbox[2], table.bbox[3])
            ).extract_words():
                for mark in MARKS:
                    n = word["text"].count(mark)
                    if n:
                        mark_counts[mark] = mark_counts.get(mark, 0) + n

    if not groups:
        fail("施設の行を取り出せませんでした")
    if not legend:
        fail("記号の凡例が見つかりません")

    return {
        "asOf": as_of,
        "target": target,
        "legend": legend,
        "notes": notes,
        "markCounts": {k: v for k, v in mark_counts.items() if v},
        "expanded": stats.get("expanded", 0),
        "groups": groups,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
