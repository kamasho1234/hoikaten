"""
岡山市の「認可保育園等の受入見込み状況」PDFから表を抜き出す

実行: python scripts/okayama-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-okayama-vacancy.ts から呼ぶ）

## 表の作り
- 7ページ。**ページごとに列数と見出しの行が違う**（1ページ目は15列で2行目に「0歳」、
  2ページ目以降は16列で3行目）。「0歳」を含む行を探して列位置を決める
- 空きは記号（○＝3人以上、△＝1〜2人、×＝受入れは難しい）。凡例は本文にある
- **施設名のセルに種別・設置者・電話・住所が全部入っている**。
  座標で見ると上段の左端が施設名、その右に種別（保/こ/小/事）、下段が電話と住所。
  **上段のうち種別より左の語をつないで施設名にする**
- 空らんはその年齢の受け入れがないことを示す（「対象年齢」の欄と合わせて読める）
- 区と中学校区は縦書きラベルで一部の行にしか文字がないので取り込まない
"""

import json
import re
import sys

import pdfplumber

MARKS = "○◯〇△×✕◎"
KUBUN = set("保こ小事")
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")
# 同じ行とみなす縦のずれ
SAME_LINE = 3.0


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def read_name(page, box):
    """
    施設名のセルから施設名だけを取り出す。
    上段（いちばん上のかたまり）のうち、種別（保/こ/小/事）より左にある語をつなぐ
    """
    words = page.crop(box).extract_words()
    if not words:
        return ""
    top0 = min(w["top"] for w in words)
    upper = [w for w in words if abs(w["top"] - top0) <= SAME_LINE]
    kubun_x = [w["x0"] for w in upper if w["text"].strip() in KUBUN]
    limit = min(kubun_x) if kubun_x else None
    parts = [
        w["text"]
        for w in sorted(upper, key=lambda w: w["x0"])
        if limit is None or w["x0"] < limit - 1
    ]
    return "".join(parts).strip()


def extract(path):
    as_of = None
    target = None
    legend = []
    notes = []
    rows = []
    mark_counts = {}
    blanks = 0

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) < 1:
            fail("ページがありません")

        for page_index, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            flat = "".join(text.split()).translate(ZEN)

            if as_of is None:
                m = re.search(r"確認時点令和(\d+)年(\d+)月(\d+)日時点", flat)
                if m:
                    as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
            if target is None:
                m = re.search(r"施設利用令和(\d+)年(\d+)月", flat)
                if m:
                    target = (int(m.group(1)), int(m.group(2)))

            if not legend:
                # 「表の記号の見方 ｢○｣…3人以上 ｢△｣…1～2人 ｢×｣…受入れは難しい」。
                # 空白を潰した文字列で探すと後ろの注意書きまで飲み込むので、行のまま読む
                for line in text.splitlines():
                    if "記号の見方" not in line:
                        continue
                    for mark, label in re.findall(
                        rf"[｢「]([{MARKS}])[｣」]\s*…\s*([^｢「●]+)", line
                    ):
                        legend.append({"mark": mark, "label": label.strip()})
                    break
            if not notes:
                for line in text.splitlines():
                    line = line.strip()
                    if line.startswith("なお、確認時点") or line.startswith("異なる場合"):
                        notes.append(line)

            bodies = [t for t in page.find_tables() if len(t.extract()[0]) >= 10]
            if not bodies:
                continue
            table = bodies[0]
            extracted = table.extract()

            # 「0歳」を含む行を探して、歳児の列の位置を決める
            age0 = None
            name_col = None
            for row in extracted[:4]:
                values = [cell(c) for c in row]
                if age0 is None and "0歳" in values:
                    age0 = values.index("0歳")
                if name_col is None:
                    for index, value in enumerate(values):
                        if value.startswith("施設名"):
                            name_col = index
                            break
            if age0 is None:
                fail(f"{page_index + 1}ページ目に「0歳」の見出しが見つかりません")
            if name_col is None:
                name_col = 2
            for age in range(1, 6):
                if age0 + age >= len(extracted[0]):
                    fail(f"{page_index + 1}ページ目の歳児の列が足りません")

            # 列ごとのx座標。罫線が引かれていない行のためにここで集めておく
            ranges = {}
            for row in table.rows:
                for index, box in enumerate(row.cells):
                    if box is not None and index not in ranges:
                        ranges[index] = (box[0], box[2])

            for row_index, row in enumerate(table.rows):
                values = [cell(c) for c in extracted[row_index]]
                if age0 + 5 >= len(values):
                    continue
                marks = [values[age0 + a] for a in range(6)]
                # 記号が1つでもある行が施設の行
                if not any(m and m in MARKS for m in marks):
                    continue

                box = row.cells[name_col] if name_col < len(row.cells) else None
                if box is None:
                    # 罫線が引かれていない行。列のx座標を借りて箱を組み立てる
                    if name_col not in ranges:
                        fail(f"{page_index + 1}ページ目の施設名の列のx座標を取れませんでした")
                    x0, x1 = ranges[name_col]
                    box = (x0, row.bbox[1], x1, row.bbox[3])
                name = read_name(page, box)
                if not name:
                    fail(f"{page_index + 1}ページ目の{row_index}行目の施設名が空です")

                cleaned = []
                for mark in marks:
                    if not mark:
                        blanks += 1
                        cleaned.append(None)
                        continue
                    cleaned.append(mark)
                rows.append(
                    {
                        "name": name,
                        "capacity": values[age0 - 2] if age0 >= 2 else "",
                        "startAge": values[age0 - 1] if age0 >= 1 else "",
                        "marks": cleaned,
                    }
                )

            # 記号の数。歳児の欄のx座標と表の範囲で切り出す
            if age0 not in ranges or age0 + 5 not in ranges:
                fail(f"{page_index + 1}ページ目の歳児の列のx座標を取れませんでした")
            for word in page.crop(
                (ranges[age0][0], table.bbox[1], ranges[age0 + 5][1], table.bbox[3])
            ).extract_words():
                for mark in MARKS:
                    n = word["text"].count(mark)
                    if n:
                        mark_counts[mark] = mark_counts.get(mark, 0) + n

    if not rows:
        fail("施設の行を取り出せませんでした")
    if as_of is None:
        fail("確認時点（令和N年M月D日時点）を読み取れませんでした")
    if target is None:
        fail("施設利用開始月を読み取れませんでした")
    if not legend:
        fail("記号の凡例が見つかりません")

    return {
        "asOf": as_of,
        "target": target,
        "legend": legend,
        "notes": notes,
        "markCounts": {k: v for k, v in mark_counts.items() if v},
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
