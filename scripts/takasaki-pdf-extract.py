"""高崎市の保育所等募集状況PDFから、施設ごとの記号を読む。

## この資料の形
1行1施設。左から
「施設種別｜施設名｜定員｜所在地｜電話｜受入可能月齢｜開所閉所時刻（平日・土曜）｜
 クラス年齢別募集状況（0〜5歳児）×2組」。

**年齢が2組ある。**左の組が「令和8年11月入所・令和8年12月〜令和9年3月入所予約」、
右の組が「令和9年4月入所・令和9年5月〜令和10年3月入所予約」で、
見出し（top≒72）の文言から読み分けられる。
当サイトは年齢6列しか持てないので、**直近の途中入所にあたる左の組**を使う。

## 記号
公式の凡例は
  ◎ … 5人以上／○ … 3〜4人程度／△ … 1〜2人程度
  空欄 … 受入可能人数が無い年齢区分
  ＊ … 今後募集を行う可能性はあるが、現時点でその状況が未定

## 斜線
**そのクラスを設けていない欄には斜線が引かれている。**
公式の凡例は空欄を「受入可能人数が無い年齢区分」と定めているので、
斜線と空欄を取り違えると「クラスが無い」を「空きなし」と書いてしまう。
斜線は斜めの線分（line）1本で描かれているので、欄の中を通る斜線で見分ける。

## 読み違えたら止める
- 年齢の見出しが12個（6×2組）並ばなければ中断する
- 記号が年齢の列から離れていれば中断する
"""

import json
import re
import sys

import pdfplumber

# Windows の既定は cp932 なので、日本語を含む JSON を標準出力に出せるようにする
sys.stdout.reconfigure(encoding="utf-8")

MARKS = {"◎": "◎", "○": "〇", "〇": "〇", "△": "△", "*": "＊", "＊": "＊"}
# 斜線（そのクラスを設けていない）を表す内部の印
SLASH = "／"
# 記号は列の見出しから少しずれるので、この幅までは同じ列とみなす
COL_TOL = 8
# 施設名の列（施設種別より右、定員より左）
NAME_X = (70, 160)
KIND_X = (50, 70)
# 地域の見出し（「　中川・新高尾・京ヶ島方面」など）はこの x から始まる
AREA_MAX_X = 70


def squeeze(s: str) -> str:
    return re.sub(r"[\s　]", "", s or "")


def main(path: str) -> None:
    rows = []
    counts: dict = {}
    blanks = 0
    header_labels = []

    with pdfplumber.open(path) as pdf:
        text = "\n".join((p.extract_text() or "") for p in pdf.pages)
        for page_index, page in enumerate(pdf.pages):
            words = page.extract_words(keep_blank_chars=False)

            # 年齢の見出し（縦書きの数字）が12個並ぶ行を探す
            heads = [
                w
                for w in words
                if squeeze(w["text"]) in ("０", "１", "２", "３", "４", "５") and 85 < w["top"] < 130
            ]
            heads.sort(key=lambda w: w["x0"])
            if len(heads) != 12:
                raise SystemExit(
                    f"{page_index + 1}ページ目の年齢の見出しが{len(heads)}個です（12個のはず）"
                )
            centers = [(w["x0"] + w["x1"]) / 2 for w in heads]

            if page_index == 0:
                # 組の見出し（「・令和８年１１月入所」「・令和９年４月入所」）
                labels = [w for w in words if 68 < w["top"] < 76 and w["x0"] > 300]
                labels.sort(key=lambda w: w["x0"])
                header_labels = [squeeze(w["text"]) for w in labels]

            # そのクラスを設けていない欄に引かれる斜線
            slants = [
                l
                for l in page.lines
                if l["x0"] > 300 and abs(l["x0"] - l["x1"]) > 3 and abs(l["top"] - l["bottom"]) > 3
            ]

            # 施設の行 … 施設種別（公立／私立／こども園）がある行
            area = ""
            for w in sorted(words, key=lambda w: (w["top"], w["x0"])):
                t = squeeze(w["text"])
                if not (KIND_X[0] <= w["x0"] < KIND_X[1]):
                    continue
                # 施設種別でない語が左端にあれば地域の見出し（「市街地周辺」「倉渕地域」など）
                if t not in ("公立", "私立") and not t.startswith("こども園"):
                    area = t
                    continue
                # 「こども園」は施設名の1文字目とつながって1語になる（「こども園高」）
                if t in ("公立", "私立"):
                    kind, head = t, ""
                elif t.startswith("こども園"):
                    kind, head = "こども園", t[len("こども園") :]
                else:
                    continue
                band = [x for x in words if abs(x["top"] - w["top"]) < 4]
                name = head + "".join(
                    squeeze(x["text"])
                    for x in sorted(band, key=lambda x: x["x0"])
                    if NAME_X[0] <= x["x0"] < NAME_X[1]
                )
                if not name:
                    raise SystemExit(f"施設名が取れない行があります（top={round(w['top'])}）")
                cells: list = [None] * 12
                row_top = min(x["top"] for x in band)
                row_bottom = max(x["bottom"] for x in band)
                for sl in slants:
                    cy = (sl["top"] + sl["bottom"]) / 2
                    if not (row_top - 2 <= cy <= row_bottom + 2):
                        continue
                    cx = (sl["x0"] + sl["x1"]) / 2
                    i = min(range(12), key=lambda k: abs(centers[k] - cx))
                    if abs(centers[i] - cx) <= COL_TOL + 4:
                        cells[i] = SLASH
                for x in band:
                    mk = MARKS.get(squeeze(x["text"]))
                    if mk is None:
                        continue
                    cx = (x["x0"] + x["x1"]) / 2
                    i = min(range(12), key=lambda k: abs(centers[k] - cx))
                    if abs(centers[i] - cx) > COL_TOL:
                        raise SystemExit(
                            f"{name}: 記号「{x['text']}」が年齢の列から離れています（x={round(cx)}）"
                        )
                    cells[i] = mk
                rows.append({"area": area, "kind": kind, "name": name, "cells": cells})

    slashes = 0
    for r in rows:
        for c in r["cells"][:6]:
            if c is None:
                blanks += 1
            elif c == SLASH:
                slashes += 1
            else:
                counts[c] = counts.get(c, 0) + 1

    print(
        json.dumps(
            {
                "text": text,
                "headerLabels": header_labels,
                "markCounts": counts,
                "blanks": blanks,
                "slashes": slashes,
                "rows": rows,
            },
            ensure_ascii=False,
        )
    )


if __name__ == "__main__":
    if len(sys.argv) < 2:
        raise SystemExit("使い方: python takasaki-pdf-extract.py <pdf>")
    main(sys.argv[1])
