"""
松江市の「入所可能枠数情報」PDF（橋北地区・橋南地区）から表を抜き出す

実行: python scripts/matsue-pdf-extract.py <橋北.pdf> <橋南.pdf>
出力: 標準出力にJSON（fetch-matsue-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに3つの表。本体は「保育所名」の見出しを持つ18列の表
- 列は 公民館区／保育所名／定員／進級予定児童数／0歳児〜5歳児／合計／備考
- **罫線とセルの切れ目が当てにならない**（施設名が複数列にまたがる、3歳児が2列に分かれる、
  1つの行に複数の施設が入る）。そのため表のセルは使わず、
  **文字のy座標で行を作り、見出しのx座標で列に振り分ける**
- 施設名は1文字ずつ間隔をあけて印字されているので、語をつないで空白を落とす
- **公民館区の欄は結合されていない**。区名はグループの縦中央の行にだけ印字されていて、
  グループの切れ目は**太線**（`page.rects` に高さ1.3ほどの細長い矩形として入る。
  ふつうの罫線は0.6）。太線でバンドに区切って割り当てる

## 値の読み方
凡例の表は「数字＝空き枠数」「未定＝空き枠数が未定」、そして**斜線＝年齢に入所定員がない**
（凡例の表示欄そのものに斜線が引いてある）。

`-` は凡例に出てこないが、**空き枠が0**を表している。
たまち乳児保育園が「0歳3／1歳-／2歳-／合計3」で、たまちこども園（定員160・進級150）が
全年齢「-」で合計0であることから、「-」を0として数えると合計欄と合う。
一方、斜線の欄は乳児保育園の3〜5歳のように**クラスそのものがない**年齢に引かれている。

そのため斜線の数を数えて返し、取り込み側で「値のない欄の数」と照合する。
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")
# 太線と細い罫線を分ける高さ
THICK = 1.0
# 同じ行とみなす縦のずれ
SAME_LINE = 4.0


def fail(message):
    raise SystemExit(f"[中断] {message}")


def squeeze(s):
    return "".join(str(s or "").split()).translate(ZEN)


def bands(page, x0, x1, top, bottom):
    """
    公民館区のグループを、区の欄に引いてある太線で区切る。
    返すのは (上端, 下端, 区名) の並び
    """
    edges = []
    for r in page.rects:
        if r["width"] < (x1 - x0) * 0.7 or r["height"] < THICK or r["height"] > 4:
            continue
        if r["x0"] > x0 + 3 or r["x1"] < x1 - 3:
            continue
        y = (r["top"] + r["bottom"]) / 2
        if top - 3 <= y <= bottom + 3:
            edges.append(round(y, 1))
    edges = sorted(set(edges))
    if len(edges) < 3:
        fail(f"公民館区の区切りの太線が{len(edges)}本しかありません")

    out = []
    for upper, lower in zip(edges, edges[1:]):
        if lower - upper < 5:
            continue
        words = page.crop((x0, upper + 1, x1, lower - 1)).extract_words()
        name = squeeze("".join(w["text"] for w in sorted(words, key=lambda w: w["top"])))
        out.append((upper, lower, name))
    return out


def read_page(page, area_name, rows, mark_totals):
    text = page.extract_text() or ""
    flat = squeeze(text)

    tables = [t for t in page.find_tables() if len(t.extract()[0]) >= 10]
    if not tables:
        fail(f"{area_name}: 本体の表が見つかりません")
    table = tables[0]

    # 見出しの語から列のx位置を決める
    head_top, head_bottom = table.bbox[1], None
    heads = {}
    for word in page.crop((table.bbox[0], table.bbox[1], table.bbox[2], table.bbox[1] + 35)).extract_words():
        t = squeeze(word["text"])
        if re.fullmatch(r"\d歳児", t) or t in ("定員", "保育所名"):
            heads[t] = (word["x0"], word["x1"])
            head_bottom = max(head_bottom or 0, word["bottom"])
    if "保育所名" not in heads or "定員" not in heads:
        fail(f"{area_name}: 「保育所名」「定員」の見出しが見つかりません")
    for age in range(AGE_COUNT):
        if f"{age}歳児" not in heads:
            fail(f"{area_name}: 「{age}歳児」の見出しが見つかりません")

    # 「合計」は1文字ずつ離れて印字されるので、5歳児の右端から備考の手前までとする
    age_ranges = [heads[f"{age}歳児"] for age in range(AGE_COUNT)]
    age_centers = [(a + b) / 2 for a, b in age_ranges]
    total_center = age_centers[-1] + (age_centers[-1] - age_centers[-2])
    # 年齢の欄が始まるx（ここより左は定員や進級予定児童数）
    ages_left = age_ranges[0][0] - (age_centers[1] - age_centers[0]) / 2
    name_right = heads["定員"][0] - 2
    # 公民館区の欄の右端。橋北と橋南で表の幅が違うので、表のセルから取る
    kubun_right = None
    for row in table.rows:
        if row.cells and row.cells[0] is not None:
            kubun_right = row.cells[0][2]
            break
    if kubun_right is None:
        fail(f"{area_name}: 公民館区の欄の位置を取れませんでした")

    groups = bands(page, table.bbox[0], kubun_right, head_bottom, table.bbox[3])

    # 罫線は当てにならないので、文字のy座標で行を作る
    body = page.crop((table.bbox[0], head_bottom + 1, table.bbox[2], table.bbox[3])).extract_words()
    lines = []
    for word in sorted(body, key=lambda w: (w["top"], w["x0"])):
        if lines and abs(lines[-1][0]["top"] - word["top"]) <= SAME_LINE:
            lines[-1].append(word)
        else:
            lines.append([word])

    for words in lines:
        name = squeeze(
            "".join(
                w["text"]
                for w in sorted(words, key=lambda w: w["x0"])
                if kubun_right <= w["x0"] < name_right
            )
        )
        if not name:
            continue

        values = [None] * (AGE_COUNT + 1)
        targets = age_centers + [total_center]
        for w in words:
            center = (w["x0"] + w["x1"]) / 2
            if center < ages_left:
                continue
            index = min(range(len(targets)), key=lambda i: abs(targets[i] - center))
            if abs(targets[index] - center) > 16:
                continue
            t = squeeze(w["text"])
            if values[index] is not None:
                fail(f"{area_name}: {name} の{index}番目の欄に値が2つあります（{values[index]}／{t}）")
            values[index] = t

        center_y = sum(w["top"] + w["bottom"] for w in words) / (2 * len(words))
        kubun = next((g[2] for g in groups if g[0] <= center_y <= g[1]), "")
        if not kubun:
            fail(f"{area_name}: {name} の公民館区が分かりません")

        rows.append(
            {
                "area": area_name,
                "ward": kubun,
                "name": name,
                "marks": values[:AGE_COUNT],
                "total": values[AGE_COUNT],
            }
        )

    # 斜線（年齢に入所定員がない印）の数を数える。年齢の欄の範囲だけを見る
    for line in page.lines:
        if abs(line["x1"] - line["x0"]) <= 5 or abs(line["bottom"] - line["top"]) <= 3:
            continue
        x = (min(line["x0"], line["x1"]) + max(line["x0"], line["x1"])) / 2
        y = (line["top"] + line["bottom"]) / 2
        if ages_left <= x <= age_ranges[-1][1] + 5 and head_bottom < y <= table.bbox[3]:
            mark_totals["slash"] = mark_totals.get("slash", 0) + 1

    # PDFに印字されている数字の合計（検算用）。年齢の欄だけを見る
    for word in page.crop((ages_left, head_bottom, age_ranges[-1][1] + 5, table.bbox[3])).extract_words():
        t = squeeze(word["text"])
        if re.fullmatch(r"\d+", t):
            mark_totals["sum"] = mark_totals.get("sum", 0) + int(t)
            mark_totals["count"] = mark_totals.get("count", 0) + 1

    return flat


def extract(paths):
    rows = []
    mark_totals = {}
    as_of = None
    target = None
    legend = []

    for path in paths:
        with pdfplumber.open(path) as pdf:
            if len(pdf.pages) != 1:
                fail(f"{path}: ページ数が{len(pdf.pages)}になっています")
            page = pdf.pages[0]
            text = page.extract_text() or ""
            flat = squeeze(text)

            m = re.search(r"【(.+?)地区】", flat)
            if not m:
                fail(f"{path}: 【◯◯地区】が見つかりません")
            area = m.group(1)

            m = re.search(r"(\d+)月(\d+)日時点", flat)
            if not m:
                fail(f"{path}: 「M月D日時点」が見つかりません")
            if as_of is None:
                as_of = (int(m.group(1)), int(m.group(2)))
            elif as_of != (int(m.group(1)), int(m.group(2))):
                fail(f"{path}: 時点が他のファイルと違います")

            m = re.search(r"令和(\d+)年(\d+)月入所可能枠数情報", flat)
            if not m:
                fail(f"{path}: 「令和N年M月 入所可能枠数情報」が見つかりません")
            if target is None:
                target = (int(m.group(1)), int(m.group(2)))
            elif target != (int(m.group(1)), int(m.group(2))):
                fail(f"{path}: 対象月が他のファイルと違います")

            if not legend:
                for line in text.splitlines():
                    line = line.strip()
                    if "空き枠数" in line and "数字" in line:
                        legend.append(line)
                    elif "未定" in line and "空き枠数" in line:
                        legend.append(line)
                    elif "入所定員がない" in line:
                        legend.append(line)

            read_page(page, area, rows, mark_totals)

    if not rows:
        fail("施設の行を取り出せませんでした")
    if as_of is None or target is None:
        fail("時点か対象月を読み取れませんでした")

    return {
        "asOf": as_of,
        "target": target,
        "legend": legend,
        "printed": mark_totals,
        "rows": rows,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) < 1:
        fail("PDFのパスを指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
