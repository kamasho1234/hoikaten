# 自治体の「保育料」のページ・資料を探し、記事に書ける事実だけを取り出す。
#
# 取り出すのは、記事に載せる3つだけ。
#   1. 0〜2歳児（3号認定）の保育料の**いちばん高い階層の月額**
#   2. 多子軽減（第2子・第3子の扱い）
#   3. 担当課の名前
# どれも自治体ごとに違うので、公式の資料に書いてある通りにしか書けない。
# 読み取れなかったものは出さない（推測で書かない）。
#
# 使い方: python fee_hunt.py <slug\tname\thost のtsv> <出力jsonl> [開始] [終了]
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
MAX_PAGES = 250


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


def hunt(row):
    slug, name, host = row
    seen = set()
    docs = []
    queue = [f"https://{host}/"]
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
    return {
        "slug": slug,
        "name": name,
        "found": True,
        "url": best[1],
        "text": best[2],
        "docs": docs[:5],
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
