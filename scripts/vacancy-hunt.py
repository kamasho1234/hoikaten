"""
まだ取り込んでいない自治体が空き状況を公表していないか探す。

実行:
    python scripts/vacancy-hunt.py <自治体のtsv> <出力jsonl> [開始] [終了]
    python scripts/vacancy-triage.py <出力jsonl>     ← 見つけた候補を仕分ける

tsv は「都道府県<TAB>自治体名<TAB>人口<TAB>ホスト名」の4列。
`tasks/vacancy-unreachable.tsv` は3列なので、人口の列を足してから渡すこと。

## 見つけ方（取りこぼしを減らすために重ねている）
1. robots.txt の Sitemap: 行と、決まった名前のサイトマップ
2. サイトマップに載っている保育・子育てのページを、たどり始める場所にする
3. トップから幅優先でたどる。保育・子育てらしいリンクを先に開く
4. リンクの文字（「空き状況」など）と、資料の名前（r8.8aki.pdf など）の両方で当てる
5. ページの中に「施設名の行 × 0歳〜5歳の列」の表があるかも見る
6. 別ドメインの子育てサイト（えにわっこなび、つぼみねっと）も同じ自治体とみなす

## 発見率
取り込み済みの自治体60件を無作為に選んで試したところ 57/60（95%）だった。

## 使いどころ
`tasks/vacancy-unreachable.tsv` の自治体は、開発機の回線からは
どうやっても繋がらない（curl も Python も Chrome も届かない）。
**別の回線（携帯のテザリングなど）からこの道具を回すと確かめられる。**
"""

import io
import json
import re
import ssl
import sys
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor

sys.stdout.reconfigure(encoding="utf-8")

UA = {"User-Agent": "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)"}
CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

# リンクの文字が空き状況らしい
HIT = re.compile(
    r"空き状況|空き情報|あき状況|あき情報|空き人数|空き枠|受入枠|受入可能|受け入れ可能"
    r"|入所可能|入園可能|利用可能人数|欠員|受入状況|受入児童数|入所状況|入園状況"
    r"|定員と募集|募集人数|募集予定|空き"
    # ページの題に「空き」が入らない自治体がある。
    # 水戸市「申込み状況」、三木市「利用調整状況」、京田辺市「入所（転所）調整結果」
    r"|申込み?状況|申込状況|利用調整|調整結果|選考結果|受付状況|待機児童"
    # 常陸太田市「R8.10受入見込」、佐野市「令和9年度佐野市保育施設募集予想一覧表」
    r"|受入見込|受け入れ見込|募集予想|募集見込|受入予定|受け入れ予定"
)
NG_TEXT = re.compile(
    r"空き家|空き店舗|空き地|公共施設|求人|職員募集|採用|入札|放課後|学童|病児|一時預かり"
    r"|議会|ごみ|墓|駐車場|住宅|サークル|老人|介護|貸館|体育館|会議室"
)
# URLが保育・子育てらしい（リンクの文字で絞らず、URLで優先度を決める）
WANT_URL = re.compile(
    # 英語の語（childcare・parenting・nursery）を使う自治体がある。
    # 南相馬市は /portal/childcare/… で、これが無いとトップから先へ進めなかった
    r"hoiku|kosodate|kodomo|jido|youchien|yochien|nyusho|nyuusho|nyuen|nyuuen|hoikuen"
    r"|aki|ukeire|childcare|parenting|nursery|kosodate-site|kyoiku",
    re.I,
)
# 資料のURLのファイル名だけが手がかりになることがある。
# 五所川原市はリンクの文字が「令和8年8月分」だけで、PDFの名前が r8.8aki.pdf だった
HIT_FILE = re.compile(
    # 八尾市は r8bosyuuninnzuu.pdf（募集人数）、佐野市は R9-Yosou-1.pdf（予想）。
    # リンクの文字では当たらないので、資料の名前を手掛かりにする
    r"(^|[^a-z])(aki|akijoukyou|akijokyo|kuki|kuuki|ukeire|ukeirekanou|akiwaku"
    r"|bosyu|bosyuu|boshu|boshuu|yotei|yosou|yosoo|nyusho|nyuusho|nyusyo|nyuusyo"
    r"|jokyo|joukyou|jyokyo|ketuin|kesson)"
    r"|空き|受入可能|受け入れ|募集人数|欠員|受入見込|受け入れ見込|募集予想|募集見込"
    r"|受入予定|受け入れ予定|入所可能|入園可能",
    re.I,
)
# Excelで空き状況を出す自治体があるので xls/xlsx は弾かない
NG_URL = re.compile(r"\.(jpg|jpeg|png|gif|zip|doc|docx|ppt|pptx|mp4)$|/en/|/english|/ch/|/ko/", re.I)

AGES = re.compile(r"[0０]\s*歳.{0,60}?[1１]\s*歳.{0,60}?[2２]\s*歳")
NAME = re.compile(r"(保育園|保育所|こども園|幼稚園|保育室|ナーサリー)")
MARK = re.compile(r"[○◯〇△▲×✕◎●]")

MAX_PAGES = 500  # 1自治体あたりに開くページ数の上限


def get(url, limit=900_000, timeout=15):
    try:
        r = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=timeout, context=CTX)
        ct = (r.headers.get("Content-Type") or "").lower()
        body = r.read(limit)
        if "xml" in ct or url.endswith(".xml"):
            return body.decode("utf-8", "replace")
        if "html" not in ct:
            return None
        return body.decode("utf-8", "replace")
    except Exception:
        return None


def looks_like_vacancy(html):
    """ページの中に、年齢の列を持つ施設の表があるか"""
    for t in re.findall(r"<table[\s\S]{0,150000}?</table>", html, re.I):
        flat = re.sub(r"[\s　]+", "", re.sub(r"<[^>]+>", " ", t))
        if not AGES.search(flat):
            continue
        names = len(NAME.findall(flat))
        marks = len(MARK.findall(flat))
        digits = len(re.findall(r"<td[^>]*>\s*\d{1,2}\s*</td>", t, re.I))
        if names >= 2 and (marks >= 4 or digits >= 4):
            return f"表 施設名{names} 記号{marks} 数字{digits}"
    return None


def links_of(html, base):
    out = []
    for m in re.finditer(r'<a[^>]+href="([^"#][^"]*)"[^>]*>([\s\S]{0,220}?)</a>', html, re.I):
        text = re.sub(r"[\s　]+", "", re.sub(r"<[^>]+>", "", m.group(2)))
        try:
            url = urllib.parse.urljoin(base, m.group(1))
        except ValueError:
            continue
        if NG_URL.search(url):
            continue
        out.append((url, text))
    return out


def sitemap_candidates(host):
    urls = []
    for name in sitemap_names(host):
        body = get(name if name.startswith("http") else f"https://{host}/{name}")
        if not body or "<loc" not in body:
            continue
        found = re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", body)
        subs = [u for u in found if u.endswith(".xml")]
        urls += [u for u in found if not u.endswith(".xml")]
        for sub in subs[:20]:
            b2 = get(sub)
            if b2:
                urls += [u for u in re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", b2) if not u.endswith(".xml")]
        if urls:
            break
    keep = []
    for u in urls:
        dec = urllib.parse.unquote(u)
        if NG_URL.search(u):
            continue
        if re.search(r"aki|ukeire|kuuki|nyusho|nyuusho|nyuen|nyuuen", dec, re.I) and re.search(
            r"hoiku|kosodate|kodomo|jido", dec, re.I
        ):
            keep.append(u)
    return keep[:40]


def sitemap_names(host):
    """
    サイトマップの置き場所は決まった名前とは限らない。
    robots.txt の Sitemap: 行に書いてある自治体がある
    （白山市 /sitemapxml.xml、大野城市 /dynamic/sitemap.ashx）ので、そこも見る
    """
    names = ["sitemap.xml", "sitemap_index.xml", "wp-sitemap.xml", "sitemap/sitemap.xml"]
    body = get(f"https://{host}/robots.txt")
    if body:
        for u in re.findall(r"(?im)^\s*sitemap:\s*(\S+)", body):
            if u not in names:
                names.append(u)
    return names[:8]


def sitemap_seeds(host):
    """
    サイトマップに載っている保育・子育てのページを、たどり始める場所として返す。

    トップから順にたどると、空き状況のページが5階層目にあって上限に当たることがある
    （渋川市の /kosodate-site/kosodate/000437/000443/000445/…）。
    サイトマップから直に開けば、その depth の問題がなくなる。
    ここでは中身を見ずに**開く場所**だけ集め、判定はふだんの流れに任せる
    """
    urls = []
    for name in sitemap_names(host):
        body = get(name if name.startswith("http") else f"https://{host}/{name}")
        if not body or "<loc" not in body:
            continue
        found = re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", body)
        subs = [u for u in found if u.endswith(".xml")]
        urls += [u for u in found if not u.endswith(".xml")]
        for sub in subs[:20]:
            b2 = get(sub)
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
        if NG_URL.search(u):
            continue
        if WANT_URL.search(urllib.parse.unquote(u)):
            keep.append(u)
    return keep[:200]


def resolve_host(host):
    """
    そのままでは繋がらないホストがある（www が抜けている、または余分に付いている）。
    www の有無を入れ替えて繋がるほうを使う。
    ここを補わないと、その自治体は一度も探索できないまま「公表なし」と数えてしまう
    """
    for h in (host, host[4:] if host.startswith("www.") else "www." + host):
        if get(f"https://{h}/") or get(f"http://{h}/"):
            return h
    return host


def hunt(item):
    pref, city, host = item
    host = resolve_host(host)
    hosts = {host}
    found = []

    def record(url, why):
        if url not in [f["url"] for f in found]:
            found.append({"url": url, "text": why})

    # 1. サイトマップから当てる
    for u in sitemap_candidates(host):
        h = get(u)
        if not h:
            continue
        why = looks_like_vacancy(h)
        if why:
            record(u, "サイトマップ: " + why)
            if len(found) >= 3:
                return {"place": pref + city, "host": host, "candidates": found}

    # 2. 幅優先でたどる
    top = get(f"https://{host}/") or get(f"http://{host}/")
    if not top:
        return {"place": pref + city, "host": host, "candidates": found} if found else None

    # トップから出ていく「子育て」系の別ドメインも同じ自治体とみなす
    for url, text in links_of(top, f"https://{host}/"):
        netloc = urllib.parse.urlparse(url).netloc
        if netloc and netloc != host and re.search(r"子育て|こそだて|保育|こども", text):
            hosts.add(netloc)

    seen = set()
    # 保育・子育てらしいURLを先に開く。
    # 幅優先のまま並べると、자治体トップの数百本のリンクを先に開いてしまい、
    # 3階層目にある空き状況のページに届く前に上限に当たる（南相馬市など）
    queue = [(0, f"https://{host}/", top)]
    opened = 0
    # サイトマップに載っている保育・子育てのページを、先に開く場所として積む
    for seed in sitemap_seeds(host):
        if seed in seen or opened >= MAX_PAGES:
            continue
        seen.add(seed)
        h = get(seed)
        opened += 1
        if not h:
            continue
        why = looks_like_vacancy(h)
        if why:
            record(seed, "サイトマップの中身: " + why)
            if len(found) >= 4:
                return {"place": pref + city, "host": host, "candidates": found}
        queue.append((-1, seed, h))
    while queue and opened < MAX_PAGES:
        queue.sort(key=lambda x: x[0])
        _, base, html = queue.pop(0)
        for url, text in links_of(html, base):
            netloc = urllib.parse.urlparse(url).netloc
            # 別ドメインの子育てサイトは、トップにだけ載っているとは限らない。
            # 「子育て」のページから外に出ることもあるので、途中のページでも拾う
            #（恵庭市のえにわっこなび、城陽市のJOYO KIDS のような外部サイト）
            if (
                netloc
                and netloc not in hosts
                and len(hosts) < 4
                and re.search(r"子育て|こそだて|保育|こども|キッズ", text)
                and not re.search(
                    r"pref\.|go\.jp|\.co\.jp|facebook|twitter|line\.me|youtube|instagram",
                    netloc + url,
                )
            ):
                hosts.add(netloc)
            if netloc not in hosts or url in seen:
                continue
            if NG_TEXT.search(text):
                continue
            # リンクの文字で当たったら、その場で候補にする
            if HIT.search(text):
                record(url, "リンクの文字: " + text[:60])
                found[-1]["via"] = base
                if len(found) >= 4:
                    return {"place": pref + city, "host": host, "candidates": found}
            # 文字では当たらないが、資料の名前が空き状況らしいとき
            elif re.search(r"\.(pdf|xlsx?)$", url, re.I) and HIT_FILE.search(
                urllib.parse.unquote(urllib.parse.urlparse(url).path.rsplit("/", 1)[-1])
            ):
                record(url, "資料の名前: " + url.rsplit("/", 1)[-1][:50] + " / 文字: " + text[:40])
                found[-1]["via"] = base
                if len(found) >= 4:
                    return {"place": pref + city, "host": host, "candidates": found}
            # URLが保育・子育てらしいものを優先して開く。
            # そうでないURLも、リンクの文字が保育まわりなら開く
            #（藤沢市は /hoiku/kenko/kosodate/... と導線に「健康」が挟まる）
            # リンクの文字が空でも、URLが保育・子育てらしければ開く。
            # 画像だけのリンクで文字が無い自治体がある（南相馬市のトップは
            # 35本のリンクのうち大半が文字なし）
            if not WANT_URL.search(urllib.parse.unquote(url)) and not re.search(
                r"保育|こども園|幼稚園|子育て|入所|入園|児童", text
            ):
                continue
            seen.add(url)
            h = get(url)
            opened += 1
            if not h:
                continue
            why = looks_like_vacancy(h)
            if why:
                record(url, "中身: " + why)
                if len(found) >= 4:
                    return {"place": pref + city, "host": host, "candidates": found}
            if opened < MAX_PAGES:
                # 保育のページほど先に開く
                # 空き状況にたどり着けるかは、どの順で開くかで決まる。
                # 「保育」「入所」と書かれたリンクを、URLの見た目より先に開く
                if re.search(r"保育|こども園|入所|入園|空き|受入", text):
                    score = -1
                elif re.search(r"hoiku|kosodate|kodomo|nyusho|nyuen", urllib.parse.unquote(url), re.I):
                    score = 0
                else:
                    score = 1
                queue.append((score, url, h))
            if opened >= MAX_PAGES:
                break

    return {"place": pref + city, "host": host, "candidates": found} if found else None


def main():
    src, dst = sys.argv[1], sys.argv[2]
    lo = int(sys.argv[3]) if len(sys.argv) > 3 else 0
    hi = int(sys.argv[4]) if len(sys.argv) > 4 else 10**9
    rows = []
    for line in io.open(src, encoding="utf-8"):
        p = line.rstrip().split("\t")
        if len(p) >= 4 and p[3]:
            try:
                pop = int(p[2] or 0)
            except ValueError:
                pop = 0
            rows.append((pop, p[0], p[1], p[3]))
    rows.sort(reverse=True)
    rows = [(r[1], r[2], r[3]) for r in rows][lo:hi]
    print(f"対象 {len(rows)}件", flush=True)

    out = []
    with ThreadPoolExecutor(max_workers=8) as ex:
        for i, r in enumerate(ex.map(hunt, rows)):
            if r and r["candidates"]:
                out.append(r)
                print(f"  [{i}] {r['place']} {r['candidates'][0]['text'][:50]}", flush=True)
    io.open(dst, "w", encoding="utf-8").write(
        "\n".join(json.dumps(x, ensure_ascii=False) for x in out)
    )
    print(f"見つかった自治体 {len(out)}件 → {dst}")


if __name__ == "__main__":
    main()
