"""
千代田区の「空き状況一覧」PDFから施設ごとの空き数を抜き出してJSONで返す

実行: python scripts/chiyoda-pdf-extract.py <pdf>
出力: 標準出力にJSON（fetch-chiyoda-vacancy.ts から呼ぶ）

## 表の作り
- **罫線の引き方が施設類型ごとにばらばら**で、pdfplumber の表認識は列数が 7 だったり 21 だったり
  安定しない。施設名が途中で切れることもある。そこで**本文のテキスト行から読む**。
- 「認可保育所」「こども園」「認定こども園」「幼保一体施設」「事業所内保育所（区民枠）」
  「小規模保育事業」「居宅訪問型保育事業」という**見出し行が施設類型**。
  見出しの次の行が「0歳児 1歳児 …」の年齢見出しで、その後が施設の行。
- **居宅訪問型保育事業だけ値が4つ**（例: 「株式会社ポピンズファミリーケア 9 - - -」）。
  0〜2歳が結合セルで1つの数字になっているため。合算値として扱う。
- 「-」はそのクラスの受け入れがない、0は空きなし。

## 検算
このPDFには合計行がない。**こわいのは施設の行を黙って取りこぼすこと**（園名が長くて
折り返した場合など）なので、施設の行として読めなかった行のうち「保育園」「こども園」
「株式会社」といった施設らしい語を含むものを skipped として返す。1件でもあれば中断する。
"""

import json
import re
import sys

import pdfplumber

Z = str.maketrans("０１２３４５６７８９", "0123456789")
SECTIONS = [
    "認可保育所",
    "こども園",
    "認定こども園",
    "幼保一体施設",
    "事業所内保育所（区民枠）",
    "小規模保育事業",
    "居宅訪問型保育事業",
]
AGE_HEAD = re.compile(r"^0歳児\s+1歳児\s+2歳児\s+3歳児\s+4歳児\s+5歳児$")
# 「園名 0 0 2 - - -」。値は数字か「-」
ROW = re.compile(r"^(?P<name>.+?)\s+(?P<values>(?:\d+|[-－―])(?:\s+(?:\d+|[-－―]))+)$")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def normalize(s):
    return "".join((s or "").split()).translate(Z)


def section_of(line):
    """見出し行なら施設類型を返す。「居宅訪問型保育事業（令和８年８月７日現在）」のように
    日付が付くことがあるので括弧を落として比べる"""
    t = normalize(line)
    t = re.sub(r"（[^）]*年[^）]*月[^）]*日[^）]*）", "", t)
    return t if t in SECTIONS else None


def extract(path):
    rows = []
    skipped = []
    as_of = set()
    target = set()
    section = None
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            m = re.search(r"空き状況（令和([０-９\d]+)年([０-９\d]+)月([０-９\d]+)日現在）", text)
            if m:
                as_of.add(tuple(int(g.translate(Z)) for g in m.groups()))
            m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月入園選考終了時の空き状況", text)
            if m:
                target.add(tuple(int(g.translate(Z)) for g in m.groups()))

            for line in text.split("\n"):
                line = line.strip()
                if not line:
                    continue
                head = section_of(line)
                if head:
                    section = head
                    continue
                if AGE_HEAD.match(normalize(line).replace("歳児", "歳児 ").strip()):
                    continue
                if normalize(line).replace("歳児", "歳児 ").split() == [
                    f"{i}歳児" for i in range(6)
                ]:
                    continue
                m = ROW.match(line)
                if not m:
                    # 施設らしい語を含むのに読めない行は取りこぼしの疑い（※で始まる注記は除く）
                    if not re.match(r"^[※(（]|.*空き状況", line) and re.search(
                        r"保育園|保育所|保育室|こども園|幼稚園|株式会社", line
                    ):
                        skipped.append(line)
                    continue
                if section is None:
                    fail(f"施設類型が分からない行があります: {line}")
                values = m.group("values").split()
                rows.append(
                    {
                        "section": section,
                        "name": m.group("name").strip(),
                        "values": values,
                    }
                )

    if not rows:
        fail("施設の行を1つも取り出せませんでした")
    return {
        "asOf": sorted(as_of),
        "target": sorted(target),
        "rows": rows,
        "skipped": skipped,
    }


def main():
    paths = sys.argv[1:]
    if len(paths) != 1:
        fail("PDFのパスを1つ指定してください。")
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(extract(paths[0]), sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
