"""小樽市の保育所等の空き状況PDFから、施設ごとの記号を読む。

## この資料の形
1施設が2段になっていて、上段が空き状況、下段が入所待ち児童数。
施設名は2段にまたがるセルの中央に置かれる。

年齢の欄は4つの状態を取る。
  ・「×」（ピンクの塗り）… 空きなし
  ・空らん（白）        … 定員に余裕がある（公式の凡例による）
  ・斜線               … そのクラスを設けていない
  ・「△」（黄の塗り）    … 翌月以降受入れ余地あり

## なぜ斜線を数えるのか
**空らんと斜線を取り違えると意味が正反対になる。**
空らんは「定員に余裕がある」、斜線は「そのクラスが無い」。
斜線は細かい線分（curve）で描かれているので、欄の中の線分の数で見分ける。

## 読み違えたら止める
- 年齢の見出し（0歳〜5歳）が6つ揃わなければ中断する
- 記号が年齢の欄の外にあれば中断する
"""

import json
import re
import sys

import pdfplumber

# Windows の既定は cp932 なので、日本語を含む JSON を標準出力に出せるようにする
sys.stdout.reconfigure(encoding="utf-8")

MARKS = ("×", "△", "〇", "○")
AGE_LABELS = ["0歳", "１歳", "2歳", "3歳", "4歳", "5歳"]
# 施設名の top からの、空き状況の欄の上下
CELL_TOP = -7.2
CELL_BOTTOM = 3.8
# 欄の中にこれだけ線分があれば斜線とみなす
HATCH_MIN = 8


def squeeze(s: str) -> str:
    return re.sub(r"[\s　]", "", s or "")


def age_columns(words):
    """年齢の見出しから欄の左右を割り出す"""
    heads = []
    for label in AGE_LABELS:
        hit = [w for w in words if squeeze(w["text"]) == label and w["top"] < 90]
        if len(hit) != 1:
            raise SystemExit(f"年齢の見出し「{label}」が{len(hit)}個見つかりました（1個のはず）")
        heads.append(hit[0])
    centers = [(w["x0"] + w["x1"]) / 2 for w in heads]
    width = (centers[-1] - centers[0]) / (len(centers) - 1)
    return [c - width / 2 for c in centers] + [centers[-1] + width / 2]


def main(path: str) -> None:
    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) != 1:
            raise SystemExit(f"ページが{len(pdf.pages)}枚あります（1枚のはず）")
        page = pdf.pages[0]
        words = page.extract_words(keep_blank_chars=False)
        text = page.extract_text() or ""

        col = age_columns(words)
        curves = [c for c in page.curves if c["x0"] > col[0] - 5]
        marks = [w for w in words if squeeze(w["text"]) in MARKS]

        names = [
            w
            for w in words
            if w["x0"] < 100
            and w["top"] > 85
            and len(squeeze(w["text"])) >= 3
            and not squeeze(w["text"]).startswith("・")
        ]
        names.sort(key=lambda w: w["top"])

        rows = []
        used = set()
        hatches = 0
        blanks = 0
        counts: dict = {}
        for n in names:
            top = n["top"] + CELL_TOP
            bottom = n["top"] + CELL_BOTTOM
            cells = []
            for i in range(6):
                lo, hi = col[i], col[i + 1]
                mk = [
                    w
                    for w in marks
                    if lo <= (w["x0"] + w["x1"]) / 2 < hi and top - 2 <= w["top"] <= bottom + 4
                ]
                hatch = [
                    c
                    for c in curves
                    if lo <= (c["x0"] + c["x1"]) / 2 < hi
                    and top <= (c["top"] + c["bottom"]) / 2 <= bottom
                ]
                if mk:
                    if len(mk) > 1:
                        raise SystemExit(
                            f"{squeeze(n['text'])}: {i}歳児の欄に記号が{len(mk)}個あります"
                        )
                    t = squeeze(mk[0]["text"])
                    used.add(id(mk[0]))
                    counts[t] = counts.get(t, 0) + 1
                    cells.append(t)
                elif len(hatch) >= HATCH_MIN:
                    hatches += 1
                    cells.append(None)  # 斜線＝クラスなし
                else:
                    blanks += 1
                    cells.append("")  # 空らん＝定員に余裕あり
            rows.append({"name": squeeze(n["text"]), "cells": cells})

        # 表の中で拾えなかった記号（凡例の×と△はここに来る）
        leftover = [squeeze(w["text"]) for w in marks if id(w) not in used]

    print(
        json.dumps(
            {
                "text": text,
                "markCounts": counts,
                "hatches": hatches,
                "blanks": blanks,
                "leftoverMarks": leftover,
                "rows": rows,
            },
            ensure_ascii=False,
        )
    )


if __name__ == "__main__":
    if len(sys.argv) < 2:
        raise SystemExit("使い方: python otaru-pdf-extract.py <pdf>")
    main(sys.argv[1])
