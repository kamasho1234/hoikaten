"""
所沢市の「受入れ数予定表」PDFから表を抜き出してJSONで返す

実行: python scripts/tokorozawa-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-tokorozawa-vacancy.ts から呼ぶ）

## 表の作り
- 1ページに**4つの表**が並ぶ（公立保育園・私立保育園・地域型保育事業・認定こども園）。
  どれが何かはPDFの見出しの文字の位置から決める
- 公立・私立・認定こども園は0歳〜5歳の6列、地域型保育事業は0歳〜2歳の3列
- 施設名は略称（「西所沢」＝西所沢保育園）。正式名称は市の施設一覧と突き合わせる
- 空きは記号（◎＝3名以上、○＝2名程度、△＝1名程度、空欄＝受入れ予定なし）
- 表の下のほうに注記の行が混ざる。記号の列が全部空で、名前が施設らしくない行は呼び出し側で落とす
"""

import json
import re
import sys

import pdfplumber

Z = str.maketrans("０１２３４５６７８９", "0123456789")

# 表の上にある見出し。この文字の左上の位置がいちばん近い表を、その種別とみなす
HEADINGS = ("公立保育園", "私立保育園", "地域型保育事業", "認定こども園")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def extract(path):
    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            fail(f"1ページのはずが{len(pdf.pages)}ページあります")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = "".join(text.translate(Z).split())

        m = re.search(r"令和(\d+)年(\d+)月入園", flat)
        if not m:
            fail("対象月を読み取れませんでした")
        target = (int(m.group(1)), int(m.group(2)))

        m = re.search(r"(\d+)月(\d+)日現在", flat)
        if not m:
            fail("基準日を読み取れませんでした")
        as_of_md = (int(m.group(1)), int(m.group(2)))

        # 「◎＝３名以上の受入れ見込み」のような凡例
        legend = []
        for mark, label in re.findall(
            r"([◎○〇△▲×✕✖]|空欄)＝([^◎○〇△▲×✕✖\s]+?見込み)", flat
        ):
            legend.append({"mark": mark, "label": label})
        if len(legend) < 3:
            fail(f"記号の凡例を読み取れませんでした（{len(legend)}件）")

        # 見出しの位置。表と結びつける
        heads = []
        for word in page.extract_words():
            t = "".join(word["text"].split())
            if t in HEADINGS:
                heads.append({"name": t, "x": word["x0"], "top": word["top"]})

        tables = []
        for table_obj in page.find_tables():
            x0, top, x1, bottom = table_obj.bbox
            # その表の真上にあって、いちばん近い見出しを選ぶ
            best = None
            for h in heads:
                if h["top"] > top:
                    continue
                if h["x"] < x0 - 40 or h["x"] > x1:
                    continue
                if best is None or h["top"] > best["top"]:
                    best = h
            if best is None:
                fail(f"見出しの分からない表があります: {[round(v) for v in table_obj.bbox]}")
            tables.append(
                {
                    "kind": best["name"],
                    "rows": [[cell(c) for c in r] for r in table_obj.extract()],
                }
            )

        kinds = [t["kind"] for t in tables]
        if sorted(kinds) != sorted(HEADINGS):
            fail(f"表の種別がそろいません: {kinds}")

        return {
            "target": target,
            "asOfMonthDay": as_of_md,
            "legend": legend,
            "tables": tables,
        }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
