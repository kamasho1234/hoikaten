# 自治体ごとの就労証明書レコード（src/lib/articles/shurou-shoumeisho/records/*.json）を、
# 載せた公式URLから取り直して確かめる。
#
#   python scripts/verify-shurou-records.py            全件
#   python scripts/verify-shurou-records.py chuo osaka  自治体を指定
#
# 見るもの
#   1. 形が正しいか（必須キー・seal/formType の値・evidence の対象キーが実在するか）
#   2. formPage・sources・evidence の URL が開けるか
#   3. formPage の本文に自治体名と「就労証明」（就労（予定）証明書 なども可）が出るか（同名自治体・別ページの取り違え防止）
#   4. evidence の quote が、その URL の本文（PDF は抽出テキスト）にそのまま出てくるか
#      （空白・全角半角・改行の違いは無視する）
#   5. 値のあるフィールド（validity/deadline/submitTo/online/siblings/seal/selfEmployedDocs/
#      differences/notes）に evidence が付いているか
# 結果は tasks/shurou-shoumeisho/verify-result.tsv
import concurrent.futures as cf
import glob
import html as H
import io
import json
import os
import re
import ssl
import subprocess
import sys
import time
import unicodedata
import urllib.error
import urllib.request

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REC = os.path.join(ROOT, "src/lib/articles/shurou-shoumeisho/records")
OUT = os.path.join(ROOT, "tasks/shurou-shoumeisho/verify-result.tsv")
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36"}
CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

VALUE_FIELDS = [
    "validity", "deadline", "submitTo", "online", "siblings",
    "selfEmployedDocs", "differences", "notes",
]

_cache: dict[str, object] = {}


def get(url, limit=15_000_000, timeout=45):
    if url in _cache:
        return _cache[url]
    try:
        r = urllib.request.urlopen(
            urllib.request.Request(url, headers=UA), timeout=timeout, context=CTX
        )
        body = r.read(limit)
    except Exception as e:
        body = e
        # 福岡市（kodomo.city.fukuoka.lg.jp）は urllib だけ 403 にする。curl なら通るので試す
        if isinstance(e, urllib.error.HTTPError) and e.code == 403:
            # 続けて叩くと curl でも 403 になることがあるので、間を置いて3回まで試す
            for i in range(3):
                try:
                    time.sleep(2 * i)
                    p = subprocess.run(
                        ["curl", "-sL", "-A", UA["User-Agent"], "--max-time", str(timeout), "-w", "\n%{http_code}", url],
                        capture_output=True, timeout=timeout + 5,
                    )
                    out, _, code = p.stdout.rpartition(b"\n")
                    if code.strip() == b"200":
                        body = out[:limit]
                        break
                except Exception:
                    pass
    _cache[url] = body
    return body


def to_text(body):
    if body[:4] == b"%PDF":
        # pypdf と pdfplumber で語順が変わるので、両方の抽出結果を合わせて照合する
        parts = []
        try:
            from pypdf import PdfReader

            reader = PdfReader(io.BytesIO(body))
            parts.append("\n".join((p.extract_text() or "") for p in reader.pages[:30]))
        except Exception:
            pass
        try:
            import pdfplumber

            with pdfplumber.open(io.BytesIO(body)) as pdf:
                parts.append("\n".join((p.extract_text() or "") for p in pdf.pages[:30]))
        except Exception:
            pass
        return "\n".join(parts)
    if body[:2] == b"PK":
        # Word / Excel の様式。XML からタグを外して文字だけ取る
        import zipfile

        try:
            z = zipfile.ZipFile(io.BytesIO(body))
            names = [n for n in z.namelist() if re.match(r"(word/document\.xml|xl/sharedStrings\.xml|xl/worksheets/sheet\d+\.xml)$", n)]
            parts = []
            for n in names:
                x = z.read(n).decode("utf-8", "replace")
                x = re.sub(r"<(w:p|row|c)\b", "\n<\\1", x)
                parts.append(H.unescape(re.sub(r"<[^>]+>", "", x)))
            return "\n".join(parts)
        except Exception:
            return ""
    t = None
    for enc in ("utf-8", "cp932", "euc_jp"):
        try:
            t = body.decode(enc)
            break
        except UnicodeDecodeError:
            pass
    if t is None:
        t = body.decode("utf-8", "replace")
    t = re.sub(r"(?s)<(script|style).*?</\1>", " ", t)
    return H.unescape(re.sub(r"<[^>]+>", " ", t))


def norm(s):
    s = unicodedata.normalize("NFKC", s)
    return re.sub(r"\s+", "", s)


def city_name(slug):
    p = os.path.join(ROOT, "src/lib/data", slug + ".ts")
    if not os.path.exists(p):
        return None
    m = re.search(r"name: '([^']+)'", io.open(p, encoding="utf-8").read())
    return m.group(1) if m else None


def check(path):
    slug = os.path.basename(path)[:-5]
    problems = []
    try:
        r = json.load(io.open(path, encoding="utf-8"))
    except Exception as e:
        return slug, [f"JSON を読めない: {e}"]
    for k in ("citySlug", "checkedAt", "formType", "formPage", "seal", "notes", "evidence", "sources"):
        if k not in r:
            problems.append(f"必須キー {k} が無い")
    if problems:
        return slug, problems
    if r["citySlug"] != slug:
        problems.append(f"citySlug が {r['citySlug']}（ファイル名は {slug}）")
    if r["formType"] not in ("standard", "standard-plus", "original"):
        problems.append(f"formType が不正: {r['formType']}")
    if r["seal"] not in ("required", "not-required", "unknown"):
        problems.append(f"seal が不正: {r['seal']}")
    if not re.match(r"^\d{4}-\d{2}-\d{2}$", r["checkedAt"]):
        problems.append(f"checkedAt が不正: {r['checkedAt']}")
    if not r["sources"]:
        problems.append("sources が空")
    if r["formType"] != "standard" and not r.get("differences"):
        problems.append("standard 以外なら differences（国の標準様式との違い）が要る")

    ev = r["evidence"]
    # 配列であるべきフィールドに文字列が入ると、1文字ずつの要素になって壊れる（伊勢崎で発生）
    for f in ("selfEmployedDocs", "differences", "notes", "formFiles", "sources"):
        v = r.get(f)
        if v is not None and (not isinstance(v, list) or any(isinstance(x, str) and len(x) < 4 for x in v)):
            problems.append(f"{f} は文字列の配列でなければならない（1要素が短すぎる／配列でない）")
    for f in ("validity", "deadline", "submitTo", "online", "siblings", "sealNote"):
        if f in r and not isinstance(r[f], str):
            problems.append(f"{f} は文字列でなければならない")
    # 5. 値のあるフィールドに根拠が付いているか
    for f in VALUE_FIELDS:
        v = r.get(f)
        if not v:
            continue
        if isinstance(v, list):
            for i in range(len(v)):
                if f"{f}.{i}" not in ev and f not in ev:
                    problems.append(f"{f}.{i} に evidence が無い")
        elif f not in ev:
            problems.append(f"{f} に evidence が無い")
    if r["seal"] != "unknown" and "seal" not in ev:
        problems.append("seal に evidence が無い")
    if "formType" not in ev:
        problems.append("formType に evidence が無い（様式ページの文言を引く）")
    # evidence のキーが実在するフィールドか
    for k in ev:
        base = k.split(".")[0]
        if base not in VALUE_FIELDS + ["seal", "formType", "formPage"]:
            problems.append(f"evidence のキー {k} は対象外")
        elif "." in k:
            i = int(k.split(".")[1])
            lst = r.get(base) or []
            if i >= len(lst):
                problems.append(f"evidence のキー {k} の要素が無い")

    # 2〜4. URL と原文
    name = city_name(slug)
    urls = {r["formPage"]["url"]} | {s["url"] for s in r["sources"]} | {e["url"] for e in ev.values()}
    urls |= {f["url"] for f in r.get("formFiles", [])}
    texts = {}
    titles = {}
    for u in sorted(urls):
        body = get(u)
        if isinstance(body, Exception):
            problems.append(f"開けない: {u}（{body}）")
            continue
        texts[u] = norm(to_text(body))
        if body[:4] != b"%PDF":
            m = re.search(rb"<title>(.*?)</title>", body, re.S | re.I)
            if m:
                titles[u] = norm(H.unescape(m.group(1).decode("utf-8", "replace")))
    fp = r["formPage"]["url"]
    if fp in texts:
        if name and norm(name) not in texts[fp]:
            problems.append(f"様式ページに自治体名「{name}」が出ない: {fp}")
        # 「就労（予定）証明書」「就労・内定証明書」のような表記も通す
        if not re.search(r"就労.{0,6}証明", texts[fp]):
            problems.append(f"様式ページに「就労証明」が出ない: {fp}")
    for k, e in ev.items():
        u, q = e["url"], e["quote"]
        if u not in texts:
            continue
        if len(q) < 6:
            problems.append(f"evidence {k} の quote が短すぎる: {q}")
        elif norm(q) not in texts[u]:
            problems.append(f"evidence {k} の quote が本文に無い: {q[:40]}")
        elif u in titles and norm(q) in titles[u]:
            # ページ名は何の根拠にもならない（値と対応しない quote の典型）
            problems.append(f"evidence {k} の quote がページ名: {q[:40]}")
        elif k != "formType" and re.search(r"(PDF|ＰＤＦ|Excel|エクセル|xlsx?|KB|ＫＢ|kbyte)", q, re.I) and len(norm(q)) < 40:
            # 「就労証明書（PDF形式、137KB）」のようなファイル名は formType 以外の根拠にならない
            problems.append(f"evidence {k} の quote がファイル名: {q[:40]}")
    return slug, problems


def main():
    only = set(sys.argv[1:])
    paths = sorted(glob.glob(os.path.join(REC, "*.json")))
    if only:
        paths = [p for p in paths if os.path.basename(p)[:-5] in only]
    with cf.ThreadPoolExecutor(6) as ex:
        results = list(ex.map(check, paths))
    # 6. 同じ文が複数の自治体に出ていないか（手本の値を流用した典型。全件を見るときだけ）
    if not only:
        seen: dict[str, list[str]] = {}
        for p in paths:
            r = json.load(io.open(p, encoding="utf-8"))
            for f in ("notes", "selfEmployedDocs", "differences"):
                for v in r.get(f) or []:
                    seen.setdefault(norm(v), []).append(os.path.basename(p)[:-5])
        dup = {k: v for k, v in seen.items() if len(v) >= 2}
        results = [
            (slug, problems + [f"同じ文が他の自治体にもある（{', '.join(x for x in slugs if x != slug)}）: {k[:30]}"
                               for k, slugs in dup.items() if slug in slugs])
            for slug, problems in results
        ]
    lines = ["slug\t判定\t指摘"]
    bad = 0
    for slug, problems in results:
        if problems:
            bad += 1
            for p in problems:
                lines.append(f"{slug}\t×\t{p}")
        else:
            lines.append(f"{slug}\t○\t")
    io.open(OUT, "w", encoding="utf-8").write("\n".join(lines) + "\n")
    print("\n".join(lines))
    print(f"\n{len(results)}件中、指摘あり {bad}件 → {OUT}")
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
