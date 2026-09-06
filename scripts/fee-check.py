# 読み取った上限額が本当にその自治体の保育料か、資料の文字と突き合わせて確かめる。
#
# 確かめ方は2つ。
#   1. 読み取った額が、資料の本文にそのままの表記で出てくるか
#      （「59,700」が資料に無ければ、表の読み違え）
#   2. その額の近くに「保育料」「標準時間」など保育料らしい語があるか
#      （所得割額の区切りを拾っていないか）
#
# どちらかを満たさないものは落とす。落とした自治体の記事は作らない。
import io
import json
import os
import re
import ssl
import sys
import urllib.request

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

UA = {"User-Agent": "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)"}
CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

NEAR = re.compile(r"保育料|利用者負担|標準時間|短時間|階層")
# 額のすぐ近くに出たら、保育料ではなく税額・年収の話をしている
BAD_NEAR = re.compile(r"所得割|均等割|課税額|年収|市民税|町民税|村民税|国基準")


def get(url, limit=8_000_000, timeout=40):
    try:
        r = urllib.request.urlopen(
            urllib.request.Request(url, headers=UA), timeout=timeout, context=CTX
        )
        return r.read(limit)
    except Exception:
        return None


def to_text(body):
    if body[:4] == b"%PDF":
        import pdfplumber

        tmp = os.path.join(
            os.environ.get("TEMP", "."), "chk_%d.pdf" % (abs(hash(body[:200])) % 10**9)
        )
        with open(tmp, "wb") as f:
            f.write(body)
        try:
            with pdfplumber.open(tmp) as pdf:
                return "\n".join((p.extract_text() or "") for p in pdf.pages[:10])
        except Exception:
            return ""
        finally:
            try:
                os.remove(tmp)
            except OSError:
                pass
    import html as H

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


def main():
    src, dst = sys.argv[1], sys.argv[2]
    keep, drop = [], []
    for line in io.open(src, encoding="utf-8"):
        d = json.loads(line)
        if not d.get("limit"):
            continue
        body = get(d["url"])
        if not body:
            drop.append((d["name"], "資料を取れない"))
            continue
        text = to_text(body)
        flat = re.sub(r"[\s　]+", "", text)
        n = d["limit"]
        # 「59,700」と「59700」の両方の書き方を探す
        forms = [f"{n:,}", str(n)]
        pos = -1
        for f in forms:
            pos = flat.find(f)
            if pos >= 0:
                break
        if pos < 0:
            drop.append((d["name"], f"{n:,}円が資料に見当たらない"))
            continue
        # 保育料の表では、額のすぐ前に「所得割課税額が◯◯円以上」という条件が来る。
        # 「近くに税の語がある」で落とすと本物まで落ちるので、
        # **その数のすぐ後ろが「円未満」「円以上」かどうか**だけを見る。
        # 階層の区切り（税額）は必ず「未満」「以上」が続く
        good = False
        for f in forms:
            start = 0
            while True:
                i = flat.find(f, start)
                if i < 0:
                    break
                after = flat[i + len(f) : i + len(f) + 4]
                if not re.match(r"^(円?(未満|以上|超))", after):
                    good = True
                    break
                start = i + 1
            if good:
                break
        if not good:
            drop.append((d["name"], f"{n:,}円が階層の区切り（税額）にしか出てこない"))
            continue
        if not NEAR.search(flat[:4000]):
            drop.append((d["name"], "保育料の資料に見えない"))
            continue
        keep.append(d)
        print(f"○ {d['name']:12} {n:>7,}円", flush=True)
    for name, why in drop:
        print(f"× {name:12} {why}", flush=True)
    io.open(dst, "w", encoding="utf-8", newline="\n").write(
        "\n".join(json.dumps(x, ensure_ascii=False) for x in keep) + "\n"
    )
    print(f"確かめられた {len(keep)}件 / 落とした {len(drop)}件 → {dst}")


if __name__ == "__main__":
    main()
