"""関市の保育園等の空き状況PDFから、施設ごとの記号を読む。

## この資料の形
**1施設につき小さな表が1つ**あり、それが左右2列・縦にいくつも並ぶ。
どの表も
    施設名
    年齢     ０歳 １歳 ２歳 ３歳 ４歳 ５歳
    空き状況   ×   ▲   ×   ×   ▲   ×
の3行でできている。区分（【公立保育園】【私立保育園】【私立認定こども園】
【私立小規模保育園】）は見出しとして表の上に置かれる。

## 読み方
「空き状況」という語を見つけたら、
- その行の記号を、**同じ表の「年齢」行の見出しの x** に寄せて0〜5歳に割り当てる
- 施設名は「年齢」行のすぐ上、同じ x のあたりにある語をつなぐ
表が左右に並ぶので、x が近い「年齢」行だけを相手にする。

## セルの結合
**0歳と1歳をまとめて1つの欄にしている園がある**（南ヶ丘保育園など）。
記号は結合したセルの中央に置かれるので、年齢の見出しに寄せる読み方では
どちらの年齢か決められない。行ごとの縦罫線からセルの左右を求め、
またぐ年齢すべてに同じ記号を配る。

## 読み違えたら止める
- 「空き状況」と「年齢」の数が合わなければ中断する
- 記号が年齢の見出しから離れていれば中断する
"""

import json
import re
import sys

import pdfplumber

# Windows の既定は cp932 なので、日本語を含む JSON を標準出力に出せるようにする
sys.stdout.reconfigure(encoding="utf-8")

MARKS = ("○", "〇", "▲", "△", "×", "◎")
AGE_LABELS = ["０歳", "１歳", "２歳", "３歳", "４歳", "５歳"]
# 記号を年齢の見出しに寄せるときの許容幅
COL_TOL = 12
# 「年齢」行と「空き状況」行が同じ表とみなせる縦の距離
PAIR_MAX_DY = 30
# 施設名は「年齢」行のこれだけ上まで探す
NAME_UP = 26


def squeeze(s: str) -> str:
    return re.sub(r"[\s　]", "", s or "")


def v_lines(page, top: float, bottom: float):
    """その帯を縦に貫く罫線の x を左から並べる"""
    xs = []
    for l in list(page.lines) + list(page.rects):
        if abs(l.get("x0", 0) - l.get("x1", 0)) >= 1:
            continue
        if l["top"] <= top + 2 and l["bottom"] >= bottom - 2:
            xs.append(l["x0"])
    out = []
    for x in sorted(xs):
        if not out or x - out[-1] > 2:
            out.append(x)
    return out


def main(path: str) -> None:
    with pdfplumber.open(path) as pdf:
        rows = []
        text_all = []
        for page in pdf.pages:
            words = page.extract_words(keep_blank_chars=False)
            text_all.append(page.extract_text() or "")

            ages = [w for w in words if squeeze(w["text"]) == "年齢"]
            akis = [w for w in words if squeeze(w["text"]) == "空き状況"]
            if len(ages) != len(akis):
                raise SystemExit(
                    f"「年齢」{len(ages)}個と「空き状況」{len(akis)}個の数が合いません"
                )

            # 区分の見出し（【公立保育園】など）
            kinds = sorted(
                (
                    {"top": w["top"], "x0": w["x0"], "name": m.group(1)}
                    for w in words
                    for m in [re.fullmatch(r"【(.+?)】.*", squeeze(w["text"]))]
                    if m
                ),
                key=lambda d: d["top"],
            )

            for age_w in ages:
                # 同じ表の「空き状況」行 … x が近く、すぐ下にあるもの
                cand = [
                    a
                    for a in akis
                    if abs(a["x0"] - age_w["x0"]) < 40 and 0 < a["top"] - age_w["top"] < PAIR_MAX_DY
                ]
                if not cand:
                    raise SystemExit(
                        f"「年齢」（x={round(age_w['x0'])} top={round(age_w['top'])}）に対応する"
                        "「空き状況」の行が見つかりません"
                    )
                aki = min(cand, key=lambda a: a["top"] - age_w["top"])

                # 年齢の見出しの x（この表のもの）
                labels = []
                for label in AGE_LABELS:
                    hit = [
                        w
                        for w in words
                        if squeeze(w["text"]) == label
                        and abs(w["top"] - age_w["top"]) < 4
                        and w["x0"] > age_w["x0"]
                        and w["x0"] - age_w["x0"] < 260
                    ]
                    if len(hit) != 1:
                        raise SystemExit(
                            f"「年齢」（top={round(age_w['top'])}）の行に「{label}」が{len(hit)}個あります"
                        )
                    labels.append(hit[0])
                centers = [(w["x0"] + w["x1"]) / 2 for w in labels]

                # 空き状況の行の記号。セルの結合を見るために罫線を使う
                lines = v_lines(page, aki["top"], aki["bottom"])
                symbols = [None] * 6
                merged = 0
                for w in words:
                    if squeeze(w["text"]) not in MARKS:
                        continue
                    if abs(w["top"] - aki["top"]) >= 4:
                        continue
                    cx = (w["x0"] + w["x1"]) / 2
                    # 左右に表が並ぶので、この表の年齢の欄に入るものだけを見る
                    if cx < centers[0] - COL_TOL or cx > centers[-1] + COL_TOL:
                        continue
                    left = max([x for x in lines if x < cx], default=None)
                    right = min([x for x in lines if x > cx], default=None)
                    if left is None or right is None:
                        raise SystemExit(
                            f"記号「{w['text']}」を囲むセルが見つかりません（x={round(cx)}）"
                        )
                    hit = [k for k, c in enumerate(centers) if left <= c <= right]
                    if not hit:
                        raise SystemExit(
                            f"記号「{w['text']}」が年齢の欄から離れています（x={round(cx)}）"
                        )
                    if len(hit) > 1:
                        merged += 1
                    for k in hit:
                        symbols[k] = squeeze(w["text"])

                # 施設名 … 「年齢」行のすぐ上、同じ表の x のあたり
                name_words = [
                    w
                    for w in words
                    if 0 < age_w["top"] - w["top"] < NAME_UP
                    and age_w["x0"] - 20 <= w["x0"] <= centers[-1] + 20
                    and squeeze(w["text"])
                    and not squeeze(w["text"]).startswith("【")
                    and squeeze(w["text"]) not in ["年齢", "空き状況"] + AGE_LABELS + list(MARKS)
                ]
                name = "".join(
                    squeeze(w["text"]) for w in sorted(name_words, key=lambda w: (w["top"], w["x0"]))
                )
                if not name:
                    raise SystemExit(f"施設名が取れません（年齢行 top={round(age_w['top'])}）")

                # 区分 … 左右に表が並ぶので、**同じ列（x が近い）**の見出しの中から
                # この表より上でいちばん近いものを採る
                above = [
                    k for k in kinds if k["top"] < age_w["top"] and abs(k["x0"] - age_w["x0"]) < 60
                ]
                if not above:
                    raise SystemExit(f"区分の見出しが見つかりません（{name}）")
                kind = above[-1]["name"]

                rows.append({"kind": kind, "name": name, "marks": symbols, "mergedCells": merged})

    counts: dict = {}
    blanks = 0
    for r in rows:
        for m in r["marks"]:
            if m is None:
                blanks += 1
            else:
                counts[m] = counts.get(m, 0) + 1

    print(
        json.dumps(
            {
                "text": "\n".join(text_all),
                "markCounts": counts,
                "blanks": blanks,
                "rows": rows,
            },
            ensure_ascii=False,
        )
    )


if __name__ == "__main__":
    if len(sys.argv) < 2:
        raise SystemExit("使い方: python seki-pdf-extract.py <pdf>")
    main(sys.argv[1])
