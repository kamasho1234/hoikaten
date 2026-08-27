"""ヒーロー画像用フォントのサブセットを作り直す。

    npm run hero-font

ヒーロー画像（`src/lib/hero-image.tsx`）には記事のカテゴリ名と自治体名を描いている。
ImageResponse（satori）は日本語フォントを内蔵していないので TTF/OTF を渡す必要があるが、
Noto Sans JP Bold は 4.6MB あり、記事ごとに数千枚を静的生成するビルドでは重すぎる。
**画像に実際に出る文字だけに絞る**ことで 140KB まで落としている。

## いつ走らせるか
- 記事のカテゴリ名（`category`）を新しく作ったとき
- 自治体を追加したとき（`src/lib/data/<slug>.ts`）
- お金・書類の記事でグループ名（`group`）を増やしたとき

**画像の字が □ になっていたら、サブセットにその文字が無い。** このスクリプトは
最後に全文字列を機械照合するので、漏れがあればその場で分かる。

## 必要なもの
    pip install fonttools brotli

元フォントはビルドのたびに落とさず、`--otf` で手元のパスを渡すこともできる。
"""

from __future__ import annotations

import argparse
import glob
import io
import os
import re
import sys
import tempfile
import urllib.request

NOTO_URL = (
    "https://raw.githubusercontent.com/notofonts/noto-cjk/main/"
    "Sans/SubsetOTF/JP/NotoSansJP-Bold.otf"
)
OUT_PATH = "public/fonts/NotoSansJP-Bold-subset.otf"

# 記号・英数字は常に入れておく
EXTRA = (
    "0123456789"
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    "abcdefghijklmnopqrstuvwxyz"
    "・ー〜（）「」、。"
)


def collect_texts() -> dict[str, str]:
    """画像に出る文字列を集める。値は「どこから来たか」（エラー表示用）"""
    found: dict[str, str] = {}

    for path in glob.glob("src/lib/articles/*.ts"):
        src = io.open(path, encoding="utf-8").read()
        for m in re.findall(r"category: [\"']([^\"']+)[\"']", src):
            found.setdefault(m, "記事カテゴリ")

    for path in glob.glob("src/lib/insurance/*.ts") + glob.glob("src/lib/documents/*.ts"):
        src = io.open(path, encoding="utf-8").read()
        for m in re.findall(r"(?:group|category): [\"']([^\"']+)[\"']", src):
            found.setdefault(m, "お金・書類のグループ")

    # 自治体データは `const municipality = { ... }` の中。**シングルクォート**で書かれている
    for path in glob.glob("src/lib/data/*.ts"):
        src = io.open(path, encoding="utf-8").read()
        block = re.search(r"const municipality = \{(.*?)\}", src, re.S)
        if not block:
            continue
        for m in re.findall(r"name: [\"']([^\"']+)[\"']", block.group(1)):
            found.setdefault(m, "自治体名")

    return found


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--otf", help="元の NotoSansJP-Bold.otf のパス（省略時はダウンロード）")
    args = parser.parse_args()

    try:
        from fontTools import subset
        from fontTools.ttLib import TTFont
    except ImportError:
        print("fonttools が要る:  pip install fonttools brotli", file=sys.stderr)
        return 1

    texts = collect_texts()
    chars = set("".join(texts)) | set(EXTRA)
    print(f"画像に出る文字列 {len(texts)} 種 / 文字 {len(chars)} 字")

    src_path = args.otf
    tmp = None
    if not src_path:
        print("Noto Sans JP Bold をダウンロード中...")
        tmp = tempfile.NamedTemporaryFile(suffix=".otf", delete=False)
        with urllib.request.urlopen(NOTO_URL, timeout=180) as res:
            tmp.write(res.read())
        tmp.close()
        src_path = tmp.name

    opts = subset.Options()
    opts.desubroutinize = True
    opts.notdef_outline = True
    opts.layout_features = []

    font = subset.load_font(src_path, opts)
    subsetter = subset.Subsetter(options=opts)
    subsetter.populate(text="".join(sorted(chars)))
    subsetter.subset(font)
    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    subset.save_font(font, OUT_PATH, opts)
    if tmp:
        os.unlink(tmp.name)

    size_kb = os.path.getsize(OUT_PATH) / 1024
    print(f"{OUT_PATH} を書き出した（{size_kb:.0f}KB）")

    # 書き出したフォントで全文字列を照合する。□ になる文字が残っていないか
    out = TTFont(OUT_PATH)
    have = set()
    for table in out["cmap"].tables:
        have |= {chr(c) for c in table.cmap.keys()}

    missing = [
        (kind, text, "".join(c for c in text if c not in have))
        for text, kind in texts.items()
        if any(c not in have for c in text)
    ]
    if missing:
        print("!! フォントに無い文字がある（画像で □ になる）:", file=sys.stderr)
        for kind, text, chars_missing in missing[:20]:
            print(f"   {kind}: {text} → {chars_missing}", file=sys.stderr)
        return 1

    print(f"照合 OK: {len(texts)} 種すべての文字が入っている")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
