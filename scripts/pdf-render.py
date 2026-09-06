# 資料(PDF)を画像にして、目で読めるようにする。
# 機械で読めない表（スキャン・段組が変わった表）を人が確かめるための道具。
import io, os, re, ssl, sys, urllib.request
import fitz
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
UA = {"User-Agent": "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)"}
CTX = ssl.create_default_context(); CTX.check_hostname=False; CTX.verify_mode=ssl.CERT_NONE

def get(url, limit=30_000_000, timeout=60):
    r = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=timeout, context=CTX)
    return r.read(limit)

def render(url, tag, pages=3, zoom=2.2, maxw=1600):
    body = get(url)
    if body[:4] != b"%PDF":
        print(f"{tag}: PDFではない"); return []
    doc = fitz.open(stream=body, filetype="pdf")
    out = []
    for i in range(min(pages, doc.page_count)):
        p = doc[i]
        z = zoom
        if p.rect.width * z > maxw:
            z = maxw / p.rect.width
        pix = p.get_pixmap(matrix=fitz.Matrix(z, z))
        f = os.path.abspath(f"{tag}_p{i+1}.png")
        pix.save(f)
        out.append(f)
        print(f"{f}  {pix.width}x{pix.height}")
    return out

if __name__ == "__main__":
    render(sys.argv[1], sys.argv[2], int(sys.argv[3]) if len(sys.argv)>3 else 3)
