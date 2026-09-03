"""
佐々町（長崎県）の「幼稚園・保育所等空き状況一覧表」PDFから記号を抜き出してJSONで返す

実行: python scripts/saza-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-saza-vacancy.ts から呼ぶ）

## 表の作り
- 4施設。0歳児〜5歳児の欄に ○△× が入る
- **佐々青い実幼児園だけ、認定区分で行が上下に分かれている。**
  上段が教育認定（1号）、下段が保育認定（2・3号）で、
  0歳児と1歳児は下段だけに記号があり（上段は斜線）、
  2歳児〜5歳児は上下にまたがる1つの欄に記号が1つ入る。
  当サイトは保育利用を載せるので、**下段の0・1歳と、またがりの2〜5歳**をつなぐ。
- 表の下に「＜参考：認定、年齢区分＞」の別表があり、そこにも ○△× が出てくる。
  年齢の見出しの真下にある記号だけを拾い、別表は y で切り捨てる。
"""

import json
import re
import sys

import pdfplumber

MARKS = {"○": "○", "◯": "○", "〇": "○", "△": "△", "×": "×", "✕": "○"}
AGE_COUNT = 6


def fail(message):
    raise SystemExit(f"[中断] {message}")


def extract(path):
    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"PDFが{len(pdf.pages)}ページあります（1ページのはず）")
        page = pdf.pages[0]
        words = page.extract_words()
        flat = "".join((page.extract_text() or "").split())

        m = re.search(r"令和(\d+)年(\d{1,2})月(\d{1,2})日時点", flat)
        if not m:
            fail("「令和N年M月D日時点」を読み取れませんでした")
        as_of = [int(g) for g in m.groups()]

        m = re.search(r"令和(\d+)年(\d{1,2})月入所申込", flat)
        target = [int(g) for g in m.groups()] if m else None

        # 年齢の見出しの x を取る。「2歳児※」のように印が付くことがある
        centers = {}
        header_bottom = None
        for w in words:
            m = re.fullmatch(r"([0-5])歳児[※＊*]?", w["text"])
            if m and w["top"] < 260:
                centers[int(m.group(1))] = (w["x0"] + w["x1"]) / 2
                header_bottom = max(header_bottom or 0, w["bottom"])
        if len(centers) != AGE_COUNT:
            fail(f"年齢の見出しが{len(centers)}個しか見つかりません")

        # 「＜参考：認定、年齢区分＞」から下は別の表なので切る
        # 注意書きにも「参考としてください」と出てくるので、見出しの形で絞る
        limit = None
        for w in words:
            if re.search(r"[＜<]参考[：:]", w["text"]):
                limit = w["top"]
                break
        if limit is None:
            fail("「＜参考：認定、年齢区分＞」が見つかりません（表の下端を決められません）")

        rows = {}
        for w in words:
            mark = MARKS.get(w["text"])
            if not mark or w["top"] < header_bottom or w["top"] >= limit:
                continue
            x = (w["x0"] + w["x1"]) / 2
            age = min(centers, key=lambda a: abs(centers[a] - x))
            if abs(centers[age] - x) > 12:
                fail(f"記号「{w['text']}」（x={x:.0f}）を年齢の欄に割り当てられません")
            key = round(w["top"] / 8)
            rows.setdefault(key, {})[age] = mark

        # 施設名の y。名前は年齢の見出しより左にある
        # 施設名の列。左に「運営種別」「施設類型」の欄があり、そこにも
        # 「保育所」と書かれるので、施設名の列の左端より右にあるものだけを採る
        name_left = 180
        names = []
        for w in words:
            t = w["text"]
            if w["x0"] >= name_left and re.search(r"(保育所|保育園|幼児園|こども園)$", t):
                names.append((w["top"], t))
        names.sort()

        return {
            "asOf": as_of,
            "target": target,
            "names": [n for _, n in names],
            # 記号の行をどの施設のものか決めるのに使う
            "namesTop": [round(t, 1) for t, _ in names],
            "rows": [
                {"top": key * 8, "marks": [rows[key].get(a) for a in range(AGE_COUNT)]}
                for key in sorted(rows)
            ],
        }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
