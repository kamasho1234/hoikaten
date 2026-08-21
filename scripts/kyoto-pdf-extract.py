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


def extract(path):
    rows = []
    lines = []
    legend = []
    target = None
    posted = None
    mark_counts = {}

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

            for table in page.find_tables():
                for row in table.extract():
                    values = [cell(c) for c in row]
                    if len(values) != EXPECTED_COLUMNS:
                        fail(f"列数が{len(values)}になっています: {values[:3]}")
                    rows.append(values)

    if not rows:
        fail("受入枠の表を取り出せませんでした")
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
