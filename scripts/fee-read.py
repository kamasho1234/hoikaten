# 保育料表のPDF・ページから、記事に書ける事実だけを読む。
#
#   0〜2歳児（3号認定）の保育料の**いちばん高い階層の月額**
#
# これが分かれば「うちの市はいくらまで上がるのか」が言える。
# 読み違えると金額の誤りをそのまま公開してしまうので、
# **確からしいと言い切れるものだけ**を返し、迷ったら何も返さない。
#
# 確からしさの見方
#   1. 「保育料」と「階層」の両方が資料にある
#   2. 金額が3,000〜200,000円の範囲に10個以上ある（階層表になっている）
#   3. いちばん高い金額が2番目に高い金額の2倍を超えない
#      （所得割額や年収の数字を金額と取り違えると、けた違いに大きくなる）
#   4. 上限額が15,000〜120,000円に収まる（国の上限104,000円あたりが目安）
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

# 金額ではない数（所得割額・年収・電話番号・年度）を混ぜないための線引き
MIN_FEE = 3000
MAX_FEE = 200000
LIMIT_LO = 15000
LIMIT_HI = 120000
# 国が定める階層の区切り（所得割額）。保育料の額と紛らわしいので除く
TAX_THRESHOLDS = {48600, 57700, 77101, 97000, 115000, 169000, 301000, 397000}


def get(url, limit=8_000_000, timeout=40):
    try:
        r = urllib.request.urlopen(
            urllib.request.Request(url, headers=UA), timeout=timeout, context=CTX
        )
        return r.read(limit)
    except Exception:
        return None


def pdf_tables(body):
    """PDFの表を取り出す。所得割額の列と金額の列を分けて見たいので、表のまま使う"""
    import pdfplumber

    tmp = os.path.join(
        os.environ.get("TEMP", "."), "feet_%d.pdf" % (abs(hash(body[:200])) % 10**9)
    )
    with open(tmp, "wb") as f:
        f.write(body)
    try:
        with pdfplumber.open(tmp) as pdf:
            out = []
            for page in pdf.pages[:8]:
                out += page.extract_tables() or []
            return out
    except Exception:
        return []
    finally:
        try:
            os.remove(tmp)
        except OSError:
            pass


def limit_from_tables(tables):
    """
    階層表の**金額の列**だけを見て上限額を出す。

    「市町村民税所得割課税額が355,000円未満」のような**条件の列**に
    大きな数が入っているので、本文をまとめて見ると所得割額を保育料と
    取り違える。列ごとに見て、金額しか入っていない列だけを使う。
    """
    best = None
    for t in tables:
        if not t or len(t) < 8:
            continue
        flat = "".join("".join(str(c or "") for c in r) for r in t)
        flat = re.sub(r"[\s　]+", "", flat)
        # 「国基準（参考）」の列を並べている自治体がある（松江市・青森市）。
        # いちばん大きい額を取ると、市の保育料ではなく国の基準額を拾ってしまう。
        # 見分けが付かないので、この形の表はまるごと使わない
        if re.search(r"国基準|国の基準|国が定める基準額|国上限|国の上限|国の徴収基準", flat):
            continue
        head = "".join(str(c or "") for c in t[0])
        if not re.search(r"保育料|利用者負担|標準時間|短時間", head + str(t[:2])):
            continue
        cols = max(len(r) for r in t)
        for c in range(cols):
            vals = []
            bad = 0
            for r in t[1:]:
                if c >= len(r):
                    continue
                cellv = str(r[c] or "")
                if re.search(r"[^0-9,()（）\s／/\-0]", cellv):
                    bad += 1
                    continue
                for x in re.findall(r"(?<![0-9])([0-9]{1,3}(?:,[0-9]{3})+|[0-9]{4,6})(?![0-9])", cellv):
                    n = int(x.replace(",", ""))
                    if MIN_FEE <= n <= MAX_FEE:
                        vals.append(n)
            # 条件の文が混ざる列は使わない
            if bad > len(t) * 0.3 or len(vals) < 8:
                continue
            top = max(vals)
            # 所得割額の区切りとしてよく出る数は、保育料ではない
            if top in TAX_THRESHOLDS:
                continue
            if LIMIT_LO <= top <= LIMIT_HI and (best is None or top > best):
                best = top
    return best


def pdf_text(body):
    import pdfplumber

    tmp = os.path.join(os.environ.get("TEMP", "."), "fee_%d.pdf" % (abs(hash(body[:200])) % 10**9))
    with open(tmp, "wb") as f:
        f.write(body)
    try:
        with pdfplumber.open(tmp) as pdf:
            return "\n".join((p.extract_text() or "") for p in pdf.pages[:8])
    except Exception:
        return ""
    finally:
        try:
            os.remove(tmp)
        except OSError:
            pass


def html_tables(body):
    """HTMLの表を、PDFと同じ「行×列」の形にして返す"""
    import html as H

    text = None
    for enc in ("utf-8", "cp932", "euc_jp"):
        try:
            text = body.decode(enc)
            break
        except UnicodeDecodeError:
            continue
    if text is None:
        text = body.decode("utf-8", "replace")
    out = []
    for tb in re.findall(r"(?s)<table.*?</table>", text, re.I):
        grid = []
        for tr in re.findall(r"(?s)<tr.*?</tr>", tb, re.I):
            cells = [
                H.unescape(re.sub(r"<[^>]+>", "", c)).strip()
                for c in re.findall(r"(?s)<t[hd].*?</t[hd]>", tr, re.I)
            ]
            if cells:
                grid.append(cells)
        if len(grid) >= 8:
            out.append(grid)
    return out


def read_limit(text):
    """階層表から、0〜2歳の保育料の上限額を読む。読み切れなければ None"""
    if "保育料" not in text and "利用者負担額" not in text:
        return None, "保育料の語が無い"
    if "階層" not in text:
        return None, "階層の語が無い"
    # 「3歳以上」だけの表は対象外（0〜2歳の表を見たい）
    if not re.search(r"[0０]\s*歳|3号|３号|3歳未満|３歳未満|未満児", text):
        return None, "0〜2歳の区分が無い"
    nums = [
        int(x.replace(",", ""))
        for x in re.findall(r"(?<![0-9])([0-9]{1,3}(?:,[0-9]{3})+)(?![0-9])", text)
    ]
    fees = sorted({n for n in nums if MIN_FEE <= n <= MAX_FEE}, reverse=True)
    if len(fees) < 10:
        return None, f"金額が{len(fees)}個しか無い"
    top, second = fees[0], fees[1]
    if top > second * 2:
        return None, f"いちばん高い額({top})が2番目({second})の2倍を超える"
    if not (LIMIT_LO <= top <= LIMIT_HI):
        return None, f"上限額が範囲外({top})"
    return top, ""


# 多子軽減の書き方は自治体ごとに違う。**公式の文をそのまま切り出す**だけにして、
# こちらで言い換えない（言い換えると条件が落ちて誤りになる）
TASHI = re.compile(
    r"[^。]{0,60}?第[２2]子[^。]{0,120}?(?:半額|無料|無償|軽減)[^。]{0,120}?。"
    r"|[^。]{0,60}?第[３3]子[^。]{0,120}?(?:無料|無償|半額|軽減)[^。]{0,120}?。"
)


def read_tashi(text):
    """多子軽減について、公式の文を1つ切り出す。無ければ None"""
    t = re.sub(r"[\s　]+", "", text)
    m = TASHI.search(t)
    if not m:
        return None
    s = m.group(0).strip("。 ") + "。"
    # 長すぎる・短すぎるものは使わない
    if not (12 <= len(s) <= 160):
        return None
    return s


def main():
    src, dst = sys.argv[1], sys.argv[2]
    out = []
    for line in io.open(src, encoding="utf-8"):
        d = json.loads(line)
        cands = []
        if d.get("found"):
            cands.append(("page", d["url"], d.get("text", "")))
        for a, t in d.get("docs") or []:
            if re.search(r"保育料|利用者負担", t) and a.lower().endswith(".pdf"):
                cands.append(("pdf", a, None))
        best = None
        # **表の列からしか読まない。**
        # 本文をまとめて見ると「77,101円未満の世帯」のような
        # 所得割額の区切りを保育料と取り違える（東大和市・狛江市で実際に起きた）
        for kind, url, _text in cands:
            body = get(url)
            if not body:
                continue
            tabs = pdf_tables(body) if body[:4] == b"%PDF" else html_tables(body)
            limit = limit_from_tables(tabs)
            if limit:
                best = {"kind": kind, "url": url, "limit": limit}
                break
        rec = {"slug": d["slug"], "name": d["name"]}
        rec.update(best or {"limit": None})
        # 多子軽減は、保育料のページ本文から公式の文を切り出す
        rec["tashi"] = read_tashi(d.get("text") or "") if d.get("found") else None
        rec["pageUrl"] = d.get("url")
        out.append(rec)
        mark = f"上限 {best['limit']:,}円" if best else "読めず"
        print(f"{d['name']:10} {mark}", flush=True)
    io.open(dst, "w", encoding="utf-8", newline="\n").write(
        "\n".join(json.dumps(x, ensure_ascii=False) for x in out) + "\n"
    )
    ok = sum(1 for x in out if x.get("limit"))
    print(f"読めた {ok}/{len(out)}件 → {dst}")


if __name__ == "__main__":
    main()
