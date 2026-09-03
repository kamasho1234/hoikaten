"""岡崎市の空き状況一覧PDFから、施設ごとの記号を読む。

## この資料の形
1ページ目が空き状況の表、2ページ目が園名・区分・電話・住所の一覧。
どちらの表にも **FURIGANA 列**（ローマ字）があり、これが施設の一意キーになる。

## なぜ FURIGANA を使うのか
1ページ目の受入園の欄は施設名が2行にまたがることがあり
（「じぶんみらい保育園／日名南」）、隣の施設の名前と行が入り組む。
行の帯で切ると、どこまでが1施設か決められない。
FURIGANA は名前が何行になっても1施設1行で並ぶので、これを行の代表点にして
名前も記号も「いちばん近い FURIGANA」に寄せれば、切れ目が機械的に決まる。

## 年齢の決め方
記号の x 座標は6つに揃っている（247/293/338/384/430/475 ＝ 0〜5歳児）。
2号認定の園のように記号が3つしかない行も、x から後ろ3列に正しく入る。

## 読み違えたら止める
- FURIGANA の集合が2ページで食い違ったら中断する
- 1ページ目の短縮名が2ページ目の正式名に含まれない行があれば報告する
  （呼び出し側が件数を見て判断する）
"""

import json
import re
import sys

import pdfplumber

# Windows の既定は cp932 なので、日本語を含む JSON を標準出力に出せるようにする
sys.stdout.reconfigure(encoding="utf-8")

# 0歳児〜5歳児の記号が置かれる x 座標
AGE_X = [247, 293, 338, 384, 430, 475]
AGE_TOL = 12
MARKS = ("〇", "○", "△", "×", "▲", "◇")


def is_roman(t: str) -> bool:
    """FURIGANA 列の語か。
    1ページ目は YAHAGI-KODOMOEN、2ページ目は YAHAGI（KODOMOEN）と表記がゆれるので、
    区切り文字を落としてから判定する"""
    core = re.sub(r"[-（）()]", "", t)
    return bool(core) and core.isalpha() and core.isupper() and len(core) > 2


def key_of(t: str) -> str:
    """2ページの表記ゆれを吸収した突き合わせキー"""
    return "".join(c for c in t if c.isalnum()).upper()


def nearest(y: float, tops: list) -> int:
    return min(range(len(tops)), key=lambda i: abs(tops[i] - y))


def rows_of(page, x_lo: float, x_hi: float):
    ws = page.extract_words(keep_blank_chars=False)
    rome = [
        w
        for w in ws
        if is_roman(w["text"])
        and w["text"] not in ("FURIGANA", "TEL")
        and x_lo <= w["x0"] <= x_hi
    ]
    rome.sort(key=lambda w: w["top"])
    return ws, rome, [w["top"] for w in rome]


def page_vacancy(page):
    """1ページ目 … 短縮名と年齢ごとの記号"""
    ws, rome, tops = rows_of(page, 175, 240)
    if not rome:
        raise SystemExit("1ページ目に FURIGANA 列が見つかりません")
    names = [[] for _ in rome]
    syms = [[None] * 6 for _ in rome]
    for w in ws:
        t, x, y = w["text"], w["x0"], w["top"]
        # 施設名の欄。区域（x≒98 の縦書き）と見出し行は入れない
        if 110 <= x <= 178 and t not in MARKS and y > tops[0] - 6 and not is_roman(t):
            names[nearest(y, tops)].append((round(y, 1), x, t))
        elif t in MARKS and x >= AGE_X[0] - AGE_TOL:
            c = min(range(6), key=lambda i: abs(AGE_X[i] - x))
            if abs(AGE_X[c] - x) <= AGE_TOL:
                syms[nearest(y, tops)][c] = t
    return {
        key_of(rome[i]["text"]): {
            "furigana": rome[i]["text"],
            "short": "".join(v[2] for v in sorted(names[i])),
            "marks": syms[i],
        }
        for i in range(len(rome))
    }


def page_detail(page):
    """2ページ目 … 正式な園名と区分"""
    ws, rome, tops = rows_of(page, 200, 300)
    if not rome:
        raise SystemExit("2ページ目に FURIGANA 列が見つかりません")
    name = [[] for _ in rome]
    cat = [[] for _ in rome]
    for w in ws:
        t, x, y = w["text"], w["x0"], w["top"]
        if is_roman(t) or t == "TEL" or y < tops[0] - 6:
            continue
        i = nearest(y, tops)
        # 園名は 95〜295（長い名前は FURIGANA の位置まで伸びる）、区分は 295〜320
        if 95 <= x < 295:
            name[i].append((round(y, 1), x, t))
        elif 295 <= x < 320:
            cat[i].append((round(y, 1), x, t))
    return {
        key_of(rome[i]["text"]): {
            "name": "".join(v[2] for v in sorted(name[i])),
            "category": "".join(v[2] for v in sorted(cat[i])),
        }
        for i in range(len(rome))
    }


def parse_legend(text: str):
    """「〇…空きあり（４名以上）　△…空き若干名　×…空きなし」を読む"""
    out = []
    for m in re.finditer(r"([〇○△×▲◇])…([^\s　〇○△×▲◇]+)", text):
        out.append({"mark": m.group(1), "label": m.group(2)})
    return out


def parse_notes(text: str):
    """「※…」で始まる注記を拾う。1行に続けて書かれていることがある"""
    out = []
    for part in text.split("※")[1:]:
        note = part.splitlines()[0].strip() if part.splitlines() else ""
        if len(note) >= 10:
            out.append(note)
    return out


def parse_target(text: str):
    """「令和８年10月入園」から年度と入園月を読む"""
    t = text.translate(str.maketrans("０１２３４５６７８９", "0123456789"))
    m = re.search(r"令和(\d+)年\s*(\d{1,2})月入園", t)
    if not m:
        return None
    return [int(m.group(1)), int(m.group(2))]


def main(path: str) -> None:
    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) < 2:
            raise SystemExit(f"ページが{len(pdf.pages)}枚しかありません（2枚のはず）")
        vac = page_vacancy(pdf.pages[0])
        det = page_detail(pdf.pages[1])
        text = pdf.pages[0].extract_text() or ""

    only_v = sorted(set(vac) - set(det))
    only_d = sorted(set(det) - set(vac))
    if only_v or only_d:
        raise SystemExit(
            f"FURIGANA が2ページで一致しません（1ページ目のみ {only_v} ／ 2ページ目のみ {only_d}）"
        )

    counts: dict = {}
    blanks = 0
    rows = []
    mismatched = []
    for k, v in vac.items():
        for m in v["marks"]:
            if m is None:
                blanks += 1
            else:
                counts[m] = counts.get(m, 0) + 1
        short = re.sub(r"[（(].*?[）)]", "", v["short"])
        full = det[k]["name"]
        if short and short not in full:
            mismatched.append([short, full])
        rows.append(
            {
                "furigana": v["furigana"],
                "short": v["short"],
                "name": full,
                "category": det[k]["category"],
                "marks": v["marks"],
            }
        )

    print(
        json.dumps(
            {
                "target": parse_target(text),
                "legend": parse_legend(text),
                "notes": parse_notes(text),
                "markCounts": counts,
                "blanks": blanks,
                "nameMismatch": mismatched,
                "rows": rows,
            },
            ensure_ascii=False,
        )
    )


if __name__ == "__main__":
    if len(sys.argv) < 2:
        raise SystemExit("使い方: python okazaki-pdf-extract.py <pdf>")
    main(sys.argv[1])
