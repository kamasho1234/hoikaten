# 自治体ごとの「事実レコード」（公式ページの原文 quote 付き JSON）を、載せた公式URLから取り直して確かめる。
# 種類（kind）ごとに records の場所と検査項目が違う。
#
#   python scripts/verify-fact-records.py shurou            就労証明書 全件
#   python scripts/verify-fact-records.py ichiji chuo koto  一時保育 自治体を指定
#
# 見るもの
#   1. 形が正しいか（必須キー・列挙値・配列であるべきフィールド・evidence の対象キーが実在するか）
#   2. 主ページ・sources・evidence の URL が開けるか
#   3. 主ページの本文に自治体名とキーワード（就労証明／一時預かり）が出るか（同名自治体・別ページの取り違え防止）
#   4. evidence の quote が、その URL の本文（PDF・Word・Excel は抽出テキスト）にそのまま出てくるか
#      （空白・全角半角・改行の違いは無視する）。ページ名・ファイル名の quote は弾く
#   5. 値のあるフィールドに evidence が付いているか
#   6. 同じ文が2つ以上の自治体に出ていないか（手本の値を流用した典型。全件を見るときだけ）
# 結果は tasks/<kind>/verify-result.tsv
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
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36"}
CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

KINDS = {
    "shurou": {
        "records": "src/lib/articles/shurou-shoumeisho/records",
        "out": "tasks/shurou-shoumeisho/verify-result.tsv",
        "required": ("citySlug", "checkedAt", "formType", "formPage", "seal", "notes", "evidence", "sources"),
        "enums": {"formType": ("standard", "standard-plus", "original"), "seal": ("required", "not-required", "unknown")},
        # 値があれば evidence が要るフィールド（配列は要素ごと）
        "value_fields": ["validity", "deadline", "submitTo", "online", "siblings", "selfEmployedDocs", "differences", "notes"],
        "list_fields": ("selfEmployedDocs", "differences", "notes", "formFiles", "sources"),
        "str_fields": ("validity", "deadline", "submitTo", "online", "siblings", "sealNote"),
        # evidence のキーとして許すもの（value_fields 以外）
        "extra_evidence": ["seal", "formType", "formPage"],
        "main_page": "formPage",
        "link_fields": ("formPage",),
        "files_field": "formFiles",
        "keyword": r"就労.{0,6}証明",
        "keyword_label": "就労証明",
        "dup_fields": ("notes", "selfEmployedDocs", "differences"),
        # quote がファイル名でも許すキー（様式の判定はファイル名が根拠になりうる）
        "filename_ok": ("formType",),
    },
    "ichiji": {
        "records": "src/lib/articles/ichiji-hoiku/records",
        "out": "tasks/ichiji-hoiku/verify-result.tsv",
        "required": ("citySlug", "checkedAt", "azukariPage", "notes", "evidence", "sources"),
        "enums": {},
        "value_fields": [
            "azukariReasons", "azukariRefresh", "azukariLimit", "azukariAges", "azukariFees", "azukariReduction",
            "azukariRegistration", "azukariBooking", "azukariFacilities",
            "daredemoHours", "daredemoFee", "daredemoAges", "daredemoApply", "daredemoFacilities", "daredemoStatus",
            "otherServices", "notes",
        ],
        "list_fields": ("azukariFees", "otherServices", "notes", "sources"),
        "str_fields": (
            "azukariReasons", "azukariRefresh", "azukariLimit", "azukariAges", "azukariReduction", "azukariRegistration",
            "azukariBooking", "azukariFacilities", "daredemoHours", "daredemoFee", "daredemoAges", "daredemoApply",
            "daredemoFacilities", "daredemoStatus",
        ),
        "extra_evidence": ["azukariPage", "daredemoPage"],
        "main_page": "azukariPage",
        "link_fields": ("azukariPage", "daredemoPage"),
        "files_field": None,
        "keyword": r"一時(預かり|預り|保育)",
        "keyword_label": "一時預かり／一時保育",
        "dup_fields": ("notes", "azukariFees", "otherServices"),
        "filename_ok": (),
    },
    "hokatsu": {
        "records": "src/lib/articles/hokatsu-schedule/records",
        "out": "tasks/hokatsu-schedule/verify-result.tsv",
        "required": ("citySlug", "checkedAt", "page", "fiscalYear", "notes", "evidence", "sources"),
        "enums": {"fiscalYear": ("R9", "R8")},
        "value_fields": [
            "guideRelease", "firstApply", "applyMethods", "firstResult", "secondApply", "secondResult",
            "midYearDeadline", "documents", "interview", "ikukyu", "notes",
        ],
        "list_fields": ("documents", "notes", "sources"),
        "str_fields": (
            "guideRelease", "firstApply", "applyMethods", "firstResult", "secondApply", "secondResult",
            "midYearDeadline", "interview", "ikukyu",
        ),
        "extra_evidence": ["page", "fiscalYear"],
        "main_page": "page",
        "link_fields": ("page",),
        "files_field": None,
        "keyword": r"(入園|入所|利用)(の)?(申込|申請|案内)",
        "keyword_label": "入園申込",
        "dup_fields": ("notes", "documents"),
        "filename_ok": (),
    },
}

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


def kind_checks(r, k, problems):
    """種類ごとの追加検査"""
    if k == "shurou":
        if r["formType"] != "standard" and not r.get("differences"):
            problems.append("standard 以外なら differences（国の標準様式との違い）が要る")
        if r["seal"] != "unknown" and "seal" not in r["evidence"]:
            problems.append("seal に evidence が無い")
        if "formType" not in r["evidence"]:
            problems.append("formType に evidence が無い（様式ページの文言を引く）")
    if k == "hokatsu":
        if "fiscalYear" not in r["evidence"]:
            problems.append("fiscalYear に evidence が無い（「令和9年4月入園」などの文言を引く）")
        if not r.get("firstApply"):
            problems.append("firstApply（一次申込の受付期間）が無い。案内ページに無いなら R8 の実績を fiscalYear R8 で書く")
        for f in ("firstApply", "firstResult", "secondApply", "guideRelease"):
            v = r.get(f)
            if v and not re.search(r"\d+\s*月", v):
                problems.append(f"{f} に月日が無い: {v[:30]}")
        # 日付は quote に入っているものしか書けない（年度の取り違え・推測の日付を防ぐ）
        for f in ("guideRelease", "firstApply", "applyMethods", "firstResult", "secondApply", "secondResult", "midYearDeadline", "interview", "ikukyu"):
            v = r.get(f)
            e = r["evidence"].get(f)
            if not v or not e:
                continue
            q = norm(e["quote"])
            for d in re.findall(r"\d{1,2}月\d{1,2}日", norm(v)):
                mm, dd = d.split("月")
                # 「10月1日～同月30日」のように月を省いた書き方も通す
                if d not in q and not (f"{mm}月" in q and dd in q):
                    problems.append(f"{f} の日付 {d} が quote に無い")
                    break
    if k == "ichiji":
        if r.get("daredemoPage") and not any(x.startswith("daredemo") and x != "daredemoPage" for x in r):
            problems.append("daredemoPage があるのに誰でも通園の値が1つも無い")


def check(path, k):
    K = KINDS[k]
    slug = os.path.basename(path)[:-5]
    problems = []
    try:
        r = json.load(io.open(path, encoding="utf-8"))
    except Exception as e:
        return slug, [f"JSON を読めない: {e}"]
    for key in K["required"]:
        if key not in r:
            problems.append(f"必須キー {key} が無い")
    if problems:
        return slug, problems
    if r["citySlug"] != slug:
        problems.append(f"citySlug が {r['citySlug']}（ファイル名は {slug}）")
    for f, allowed in K["enums"].items():
        if r[f] not in allowed:
            problems.append(f"{f} が不正: {r[f]}")
    if not re.match(r"^\d{4}-\d{2}-\d{2}$", r["checkedAt"]):
        problems.append(f"checkedAt が不正: {r['checkedAt']}")
    if not r["sources"]:
        problems.append("sources が空")

    ev = r["evidence"]
    # 配列であるべきフィールドに文字列が入ると、1文字ずつの要素になって壊れる（伊勢崎で発生）
    for f in K["list_fields"]:
        v = r.get(f)
        if v is not None and (not isinstance(v, list) or any(isinstance(x, str) and len(x) < 4 for x in v)):
            problems.append(f"{f} は文字列の配列でなければならない（1要素が短すぎる／配列でない）")
    for f in K["str_fields"]:
        if f in r and not isinstance(r[f], str):
            problems.append(f"{f} は文字列でなければならない")
    # 5. 値のあるフィールドに根拠が付いているか
    for f in K["value_fields"]:
        v = r.get(f)
        if not v:
            continue
        if isinstance(v, list):
            for i in range(len(v)):
                if f"{f}.{i}" not in ev and f not in ev:
                    problems.append(f"{f}.{i} に evidence が無い")
        elif f not in ev:
            problems.append(f"{f} に evidence が無い")
    kind_checks(r, k, problems)
    # evidence のキーが実在するフィールドか
    for key in ev:
        base = key.split(".")[0]
        if base not in K["value_fields"] + K["extra_evidence"]:
            problems.append(f"evidence のキー {key} は対象外")
        elif "." in key:
            i = int(key.split(".")[1])
            lst = r.get(base) or []
            if i >= len(lst):
                problems.append(f"evidence のキー {key} の要素が無い")

    # 2〜4. URL と原文
    name = city_name(slug)
    urls = {s["url"] for s in r["sources"]} | {e["url"] for e in ev.values()}
    for lf in K["link_fields"]:
        if r.get(lf):
            urls.add(r[lf]["url"])
    if K["files_field"]:
        urls |= {f["url"] for f in r.get(K["files_field"], [])}
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
    fp = r[K["main_page"]]["url"]
    if fp in texts:
        if name and norm(name) not in texts[fp]:
            problems.append(f"主ページに自治体名「{name}」が出ない: {fp}")
        if not re.search(K["keyword"], texts[fp]):
            problems.append(f"主ページに「{K['keyword_label']}」が出ない: {fp}")
    for key, e in ev.items():
        u, q = e["url"], e["quote"]
        if u not in texts:
            continue
        if len(q) < 6:
            problems.append(f"evidence {key} の quote が短すぎる: {q}")
        elif norm(q) not in texts[u]:
            problems.append(f"evidence {key} の quote が本文に無い: {q[:40]}")
        elif u in titles and norm(q) in titles[u]:
            # ページ名は何の根拠にもならない（値と対応しない quote の典型）
            problems.append(f"evidence {key} の quote がページ名: {q[:40]}")
        elif key not in K["filename_ok"] and re.search(r"(PDF|ＰＤＦ|Excel|エクセル|xlsx?|KB|ＫＢ|kbyte)", q, re.I) and len(norm(q)) < 40:
            # 「就労証明書（PDF形式、137KB）」のようなファイル名は根拠にならない
            problems.append(f"evidence {key} の quote がファイル名: {q[:40]}")
    return slug, problems


def main():
    if len(sys.argv) < 2 or sys.argv[1] not in KINDS:
        print("使い方: python scripts/verify-fact-records.py <" + "|".join(KINDS) + "> [slug ...]")
        sys.exit(2)
    k = sys.argv[1]
    K = KINDS[k]
    rec = os.path.join(ROOT, K["records"])
    out = os.path.join(ROOT, K["out"])
    only = set(sys.argv[2:])
    paths = sorted(glob.glob(os.path.join(rec, "*.json")))
    if only:
        paths = [p for p in paths if os.path.basename(p)[:-5] in only]
    with cf.ThreadPoolExecutor(6) as ex:
        results = list(ex.map(lambda p: check(p, k), paths))
    # 6. 同じ文が複数の自治体に出ていないか（手本の値を流用した典型。全件を見るときだけ）
    if not only:
        seen: dict[str, list[str]] = {}
        for p in paths:
            r = json.load(io.open(p, encoding="utf-8"))
            for f in K["dup_fields"]:
                for v in r.get(f) or []:
                    # 「ファミリー・サポート・センター」のような事業名だけの短い値は、同じでも流用ではない
                    if len(norm(v)) < 20:
                        continue
                    seen.setdefault(norm(v), []).append(os.path.basename(p)[:-5])
        dup = {key: v for key, v in seen.items() if len(v) >= 2}
        results = [
            (slug, problems + [f"同じ文が他の自治体にもある（{', '.join(x for x in slugs if x != slug)}）: {key[:30]}"
                               for key, slugs in dup.items() if slug in slugs])
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
    os.makedirs(os.path.dirname(out), exist_ok=True)
    io.open(out, "w", encoding="utf-8").write("\n".join(lines) + "\n")
    print("\n".join(lines))
    print(f"\n{len(results)}件中、指摘あり {bad}件 → {out}")
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
