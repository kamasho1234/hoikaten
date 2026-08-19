"""
中野区の空き状況113施設に、施設一覧のサイトURLを突き合わせる

実行: python scripts/vacancy-research/nakano/match.py

## 突き合わせ方
**一覧側は「中野南台ちとせ」、空き状況側は「中野南台ちとせ保育園」**のように
一覧が施設名から「保育園」を省いている。そこで
1. そのままの正規化名で一致
2. 空き状況側から「保育園」「保育室」「こども園」などの語を落とした名前で一致
3. それでも当たらないものは URL を付けない（推測でURLを付けない）
"""

import json
import re
import sys
import unicodedata

ROOT = "C:/Users/kamas/projects/webapps/hoikuen-simulator"
PAGES = f"{ROOT}/scripts/vacancy-research/nakano/facility_pages.json"
FROM_PDF = f"{ROOT}/scripts/vacancy-research/nakano/facilities_from_pdf.json"
OUT = f"{ROOT}/scripts/vacancy-research/nakano/verified_nakano.json"

# 一覧側で省かれる語
SUFFIX = re.compile(r"(保育園|保育室|こども園|園|ナーサリー|ナーサリースクール)$")
# 一覧側にだけ付く事業類型の注記（「あーす保育園中野坂上（A型）」）
TYPE_NOTE = re.compile(r"[（(](A型|B型|C型|Ａ型|Ｂ型|Ｃ型|家庭的|小規模)[）)]")


def norm(s):
    s = unicodedata.normalize("NFKC", s or "")
    s = TYPE_NOTE.sub("", s)
    return re.sub(r"[\s　・･（）()「」【】《》,、.。／/\-－ー~〜]", "", s)


def short(s):
    """末尾の施設種別語を繰り返し落とした名前"""
    t = norm(s)
    prev = None
    while prev != t:
        prev = t
        t = SUFFIX.sub("", t)
    return t


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    pages = [p for p in json.load(open(PAGES, encoding="utf-8"))["facilities"] if p.get("url")]
    targets = json.load(open(FROM_PDF, encoding="utf-8"))["facilities"]

    by_name = {}
    # **一覧側は「沼袋」「中野」のように2文字の園名がある**ので長さで足切りしない。
    # 代わりに、同じ短縮名が複数の園に当たる場合は曖昧なので使わない
    short_hits: dict[str, list] = {}
    for p in pages:
        by_name.setdefault(norm(p["name"]), p)
        short_hits.setdefault(short(p["name"]), []).append(p)
    by_short = {k: v[0] for k, v in short_hits.items() if len(v) == 1 and k}
    # 括弧の前だけの名前（家庭的保育の氏名表記ゆれ対策）。曖昧なものは使わない
    head_hits: dict[str, list] = {}
    for p2 in pages:
        head_hits.setdefault(norm(re.split(r"[（(]", p2["name"])[0]), []).append(p2)
    by_head = {k: v[0] for k, v in head_hits.items() if len(v) == 1 and k}
    ambiguous = {k for k, v in short_hits.items() if len(v) > 1}
    if ambiguous:
        print(f"（短縮名が重複するため使わないキー: {'、'.join(sorted(ambiguous))}）")

    results = []
    matched = unmatched = 0
    for t in targets:
        # 空き状況側の「（医療的ケア児受入：１）」のような注記を落としてから照合する
        clean = re.sub(r"[（(][^）)]*[）)]", "", t["name"])
        hit = by_name.get(norm(clean))
        by = "name"
        if not hit:
            hit = by_short.get(short(clean))
            by = "name-short" if hit else by
        if not hit:
            # 家庭的保育は空き状況が「保育室こどものせかい(小坂)」＝姓だけ、
            # 一覧が「保育室こどものせかい （小坂 明子）」＝フルネーム。
            # 括弧の中身を無視して、括弧の前の名前だけで突き合わせる
            head_only = norm(re.split(r"[（(]", t["name"])[0])
            if len(head_only) >= 4:
                hit = by_head.get(head_only)
                by = "name-head" if hit else by
        if hit:
            matched += 1
            results.append(
                {
                    "id": t["id"],
                    "name": t["name"],
                    "url": hit["url"],
                    "type": "facility",
                    "verdict": "verified",
                    "by": by,
                    "pageName": hit["name"],
                }
            )
        else:
            unmatched += 1
            results.append(
                {"id": t["id"], "name": t["name"], "url": None, "type": None, "verdict": "not_found"}
            )

    with open(OUT, "w", encoding="utf-8", newline="\n") as f:
        json.dump(results, f, ensure_ascii=False, indent=1)
        f.write("\n")

    print(f"一致 {matched} / 未確定 {unmatched} （全{len(targets)}件）")
    kinds = {}
    for r in results:
        if r["verdict"] == "verified":
            kinds[r["by"]] = kinds.get(r["by"], 0) + 1
    print("  照合の内訳:", kinds)
    print("\n未確定:")
    for r in [r for r in results if r["verdict"] != "verified"][:25]:
        print("   ", r["name"])
    print(f"\n書き出しました: {OUT}")


if __name__ == "__main__":
    main()
