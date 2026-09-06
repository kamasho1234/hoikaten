# 保育料表を「画像」で出している自治体を洗い出す。
#
# 2通りある。
#   1. ページに <img> で表を貼っている
#   2. PDFだが中身が画像で、文字を持っていない（紙をスキャンしたもの）
#
# どちらも機械では読めないので、拡大して目で読む対象として書き出す。
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

IMG = re.compile(r"\.(jpe?g|png|gif|webp)(\?|$)", re.I)
WANT = re.compile(r"保育料|利用者負担|徴収基準|階層|負担額")
WANT_NAME = re.compile(r"hoikuryo|hoikuryou|futan|kaisou|choushuu|chousyu", re.I)


def get(url, timeout=30, limit=6_000_000):
    try:
        r = urllib.request.urlopen(
            urllib.request.Request(url, headers=UA), timeout=timeout, context=CTX
        )
        return r.read(limit)
    except Exception:
        return None


def as_text(raw):
    for enc in ("utf-8", "cp932", "euc_jp"):
        try:
            return raw.decode(enc)
        except UnicodeDecodeError:
            continue
    return raw.decode("utf-8", "replace")


def pdf_has_text(raw):
    import pdfplumber

    tmp = os.path.join(os.environ.get("TEMP", "."), "img_%d.pdf" % (abs(hash(raw[:200])) % 10**9))
    with open(tmp, "wb") as f:
        f.write(raw)
    try:
        with pdfplumber.open(tmp) as pdf:
            t = "".join((p.extract_text() or "") for p in pdf.pages[:4])
        return len(re.sub(r"\s+", "", t)) > 120
    except Exception:
        return True  # 開けないものは判断しない（対象にしない）
    finally:
        try:
            os.remove(tmp)
        except OSError:
            pass


def check(d):
    if not d.get("found"):
        return None
    raw = get(d["url"])
    if not raw:
        return None
    out = {"slug": d["slug"], "name": d["name"], "page": d["url"], "images": [], "scans": []}
    text = as_text(raw)
    # 1. ページに貼られた表の画像
    for m in re.finditer(r'<img[^>]+src="([^"]+)"([^>]*)>', text, re.I):
        src = m.group(1)
        alt = m.group(2)
        try:
            a = urllib.parse.urljoin(d["url"], src)
        except ValueError:
            continue
        if not IMG.search(a):
            continue
        if WANT.search(html.unescape(alt)) or WANT_NAME.search(a):
            out["images"].append(a)
    # 2. 文字を持たないPDF
    for a in (d.get("pageDocs") or []) + [x[0] for x in (d.get("docs") or [])]:
        if not a.lower().endswith(".pdf"):
            continue
        body = get(a)
        if not body or body[:4] != b"%PDF":
            continue
        if not pdf_has_text(body):
            out["scans"].append(a)
    if not out["images"] and not out["scans"]:
        return None
    return out


def main():
    src, dst = sys.argv[1], sys.argv[2]
    rows = [json.loads(l) for l in io.open(src, encoding="utf-8") if l.strip()]
    if len(sys.argv) > 4:
        rows = rows[int(sys.argv[3]) : int(sys.argv[4])]
    print(f"対象 {len(rows)}件", flush=True)
    out = []
    with cf.ThreadPoolExecutor(max_workers=6) as ex:
        for r in ex.map(check, rows):
            if r:
                out.append(r)
                print(
                    f"  {r['name']} 画像{len(r['images'])}件 スキャンPDF{len(r['scans'])}件",
                    flush=True,
                )
    io.open(dst, "w", encoding="utf-8", newline="\n").write(
        "\n".join(json.dumps(x, ensure_ascii=False) for x in out) + "\n"
    )
    print(f"画像で出している {len(out)}件 → {dst}")


if __name__ == "__main__":
    main()
