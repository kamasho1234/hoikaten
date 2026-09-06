# 機械で読めなかった自治体の保育料資料を、目で読める形に書き出す。
# 表の行のうち、金額が入っている行だけを残して短くする。
import io, json, os, re, ssl, sys, urllib.request
import concurrent.futures as cf
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
UA={"User-Agent":"Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)"}
CTX=ssl.create_default_context(); CTX.check_hostname=False; CTX.verify_mode=ssl.CERT_NONE
WANT=re.compile(r"保育料|利用者負担|徴収基準|階層|負担額")
WANTN=re.compile(r"hoikuryo|hoikuryou|futan|kaisou|choushuu|chousyu",re.I)

def get(u,limit=12_000_000,timeout=45):
    try:
        return urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=timeout,context=CTX).read(limit)
    except Exception: return None

def pdf_rows(body):
    import pdfplumber
    tmp=os.path.join(os.environ.get("TEMP","."),"d_%d.pdf"%(abs(hash(body[:200]))%10**9))
    open(tmp,"wb").write(body)
    try:
        rows=[]
        with pdfplumber.open(tmp) as pdf:
            for p in pdf.pages[:4]:
                for t in (p.extract_tables() or []):
                    for r in t: rows.append([re.sub(r"\s+","",str(c or "")) for c in r])
                if not rows:
                    rows += [[l] for l in (p.extract_text() or "").split("\n")]
        return rows
    except Exception: return []
    finally:
        try: os.remove(tmp)
        except OSError: pass

def html_rows(body):
    import html as H
    t=None
    for enc in ("utf-8","cp932","euc_jp"):
        try: t=body.decode(enc); break
        except UnicodeDecodeError: pass
    if t is None: t=body.decode("utf-8","replace")
    rows=[]
    for tb in re.findall(r"(?s)<table.*?</table>",t,re.I):
        for tr in re.findall(r"(?s)<tr.*?</tr>",tb,re.I):
            cs=[re.sub(r"[\s　]+","",H.unescape(re.sub(r"<[^>]+>","",c))) for c in re.findall(r"(?s)<t[hd].*?</t[hd]>",tr,re.I)]
            if cs: rows.append(cs)
    return rows

def cands(d):
    out=[]
    for a in (d.get("pageDocs") or []): out.append(a)
    for a,t in (d.get("docs") or []):
        if a.lower().endswith((".pdf",".xlsx",".xls")) and (WANT.search(t) or WANTN.search(a)): out.append(a)
    out.append(d["url"])
    return list(dict.fromkeys(out))[:4]

def one(d):
    buf=[f"=== {d['name']} ({d['slug']})"]
    for u in cands(d):
        b=get(u)
        if not b: continue
        rows = pdf_rows(b) if b[:4]==b"%PDF" else (html_rows(b) if not u.lower().endswith((".xlsx",".xls")) else [])
        keep=[r for r in rows if re.search(r"[0-9]{1,3},[0-9]{3}|[0-9]{4,6}",  "".join(r))]
        if len(keep)<6: continue
        buf.append(f"--- {u}")
        for r in keep[:40]:
            line=" | ".join(x for x in r if x)[:220]
            if line: buf.append(line)
        break
    return "\n".join(buf) if len(buf)>1 else f"=== {d['name']} ({d['slug']})\n(資料から表を取れず)"

def main():
    rows=[json.loads(l) for l in io.open(sys.argv[1],encoding="utf-8") if l.strip()]
    a,b=int(sys.argv[2]),int(sys.argv[3])
    rows=rows[a:b]
    with cf.ThreadPoolExecutor(max_workers=6) as ex:
        for s in ex.map(one,rows): print(s+"\n",flush=True)

main()
