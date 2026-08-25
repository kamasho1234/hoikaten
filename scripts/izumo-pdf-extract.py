"""
出雲市の「保育所入所可能状況」PDFから表を抜き出す

実行: python scripts/izumo-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-izumo-vacancy.ts から呼ぶ）

## 表の作り
- 1ページ目に4つの表。本体は認可保育所の表（16列）
  地域／地区／施設名／定員／入所可能状況(0〜5歳)／入所未決定者(0〜5歳)
- **年齢の見出しが2組ある**（入所可能状況と入所未決定者）。
  x座標で12列に振り分ける
- 入所可能状況は記号（◎*＝10名以上、◎＝5〜9名、○＝3〜4名、△＝1〜2名）。
  **空きなしを表す記号はなく、空欄になる**
- 入所未決定者は人数（第1希望別）

## 空欄の読み方
- 入所未決定者に数字がある年齢は、そのクラスがある
- 入所未決定者が空欄の年齢は、そのクラスがない
  （中央保育所は定員30で1歳・2歳にしか数字がない＝0歳と3〜5歳のクラスがない）
- したがって「入所可能状況が空欄」かつ「入所未決定者に数字がある」なら**空きなし**

2ページ目は幼稚園の一覧で空き情報がないため取り込まない。
認定保育所・企業主導型保育施設の表は市の利用調整の対象外（直接施設へ相談）なので
本体とは分けて扱う。
"""

import json
import re
import sys

import pdfplumber

AGE_COUNT = 6
MARKS = "◎○◯〇△＊*"
ZEN = str.maketrans("０１２３４５６７８９", "0123456789")
# 同じ行とみなす縦のずれ
SAME_LINE = 4.0


def fail(message):
    raise SystemExit(f"[中断] {message}")


def squeeze(s):
    return "".join(str(s or "").split()).translate(ZEN)


def extract(path):
    as_of = None
    target = None
    legend = []
    notes = []
    rows = []
    printed = {"marks": {}, "numbers": 0}

    with pdfplumber.open(path) as pdf:
        if len(pdf.pages) < 1:
            fail("ページがありません")
        page = pdf.pages[0]
        text = page.extract_text() or ""
        flat = squeeze(text)

        # 「令和８年度 保育所入所可能状況 9月 以降入所希望用 R8.8.7 現在」
        m = re.search(r"R(\d+)\.(\d+)\.(\d+)現在", flat)
        if not m:
            fail("「R N.M.D 現在」を読み取れませんでした")
        as_of = (int(m.group(1)), int(m.group(2)), int(m.group(3)))

        m = re.search(r"保育所入所可能状況(\d+)月以降入所希望用", flat)
        if not m:
            fail("「N月 以降入所希望用」を読み取れませんでした")
        target = int(m.group(1))

        # 凡例の表（記号／受入人数）
        tables = page.find_tables()
        for table in tables:
            extracted = table.extract()
            head = [squeeze(c) for c in extracted[0]]
            if head[:2] == ["記号", "受入人数"]:
                for values in (list(map(squeeze, r)) for r in extracted[1:]):
                    if values[0] and values[1]:
                        legend.append({"mark": values[0], "label": values[1]})
                break
        if not legend:
            fail("記号の凡例が見つかりません")

        for line in text.splitlines():
            line = line.strip()
            if line.startswith("※") and len(line) > 8:
                notes.append(line.lstrip("※").strip())

        # 本体の表（16列）
        body = None
        for table in tables:
            if len(table.extract()[0]) >= 14:
                body = table
                break
        if body is None:
            fail("本体の表（16列）が見つかりません")

        # 見出しの「0歳」〜「5歳」を2組ぶん集める
        heads = []
        head_bottom = None
        for word in page.crop(
            (body.bbox[0], body.bbox[1], body.bbox[2], body.bbox[1] + 26)
        ).extract_words():
            if re.fullmatch(r"\d歳", squeeze(word["text"])):
                heads.append(((word["x0"] + word["x1"]) / 2, int(squeeze(word["text"])[0])))
                head_bottom = max(head_bottom or 0, word["bottom"])
        heads.sort()
        if len(heads) != AGE_COUNT * 2:
            fail(f"年齢の見出しが{len(heads)}個です（{AGE_COUNT * 2}個のはず）")
        # 前半6つが入所可能状況、後半6つが入所未決定者
        mark_centers = [x for x, _ in heads[:AGE_COUNT]]
        wait_centers = [x for x, _ in heads[AGE_COUNT:]]
        for i, (_, age) in enumerate(heads[:AGE_COUNT]):
            if age != i:
                fail(f"入所可能状況の年齢の並びが想定と違います: {[a for _, a in heads]}")
        for i, (_, age) in enumerate(heads[AGE_COUNT:]):
            if age != i:
                fail(f"入所未決定者の年齢の並びが想定と違います: {[a for _, a in heads]}")

        # 列の境目。施設名は地区の右から定員の左まで
        name_left = None
        capacity_center = None
        for word in page.crop(
            (body.bbox[0], body.bbox[1], body.bbox[2], body.bbox[1] + 26)
        ).extract_words():
            t = squeeze(word["text"])
            if t == "施設名":
                name_left = word["x0"] - 20
            if t == "定員":
                capacity_center = (word["x0"] + word["x1"]) / 2
        if name_left is None or capacity_center is None:
            fail("「施設名」「定員」の見出しが見つかりません")

        # 文字のy座標で行を作る
        words = page.crop(
            (body.bbox[0], head_bottom + 2, body.bbox[2], body.bbox[3])
        ).extract_words()
        lines = []
        for word in sorted(words, key=lambda w: (w["top"], w["x0"])):
            if lines and abs(lines[-1][0]["top"] - word["top"]) <= SAME_LINE:
                lines[-1].append(word)
            else:
                lines.append([word])

        step_mark = mark_centers[1] - mark_centers[0]
        step_wait = wait_centers[1] - wait_centers[0]

        for group in lines:
            name = squeeze(
                "".join(
                    w["text"]
                    for w in sorted(group, key=lambda w: w["x0"])
                    if name_left <= w["x0"] < capacity_center - 12
                )
            )
            if not name or name.endswith("歳"):
                continue

            marks = [None] * AGE_COUNT
            waits = [None] * AGE_COUNT
            capacity = ""
            for word in group:
                center = (word["x0"] + word["x1"]) / 2
                t = squeeze(word["text"])
                if not t:
                    continue
                if abs(center - capacity_center) < 14:
                    capacity = t
                    continue
                # 入所可能状況の欄
                index = min(range(AGE_COUNT), key=lambda i: abs(mark_centers[i] - center))
                if abs(mark_centers[index] - center) <= step_mark * 0.45:
                    if not all(ch in MARKS for ch in t):
                        fail(f"{name}: {index}歳の入所可能状況が記号ではありません（「{t}」）")
                    if marks[index] is not None:
                        fail(f"{name}: {index}歳の入所可能状況に値が2つあります")
                    marks[index] = t
                    printed["marks"][t] = printed["marks"].get(t, 0) + 1
                    continue
                # 入所未決定者の欄
                index = min(range(AGE_COUNT), key=lambda i: abs(wait_centers[i] - center))
                if abs(wait_centers[index] - center) <= step_wait * 0.45:
                    if not re.fullmatch(r"\d+", t):
                        continue
                    if waits[index] is not None:
                        fail(f"{name}: {index}歳の入所未決定者に値が2つあります")
                    waits[index] = int(t)
                    printed["numbers"] += 1

            if all(m is None for m in marks) and all(w is None for w in waits):
                continue
            rows.append(
                {"name": name, "capacity": capacity, "marks": marks, "waits": waits}
            )

    if not rows:
        fail("施設の行を取り出せませんでした")

    return {
        "asOf": as_of,
        "target": target,
        "legend": legend,
        "notes": notes,
        "printed": printed,
        "rows": rows,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
