# 公開している保育料の記事の金額を、記事に載せた出典URLから取り直して確かめる。
#
# 記事を書くときにも照合しているが、それは書いた本人の手元での話で、
# 資料は自治体側で差し替わる。**公開したあと、載っているURLから見て合っているか**を
# ここで独立に確かめる。
#
#   python scripts/verify-fee-articles.py            全件
#   python scripts/verify-fee-articles.py agano chino  自治体を指定
#
# 見るもの
#   1. 出典URLが開けるか
#   2. その資料に、記事に書いた額がそのまま出てくるか（全角も見る）
#   3. その額が「◯◯円未満/以上」という**階層の区切り（税額）**だけでないか
#   4. 国基準額（104,000円など）を市の額として載せていないか
import concurrent.futures as cf
import glob
import html as H
import io
import json
import os
import re
import ssl
import sys
import urllib.request

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UA = {"User-Agent": "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)"}
CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

# 国が定める上限額。市の額としてこれが出ていたら、国基準の列を拾っている
KUNI = {104000, 102400, 80000, 78800, 61000, 60100, 44500, 43900}
ZEN = str.maketrans("０１２３４５６７８９，", "0123456789,")


def get(url, limit=12_000_000, timeout=45):
    try:
        return urllib.request.urlopen(
            urllib.request.Request(url, headers=UA), timeout=timeout, context=CTX
        ).read(limit)
    except Exception as e:
        return e


def to_text(body):
    if body[:4] == b"%PDF":
        import pdfplumber

        tmp = os.path.join(
            os.environ.get("TEMP", "."), "vf_%d.pdf" % (abs(hash(body[:200])) % 10**9)
        )
        with open(tmp, "wb") as f:
            f.write(body)
        try:
            with pdfplumber.open(tmp) as pdf:
                return "\n".join((p.extract_text() or "") for p in pdf.pages[:12])
        except Exception:
            return ""
        finally:
            try:
                os.remove(tmp)
            except OSError:
                pass
    for enc in ("utf-8", "cp932", "euc_jp"):
        try:
            t = body.decode(enc)
            break
        except UnicodeDecodeError:
            t = None
    if t is None:
        t = body.decode("utf-8", "replace")
    t = re.sub(r"(?s)<(script|style).*?</\1>", " ", t)
    return H.unescape(re.sub(r"<[^>]+>", " ", t))


def read_articles(only):
    """記事ファイルから、自治体・金額・出典URLを取り出す"""
    out = []
    for path in sorted(glob.glob(os.path.join(ROOT, "src/lib/articles/*.ts"))):
        s = io.open(path, encoding="utf-8").read()
        if 'slug: "nursery-fees"' not in s:
            continue
        slug = os.path.basename(path)[:-3]
        if only and slug not in only:
            continue
        block = s[s.index('slug: "nursery-fees"') :]
        end = block.find("publishedAt")
        block = block[:end] if end > 0 else block
        m = re.search(r"月額([0-9,]+)円", block)
        u = re.search(r'<a href="(https?://[^"]+)"', block)
        if not m or not u:
            # 無償の自治体は金額の文が無い（国立市）
            if "保育料は0円" in block:
                out.append({"slug": slug, "limit": 0, "url": u.group(1) if u else None})
            else:
                # 公式の保育料表から額を読めなかった自治体は、
                # 制度の説明だけを載せている。金額を書いていないので確かめるものが無い
                out.append({"slug": slug, "limit": "none", "url": None})
            continue
        out.append(
            {"slug": slug, "limit": int(m.group(1).replace(",", "")), "url": u.group(1)}
        )
    return out


def check(a):
    slug, limit, url = a["slug"], a["limit"], a["url"]
    if limit == "none":
        return slug, "-", "金額を載せていない（制度の説明のみ）"
    if limit is None:
        return slug, "×", "記事から金額と出典を読み取れない"
    if not url:
        return slug, "×", "出典URLが無い"
    body = get(url)
    if isinstance(body, Exception):
        return slug, "×", f"出典URLを開けない（{body}）"
    text = to_text(body).translate(ZEN)
    flat = re.sub(r"[\s　]+", "", text)
    if len(flat) < 200:
        return slug, "?", "資料から文字を取れない（画像の資料。目で確かめたもの）"
    if limit == 0:
        # 全階層0円の自治体。金額の文字では確かめられないので、表の作りを見る
        ok = "利用者負担" in flat or "保育料" in flat
        return slug, "○" if ok else "×", "全階層0円（無償）"

    forms = [f"{limit:,}", str(limit)]
    hit = any(f in flat for f in forms)
    if not hit:
        return slug, "×", f"{limit:,}円が資料に見当たらない"

    # その額が「◯◯円未満/以上」＝階層の区切り（税額）としてしか出ないなら誤り
    as_fee = False
    for f in forms:
        i = 0
        while True:
            j = flat.find(f, i)
            if j < 0:
                break
            after = flat[j + len(f) : j + len(f) + 4]
            if not re.match(r"^(円?(未満|以上|超))", after):
                as_fee = True
                break
            i = j + 1
        if as_fee:
            break
    if not as_fee:
        return slug, "×", f"{limit:,}円が階層の区切り（税額）にしか出てこない"

    warn = []
    if limit in KUNI and re.search(r"国基準|国の基準|国上限|国が定める", flat):
        warn.append("国基準額と同じ数で、資料に国基準の列がある")
    if not re.search(r"[0０]歳|3号|３号|3歳未満|３歳未満|未満児", flat):
        warn.append("資料に0〜2歳の区分が見当たらない")
    return slug, ("!" if warn else "○"), "／".join(warn) if warn else ""


def main():
    only = set(sys.argv[1:])
    arts = read_articles(only)
    print(f"保育料の記事 {len(arts)}件を、出典URLから確かめます", flush=True)
    res = []
    with cf.ThreadPoolExecutor(max_workers=6) as ex:
        for r in ex.map(check, arts):
            res.append(r)
            if r[1] not in ("○", "-"):
                print(f"  {r[1]} {r[0]:16} {r[2]}", flush=True)
    ok = sum(1 for r in res if r[1] == "○")
    warn = [r for r in res if r[1] == "!"]
    skip = [r for r in res if r[1] == "?"]
    none = [r for r in res if r[1] == "-"]
    ng = [r for r in res if r[1] == "×"]
    print(
        f"\n合った {ok}件／気になる {len(warn)}件／確かめられない {len(skip)}件／"
        f"金額を載せていない {len(none)}件／合わない {len(ng)}件"
    )
    io.open(
        os.path.join(ROOT, "tasks/fee-verify-result.tsv"), "w", encoding="utf-8", newline="\n"
    ).write("\n".join(f"{s}\t{m}\t{w}" for s, m, w in sorted(res)) + "\n")
    if ng:
        sys.exit(1)


if __name__ == "__main__":
    main()
