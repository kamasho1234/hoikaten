# クローラーが挙げた候補を、実際に開いて「取り込めるか」で仕分ける。
#
# 仕分けの軸は3つだけ。
#   1. 施設名の行が並ぶ表があるか（HTMLの表／PDFの表）
#   2. 0歳〜5歳の列があるか
#   3. 空き数（数字）か空き記号（○△×）が入っているか
# この3つが揃わないものは、当サイトの形（施設×年齢）に落とせないので捨てる。
#
# 使い方: python triage.py <jsonl...> > 結果
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

# 保育の空き状況ではないもの
NG = re.compile(
    r"空き家|空き店舗|空き地|空き巣|空き缶|空き工場|公共施設|貸館|会議室|体育|グラウンド|"
    r"公園|公民館|駐車場|住宅|寄附|ふるさと|求人|職員募集|採用|入札|プロポーザル|"
    r"学童|放課後|一時預かり|病児|老人|高齢者|介護|障害者|墓|斎場|狂犬病|"
    r"利用調整基準|調整基準表|点数表|基準額表|申込書|しおり|入園のご案内|募集要項|"
    r"待機児童数|アンケート|視察|苦情|農地|教科用図書|欠員募集|オフィス|物件"
)
AGES = re.compile(r"[0０]\s*歳.{0,80}?[1１]\s*歳.{0,80}?[2２]\s*歳")
NAME = re.compile(r"(保育園|保育所|こども園|幼稚園|保育室|ナーサリー|学園|愛児園)")
MARK = re.compile(r"[○◯〇△▲×✕✖◎●]")
# 古い資料をふるい落とす（今年度より前の年しか無いもの）
OLD = re.compile(r"令和[1-7]年度?[^0-9]|平成\d+年|H\d{2}")


def get(url, limit=3_000_000, timeout=40):
    try:
        r = urllib.request.urlopen(
            urllib.request.Request(url, headers=UA), timeout=timeout, context=CTX
        )
        ct = (r.headers.get("Content-Type") or "").lower()
        body = r.read(limit)
        return ct, body
    except Exception:
        return None, None


def html_score(text):
    """HTMLの表を見て、施設×年齢の表があるかを数える"""
    best = None
    for t in re.findall(r"<table[\s\S]{0,300000}?</table>", text, re.I):
        flat = re.sub(r"[\s　]+", "", re.sub(r"<[^>]+>", " ", html.unescape(t)))
        if not AGES.search(flat):
            continue
        names = len(NAME.findall(flat))
        marks = len(MARK.findall(flat))
        digits = len(re.findall(r"<t[dh][^>]*>\s*[0-9０-９]{1,2}\s*</t[dh]>", t, re.I))
        if names < 3:
            continue
        got = (names, marks, digits)
        if best is None or sum(got) > sum(best):
            best = got
    return best


def pdf_score(path):
    try:
        import pdfplumber

        with pdfplumber.open(path) as pdf:
            texts = []
            best = None
            for page in pdf.pages[:6]:
                texts.append(page.extract_text() or "")
                for t in page.extract_tables() or []:
                    flat = "".join("".join(str(c or "") for c in row) for row in t)
                    flat = re.sub(r"[\s　]+", "", flat)
                    if not AGES.search(flat):
                        continue
                    names = len(NAME.findall(flat))
                    marks = len(MARK.findall(flat))
                    digits = len(re.findall(r"(?<![0-9])[0-9]{1,2}(?![0-9])", flat))
                    if names < 3:
                        continue
                    got = (names, marks, digits)
                    if best is None or sum(got) > sum(best):
                        best = got
            return best, "\n".join(texts)
    except Exception:
        return None, ""


def xlsx_score(path):
    """Excelで空き状況を出す自治体がある。シートを表とみなして同じ見方で数える"""
    try:
        import openpyxl

        wb = openpyxl.load_workbook(path, data_only=True)
        best = None
        texts = []
        for ws in wb.worksheets[:6]:
            rows = []
            for row in ws.iter_rows(max_row=200, max_col=40, values_only=True):
                rows.append(["" if c is None else str(c) for c in row])
            flat = re.sub(r"[\s　]+", "", "".join("".join(r) for r in rows))
            texts.append(flat[:4000])
            if not AGES.search(flat):
                continue
            names = len(NAME.findall(flat))
            marks = len(MARK.findall(flat))
            digits = len(re.findall(r"(?<![0-9])[0-9]{1,2}(?![0-9])", flat))
            if names < 3:
                continue
            got = (names, marks, digits)
            if best is None or sum(got) > sum(best):
                best = got
        return best, "\n".join(texts)
    except Exception:
        return None, ""


def as_of_of(text):
    m = re.search(
        r"(令和\s*[0-9０-９]{1,2}\s*年\s*[0-9０-９]{1,2}\s*月\s*[0-9０-９]{1,2}\s*日"
        r"|[0-9]{4}\s*年\s*[0-9]{1,2}\s*月\s*[0-9]{1,2}\s*日)",
        text,
    )
    return m.group(1).replace(" ", "") if m else ""


def check(item):
    place, url, label = item
    if NG.search(label):
        return None
    ct, body = get(url)
    if not body:
        return None
    if "sheet" in (ct or "") or url.lower().endswith((".xlsx", ".xls")):
        tmp = os.path.join(
            os.environ.get("TEMP", "."), "triage_%d.xlsx" % (abs(hash(url)) % 10**9)
        )
        with open(tmp, "wb") as f:
            f.write(body)
        score, text = xlsx_score(tmp)
        try:
            os.remove(tmp)
        except OSError:
            pass
        kind = "XLSX"
    elif "pdf" in (ct or "") or url.lower().endswith(".pdf"):
        tmp = os.path.join(
            os.environ.get("TEMP", "."), "triage_%d.pdf" % (abs(hash(url)) % 10**9)
        )
        with open(tmp, "wb") as f:
            f.write(body)
        score, text = pdf_score(tmp)
        try:
            os.remove(tmp)
        except OSError:
            pass
        kind = "PDF"
    else:
        text = body.decode("utf-8", "replace")
        score = html_score(text)
        text = re.sub(r"<[^>]+>", " ", text)
        kind = "HTML"
    if not score:
        return None
    names, marks, digits = score
    if marks < 5 and digits < 8:
        return None
    return (place, kind, names, marks, digits, as_of_of(text), label[:44], url)


def main():
    items = []
    seen = set()
    for path in sys.argv[1:]:
        if not os.path.exists(path):
            continue
        for line in io.open(path, encoding="utf-8"):
            d = json.loads(line)
            for c in d["candidates"]:
                key = (d["place"], c["url"])
                if key in seen:
                    continue
                seen.add(key)
                items.append((d["place"], c["url"], c["text"]))
    print(f"候補 {len(items)}件", flush=True)
    hit = 0
    with cf.ThreadPoolExecutor(max_workers=8) as ex:
        for r in ex.map(check, items):
            if r:
                hit += 1
                print(
                    f"{r[0]:14} {r[1]} 名{r[2]:3} 記号{r[3]:3} 数字{r[4]:4} {r[5]:14} {r[6]} | {r[7]}",
                    flush=True,
                )
    print(f"取り込めそう {hit}件")


if __name__ == "__main__":
    main()
