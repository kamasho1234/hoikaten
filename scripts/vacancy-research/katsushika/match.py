"""
葛飾区の空き状況161施設に、区の施設ページURLを突き合わせる

実行: python scripts/vacancy-research/katsushika/match.py

## 突き合わせ方
1. 施設名の完全一致（記号と全半角を吸収した正規化名で比較）
2. 空き状況側の名前が「認定こども園そあ」のように**種別を前置**しているので、
   施設ページ側の種別を落とした名前（shortName）とも比較する
3. **所在地の一致**で裏取りする。空き状況PDFは「東水元 3-5-7」、施設ページは
   「〒125-0031 東京都葛飾区西水元2-16-10」と書式が違うので、丁目・番地の数字列で比べる

一致しなかったものは URL を付けない（推測でURLを付けない）。
"""

import json
import re
import sys
import unicodedata

ROOT = "C:/Users/kamas/projects/webapps/hoikuen-simulator"
PAGES = f"{ROOT}/scripts/vacancy-research/katsushika/facility_pages.json"
FROM_PDF = f"{ROOT}/scripts/vacancy-research/katsushika/facilities_from_pdf.json"
OUT = f"{ROOT}/scripts/vacancy-research/katsushika/verified_katsushika.json"


def norm(s):
    """記号と全半角の違いを吸収した比較用の名前"""
    s = unicodedata.normalize("NFKC", s or "")
    return re.sub(r"[\s　・･（）()「」【】,、.。／/\-－ー~〜]", "", s)


def addr_key(s):
    """所在地から「町名＋丁目番地」を数字込みで取り出す（〒や都県名は落とす）"""
    s = unicodedata.normalize("NFKC", s or "")
    s = re.sub(r"〒?\d{3}-?\d{4}", "", s)
    s = re.sub(r"(東京都)?葛飾区", "", s)
    s = re.sub(r"[\s　]", "", s)
    m = re.match(r"([^\d]+)([\d\-‐]+)", s)
    if not m:
        return ""
    town = re.sub(r"[^\u3040-\u30ff\u4e00-\u9fff]", "", m.group(1))
    nums = re.sub(r"[^\d]", "-", m.group(2)).strip("-")
    return f"{town}/{nums}"


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    pages = json.load(open(PAGES, encoding="utf-8"))["facilities"]
    targets = json.load(open(FROM_PDF, encoding="utf-8"))["facilities"]

    by_name = {}
    by_addr = {}
    for p in pages:
        for key in filter(None, {norm(p["name"]), norm(p.get("shortName", ""))}):
            by_name.setdefault(key, p)
        a = addr_key(p.get("address", ""))
        if a:
            by_addr.setdefault(a, p)

    results = []
    matched = unmatched = 0
    for t in targets:
        name = norm(t["name"])
        hit = by_name.get(name)
        by = "name"
        if not hit:
            # 空き状況側が「認定こども園そあ」、施設ページ側が「そあ」のような差
            hit = next((p for k, p in by_name.items() if k and (k in name or name in k) and len(k) >= 4), None)
            by = "name-partial" if hit else by
        if not hit:
            a = addr_key(t.get("address", ""))
            if a:
                hit = by_addr.get(a)
                by = "address" if hit else by
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
                {
                    "id": t["id"],
                    "name": t["name"],
                    "url": None,
                    "type": None,
                    "verdict": "not_found",
                }
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
    print("\n未確定の例:")
    for r in [r for r in results if r["verdict"] != "verified"][:15]:
        print("   ", r["name"])
    print(f"\n書き出しました: {OUT}")


if __name__ == "__main__":
    main()
