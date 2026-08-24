"""
苫小牧市の「市内認可保育所等入所予報」PDFから表を抜き出す

実行: python scripts/tomakomai-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-tomakomai-vacancy.ts から呼ぶ）

## 表の作り
- 4ページ。ページごとに種別が違う（保育所／認定こども園（保育部分）①②／小規模保育施設）
- 空きは絵文字（😄＝空きがある、😊＝空きが出る可能性がある、−＝入所人員を満たしている）
- **ページ1だけ20列**（歳児ごとにサブ列が3つあり、記号はそのどこかに入る）。
  ページ2〜4は8列。歳児の見出しの位置からサブ列の範囲を作る
- **施設名と住所が同じセルに入っていて、セルの中で2行に分かれている**。
  文字が1字ずつのwordになっているので、y座標でまとめてから上の行を施設名とする
- 小規模保育施設の3〜5歳はセルが横に結合されて斜線1本になっている
"""

import json
import re
import sys

import pdfplumber

COL_NAME = 0
AGE_COUNT = 6
MARKS = ["😄", "😊", "-", "−", "ー", "―"]
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def has_slash(page, box):
    return any(
        box[0] - 1 <= c["x0"]
        and c["x1"] <= box[2] + 1
        and box[1] - 1 <= c["top"]
        and c["bottom"] <= box[3] + 1
        for c in page.curves
    )


def age_columns(head2, width):
    """歳児の見出しの位置から、歳児ごとのサブ列の範囲を作る"""
    starts = []
    for age in range(AGE_COUNT):
        label = f"{age}歳児"
        if label not in head2:
            return None
        starts.append((age, head2.index(label)))
    if [i for _, i in starts] != sorted(i for _, i in starts):
        fail(f"歳児の見出しが並んでいません（{starts}）")
    ranges = []
    for index, (age, start) in enumerate(starts):
        end = starts[index + 1][1] if index + 1 < len(starts) else width
        ranges.append(list(range(start, end)))
    return ranges


def read_name(page, box):
    """
    セルの中の文字をy座標でまとめ、上の行を施設名、下の行を住所として返す。
    文字が1字ずつのwordになっているので、行ごとにx座標で並べてつなぐ
    """
    words = page.crop(box).extract_words()
    if not words:
        return "", ""
    lines = {}
    for word in words:
        key = round(word["top"] / 5)
        lines.setdefault(key, []).append(word)
    ordered = [
        "".join(w["text"] for w in sorted(group, key=lambda w: w["x0"]))
        for _, group in sorted(lines.items())
    ]
    name = ordered[0].strip()
    address = "".join(ordered[1:]).strip()
    return name, address


def read_notes(page):
    """
    「・」で始まる注意書きを読む。凡例が同じ行の右側に並んでいてテキスト抽出では混ざるので、
    凡例の記号より左にある語だけを行ごとにつなぐ
    """
    words = page.extract_words()
    notes = []
    for start in sorted(
        (w for w in words if w["text"].strip().startswith("・")), key=lambda w: w["top"]
    ):
        line = [w for w in words if abs(w["top"] - start["top"]) <= 3]
        # 同じ行の右側に凡例が並んでいる行だけ、凡例の手前で切る
        legend_x = min(
            (w["x0"] for w in line if any(m in w["text"] for m in MARKS[:2])), default=None
        )
        parts = []
        for word in sorted(line, key=lambda w: w["x0"]):
            if legend_x is not None and word["x0"] >= legend_x:
                continue
            parts.append(word["text"].strip())
        text = "".join(parts).lstrip("・").strip()
        if len(text) >= 10:
            notes.append(text)
    return notes


def extract(path):
    target = None
    as_of = None
    legend = []
    notes = []
    rows = []
    mark_counts = {}
    categories = []

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) < 2:
            fail(f"ページ数が{len(pdf.pages)}になっています")

        for page_index, page in enumerate(pdf.pages):
            flat = "".join((page.extract_text() or "").split()).translate(ZEN)

            if target is None:
                m = re.match(r"^(\d+)月令和", flat)
                if not m:
                    fail("何月ぶんの予報かを読み取れませんでした")
                target = int(m.group(1))
            if as_of is None:
                m = re.search(r"令和(\d+)年.*?(\d+)月(\d+)日時点", flat)
                if not m:
                    fail("基準日（令和N年 M月D日時点）を読み取れませんでした")
                as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

            if not legend:
                # 「-」を文字クラスに入れると範囲指定になるので、選択肢として並べる
                marks_pattern = "|".join(re.escape(m) for m in MARKS)
                for mark, label in re.findall(
                    rf"({marks_pattern})(入所人員[^・「]*)", flat
                ):
                    legend.append({"mark": mark, "label": label})
            if not notes:
                notes = read_notes(page)

            # 種別。タイトルが縦に分断されて括弧の中に入り込むので、先にタイトルを取り除く
            title = re.sub(r"令和\d+年市内認可保育所等入所予報", "", flat)
            m = re.search(r"[（(]([^（）()]*(?:保育所|こども園|保育施設)[^（）()]*)[）)]", title)
            if not m:
                fail(f"{page_index + 1}ページ目の種別を読み取れませんでした")
            category = m.group(1)
            if "保育部分" in category:
                category = category.replace("保育部分", "").strip() + "（保育部分）"

            bodies = [t for t in page.find_tables() if len(t.extract()[0]) >= 8]
            if len(bodies) != 1:
                fail(f"{page_index + 1}ページ目の本体の表が{len(bodies)}個あります")
            table = bodies[0]
            extracted = table.extract()
            head1 = [cell(c) for c in extracted[0]]
            head2 = [cell(c) for c in extracted[1]]
            if head1[COL_NAME] != "施設名":
                fail(f"1列目の見出しが「{head1[COL_NAME]}」になっています")
            ranges = age_columns(head2, len(head2))
            if ranges is None:
                fail(f"{page_index + 1}ページ目の歳児の見出しが見つかりません")

            if category not in categories:
                categories.append(category)

            for row_index, row in enumerate(table.rows):
                if row_index < 2:
                    continue
                values = [cell(c) for c in extracted[row_index]]
                box = row.cells[COL_NAME]
                if box is None:
                    continue
                name, address = read_name(page, box)
                if not name:
                    continue

                marks = []
                for age in range(AGE_COUNT):
                    found = [values[c] for c in ranges[age] if c < len(values) and values[c]]
                    if len(found) > 1:
                        fail(f"{name}: {age}歳児の欄に値が{len(found)}個あります（{found}）")
                    if found:
                        marks.append(found[0])
                        continue
                    # 空の欄。セルが結合されている（None）か斜線があればクラスなし
                    boxes = [row.cells[c] for c in ranges[age] if c < len(row.cells)]
                    if all(b is None for b in boxes) or any(
                        b is not None and has_slash(page, b) for b in boxes
                    ):
                        marks.append(None)
                        continue
                    fail(f"{name}: {age}歳児の欄が空で斜線もありません")

                if all(m is None for m in marks):
                    fail(f"{name}: 全てのクラスが空です")
                rows.append(
                    {"category": category, "name": name, "address": address, "marks": marks}
                )

            # 記号の数。歳児の欄のx座標と施設の行の範囲で切り出す
            first = table.rows[1].cells[ranges[0][0]]
            last = None
            for c in reversed(ranges[AGE_COUNT - 1]):
                if c < len(table.rows[1].cells) and table.rows[1].cells[c] is not None:
                    last = table.rows[1].cells[c]
                    break
            if first is None or last is None:
                fail("歳児の見出しの位置を取れませんでした")
            for word in page.crop(
                (first[0], table.rows[1].bbox[3], last[2], table.bbox[3])
            ).extract_words():
                for mark in MARKS:
                    n = word["text"].count(mark)
                    if n:
                        mark_counts[mark] = mark_counts.get(mark, 0) + n

    if not rows:
        fail("施設の行を取り出せませんでした")
    if not legend:
        fail("記号の凡例が見つかりません")

    return {
        "target": target,
        "asOf": as_of,
        "legend": legend,
        "notes": notes,
        "categories": categories,
        "markCounts": {k: v for k, v in mark_counts.items() if v},
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
