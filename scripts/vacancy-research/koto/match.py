"""
江東区の空き状況213施設に、園紹介PDFのURLを突き合わせる

実行: python scripts/vacancy-research/koto/match.py

## 突き合わせ方
1. 施設名の完全一致（記号・全半角・スペースを吸収した正規化名）
2. 空き状況側が「ワーカーズコープ 新大橋のびっこ（本園）」、紹介PDF側が
   「ワーカーズコープ新大橋のびっこ」のように**本園・分園の区別が紹介PDFに無い**ので、
   括弧書きを落とした名前でも照合する（本園・分園が同じPDFを指すのは区の掲載どおり）
3. それでも当たらないものは URL を付けない
"""

import json
import re
import sys
import unicodedata

ROOT = "C:/Users/kamas/projects/webapps/hoikuen-simulator"
PAGES = f"{ROOT}/scripts/vacancy-research/koto/facility_pages.json"
FROM_PDF = f"{ROOT}/scripts/vacancy-research/koto/facilities_from_pdf.json"
OUT = f"{ROOT}/scripts/vacancy-research/koto/verified_koto.json"


def norm(s):
    s = unicodedata.normalize("NFKC", s or "")
    return re.sub(r"[\s　・･（）()「」【】,、.。／/\-－ー~〜]", "", s)


def base_name(s):
    """本園・分園などの括弧書きを落とした名前"""
    s = unicodedata.normalize("NFKC", s or "")
    s = re.sub(r"[（(][^）)]*[）)]", "", s)
    return norm(s)


def loose_name(s):
    """
    末尾の「園」やキャンパス名まで落とした、ゆるい比較用の名前。

    空き状況側は「みらいく北砂園」「サンライズキッズ保育園 亀戸園」なのに、
    紹介PDF側は「みらいく北砂」「サンライズキッズ保育園 亀戸」と末尾の「園」が無い。
    また「江東湾岸サテライトナーサリースクール（本・分園）」は本園・分園をまとめた1つのPDF。
    """
    s = base_name(s)
    s = re.sub(r"(キャンパス)$", "", s)
    s = re.sub(r"園$", "", s)
    return s


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    pages = json.load(open(PAGES, encoding="utf-8"))["facilities"]
    targets = json.load(open(FROM_PDF, encoding="utf-8"))["facilities"]

    by_name = {}
    by_base = {}
    by_loose = {}
    for p in pages:
        by_name.setdefault(norm(p["name"]), p)
        by_base.setdefault(base_name(p["name"]), p)
        by_loose.setdefault(loose_name(p["name"]), p)

    results = []
    matched = unmatched = 0
    for t in targets:
        hit = by_name.get(norm(t["name"]))
        by = "name"
        if not hit:
            hit = by_base.get(base_name(t["name"]))
            by = "name-base" if hit else by
        if not hit:
            key = loose_name(t["name"])
            # 短すぎるキーは別の園に当たりうるので使わない
            if len(key) >= 5:
                hit = by_loose.get(key)
                by = "name-loose" if hit else by
        if hit:
            matched += 1
            results.append(
                {
                    "id": t["id"],
                    "name": t["name"],
                    "url": hit["url"],
                    "type": "city",
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
    for r in [r for r in results if r["verdict"] != "verified"][:20]:
        print("   ", r["name"])
    print(f"\n書き出しました: {OUT}")


if __name__ == "__main__":
    main()
