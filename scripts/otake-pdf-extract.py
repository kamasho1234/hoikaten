"""大竹市の空き状況一覧PDFから、施設ごとの記号を読む。

## この資料の形
地区ごとに3つの表（大竹・小方・玖波）が縦に並ぶ。
どの表も「保育所名｜区分｜所在地｜0歳〜5歳」の列で、空きは記号（〇△×）。

## なぜ記号の行を代表点にするのか
施設名が長い園はセルが2行分の高さになり、**名前は上下2行に分かれるのに、
区分・所在地・記号はセルの中央に1行で置かれる**
（「フルムーンインターナシ／ョナルこども園おおたけ」）。
行の高さでまとめると、名前だけの行と値だけの行に割れてしまう。
記号のある行を施設の代表点にして、名前をいちばん近い代表点に寄せれば、
名前が何行でも1施設として読める。

## なぜ罫線を見るのか
**玖波保育所だけ1歳と2歳が1つのセルにまとまっている。**
記号の x を年齢の見出しに寄せる読み方では、この「△」が
1歳と2歳のどちらなのか決められない。行ごとの縦罫線からセルの左右を求め、
そのセルがまたぐ年齢すべてに同じ記号を配れば、公式のとおりに読める。

## 読み違えたら止める
- 年齢の見出し（０歳〜５歳）が6つ揃う行が無ければ中断する
- 記号がどの年齢の欄にも入らなければ中断する
"""

import json
import re
import sys

import pdfplumber

# Windows の既定は cp932 なので、日本語を含む JSON を標準出力に出せるようにする
sys.stdout.reconfigure(encoding="utf-8")

MARKS = ("〇", "○", "△", "×", "▲", "◇")
AGE_LABELS = ["０歳", "１歳", "２歳", "３歳", "４歳", "５歳"]
# 罫線と見出しの x は表ごとに1〜3ポイントずれるので、この幅までは同じ線とみなす
TOL = 6
# 名前の語を代表点に寄せるとき、これより離れていたら表の外とみなす
NAME_REACH = 26
NAME_RIGHT = 200
KIND_RANGE = (200, 285)


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
        if len(pdf.pages) != 1:
            raise SystemExit(f"ページが{len(pdf.pages)}枚あります（1枚のはず）")
        page = pdf.pages[0]
        words = page.extract_words(keep_blank_chars=False)
        text = page.extract_text() or ""

        # 年齢の見出し行（「０歳」〜「５歳」が並ぶ行）
        heads = []
        for w in words:
            if squeeze(w["text"]) != "０歳":
                continue
            row = [x for x in words if abs(x["top"] - w["top"]) < 4]
            labels = {squeeze(x["text"]): x for x in row}
            if all(a in labels for a in AGE_LABELS):
                heads.append(
                    {
                        "top": w["top"],
                        "centers": [(labels[a]["x0"] + labels[a]["x1"]) / 2 for a in AGE_LABELS],
                    }
                )
        if not heads:
            raise SystemExit("年齢の見出し（０歳〜５歳）が並ぶ行が見つかりません")
        heads.sort(key=lambda h: h["top"])

        # 地区の見出し（■大竹地区■）
        districts = sorted(
            (
                {"top": w["top"], "name": m.group(1)}
                for w in words
                for m in [re.fullmatch(r"■(.+?)地区■", squeeze(w["text"]))]
                if m
            ),
            key=lambda d: d["top"],
        )

        # 記号のある行を施設の代表点にする
        marks_all = [w for w in words if squeeze(w["text"]) in MARKS]
        if not marks_all:
            raise SystemExit("記号（〇△×）が1つも見つかりません")
        anchors: list = []
        for w in sorted(marks_all, key=lambda w: w["top"]):
            if anchors and abs(anchors[-1]["top"] - w["top"]) < 5:
                anchors[-1]["marks"].append(w)
            else:
                anchors.append({"top": w["top"], "marks": [w]})

        # 名前の語をいちばん近い代表点に寄せる
        names: dict = {i: [] for i in range(len(anchors))}
        for w in words:
            if w["x0"] >= NAME_RIGHT:
                continue
            t = squeeze(w["text"])
            if not t or t.startswith(("■", "・", "令和", "入所日時点", "表中", "保育所名")):
                continue
            i = min(range(len(anchors)), key=lambda k: abs(anchors[k]["top"] - w["top"]))
            if abs(anchors[i]["top"] - w["top"]) > NAME_REACH:
                continue  # 表の外の文
            names[i].append((round(w["top"], 1), w["x0"], t))

        rows = []
        for i, a in enumerate(anchors):
            band = [x for x in words if abs(x["top"] - a["top"]) < 5]
            head = [h for h in heads if h["top"] < a["top"]]
            if not head:
                raise SystemExit(f"年齢の見出しより上に記号の行があります（top={round(a['top'])}）")
            centers = head[-1]["centers"]
            dis = [d for d in districts if d["top"] < a["top"]]
            district = dis[-1]["name"] if dis else ""

            name = "".join(v[2] for v in sorted(names[i]))
            if not name:
                raise SystemExit(f"施設名が取れない行があります（top={round(a['top'])}）")
            kind = "".join(
                squeeze(x["text"])
                for x in sorted(band, key=lambda x: x["x0"])
                if KIND_RANGE[0] <= x["x0"] < KIND_RANGE[1]
            )

            top = min(x["top"] for x in band)
            bottom = max(x["bottom"] for x in band)
            lines = v_lines(page, top, bottom)
            symbols = [None] * 6
            merged = 0
            for mk in a["marks"]:
                cx = (mk["x0"] + mk["x1"]) / 2
                left = max([x for x in lines if x < cx], default=None)
                right = min([x for x in lines if x > cx], default=None)
                if left is None or right is None:
                    raise SystemExit(f"{name}: 記号「{mk['text']}」を囲むセルが見つかりません")
                hit = [k for k, c in enumerate(centers) if left - TOL <= c <= right + TOL]
                if not hit:
                    raise SystemExit(
                        f"{name}: 記号「{mk['text']}」がどの年齢の欄にも入りません（x={round(cx)}）"
                    )
                if len(hit) > 1:
                    merged += 1
                for k in hit:
                    symbols[k] = squeeze(mk["text"])

            rows.append(
                {
                    "district": district,
                    "name": name,
                    "kind": kind,
                    "marks": symbols,
                    "mergedCells": merged,
                }
            )

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
                "asOfText": text,
                "markCounts": counts,
                "blanks": blanks,
                "rows": rows,
            },
            ensure_ascii=False,
        )
    )


if __name__ == "__main__":
    if len(sys.argv) < 2:
        raise SystemExit("使い方: python otake-pdf-extract.py <pdf>")
    main(sys.argv[1])
