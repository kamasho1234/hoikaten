# 自治体の「利用調整基準（選考指数）」の資料を探す。
#
# シミュレーターに自治体を足すには、その自治体の**基準指数表と調整指数表**が要る。
# 保育料と違ってページ本文に載ることは少なく、
# 「入園のしおり」「利用調整基準表」といったPDFに入っていることがほとんど。
#
#   python scripts/index-hunt.py <団体コード\t都道府県\t市区町村\t人口 のtsv> out.jsonl
#
# 探し方
#   1. robots.txt の Sitemap: と、決まった名前のサイトマップ
#   2. トップから幅優先でたどる。「保育」「入園」「利用調整」のリンクを先に開く
#   3. 「利用調整」「選考基準」「入所選考」「点数」を含むページ・PDFを候補にする
import concurrent.futures as cf
import html as H
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

# 資料の名前・リンク文字の手掛かり。強い順
STRONG = re.compile(r"利用調整|選考基準|入所選考|入園選考|調整指数|基準指数|選考指数|優先順位")
MEDIUM = re.compile(r"入園のしおり|入所のしおり|利用案内|保育所等利用|支給認定|保育の必要性")
DOC = re.compile(r"\.(pdf|xlsx?|docx?)$", re.I)
FOLLOW = re.compile(r"保育|入園|入所|子育て|認定こども園|幼稚園")
SKIP = re.compile(r"\.(jpg|jpeg|png|gif|zip|mp4|mov)$|mailto:|tel:|javascript:", re.I)


def get(url, limit=3_000_000, timeout=25):
    try:
        r = urllib.request.urlopen(
            urllib.request.Request(url, headers=UA), timeout=timeout, context=CTX
        )
        raw = r.read(limit)
        for enc in ("utf-8", "cp932", "euc_jp"):
            try:
                return r.geturl(), raw.decode(enc)
            except UnicodeDecodeError:
                continue
        return r.geturl(), raw.decode("utf-8", "replace")
    except Exception:
        return None, None


def links(base, text):
    out = []
    for m in re.finditer(r'<a[^>]+href="([^"#][^"]*)"[^>]*>([\s\S]{0,200}?)</a>', text, re.I):
        label = re.sub(r"[\s　]+", "", H.unescape(re.sub(r"<[^>]+>", "", m.group(2))))
        try:
            a = urllib.parse.urljoin(base, m.group(1))
        except ValueError:
            continue
        if SKIP.search(a):
            continue
        out.append((a, label))
    return out


def sitemap_seeds(host):
    """robots.txt と決まった名前のサイトマップから、保育のページを拾う"""
    seeds = []
    maps = [f"https://{host}/sitemap.xml", f"https://{host}/sitemap_index.xml"]
    _, robots = get(f"https://{host}/robots.txt", limit=200_000, timeout=15)
    if robots:
        maps += re.findall(r"(?i)^\s*Sitemap:\s*(\S+)", robots, re.M)
    seen = set()
    for m in maps[:6]:
        if m in seen:
            continue
        seen.add(m)
        _, x = get(m, limit=6_000_000, timeout=25)
        if not x:
            continue
        locs = re.findall(r"<loc>\s*([^<]+?)\s*</loc>", x)
        # サイトマップの入れ子は1段だけ追う
        for loc in locs[:800]:
            if loc.endswith(".xml") and len(seen) < 8:
                seen.add(loc)
                _, y = get(loc, limit=6_000_000, timeout=25)
                if y:
                    locs += re.findall(r"<loc>\s*([^<]+?)\s*</loc>", y)[:800]
        seeds += [l for l in locs if FOLLOW.search(urllib.parse.unquote(l))]
    return list(dict.fromkeys(seeds))[:120]


def hunt(row):
    code, pref, name, pop, host = row
    if not host:
        return {"code": code, "name": name, "found": False, "why": "ホスト名が無い"}
    seen = set()
    queue = [f"https://{host}/"] + sitemap_seeds(host)
    docs, pages = [], []
    for _ in range(90):
        if not queue:
            break
        url = queue.pop(0)
        if url in seen:
            continue
        seen.add(url)
        final, text = get(url)
        if not text:
            continue
        flat = re.sub(r"[\s　]+", "", re.sub(r"<[^>]+>", " ", H.unescape(text)))
        # 本文に選考の話が載っているページ
        if STRONG.search(flat) and re.search(r"指数|点数|点", flat):
            pages.append((final, len(STRONG.findall(flat))))
        for a, label in links(final, text):
            if DOC.search(a):
                if STRONG.search(label) or STRONG.search(urllib.parse.unquote(a)):
                    docs.append((a, label, 2))
                elif MEDIUM.search(label) or MEDIUM.search(urllib.parse.unquote(a)):
                    docs.append((a, label, 1))
            elif a.startswith("https://" + host) or a.startswith("http://" + host):
                if FOLLOW.search(label) or FOLLOW.search(urllib.parse.unquote(a)):
                    if a not in seen and len(queue) < 200:
                        queue.append(a)
    docs = sorted(dict(((d[0], d) for d in docs)).values(), key=lambda d: -d[2])[:8]
    pages = sorted(set(pages), key=lambda p: -p[1])[:4]
    return {
        "code": code,
        "pref": pref,
        "name": name,
        "pop": pop,
        "host": host,
        "found": bool(docs or pages),
        "docs": [[d[0], d[1]] for d in docs],
        "pages": [p[0] for p in pages],
    }


def main():
    rows = []
    for line in io.open(sys.argv[1], encoding="utf-8"):
        p = line.rstrip("\n").split("\t")
        if len(p) >= 5 and p[4]:
            rows.append((p[0], p[1], p[2], p[3], p[4]))
    print(f"対象 {len(rows)}件", flush=True)
    out = []
    with cf.ThreadPoolExecutor(max_workers=5) as ex:
        for i, r in enumerate(ex.map(hunt, rows), 1):
            out.append(r)
            mark = f"資料{len(r.get('docs') or [])}件 ページ{len(r.get('pages') or [])}件" if r["found"] else "見つからず"
            print(f"  [{i}] {r['name']} {mark}", flush=True)
    io.open(sys.argv[2], "w", encoding="utf-8", newline="\n").write(
        "\n".join(json.dumps(x, ensure_ascii=False) for x in out) + "\n"
    )
    print(f"見つかった {sum(1 for x in out if x['found'])}/{len(out)}件 → {sys.argv[2]}")


if __name__ == "__main__":
    main()
