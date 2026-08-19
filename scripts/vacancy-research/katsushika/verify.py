"""
照合した施設ページURLに実アクセスして、200 と施設名の掲載を確かめる

実行: python scripts/vacancy-research/katsushika/verify.py

URLを載せる条件は「実際に開けて、そのページに施設名が書かれていること」。
確認できなかったものは verdict を落として URL を外す（推測でURLを載せない）。
"""

import json
import re
import sys
import time
import unicodedata
import urllib.request

ROOT = "C:/Users/kamas/projects/webapps/hoikuen-simulator"
PATH = f"{ROOT}/scripts/vacancy-research/katsushika/verified_katsushika.json"
UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)"


def norm(s):
    s = unicodedata.normalize("NFKC", s or "")
    return re.sub(r"[\s　・･（）()「」【】,、.。／/\-－ー~〜]", "", s)


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    records = json.load(open(PATH, encoding="utf-8"))
    targets = [r for r in records if r.get("url")]
    print(f"{len(targets)}件のURLを確認します\n")

    ok = ng = 0
    for i, r in enumerate(targets, 1):
        try:
            req = urllib.request.Request(r["url"], headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=40) as res:
                status = res.status
                body = res.read().decode("utf-8", "replace")
        except Exception as exc:
            r["verdict"] = "unreachable"
            r["url"] = None
            r["type"] = None
            r["error"] = str(exc)
            ng += 1
            print(f"  NG {r['name']}: {exc}")
            continue

        text = norm(re.sub(r"<[^>]+>", " ", body))
        # 空き状況側の名前か、施設ページ側の名前のどちらかが載っていればよい
        found = norm(r["name"]) in text or norm(r.get("pageName", "")) in text
        if status == 200 and found:
            r["verdict"] = "verified"
            r["checkedAt"] = time.strftime("%Y-%m-%d")
            ok += 1
        else:
            r["verdict"] = "name_not_found" if status == 200 else f"http_{status}"
            r["url"] = None
            r["type"] = None
            ng += 1
            print(f"  NG {r['name']}: status={status} 施設名の掲載={found}")
        if i % 30 == 0:
            print(f"  ... {i}/{len(targets)}")

    with open(PATH, "w", encoding="utf-8", newline="\n") as f:
        json.dump(records, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(f"\n確認できた {ok}件 / 落とした {ng}件")


if __name__ == "__main__":
    main()
