"""
照合した施設サイトのURLに実アクセスして、200 と施設名の掲載を確かめる

実行: python scripts/vacancy-research/nakano/verify.py

中野区の一覧が案内しているのは**園そのものの公式サイト（外部サイト）**が中心で、
区立園などは区の施設ページ。いずれも
- HTTP 200 が返ること
- ページに施設名（一覧側の表記か、空き状況側の表記のどちらか）が載っていること
を確認し、通らなかったものは URL を外す。

外部サイトは応答が遅かったり、robots や WAF で弾かれたりする。失敗は理由ごと記録する。
"""

import json
import re
import sys
import time
import unicodedata
import urllib.request

ROOT = "C:/Users/kamas/projects/webapps/hoikuen-simulator"
PATH = f"{ROOT}/scripts/vacancy-research/nakano/verified_nakano.json"
UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)"


def norm(s):
    s = unicodedata.normalize("NFKC", s or "")
    return re.sub(r"[\s　・･（）()「」【】《》,、.。／/\-－ー~〜]", "", s)


def core(s):
    """照合に使う中核部分。括弧書きと事業類型の注記を落とす"""
    s = re.sub(r"[（(][^）)]*[）)]", "", s or "")
    return norm(s)


def decode(raw, content_type):
    """
    HTMLを文字化けさせずに読む。

    **園の公式サイトには Shift_JIS や EUC-JP のページが残っている**。
    UTF-8 決め打ちで読むと施設名が化けて「載っていない」と誤判定するので、
    ヘッダ→meta→よくある日本語エンコーディングの順に試す。
    """
    candidates = []
    m = re.search(r"charset=([\w\-]+)", content_type or "", re.I)
    if m:
        candidates.append(m.group(1))
    head = raw[:2048].decode("ascii", "ignore")
    m = re.search(r'charset=["\']?([\w\-]+)', head, re.I)
    if m:
        candidates.append(m.group(1))
    candidates += ["utf-8", "cp932", "euc-jp"]

    for enc in candidates:
        try:
            text = raw.decode(enc)
        except (LookupError, UnicodeDecodeError):
            continue
        # 化けたまま通ることがあるので、日本語が出ているものを優先する
        if re.search(r"[぀-ヿ一-鿿]", text):
            return text
    return raw.decode("utf-8", "replace")


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    records = json.load(open(PATH, encoding="utf-8"))
    targets = [r for r in records if r.get("url")]
    print(f"{len(targets)}件のURLを確認します\n")

    ok = ng = 0
    for i, r in enumerate(targets, 1):
        try:
            req = urllib.request.Request(r["url"], headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=30) as res:
                status = res.status
                body = decode(res.read(400_000), res.headers.get("content-type"))
        except Exception as exc:
            r["verdict"] = "unreachable"
            r["url"] = None
            r["type"] = None
            r["error"] = str(exc)[:80]
            ng += 1
            print(f"  NG {r['name']}: {str(exc)[:60]}")
            continue

        text = norm(re.sub(r"<[^>]+>", " ", body))
        found = core(r["name"]) in text or core(r.get("pageName", "")) in text
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
        if i % 25 == 0:
            print(f"  ... {i}/{len(targets)}")

    with open(PATH, "w", encoding="utf-8", newline="\n") as f:
        json.dump(records, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(f"\n確認できた {ok}件 / 落とした {ng}件")


if __name__ == "__main__":
    main()
