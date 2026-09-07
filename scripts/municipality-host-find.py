# 自治体の公式サイトのホスト名を、名前から機械的に見つける。
#
# 総務省「全国地方公共団体コード」には**市区町村名のカナ**が入っている。
# これをローマ字に直して www.city.<ローマ字>.lg.jp などを当て、
# **そのページに自治体名が出るか**で確かめる。名前が出なければ採らない。
#
# 名前が出るかを必ず見るのは、当てずっぽうが別の自治体を掴むため。
# 実際に www.city.sakai.lg.jp は堺市で、坂井市（福井）は
# www.city.fukui-sakai.lg.jp だった。www.city.nakatsu.lg.jp も中津市ではない。
#
#   python scripts/municipality-host-find.py <団体コード\t都道府県\t市区町村\t人口 のtsv> out.tsv
#
# 出力は入力に「ホスト名」列を足したもの。当たらなかった行は落とす。
import concurrent.futures as cf
import html as H
import io
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

CODE_XLSX = "https://www.soumu.go.jp/main_content/000925835.xlsx"

PREF_ROMAJI = {
    "北海道": "hokkaido", "青森県": "aomori", "岩手県": "iwate", "宮城県": "miyagi",
    "秋田県": "akita", "山形県": "yamagata", "福島県": "fukushima", "茨城県": "ibaraki",
    "栃木県": "tochigi", "群馬県": "gunma", "埼玉県": "saitama", "千葉県": "chiba",
    "東京都": "tokyo", "神奈川県": "kanagawa", "新潟県": "niigata", "富山県": "toyama",
    "石川県": "ishikawa", "福井県": "fukui", "山梨県": "yamanashi", "長野県": "nagano",
    "岐阜県": "gifu", "静岡県": "shizuoka", "愛知県": "aichi", "三重県": "mie",
    "滋賀県": "shiga", "京都府": "kyoto", "大阪府": "osaka", "兵庫県": "hyogo",
    "奈良県": "nara", "和歌山県": "wakayama", "鳥取県": "tottori", "島根県": "shimane",
    "岡山県": "okayama", "広島県": "hiroshima", "山口県": "yamaguchi", "徳島県": "tokushima",
    "香川県": "kagawa", "愛媛県": "ehime", "高知県": "kochi", "福岡県": "fukuoka",
    "佐賀県": "saga", "長崎県": "nagasaki", "熊本県": "kumamoto", "大分県": "oita",
    "宮崎県": "miyazaki", "鹿児島県": "kagoshima", "沖縄県": "okinawa",
}

# 半角カナ → 全角カナ
HANKAKU = (
    "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｧｨｩｪｫｯｬｭｮｰ"
)
ZENKAKU = (
    "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァィゥェォッャュョー"
)
DAKUTEN = {
    "ｶﾞ": "ガ", "ｷﾞ": "ギ", "ｸﾞ": "グ", "ｹﾞ": "ゲ", "ｺﾞ": "ゴ",
    "ｻﾞ": "ザ", "ｼﾞ": "ジ", "ｽﾞ": "ズ", "ｾﾞ": "ゼ", "ｿﾞ": "ゾ",
    "ﾀﾞ": "ダ", "ﾁﾞ": "ヂ", "ﾂﾞ": "ヅ", "ﾃﾞ": "デ", "ﾄﾞ": "ド",
    "ﾊﾞ": "バ", "ﾋﾞ": "ビ", "ﾌﾞ": "ブ", "ﾍﾞ": "ベ", "ﾎﾞ": "ボ",
    "ﾊﾟ": "パ", "ﾋﾟ": "ピ", "ﾌﾟ": "プ", "ﾍﾟ": "ペ", "ﾎﾟ": "ポ",
    "ｳﾞ": "ヴ",
}

# ヘボン式。市区町村のURLでよく使われる形に寄せている
KANA = [
    ("キャ", "kya"), ("キュ", "kyu"), ("キョ", "kyo"), ("ギャ", "gya"), ("ギュ", "gyu"), ("ギョ", "gyo"),
    ("シャ", "sha"), ("シュ", "shu"), ("ショ", "sho"), ("ジャ", "ja"), ("ジュ", "ju"), ("ジョ", "jo"),
    ("チャ", "cha"), ("チュ", "chu"), ("チョ", "cho"), ("ニャ", "nya"), ("ニュ", "nyu"), ("ニョ", "nyo"),
    ("ヒャ", "hya"), ("ヒュ", "hyu"), ("ヒョ", "hyo"), ("ビャ", "bya"), ("ビュ", "byu"), ("ビョ", "byo"),
    ("ピャ", "pya"), ("ピュ", "pyu"), ("ピョ", "pyo"), ("ミャ", "mya"), ("ミュ", "myu"), ("ミョ", "myo"),
    ("リャ", "rya"), ("リュ", "ryu"), ("リョ", "ryo"),
    ("ア", "a"), ("イ", "i"), ("ウ", "u"), ("エ", "e"), ("オ", "o"),
    ("カ", "ka"), ("キ", "ki"), ("ク", "ku"), ("ケ", "ke"), ("コ", "ko"),
    ("ガ", "ga"), ("ギ", "gi"), ("グ", "gu"), ("ゲ", "ge"), ("ゴ", "go"),
    ("サ", "sa"), ("シ", "shi"), ("ス", "su"), ("セ", "se"), ("ソ", "so"),
    ("ザ", "za"), ("ジ", "ji"), ("ズ", "zu"), ("ゼ", "ze"), ("ゾ", "zo"),
    ("タ", "ta"), ("チ", "chi"), ("ツ", "tsu"), ("テ", "te"), ("ト", "to"),
    ("ダ", "da"), ("ヂ", "ji"), ("ヅ", "zu"), ("デ", "de"), ("ド", "do"),
    ("ナ", "na"), ("ニ", "ni"), ("ヌ", "nu"), ("ネ", "ne"), ("ノ", "no"),
    ("ハ", "ha"), ("ヒ", "hi"), ("フ", "fu"), ("ヘ", "he"), ("ホ", "ho"),
    ("バ", "ba"), ("ビ", "bi"), ("ブ", "bu"), ("ベ", "be"), ("ボ", "bo"),
    ("パ", "pa"), ("ピ", "pi"), ("プ", "pu"), ("ペ", "pe"), ("ポ", "po"),
    ("マ", "ma"), ("ミ", "mi"), ("ム", "mu"), ("メ", "me"), ("モ", "mo"),
    ("ヤ", "ya"), ("ユ", "yu"), ("ヨ", "yo"),
    ("ラ", "ra"), ("リ", "ri"), ("ル", "ru"), ("レ", "re"), ("ロ", "ro"),
    ("ワ", "wa"), ("ヲ", "o"), ("ン", "n"), ("ヴ", "vu"),
    ("ァ", "a"), ("ィ", "i"), ("ゥ", "u"), ("ェ", "e"), ("ォ", "o"),
    ("ー", ""),
]

SUFFIX = re.compile(r"(シ|チョウ|マチ|ソン|ムラ|ク)$")


def to_zenkaku(s):
    for k, v in DAKUTEN.items():
        s = s.replace(k, v)
    return s.translate(str.maketrans(HANKAKU, ZENKAKU))


def _convert(k):
    out = []
    i = 0
    while i < len(k):
        if k[i] == "ッ":
            # 促音は次の子音を重ねる
            nxt = k[i + 1 : i + 3]
            for kk, vv in KANA:
                if nxt.startswith(kk):
                    out.append(vv[0] if vv[0] != "c" else "t")
                    break
            i += 1
            continue
        for kk, vv in KANA:
            if k[i:].startswith(kk):
                out.append(vv)
                i += len(kk)
                break
        else:
            i += 1
    return "".join(out)


def to_romaji_candidates(kana):
    """カナからローマ字の候補をいくつか作る。

    総務省の表は小書きを使わない（「シジヨウナワテ」）ので、
    大きい「ヨ」を小書きに直した形も候補にする。
    「オウ」「ウウ」の長音は、URLでは o / u に縮める市が多いので、
    そのままの形と縮めた形の両方を出す。どれが当たるかは
    実際にページを開いて自治体名が出るかで決める。
    """
    k = SUFFIX.sub("", to_zenkaku(kana))
    variants = {k}
    # 「シヨ」「キヤ」のような大書きを小書きに直す
    small = re.sub(r"(?<=[キシチニヒミリギジビピ])([ヤユヨ])", lambda m: "ャュョ"["ヤユヨ".index(m.group(1))], k)
    variants.add(small)
    out = []
    for v in variants:
        r = _convert(v)
        out.append(r)
        # 長音を縮めた形
        out.append(re.sub(r"ou|uu", lambda m: m.group(0)[0], r))
        out.append(r.replace("ou", "o").replace("uu", "u"))
    seen = []
    for r in out:
        if r and r not in seen:
            seen.append(r)
    return seen


def to_romaji(kana):
    """いちばん確からしい1つ。既存slugとの照合に使う"""
    return to_romaji_candidates(kana)[0]


def load_kana():
    """総務省の団体コード表から、市区町村名 → カナ を作る"""
    import openpyxl

    path = os.path.join(os.environ.get("TEMP", "."), "jichitai_code.xlsx")
    if not os.path.exists(path):
        b = urllib.request.urlopen(
            urllib.request.Request(CODE_XLSX, headers=UA), timeout=90, context=CTX
        ).read()
        with open(path, "wb") as f:
            f.write(b)
    wb = openpyxl.load_workbook(path, read_only=True)
    ws = wb[wb.sheetnames[0]]
    out = {}
    for r in ws.iter_rows(min_row=2, values_only=True):
        if not r or not r[2] or not r[4]:
            continue
        out[(str(r[1]), str(r[2]))] = str(r[4])
    return out


def get(u, timeout=18):
    try:
        r = urllib.request.urlopen(
            urllib.request.Request(u, headers=UA), timeout=timeout, context=CTX
        )
        b = r.read(300_000)
        for e in ("utf-8", "cp932", "euc_jp"):
            try:
                return r.geturl(), b.decode(e)
            except UnicodeDecodeError:
                continue
        return r.geturl(), b.decode("utf-8", "replace")
    except Exception:
        return None, None


def try_one(a):
    code, pref, name, pop, romans = a
    p = PREF_ROMAJI.get(pref, "")
    kind = "city" if name.endswith("市") else ("town" if name.endswith("町") else "vil")
    cands = []
    for roman in romans:
        for k in [kind, "city", "town", "vil"]:
            for host in (
                f"www.{k}.{roman}.lg.jp",
                f"www.{k}.{roman}.{p}.jp",
                f"www.{k}.{roman}.jp",
                f"www.town.{roman}.{p}.jp",
                # 同名が多い自治体は県名を前に付けた形を使うことがある（福井県坂井市）
                f"www.{k}.{p}-{roman}.lg.jp",
            ):
                if host not in cands:
                    cands.append(host)
    for h in cands[:16]:
        final, t = get("https://" + h + "/")
        if not t:
            continue
        flat = re.sub(r"<[^>]+>", " ", H.unescape(t))
        # **その自治体の名前が出るか**だけを見る。出なければ採らない
        if name in flat:
            return code, pref, name, pop, re.sub(r"^https?://", "", final).split("/")[0]
    return code, pref, name, pop, None


def main():
    kana = load_kana()
    rows = []
    for line in io.open(sys.argv[1], encoding="utf-8"):
        p = line.rstrip("\n").split("\t")
        if len(p) < 4:
            continue
        k = kana.get((p[1], p[2]))
        if not k:
            print(f"× {p[2]} カナが分からない", flush=True)
            continue
        rows.append((p[0], p[1], p[2], p[3], to_romaji_candidates(k)))
    print(f"対象 {len(rows)}件", flush=True)
    out = []
    with cf.ThreadPoolExecutor(max_workers=8) as ex:
        for code, pref, name, pop, host in ex.map(try_one, rows):
            if host:
                out.append(f"{code}\t{pref}\t{name}\t{pop}\t{host}")
                print(f"○ {name} {host}", flush=True)
            else:
                print(f"× {name} 当たらず", flush=True)
    io.open(sys.argv[2], "w", encoding="utf-8", newline="\n").write("\n".join(out) + "\n")
    print(f"見つかった {len(out)}/{len(rows)}")


if __name__ == "__main__":
    main()
