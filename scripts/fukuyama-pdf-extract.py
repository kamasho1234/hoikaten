"""
福山市の「保育所等空き状況」PDFから行を抜き出してJSONで返す

実行: python scripts/fukuyama-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-fukuyama-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに**左右2段**。どちらも「地域／施設名／区分／0歳〜5歳」
- 罫線が少なく表としては取り出せないので、**行のテキストをそのまま返して
  呼び出し側で「施設名 区分 記号6つ」の並びを拾う**
- 記号は○（空きあり）・△（空きわずか）・×（空きなし）と、
  凡例にない「-」（その施設が受け入れていないクラス）
"""

import json
import re
import sys

import pdfplumber


def fail(message):
    raise SystemExit(f"[中断] {message}")


def extract(path):
    lines = []
    legend = []
    target = None
    as_of = None
    mark_counts = {}

    with pdfplumber.open(path) as pdf:
        for page_index, page in enumerate(pdf.pages):
            text = page.extract_text() or ""
            flat = "".join(text.split())

            if page_index == 0:
                m = re.search(r"空き状況（(\d{4})年度([０-９\d]+)月入所審査用）", flat)
                if not m:
                    fail("対象月を読み取れませんでした")
                z = str.maketrans("０１２３４５６７８９", "0123456789")
                target = (int(m.group(1)), int(m.group(2).translate(z)))
                m = re.search(r"(\d{4})/(\d+)/(\d+)時点", flat)
                if not m:
                    fail("基準日を読み取れませんでした")
                as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
                # 「○・・・空きあり △・・・空きわずか ×・・・空きなし」
                for mark, label in re.findall(r"([○◯〇△×✕])・+([^○◯〇△×✕\s\d]{2,8})", flat):
                    legend.append({"mark": mark, "label": label})

            for line in text.splitlines():
                squeezed = " ".join(line.split())
                if not squeezed:
                    continue
                lines.append(squeezed)
                # 凡例と注意書きの行は記号の数に入れない
                if "・・・" in squeezed or squeezed.startswith("○や△") or squeezed.startswith("×がついて"):
                    continue
                if "希望することは可能" in squeezed or "審査となり" in squeezed:
                    continue
                for mark in ("○", "◯", "〇", "△", "×", "✕"):
                    mark_counts[mark] = mark_counts.get(mark, 0) + squeezed.count(mark)

    if not lines:
        fail("行を取り出せませんでした")
    if len(legend) < 3:
        fail(f"記号の凡例を読み取れませんでした（{len(legend)}件）")

    return {
        "target": target,
        "asOf": as_of,
        "legend": legend,
        "markCounts": {k: v for k, v in mark_counts.items() if v},
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
