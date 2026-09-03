"""
京都市の「保育施設・事業所の受入枠」PDFから表を抜き出してJSONで返す

実行: python scripts/kyoto-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-kyoto-vacancy.ts から呼ぶ）

## 表の作り
- 22ページ。各ページに1つの表（13列）で、ページごとに見出しの行が入る
  「行政区／類型／保育施設・事業所名／所在地／電話番号／受入年齢／開園時間／0歳児〜5歳児」
- 受入枠は記号（×＝0人、△＝1〜2人、○＝3人以上）。凡例にない「要相談」も入る
- その施設にないクラスは空欄
- 凡例と掲載日は1ページめの本文

## 表の抽出が欄を空で返すことがある
罫線の引かれ方によって、pdfplumber の表抽出が施設1件ぶんの記号を
まるごと落とすことがある（令和8年10月分の「天授ヶ岡幼稚園 小規模保育ベテスダ」）。
文字そのものはページに載っているので、その升目の中にある文字で埋め直す。

升目の境目がわずかにずれている行があるので、**すでに読めている欄の文字は
二度使わない**。同じ記号を隣の欄にもう一度入れると記号が増えてしまう。
本文の記号の数と突き合わせる検算があるので、多くても少なくてもそこで止まる。
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
EXPECTED_COLUMNS = 7 + AGE_COUNT
HEAD = "行政区類型保育施設・事業所名所在地電話番号受入年齢開園時間0歳児1歳児2歳児3歳児4歳児5歳児"


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def column_bounds(table):
    """列ごとの左右の位置を、升目が取れている行から決める。

    罫線が薄い行は升目そのものが取れず（cells が None になり）、
    その行だけ位置が分からなくなる。表の他の行から借りる。
    """
    xs = {}
    for row in table.rows:
        for c, bbox in enumerate(row.cells):
            if bbox is None:
                continue
            xs.setdefault(c, []).append((bbox[0], bbox[2]))
    out = {}
    for c, vals in xs.items():
        vals.sort()
        out[c] = vals[len(vals) // 2]
    return out


# 年齢の欄（0歳児〜5歳児）が表の何列目から始まるか
AGE_FIRST_COLUMN = EXPECTED_COLUMNS - AGE_COUNT


def fill_from_words(rows, table, words):
    """表の抽出が空にした年齢の欄を、その升目の中にある文字で埋める"""
    bounds = column_bounds(table)
    filled = 0
    for r, trow in enumerate(table.rows):
        if r >= len(rows):
            continue
        # すでに読めている欄が使っている文字の位置。ここと重なるものは拾わない
        used = []
        for c, bbox in enumerate(trow.cells):
            if bbox is None or c >= len(rows[r]) or not cell(rows[r][c]):
                continue
            x0, top, x1, bottom = bbox
            used += [
                w
                for w in words
                if x0 <= (w["x0"] + w["x1"]) / 2 <= x1
                and top <= (w["top"] + w["bottom"]) / 2 <= bottom
            ]
        for c, bbox in enumerate(trow.cells):
            if c < AGE_FIRST_COLUMN or c >= len(rows[r]) or cell(rows[r][c]):
                continue
            if bbox is None:
                # 行の上下は、同じ行で取れている升目に合わせる。
                # 表全体の行の高さを使うと、隣の行の記号まで拾ってしまう
                ys = [b for b in trow.cells if b is not None]
                if c not in bounds or not ys:
                    continue
                x0, x1 = bounds[c]
                top = min(b[1] for b in ys)
                bottom = max(b[3] for b in ys)
            else:
                x0, top, x1, bottom = bbox
            hit = [
                w
                for w in words
                if x0 <= (w["x0"] + w["x1"]) / 2 <= x1
                and top <= (w["top"] + w["bottom"]) / 2 <= bottom
                and w not in used
            ]
            if hit:
                rows[r][c] = "".join(w["text"] for w in hit)
                used += hit
                filled += 1
    return filled


def extract(path):
    rows = []
    lines = []
    legend = []
    target = None
    posted = None
    mark_counts = {}
    filled = 0

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            flat = "".join((page.extract_text() or "").split())
            if page_index == 0:
                m = re.search(r"受入枠について令和(\d+)年(\d+)月分", flat)
                if not m:
                    fail("対象月を読み取れませんでした")
                target = (int(m.group(1)), int(m.group(2)))
                m = re.search(r"（令和(\d+)年(\d+)月(\d+)日掲載）", flat)
                if not m:
                    fail("掲載日を読み取れませんでした")
                posted = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
                # 「表の見方 ×…０人、△…１～２人、○…３人以上」
                for mark, label in re.findall(r"([○◯〇△▲×✕])…([^、。※\s]+)", flat):
                    legend.append({"mark": mark, "label": label})

            # 表の部分に出てくる記号の数を数えておく。
            # 凡例（「表の見方」の行）はページの途中に入ることがあるので、行ごとに落とす
            if HEAD not in flat:
                fail(f"{page_index + 1}ページめに表の見出しが見つかりません")
            for line in (page.extract_text() or "").splitlines():
                squeezed = "".join(line.split())
                if not squeezed or "表の見方" in squeezed:
                    continue
                if squeezed.startswith("行政区類型"):
                    continue
                lines.append(" ".join(line.split()))
                for mark in ("○", "◯", "〇", "△", "×", "要相談"):
                    mark_counts[mark] = mark_counts.get(mark, 0) + squeezed.count(mark)

            words = page.extract_words()
            for table in page.find_tables():
                raw = [list(r) for r in table.extract()]
                filled += fill_from_words(raw, table, words)
                for row in raw:
                    values = [cell(c) for c in row]
                    if len(values) != EXPECTED_COLUMNS:
                        fail(f"列数が{len(values)}になっています: {values[:3]}")
                    rows.append(values)

    if not rows:
        fail("受入枠の表を取り出せませんでした")
    if filled:
        print(f"表の抽出が空にした{filled}個の欄を、升目の文字から埋めた", file=sys.stderr)
    if len(legend) < 3:
        fail(f"記号の凡例を読み取れませんでした（{len(legend)}件）")

    return {
        "target": target,
        "posted": posted,
        "legend": legend,
        "markCounts": {k: v for k, v in mark_counts.items() if v},
        "rows": rows,
        "lines": lines,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
