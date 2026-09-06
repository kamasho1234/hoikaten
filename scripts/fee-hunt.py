"""
自治体の「保育料」のページと資料を探す。

実行（この順で）:
    python scripts/fee-hunt.py  <slug	name	host のtsv> fee_pages.jsonl
    python scripts/fee-docs.py  fee_pages.jsonl fee_pages2.jsonl   ← ページ内の保育料表を拾う
    python scripts/fee-read.py  fee_pages2.jsonl fee_values.jsonl
    python scripts/fee-check.py fee_values.jsonl fee_ok.jsonl
    python scripts/fee-write.py fee_ok.jsonl

## 探し方
1. robots.txt の Sitemap: 行と、決まった名前のサイトマップ
2. サイトマップに載っている保育料・保育・子育てのページをたどり始める場所にする
3. トップからも幅優先でたどる。「保育料」「利用者負担額」のリンクを先に開く
4. 「保育料」＋「円が並ぶ」＋「年齢の区分」の3つが揃うページを候補にする
5. PDF・Excelは開かず、名前が保育料らしいものだけ覚えて後の工程に渡す
"""
import concurrent.futures as cf
import html
import io
import json
import os
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

WANT = re.compile(r"保育料|利用者負担額|保育所?等?の?費用")
NG = re.compile(
    r"学童|放課後|給食費の?補助|滞納|口座|還付|延滞|償還|認可外|一時預かり|病児|"
    r"幼稚園就園奨励|副食費の?免除申請|申請書|様式"
)
MAX_PAGES = 320


def get(url, limit=2_000_000, timeout=30):
    try:
        r = urllib.request.urlopen(
            urllib.request.Request(url, headers=UA), timeout=timeout, context=CTX
        )
        ct = (r.headers.get("Content-Type") or "").lower()
        body = r.read(limit)
        if "html" not in ct and "xml" not in ct:
            return None, ct, body
        for enc in ("utf-8", "cp932", "euc_jp"):
            try:
                return body.decode(enc), ct, body
            except UnicodeDecodeError:
                continue
        return body.decode("utf-8", "replace"), ct, body
    except Exception:
        return None, "", None


def text_of(h):
    b = re.sub(r"(?s)<(script|style).*?</\1>", " ", h)
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", b)))


def links_of(h, base):
    out = []
    for m in re.finditer(r'<a[^>]+href="([^"#][^"]*)"[^>]*>([\s\S]{0,200}?)</a>', h, re.I):
        t = re.sub(r"[\s　]+", "", re.sub(r"<[^>]+>", "", m.group(2)))
        try:
            u = urllib.parse.urljoin(base, m.group(1))
        except ValueError:
            continue
        out.append((u, html.unescape(t)))
    return out


def sitemap_names(host):
    """robots.txt の Sitemap: 行と、決まった名前のサイトマップ"""
    names = ["sitemap.xml", "sitemap_index.xml", "wp-sitemap.xml", "sitemap/sitemap.xml"]
    body, _, _ = get(f"https://{host}/robots.txt")
    if body:
        for u in re.findall(r"(?im)^\s*sitemap:\s*(\S+)", body):
            if u not in names:
                names.append(u)
    return names[:8]


def sitemap_seeds(host):
    """
    サイトマップから、保育料らしいURLをたどり始める場所として集める。

    トップから順にたどると、保育料のページが深いところにあって
    ページ数の上限に当たる自治体が多い。サイトマップなら直に開ける
    """
    urls = []
    for name in sitemap_names(host):
        body, _, _ = get(name if name.startswith("http") else f"https://{host}/{name}")
        if not body or "<loc" not in body:
            continue
        found = re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", body)
        subs = [u for u in found if u.endswith(".xml")]
        urls += [u for u in found if not u.endswith(".xml")]
        for sub in subs[:30]:
            b2, _, _ = get(sub)
            if b2:
                urls += [
                    u
                    for u in re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", b2)
                    if not u.endswith(".xml")
                ]
        if urls:
            break
    keep = []
    for u in urls:
        dec = urllib.parse.unquote(u)
        if re.search(r"\.(jpg|png|zip|docx?)$", dec, re.I):
            continue
        if re.search(r"hoikuryo|hoikuryou|riyousha|futan|hoiku|kosodate|kodomo", dec, re.I):
            keep.append(u)
    return keep[:200]


def hunt(row):
    slug, name, host = row
    seen = set()
    docs = []
    queue = sitemap_seeds(host) + [f"https://{host}/"]
    best = None
    opened = 0
    while queue and opened < MAX_PAGES:
        u = queue.pop(0)
        if u in seen:
            continue
        seen.add(u)
        h, ct, _ = get(u)
        opened += 1
        if not h:
            continue
        txt = text_of(h)
        # 保育料の階層表があるページか（「階層」と「円」と3号/0〜2歳の語が揃う）
        # 保育料の階層表があるページか。
        # 「階層」を必ず使う自治体ばかりではないので、
        # 「保育料」＋「円が並ぶ」＋「年齢の区分」の3つで見る
        if WANT.search(txt) and re.search(r"[0０]\s*歳|3号|３号|未満児|3歳未満", txt):
            yen = len(re.findall(r"[0-9][0-9,]{2,}\s*円", txt))
            score = yen + (10 if "階層" in txt else 0)
            if yen >= 5 and (best is None or score > best[0]):
                best = (score, u, txt[:20000])
        for a, t in links_of(h, u):
            nl = urllib.parse.urlparse(a).netloc
            if nl != host or a in seen:
                continue
            if re.search(r"\.(jpg|png|zip|docx?)$", a, re.I):
                continue
            if a.lower().endswith((".pdf", ".xlsx", ".xls")):
                # 資料は開かず、名前が保育料らしいものだけ後で見るために覚える
                if WANT.search(t) or re.search(r"hoikuryo|hoikuryou|futan", a, re.I):
                    docs.append((a, t))
                continue
            if NG.search(t):
                continue
            if WANT.search(t) or re.search(r"hoikuryo|hoikuryou|riyousha|futan", a, re.I):
                queue.insert(0, a)
            elif re.search(r"hoiku|kosodate|kodomo", a, re.I) and len(queue) < MAX_PAGES:
                queue.append(a)
    if not best:
        return {"slug": slug, "name": name, "found": False, "docs": docs[:5]}
    # 見つけたページに載っている保育料の資料も一緒に返す
    page_docs = []
    h, _, _ = get(best[1])
    if h:
        for a, t in links_of(h, best[1]):
            if a.lower().endswith((".pdf", ".xlsx", ".xls")) and (
                re.search(r"保育料|利用者負担|徴収基準|階層", t)
                or re.search(r"hoikuryo|hoikuryou|futan|kaisou", a, re.I)
            ):
                page_docs.append(a)
    return {
        "slug": slug,
        "name": name,
        "found": True,
        "url": best[1],
        "text": best[2],
        "docs": docs[:5],
        "pageDocs": page_docs[:6],
    }


def main():
    rows = []
    for line in io.open(sys.argv[1], encoding="utf-8"):
        p = line.rstrip("\n").split("\t")
        if len(p) >= 3:
            rows.append(p[:3])
    lo = int(sys.argv[3]) if len(sys.argv) > 3 else 0
    hi = int(sys.argv[4]) if len(sys.argv) > 4 else len(rows)
    rows = rows[lo:hi]
    print(f"対象 {len(rows)}件", flush=True)
    out = []
    with cf.ThreadPoolExecutor(max_workers=6) as ex:
        for i, r in enumerate(ex.map(hunt, rows)):
            if r["found"]:
                print(f"  [{i}] {r['name']} {r['url']}", flush=True)
            out.append(r)
    io.open(sys.argv[2], "w", encoding="utf-8", newline="\n").write(
        "\n".join(json.dumps(x, ensure_ascii=False) for x in out) + "\n"
    )
    print(f"見つかった {sum(1 for x in out if x['found'])}/{len(out)}件 → {sys.argv[2]}")


if __name__ == "__main__":
    main()
