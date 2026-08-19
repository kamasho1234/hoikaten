"""
照合した紹介PDFのURLに実アクセスして、200 と PDF であることを確かめる

実行: python scripts/vacancy-research/koto/verify.py

江東区の施設リンクは**園ごとの紹介PDF**なので、HTMLページのように
本文へ施設名を探しにいくのではなく、
- HTTP 200 が返ること
- Content-Type が PDF、または先頭が %PDF であること
を確認する。**名前の対応づけは区の紹介ページのリンク文言そのもの**なので、
ここでは配信の生存だけを見る。確認できなかったものは URL を外す。
"""

import json
import sys
import time
import urllib.request

ROOT = "C:/Users/kamas/projects/webapps/hoikuen-simulator"
PATH = f"{ROOT}/scripts/vacancy-research/koto/verified_koto.json"
UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)"


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    records = json.load(open(PATH, encoding="utf-8"))
    # 同じPDFを複数施設が指すこと（本園・分園）があるので、URL単位で確認する
    urls = sorted({r["url"] for r in records if r.get("url")})
    print(f"{len(urls)}本のPDFを確認します（施設 {sum(1 for r in records if r.get('url'))}件ぶん）\n")

    status = {}
    for i, url in enumerate(urls, 1):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=60) as res:
                head = res.read(4)
                ok = res.status == 200 and (
                    head == b"%PDF" or "pdf" in (res.headers.get("content-type") or "").lower()
                )
                status[url] = ok
                if not ok:
                    print(f"  NG {url} status={res.status} head={head!r}")
        except Exception as exc:
            status[url] = False
            print(f"  NG {url}: {exc}")
        if i % 40 == 0:
            print(f"  ... {i}/{len(urls)}")

    ok = ng = 0
    for r in records:
        if not r.get("url"):
            continue
        if status.get(r["url"]):
            r["verdict"] = "verified"
            r["checkedAt"] = time.strftime("%Y-%m-%d")
            ok += 1
        else:
            r["verdict"] = "unreachable"
            r["url"] = None
            r["type"] = None
            ng += 1

    with open(PATH, "w", encoding="utf-8", newline="\n") as f:
        json.dump(records, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(f"\n確認できた {ok}件 / 落とした {ng}件（PDF {sum(1 for v in status.values() if v)}/{len(urls)}本）")


if __name__ == "__main__":
    main()
