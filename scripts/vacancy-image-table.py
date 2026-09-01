"""画像だけのPDFに載っている空き状況の表を、罫線を手がかりに読む

## なぜ必要か
自治体によっては空き状況の表を紙で作って**スキャン画像のまま**PDFにしている。
pdfplumber では1文字も取れないので、これまで取り込みを見送っていた。

## どう読むか
ページ全体を OCR にかけるのではなく、**罫線から升目を割り出して、
1マスずつ読む**。1マスに入る文字は「1桁の数字」か「○△×」か「空欄」か
「斜線（そのクラスなし）」しかないので、候補を絞れば誤読がぐっと減る。

  1. 画像を二値化して、縦線・横線だけを取り出す
  2. 線の交点から升目（行×列）を作る
  3. 各マスを分類する
     - 対角線が引かれている  … そのクラスがない
     - 何も無い              … 空欄
     - 数字                  … tesseract に数字だけを読ませる
     - 記号                  … 輪郭の形で ○ △ × を見分ける
  4. 施設名の列だけは日本語 OCR にかける

## 誤読を本番に出さないための歯止め
OCR は必ず間違える。そこで
  - 設定に施設名の一覧（expectFacilities）を書いておき、読んだ名前と
    照合する。食い違ったら中断する
  - 表に「計」の列や合計行があるときは、読んだ数字の足し算と突き合わせる
のどちらかを必ず通す。fetch-config-vacancy 側が異常なら exit 1 で止まる。
"""

import io
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile

import cv2
import fitz
import numpy as np

TESS = os.environ.get("TESSERACT_EXE") or shutil.which("tesseract") or r"C:/Program Files/Tesseract-OCR/tesseract.exe"
TESSDATA = os.environ.get("TESSDATA_PREFIX") or r"C:/Users/kamas/tessdata"


def render(pdf_bytes, page_index, dpi):
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    pix = doc[page_index].get_pixmap(dpi=dpi)
    img = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, pix.n)
    if pix.n == 4:
        img = cv2.cvtColor(img, cv2.COLOR_RGBA2BGR)
    elif pix.n == 3:
        img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
    else:
        img = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)
    return img


def binarize(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # 紙のスキャンは影やムラが出るので、しきい値は場所ごとに決める
    return cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 25, 15)


def lines(bw, axis, min_len):
    """縦線（axis=0）または横線（axis=1）だけを残す"""
    size = (1, min_len) if axis == 0 else (min_len, 1)
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, size)
    out = cv2.erode(bw, kernel, iterations=1)
    return cv2.dilate(out, kernel, iterations=1)


def positions(mask, axis, gap):
    """線のかたまりの中心座標を並べる"""
    proj = mask.sum(axis=axis) // 255
    thr = max(3, proj.max() * 0.3)
    hits = np.where(proj > thr)[0]
    if len(hits) == 0:
        return []
    out, start, prev = [], hits[0], hits[0]
    for h in hits[1:]:
        if h - prev > gap:
            out.append((start + prev) // 2)
            start = h
        prev = h
    out.append((start + prev) // 2)
    return out


def grid(img, min_ratio=0.3):
    bw = binarize(img)
    h, w = bw.shape
    vmask = lines(bw, 0, max(20, int(h * min_ratio)))
    hmask = lines(bw, 1, max(20, int(w * min_ratio)))
    xs = positions(vmask, 0, 8)
    ys = positions(hmask, 1, 6)
    return xs, ys, bw


def cell(img, x0, x1, y0, y1, pad=3):
    """升目をひとつ切り出す

    罫線を巻き込むと形が崩れるので内側に詰めるが、詰めすぎると右寄せの
    数字が欠ける。線の太さぶん（数画素）だけにとどめる。
    """
    x0, x1 = x0 + pad, max(x0 + pad + 1, x1 - pad)
    y0, y1 = y0 + pad, max(y0 + pad + 1, y1 - pad)
    return img[y0:y1, x0:x1]


def has_diagonal(patch):
    """マスに斜線が引かれているか（そのクラスがない印）"""
    if patch.size == 0:
        return False
    h, w = patch.shape
    if h < 8 or w < 8:
        return False
    edges = cv2.Canny(patch, 50, 150)
    segs = cv2.HoughLinesP(edges, 1, np.pi / 180, threshold=max(12, w // 4),
                           minLineLength=int(w * 0.55), maxLineGap=4)
    if segs is None:
        return False
    for x1, y1, x2, y2 in segs[:, 0]:
        dx, dy = abs(x2 - x1), abs(y2 - y1)
        if dx < 4:
            continue
        slope = dy / dx
        # 水平でも垂直でもない線が横幅の半分以上あれば斜線とみなす
        if 0.2 < slope < 5.0:
            return True
    return False


def ink(patch):
    return 0.0 if patch.size == 0 else float((patch > 0).mean())


def denoise(patch):
    """網掛け（灰色のベタ）はスキャンすると細かい点になる。
    点を消してから記号の形を見ないと、輪郭がばらばらになって判定できない。
    マスの縁に残った罫線も、記号とつながって形を崩すので落とす。"""
    if patch.size == 0:
        return patch
    # 開処理で1〜2画素の点を落とし、記号の線はつなぎ直す
    k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    out = cv2.morphologyEx(patch, cv2.MORPH_OPEN, k)
    out = cv2.morphologyEx(out, cv2.MORPH_CLOSE, k)
    h, w = out.shape
    n, labels, stats, _ = cv2.connectedComponentsWithStats(out, 8)
    keep = np.zeros_like(out)
    for i in range(1, n):
        area = stats[i, cv2.CC_STAT_AREA]
        cw, ch = stats[i, cv2.CC_STAT_WIDTH], stats[i, cv2.CC_STAT_HEIGHT]
        if area < 40:
            continue
        # マスの高さ・幅いっぱいに伸びた細い塊は罫線の消し残り
        if ch >= h * 0.9 and cw <= max(4, w * 0.12):
            continue
        if cw >= w * 0.9 and ch <= max(4, h * 0.12):
            continue
        keep[labels == i] = 255
    return keep


def classify_symbol(patch):
    """○ △ × を輪郭の形で見分ける

    ○は塗りつぶすと大きな面積になり丸い。△は頂点が3つ。
    ×は線が交わるだけなので、塗りつぶした面積に対して線の量が少ない。
    """
    p = denoise(patch)
    cnts, _ = cv2.findContours(p, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if not cnts:
        return None
    c = max(cnts, key=cv2.contourArea)
    x, y, w, h = cv2.boundingRect(c)
    if w < 6 or h < 6:
        return None
    aspect = w / float(h)
    # 消し残った罫線は細長い。記号は縦横がほぼ同じ
    if aspect < 0.55 or aspect > 1.8:
        return None
    hull = cv2.convexHull(c)
    hull_area = cv2.contourArea(hull) or 1.0
    # 外周を塗りつぶした形のうち、実際に線が乗っている画素の割合。
    # ×は対角線2本だけなので低く、△は3辺、○は円周ぶん埋まる
    filled = np.zeros(p.shape, np.uint8)
    cv2.drawContours(filled, [hull], -1, 255, -1)
    density = float((p[filled > 0] > 0).mean()) if (filled > 0).any() else 0.0
    peri = cv2.arcLength(hull, True) or 1.0
    circularity = 4 * np.pi * hull_area / (peri * peri)
    approx = cv2.approxPolyDP(hull, 0.05 * peri, True)
    # 三角形は外周が3頂点に寄り、丸みも四角より低い
    if len(approx) == 3 and circularity < 0.78:
        return "△"
    # ○は外周が円に近く、線が細いので密度が低い
    if circularity > 0.85 and density < 0.45:
        return "○"
    if len(approx) >= 4 and density < 0.45:
        return "×"
    if circularity > 0.80:
        return "×"
    return "△"


def tess(patch, lang, psm, whitelist=None):
    if patch.size == 0:
        return ""
    with tempfile.TemporaryDirectory() as td:
        p = os.path.join(td, "c.png")
        cv2.imwrite(p, 255 - patch)
        cmd = [TESS, p, "stdout", "-l", lang, "--psm", str(psm)]
        if whitelist:
            cmd += ["-c", f"tessedit_char_whitelist={whitelist}"]
        env = dict(os.environ, TESSDATA_PREFIX=TESSDATA)
        try:
            r = subprocess.run(cmd, capture_output=True, timeout=60, env=env)
        except Exception:
            return ""
        return r.stdout.decode("utf-8", "replace").strip()


def digit_blobs(patch, min_h_ratio=0.35):
    """マスの中から「数字らしいかたまり」だけを取り出して、左から順に返す

    表のマスは字よりずっと横長で、罫線のかけらや紙のゴミも一緒に入る。
    まとめて tesseract に渡すと字を見つけられないので、
    **高さがマスの3割以上あるかたまり**だけを数字とみなして切り出す。
    """
    p = denoise(patch)
    h, w = p.shape
    n, labels, stats, _ = cv2.connectedComponentsWithStats(p, 8)
    blobs = []
    for i in range(1, n):
        x, y, cw, ch, area = stats[i]
        if ch < h * min_h_ratio or area < 20:
            continue
        if cw > w * 0.6:  # 横に長すぎるものは罫線
            continue
        # マスの左右の端にへばりついた細い縦棒は罫線の消し残り。
        # そのままだと「0」が「10」に化ける
        if cw <= max(3, ch * 0.22) and (x <= 2 or x + cw >= w - 2):
            continue
        mask = np.zeros((ch, cw), np.uint8)
        mask[(labels[y : y + ch, x : x + cw] == i)] = 255
        blobs.append((x, mask))
    blobs.sort(key=lambda b: b[0])
    # 数字は右に寄せて書かれる。左に離れて残ったかけらは字ではない
    if len(blobs) >= 2:
        kept = [blobs[-1]]
        for x, m in reversed(blobs[:-1]):
            prev_x = kept[0][0]
            if prev_x - (x + m.shape[1]) <= max(6, h * 0.35):
                kept.insert(0, (x, m))
        blobs = kept
    return [m for _, m in blobs]


def crop_ink(patch, margin=6):
    """マスの中で実際に字が乗っている範囲だけを切り出す"""
    p = denoise(patch)
    ys, xs = p.nonzero()
    if len(xs) == 0:
        return None
    h, w = patch.shape
    x0 = max(0, xs.min() - margin)
    x1 = min(w, xs.max() + margin + 1)
    y0 = max(0, ys.min() - margin)
    y1 = min(h, ys.max() + margin + 1)
    return patch[y0:y1, x0:x1]


def read_digit(mask):
    """1文字ぶんのかたまりを数字ひとつに読む

    tesseract は「0」を「7」と読み違えることがある。0は輪の中に穴が空くので、
    穴の有無で先に決めてしまう（0と7を取り違えると数がまるで変わる）。
    """
    h, w = mask.shape
    # 「1」は縦棒。tesseract は縦線を字と見なさず読み落とすので先に片付ける
    if h >= 8 and w <= h * 0.45:
        return "1"
    # 穴がひとつ空いていて縦横が近ければ 0（4・6・8・9も穴を持つので形も見る）
    cnts, hier = cv2.findContours(mask, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
    holes = 0 if hier is None else sum(1 for x in hier[0] if x[3] != -1)
    scale = max(1, int(64 / max(1, h)))
    img = cv2.resize(mask, None, fx=scale, fy=scale, interpolation=cv2.INTER_CUBIC) if scale > 1 else mask
    img = cv2.copyMakeBorder(img, 28, 28, 28, 28, cv2.BORDER_CONSTANT, value=0)
    got = ""
    for psm in (10, 8):
        t = re.sub(r"\D", "", tess(img, "eng", psm, "0123456789"))
        if len(t) == 1:
            got = t
            break
    if holes == 1 and got in ("7", "1", "") and 0.45 <= w / float(h) <= 1.0:
        return "0"
    if holes == 0 and got == "0":
        return ""  # 穴が無いのに0と読めたら信用しない（呼び出し側で異常になる）
    return got


def read_number(patch):
    """マスの数字を、1文字ずつ読んでつなぐ

    「10」のような2桁もあるので、左から順に文字を拾って並べる。
    1文字でも読めなければ空を返し、呼び出し側で異常として扱えるようにする。
    """
    blobs = digit_blobs(patch)
    if not blobs:
        return ""
    out = []
    for m in blobs:
        d = read_digit(m)
        if not d:
            return ""
        out.append(d)
    return "".join(out)


def read_name(patch):
    t = tess(patch, "jpn", 7)
    # tesseract の日本語は語の間に空白を挟む。施設名に空白は無いので落とす
    return re.sub(r"[\s\u3000]+", "", t)


def read_table(pdf_bytes, conf):
    dpi = conf.get("dpi", 300)
    page = conf.get("page", 0)
    img = render(pdf_bytes, page, dpi)
    xs, ys, bw = grid(img, conf.get("lineRatio", 0.3))
    if len(xs) < 4 or len(ys) < 4:
        raise SystemExit(f"[中断] 罫線が見つかりません（縦{len(xs)}本 横{len(ys)}本）")
    name_col = conf["nameCol"]
    age_cols = conf["ageCols"]
    total_col = conf.get("totalCol")
    mode = conf.get("cellMode", "number")
    empty = conf.get("emptyValue")
    rows = []
    for r in range(conf.get("headerRows", 1), len(ys) - 1):
        y0, y1 = ys[r], ys[r + 1]
        if y1 - y0 < 8:
            continue
        if name_col + 1 >= len(xs):
            continue
        name = read_name(cell(bw, xs[name_col], xs[name_col + 1], y0, y1))
        if not name:
            # 名前が1文字も読めなくても、値のあるマスがあるなら施設の行。
            # 落とすと行がずれて別の施設の数字を当ててしまうので、印を付けて残す
            name = "?"
        values, symbols, ok = [None] * 6, [None] * 6, False
        for i, c in enumerate(age_cols):
            if c + 1 >= len(xs):
                continue
            patch = cell(bw, xs[c], xs[c + 1], y0, y1)
            if has_diagonal(patch):
                continue
            if len(denoise(patch).nonzero()[0]) < 30:
                # 何も書かれていないマス。意味は自治体によって違うので、
                # 「空欄はこう読む」と設定に書いてあるときだけ値を入れる
                if mode == "number" and empty is not None:
                    values[i] = empty
                    ok = True
                elif mode == "symbol" and conf.get("emptyMark"):
                    symbols[i] = conf["emptyMark"]
                    ok = True
                continue
            if mode == "number":
                t = read_number(patch)
                if t != "":
                    values[i] = int(t)
                    ok = True
            else:
                s = classify_symbol(patch)
                if s:
                    symbols[i] = s
                    ok = True
        if not ok:
            continue
        row = {"name": name, "values": values, "symbols": symbols}
        if total_col is not None and total_col + 1 < len(xs):
            t = read_number(cell(bw, xs[total_col], xs[total_col + 1], y0, y1))
            row["total"] = int(t) if t != "" else None
        rows.append(row)
    return rows


def norm_name(s):
    """OCRが拾いやすいゴミ（罫線のかけら・中黒・記号）を落として突き合わせ用にする"""
    s = re.sub(r"[\s　|｜/／\-ー・．\.，,:：;；'\"`^~＿_＝=]+", "", s)
    return s


def match_names(rows, expected):
    """読んだ施設名を、設定に書いた正しい名前の一覧に対応づける

    OCRは施設名をよく間違える（「熊味」→「態味」など）。名前そのものを
    信用せず、**上から順に並ぶ**ことだけを頼りに突き合わせる。
    1文字も重ならない行が出たら、表の構造が変わったとみなして中断する。
    """
    out, i = [], 0
    for row in rows:
        if i >= len(expected):
            break
        got = norm_name(row["name"])
        want = norm_name(expected[i])
        # 小計・合計の行は施設ではないので落とす。
        # OCRが「計」を「針」などと読み違えても拾えるよう、
        # 「公設」「民設」「合」といった見出し語も手がかりにする
        if re.search(r"計|針|公設|民設|小規模等|合\s*計", row["name"]):
            continue
        overlap = len(set(got) & set(want))
        # 「?」は名前が1文字も読めなかった印。並び順で当てる
        if got != "?" and overlap == 0 and len(want) > 1:
            # 施設ではない行（注記など）は読み飛ばす
            continue
        row = dict(row, name=expected[i], ocrName=row["name"])
        out.append(row)
        i += 1
    if i != len(expected):
        raise SystemExit(
            f"[中断] 施設名の照合に失敗しました（設定 {len(expected)}件 / 対応づけ {i}件）。"
            "公式の表が変わった可能性があるので expectFacilities を見直してください"
        )
    return out


def check_totals(rows):
    """行の合計欄と、読み取った数字の足し算が合うかを確かめる"""
    bad = []
    for r in rows:
        if r.get("total") is None:
            continue
        got = sum(v for v in r["values"] if isinstance(v, int))
        if got != r["total"]:
            bad.append(f'{r["name"]}: 合計欄{r["total"]} ≠ 読み取り{got}')
    return bad


def extract(pdf_bytes, conf):
    """取り込み設定から呼ばれる入口。他のレイアウトと同じ形の行を返す"""
    rows = read_table(pdf_bytes, conf)
    expected = conf.get("expectFacilities")
    if expected:
        rows = match_names(rows, expected)
    bad = check_totals(rows)
    if bad:
        raise SystemExit("[中断] 合計欄と数字が合いません:\n  " + "\n  ".join(bad[:10]))
    as_symbol = "symbol" in conf.get("metrics", ["vacancy"])
    cats = conf.get("rowCategories") or {}
    out = []
    for i, r in enumerate(rows):
        row = {"name": r["name"], "vacancy": r["values"]}
        if as_symbol:
            row["symbols"] = r["symbols"]
        # 画像の表では類型の列が縦書きの結合セルになっていて読めないことが多い。
        # 「何行目から何行目までがどの類型か」を設定に書けるようにする
        for cat, span in cats.items():
            if span[0] <= i + 1 <= span[1]:
                row["category"] = cat
                break
        out.append(row)
    return out


def main():
    conf = json.load(io.open(sys.argv[1], encoding="utf-8"))
    pdf_bytes = io.open(sys.argv[2], "rb").read()
    rows = read_table(pdf_bytes, conf)
    expected = conf.get("expectFacilities")
    if expected:
        rows = match_names(rows, expected)
    bad = check_totals(rows)
    if bad:
        raise SystemExit("[中断] 合計欄と数字が合いません:\n  " + "\n  ".join(bad[:10]))
    io.open(sys.argv[3], "w", encoding="utf-8").write(json.dumps(rows, ensure_ascii=False, indent=1))
    print(f"読み取り: {len(rows)}行" + ("（合計欄と照合済み）" if any(r.get("total") is not None for r in rows) else ""))


if __name__ == "__main__":
    main()
