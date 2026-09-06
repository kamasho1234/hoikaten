# すでに見つけてある保育料のページを開き直して、
# そのページに貼られている保育料表の資料（PDF・Excel）を拾う。
#
# 深谷市・福山市のように、ページ本文には表が無く、
# 保育料表はPDFで別に置かれている自治体が多い。
import concurrent.futures as cf
import html
import io
import json
import re
import ssl
import sys
import urllib.parse
import urllib.request

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

UA = {"User-Agent": "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)"}
CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

DOC = re.compile(r"\.(pdf|xlsx?|xlsm)$", re.I)
WANT_TEXT = re.compile(r"保育料|利用者負担|徴収基準|階層|負担額")
WANT_NAME = re.compile(r"hoikuryo|hoikuryou|futan|kaisou|choushuu|chousyu", re.I)


def get(url, timeout=30, limit=3_000_000):
    try:
        r = urllib.request.urlopen(
            urllib.request.Request(url, headers=UA), timeout=timeout, context=CTX
        )
        raw = r.read(limit)
        for enc in ("utf-8", "cp932", "euc_jp"):
            try:
                return raw.decode(enc)
            except UnicodeDecodeError:
                continue
        return raw.decode("utf-8", "replace")
    except Exception:
        return None


def docs_on(url):
    h = get(url)
    if not h:
        return []
    out = []
    for m in re.finditer(r'<a[^>]+href="([^"#][^"]*)"[^>]*>([\s\S]{0,200}?)</a>', h, re.I):
        t = html.unescape(re.sub(r"<[^>]+>", "", m.group(2)))
        t = re.sub(r"[\s　]+", "", t)
        try:
            a = urllib.parse.urljoin(url, m.group(1))
        except ValueError:
            continue
        if not DOC.search(a):
            continue
        if WANT_TEXT.search(t) or WANT_NAME.search(a):
            out.append(a)
    return list(dict.fromkeys(out))[:6]


def main():
    src, dst = sys.argv[1], sys.argv[2]
    rows = [json.loads(l) for l in io.open(src, encoding="utf-8") if l.strip()]
    targets = [d for d in rows if d.get("found")]
    print(f"対象 {len(targets)}件", flush=True)
    got = {}
    with cf.ThreadPoolExecutor(max_workers=8) as ex:
        for d, docs in zip(targets, ex.map(lambda x: docs_on(x["url"]), targets)):
            got[d["slug"]] = docs
            if docs:
                print(f"  {d['name']} 資料{len(docs)}件", flush=True)
    for d in rows:
        if d["slug"] in got:
            d["pageDocs"] = got[d["slug"]]
    io.open(dst, "w", encoding="utf-8", newline="\n").write(
        "\n".join(json.dumps(x, ensure_ascii=False) for x in rows) + "\n"
    )
    print(f"資料が付いた {sum(1 for v in got.values() if v)}件 → {dst}")


if __name__ == "__main__":
    main()
