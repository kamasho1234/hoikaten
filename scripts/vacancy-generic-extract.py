"""
空き状況PDFの表を、設定ファイルの指示どおりに読み出す汎用の抽出器

実行: python scripts/vacancy-generic-extract.py <pdf> <config.json>
出力: 標準出力にJSON（scripts/fetch-config-vacancy.ts から呼ぶ）

## なぜ汎用にしたのか
自治体ごとに `<slug>-pdf-extract.py` を書いてきたが、
**表の作りが同じ自治体が多い**（施設名の列＋0歳〜5歳の列が並ぶ、が最頻）。
同じ形のものに毎回スクリプトを書くと、直すときに全部を直すことになる。
設定で吸収できる差分は設定に出し、本当に特殊な自治体だけ専用スクリプトを残す。

## 対応している5つの形
- `auto-table` … PDFの表で、年齢の列を見出しの文字から自動で決める（最頻・まずこれを試す）
- `one-table` … 列番号を設定に書いて読む（auto-table で拾えない表のため）
- `age-sections` … 年齢ごとに表が分かれ、各表は施設名＋空き数の1列だけ（PDFの高槻市など）
- `age-rows` … 1施設が0歳〜5歳の6行に縦に分かれ、列が入所月などになっている（長浜市）
- `html-tables` … 公式ページのHTMLの表をそのまま読む（PDFを出さない自治体）

## 読み取れなかったら必ず落とす
推測で埋めると誤った数字を公開してしまう（[[feedback_factcheck_absolute]]）。
形が想定と違うときは例外を投げ、呼び出し側（TS）が exit 1 する。
"""

import json
import re
import sys
from html.parser import HTMLParser

import pdfplumber

ZEN = str.maketrans("０１２３４５６７８９", "0123456789")


def fail(message):
    raise SystemExit(f"[中断] {message}")


def cell(s):
    """セルの文字を、比較しやすい形にそろえる（空白を落として全角数字を半角に）"""
    if s is None:
        return ""
    return "".join(str(s).split()).translate(ZEN)


def parse_number(text, unit):
    """「3名」「3人」「3」を 3 にする。数でなければ None"""
    t = cell(text)
    if unit:
        t = t.replace(unit, "")
    t = t.replace("人", "").replace("名", "")
    if t in ("", "-", "‐", "―", "－", "ー", "/", "／"):
        return None
    if re.fullmatch(r"\d+", t):
        return int(t)
    return None


def tables_of(pdf, settings):
    """ページごとに表を取り出す。設定で pdfplumber の探し方を変えられるようにする"""
    out = []
    for page in pdf.pages:
        found = page.extract_tables(settings) if settings else page.extract_tables()
        for t in found or []:
            out.append(t)
    return out


def rows_from_grid(grid, conf, category=None):
    """
    年齢の見出し行を手がかりに、マス目から施設の行を取り出す。

    自治体の表は「保育園 0歳児 1歳児 …」のように、
    **施設類型の見出しと年齢の見出しが同じ行に入る**ことが多い。
    その行を見つけたら、年齢の列を決め直し、左端の文字をその区分の名前として使う。

    戻り値: (rows, category) — category は次の表に引き継ぐ現在の区分
    """
    cols = conf.get("columns") or {}
    name_col_conf = cols.get("name")
    cat_col = cols.get("category")
    unit = conf.get("valueUnit", "")
    as_symbol = "symbol" in conf.get("metrics", ["vacancy"])
    no_class = set(conf.get("noClassMarks", ["-", "‐", "―", "－", "ー", "/", "／", ""]))
    skip = [cell(x) for x in conf.get("skipRowsContaining", [])]
    # row … 見出し行の左端を区分名にする（既定）／heading … 表の前の見出しを使う／none … 付けない
    mode = conf.get("categoryFrom", "row")
    use_category = mode != "none"
    take_from_row = mode == "row"
    generic = set(conf.get("nameHeaders", ["施設名", "園名", "保育所名", "保育施設名", "保育園名"]))
    # 同じ意味の記号が字だけ違う（「〇」と「○」など）ときに、凡例側の字にそろえる
    symbol_map = conf.get("symbolMap") or {}
    # 「空欄：受入なし」と凡例に書いてある自治体では、空欄をその意味の記号に置き換える。
    # 何も指定しなければ空欄は「そのクラスがない」の扱いのままにする
    empty_mark = conf.get("emptyMark")
    # 人数の表で「空欄は0人」と自治体自身が説明しているときだけ使う。
    # 説明がないのに0を入れると、無いクラスを「空きなし」に見せてしまう
    empty_value = conf.get("emptyValue")

    # 同じ表の途中から別の制度の話になる自治体がある
    # （池田市の「送迎保育ステーションのバス空き見込み」など）。そこで読むのをやめる
    stop_row = conf.get("stopRow")
    # 1施設が複数行に分かれる表（佐倉市は在籍/入園待ち/待機/空きの4行）では、
    # どの行が空き状況かを列と値で指定する。施設名は先頭の行にしか入っていないので持ち回る
    row_label = conf.get("rowLabel")
    # 見出し行と本文で列がずれる表があるので、年齢の列を直接書けるようにする
    fixed_ages = cols.get("ages")

    rows = []
    age_cols = None
    name_col = None
    last_name = ""
    if fixed_ages:
        if len(fixed_ages) != 6:
            fail("columns.ages は0歳〜5歳の6列を指定してください")
        age_cols = {c: i for i, c in enumerate(fixed_ages)}
        name_col = name_col_conf if name_col_conf is not None else 0

    for raw in grid:
        r = [cell(c) for c in raw]
        if stop_row and re.search(stop_row, "".join(r)):
            break
        # 年齢の見出しが3つ以上並ぶ行を、見出し行とみなす
        ages = {}
        if not fixed_ages:
            for j, c in enumerate(r):
                a = age_of_header(c)
                if a is not None and a not in ages.values():
                    ages[j] = a
        if len(ages) >= 3:
            age_cols = ages
            name_col = name_col_conf if name_col_conf is not None else min(ages) - 1
            if name_col < 0:
                name_col = 0
            head = r[name_col] if len(r) > name_col else ""
            # 見出しの文字で表を選び分ける（別の制度の表を落とすため）
            require = conf.get("requireNameHeader")
            if require and head not in require:
                age_cols = None
                continue
            if take_from_row and head and head not in generic and age_of_header(head) is None:
                for pat in conf.get("categoryTrim", []):
                    head = re.sub(pat, "", head)
                category = head.strip() or None
            continue

        if age_cols is None or len(r) <= max(max(age_cols), name_col):
            continue
        name = r[name_col]
        # 施設名が2列に割れて出る表がある（常陸太田市は見出しも「園」「名」で割れ、
        # 中身も「木崎保」「育園」と切れる）。設定でつなぐ列を並べられるようにする
        join = conf.get("nameJoin")
        if join:
            name = "".join(r[j] for j in join if j < len(r))
        # 施設名のセルに住所などが一緒に入っている自治体（赤磐市など）は、
        # 元の文字（空白や改行が残っている）に正規表現をかけて名前だけにする
        name_trim = conf.get("nameTrim")
        if name_trim:
            src = raw[name_col] if len(raw) > name_col else ""
            src = "" if src is None else str(src)
            for pat in name_trim:
                src = re.sub(pat, "", src)
            name = cell(src)
        if row_label:
            # 施設名は先頭の行にしかないので覚えておく。
            # 類型（公立/民間など）も同じ行にあるため、ここで先に取り込む
            if name:
                last_name = name
            if cat_col is not None and len(r) > cat_col and r[cat_col]:
                text = r[cat_col]
                for pat in conf.get("categoryTrim", []):
                    text = re.sub(pat, "", text)
                category = text.strip() or category
            label_col = row_label["column"]
            if len(r) <= label_col or r[label_col] != cell(row_label["value"]):
                continue
            name = last_name
        if not name or age_of_header(name) is not None:
            continue
        if any(x and x in name for x in skip):
            continue
        # 施設名以外のセルに注記が入っている行を落とす（「直接施設へお問い合わせください」など）
        drop = conf.get("skipRowsMatching")
        if drop and re.search(drop, "".join(r)):
            continue

        # 類型の列がある表では、空欄は「上の行と同じ類型」を意味する（PDFの結合セル）
        if cat_col is not None and len(r) > cat_col and r[cat_col]:
            text = r[cat_col]
            for pat in conf.get("categoryTrim", []):
                text = re.sub(pat, "", text)
            # 縦書きの結合セルは字の順が崩れて出ることがある（各務原市の「保育所（園）（私立）」）。
            # 読めた通りの崩れた文字を、設定で正しい表記に置き換える
            text = (conf.get("categoryMap") or {}).get(text.strip(), text)
            category = text.strip() or category

        values = [None] * 6
        symbols = [None] * 6
        ok = False
        # 隣り合う年齢のセルが結合されている自治体がある（安曇野市の0歳・1歳など）。
        # pdfplumber は結合セルの値を左端にだけ入れて右を空にするため、
        # そのままだと右の年齢が「データなし」になってしまう。
        # mergedAges を指定した設定では、空欄を左隣の値で埋める。
        # 「ー」など明示的に「そのクラスが無い」と書かれたセルは no_class 側で落ちるので、
        # ここで埋まるのは本当に結合セル由来の空欄だけになる。
        if conf.get("mergedAges"):
            order = sorted(age_cols)
            for k, j in enumerate(order):
                if k and r[j] == "" and r[order[k - 1]] != "":
                    r[j] = r[order[k - 1]]
        for j, age in age_cols.items():
            text = r[j]
            if text == "":
                # 空欄の意味は自治体によって違う。設定があるときだけ意味を与える
                if as_symbol and empty_mark:
                    text = empty_mark
                elif not as_symbol and empty_value is not None:
                    values[age] = empty_value
                    ok = True
                    continue
            # 人数の表なのに空きなしだけ「×」で書く自治体がある（伊万里市）。
            # クラスが無いのではなく0人なので、設定にあるときだけ0として読む
            if not as_symbol and text in set(conf.get("zeroMarks", [])):
                values[age] = 0
                ok = True
                continue
            if text in no_class:
                continue
            if as_symbol:
                # 記号のセルに注記が同居している自治体がある（下野市の「〇 要相談」など）
                for pat in conf.get("symbolTrim", []):
                    text = re.sub(pat, "", text)
                if not text:
                    continue
                symbols[age] = symbol_map.get(text, text)
                ok = True
            else:
                n = parse_number(text, unit)
                if n is None and empty_value is not None and text == "":
                    n = empty_value
                if n is None:
                    continue
                values[age] = n
                ok = True
        if not ok:
            continue

        row = {"name": name, "vacancy": values}
        if as_symbol:
            row["symbols"] = symbols
        if use_category and category:
            row["category"] = category
        rows.append(row)

    return rows, category


def transpose_grid(grid):
    """
    行と列を入れ替える。

    室蘭市のように**年齢を縦、施設を横**に並べる自治体があり、
    そのままでは年齢の見出し行が見つからない。入れ替えれば他と同じ形になる。
    """
    width = max((len(r) for r in grid), default=0)
    return [[(r[i] if i < len(r) else "") for r in grid] for i in range(width)]


def extract_auto_table(pdf, conf):
    """PDFの表を、年齢の見出しを手がかりに読む"""
    stop = conf.get("stopSection")
    flip = bool(conf.get("transpose"))
    # 同じPDFに過去数か月分を積み重ねる自治体がある（宮古島市は6か月分）。
    # 最新は先頭ページなので、読むページ数で区切る。日付で止めると
    # 翌月に資料が差し替わったとき設定が古くなって効かなくなる
    max_pages = conf.get("maxPages")
    rows = []
    category = None
    for page in pdf.pages[:max_pages] if max_pages else pdf.pages:
        if stop and re.search(stop, page.extract_text() or ""):
            break
        for table in tables_of_page(page, conf.get("tableSettings")):
            flat = "".join(cell(c) for r in table for c in r)
            # 別の制度の表（池田市の送迎保育ステーションなど）は表ごと読み飛ばす
            skip = conf.get("skipTablesContaining")
            if skip and re.search(skip, flat):
                continue
            # 1号認定（教育利用）と2号・3号認定の表を同じPDFに並べる自治体では、
            # 同じ園が両方に出てくる。読む表そのものを絞れるようにする（阿南市）
            only = conf.get("keepTablesMatching")
            if only and not re.search(only, flat):
                continue
            got, category = rows_from_grid(transpose_grid(table) if flip else table, conf, category)
            rows.extend(got)
    return rows


def tables_of_page(page, settings):
    found = page.extract_tables(settings) if settings else page.extract_tables()
    return [t for t in (found or []) if t]


def extract_one_table(pdf, conf):
    """1つの表に施設が縦、0歳〜5歳が横に並ぶ形"""
    cols = conf["columns"]
    name_col = cols["name"]
    age_cols = cols["ages"]
    cat_col = cols.get("category")
    if len(age_cols) != 6:
        fail("columns.ages は0歳〜5歳の6列を指定してください")

    skip = [cell(s) for s in conf.get("skipRowsContaining", [])]
    no_class = set(conf.get("noClassMarks", ["-", "‐", "―", "－", "ー", "/", "／", "×なし"]))
    unit = conf.get("valueUnit", "")
    as_symbol = "symbol" in conf.get("metrics", ["vacancy"])
    empty_mark = conf.get("emptyMark")
    symbol_map = conf.get("symbolMap") or {}

    rows = []
    for table in tables_of(pdf, conf.get("tableSettings")):
        for raw in table:
            if raw is None:
                continue
            width = max(name_col, max(age_cols), cat_col if cat_col is not None else 0) + 1
            if len(raw) < width:
                continue
            name = cell(raw[name_col])
            if not name:
                continue
            if any(s and s in name for s in skip):
                continue
            # 見出し行（0歳・1歳などが施設名の列に来ている）を落とす
            if re.search(r"\d\s*歳", name) or name in ("施設名", "園名", "保育所名"):
                continue

            values = []
            symbols = []
            ok = False
            for c in age_cols:
                text = cell(raw[c])
                if as_symbol:
                    # 「空欄：空きなし」と凡例に書いてある自治体では、空欄をその記号にする。
                    # auto-table と同じ扱いにそろえる（桑名市など）
                    if text == "" and empty_mark:
                        text = empty_mark
                    if text in no_class or text == "":
                        symbols.append(None)
                    else:
                        symbols.append(symbol_map.get(text, text))
                        ok = True
                    values.append(None)
                else:
                    if text in no_class:
                        values.append(None)
                        continue
                    n = parse_number(text, unit)
                    if n is None and text != "":
                        # 数でも「設けていない」でもない文字が来たら、形が違う
                        values.append(None)
                    else:
                        values.append(n)
                        if n is not None:
                            ok = True
            if not ok and not conf.get("keepEmptyRows"):
                continue

            row = {"name": name, "vacancy": values}
            if as_symbol:
                row["symbols"] = symbols
            if cat_col is not None:
                row["category"] = cell(raw[cat_col])
            rows.append(row)
    return rows


def extract_age_sections(pdf, conf):
    """
    年齢ごとに表が分かれ、各表は施設名と空き数だけを持つ形（高槻市など）

    見出しと表の対応は**出現順ではなく座標**で取る。
    注意書きの中に「5歳児」のような語が混ざると順番がずれるため、
    表の上端のすぐ上にある見出しを、その表の年齢とする。
    """
    cols = conf["columns"]
    name_col = cols["name"]
    value_col = cols["value"]
    cat_col = cols.get("category")
    unit = conf.get("valueUnit", "")
    headers = conf.get("ageSectionHeaders")
    if not headers or len(headers) != 6:
        fail("ageSectionHeaders は0歳児〜5歳児の6つを指定してください")

    stop = conf.get("stopSection")
    rows = {}
    used_ages = set()
    for page in pdf.pages:
        # 別の制度の表（高槻市の「認可保育施設以外の空き枠見込み数」など）に入ったら止める
        if stop and re.search(stop, page.extract_text() or ""):
            break
        # 見出しの位置を単語の座標から拾う
        words = page.extract_words(use_text_flow=False) or []
        marks = []
        for w in words:
            t = cell(w.get("text"))
            for idx, h in enumerate(headers):
                if t == h:
                    marks.append((w["top"], w["x0"], idx))
        marks.sort()

        for table in page.find_tables(conf.get("tableSettings") or {}):
            top = table.bbox[1]
            above = [m for m in marks if m[0] <= top + 2]
            if not above:
                fail(f"表（top={top:.0f}）の上に年齢の見出しが見つかりません")
            age = above[-1][2]
            used_ages.add(age)
            for raw in table.extract():
                if raw is None or len(raw) <= max(name_col, value_col):
                    continue
                name = cell(raw[name_col])
                if not name or name in ("施設名", "園名", "保育所名"):
                    continue
                n = parse_number(raw[value_col], unit)
                if n is None:
                    continue
                if name not in rows:
                    rows[name] = {"name": name, "vacancy": [None] * 6}
                    if cat_col is not None and len(raw) > cat_col:
                        rows[name]["category"] = cell(raw[cat_col])
                if rows[name]["vacancy"][age] is not None:
                    fail(f"{name} の{headers[age]}が二重に読み取られました")
                rows[name]["vacancy"][age] = n

    if not used_ages:
        fail("年齢ごとの表を1つも読み取れませんでした")
    return list(rows.values())


# ---------------------------------------------------------------------------
# HTMLの表を読む
# ---------------------------------------------------------------------------


class TableGrabber(HTMLParser):
    """
    HTMLから表を取り出す。rowspan / colspan は展開して長方形のマス目にする。

    自治体のページは「公立保育園」「小規模保育事業所」のように
    見出し＋表の組を並べることが多いので、表の直前の見出しも一緒に持って帰る。
    """

    HEADINGS = {"h1", "h2", "h3", "h4", "h5", "caption"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.tables = []          # [{"heading": str, "grid": [[str]]}]
        self.heading = ""
        self._htext = None        # 見出しを読んでいる最中のバッファ
        self._depth = 0           # table の入れ子の深さ
        self._grid = None
        self._row = None
        self._cell = None
        self._span = (1, 1)
        self._pending = {}        # 行をまたぐ rowspan: {列: [残り行数, 文字]}
        self._table_heading = ""

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in self.HEADINGS:
            self._htext = []
        elif tag == "table":
            self._depth += 1
            if self._depth == 1:
                self._grid = []
                self._pending = {}
                self._table_heading = self.heading
        elif tag == "tr" and self._depth == 1:
            self._row = []
        elif tag in ("td", "th") and self._depth == 1:
            self._cell = []
            try:
                cs = max(1, int(a.get("colspan", "1")))
            except ValueError:
                cs = 1
            try:
                rs = max(1, int(a.get("rowspan", "1")))
            except ValueError:
                rs = 1
            self._span = (rs, cs)
        elif tag == "br" and self._cell is not None:
            self._cell.append(" ")

    def handle_data(self, data):
        if self._cell is not None:
            self._cell.append(data)
        elif self._htext is not None:
            self._htext.append(data)

    def handle_endtag(self, tag):
        if tag in self.HEADINGS and self._htext is not None:
            text = "".join(self._htext).strip()
            if text:
                # caption は表の中の見出しなので、その表だけに効かせる。
                # ここで self.heading を書き換えると次の表の見出しがずれる
                if tag == "caption" and self._depth == 1:
                    self._table_heading = text
                else:
                    self.heading = text
            self._htext = None
        elif tag in ("td", "th") and self._depth == 1 and self._cell is not None:
            text = "".join(self._cell).strip()
            if self._row is not None:
                self._row.append((text, self._span))
            self._cell = None
        elif tag == "tr" and self._depth == 1 and self._row is not None:
            self._flush_row()
            self._row = None
        elif tag == "table":
            if self._depth == 1 and self._grid is not None:
                if self._grid:
                    self.tables.append({"heading": self._table_heading, "grid": self._grid})
                self._grid = None
            self._depth = max(0, self._depth - 1)

    def _flush_row(self):
        """1行ぶんのセルを、前の行から伸びている rowspan と合わせて並べ直す"""
        out = []
        col = 0
        queue = list(self._row)
        while queue or col in self._pending:
            if col in self._pending:
                left, text = self._pending[col]
                out.append(text)
                if left <= 1:
                    del self._pending[col]
                else:
                    self._pending[col] = [left - 1, text]
                col += 1
                continue
            if not queue:
                break
            text, (rs, cs) = queue.pop(0)
            for _ in range(cs):
                out.append(text)
                if rs > 1:
                    self._pending[col] = [rs - 1, text]
                col += 1
        self._grid.append(out)


# 「0歳児」「０歳」「0歳児クラス」に加え、「0歳児（6年保育）」のような括弧付きも見出しとみなす
# 「0歳児」「０歳」「0歳児クラス」に加え、括弧書きや注記が続く形も見出しとみなす
# （川越町は「0歳児（令和7（2025）年4月2日～生まれ）※申込可能月齢は…」）
AGE_HEADER = re.compile(r"^([0-5０-５])歳児?(クラス)?([（(].*)?$")


# 年齢ではなく学年の呼び方で見出しを作る自治体がある（武豊町の「年長」「乳児0」）。
# 設定 ageHeaderMap で上書きできるようにし、既定にもよくある呼び方を入れておく
AGE_ALIASES = {
    "年長": 5, "年中": 4, "年少": 3,
    "乳児2": 2, "乳児1": 1, "乳児0": 0,
    "2歳": 2, "1歳": 1, "0歳": 0,
}
_age_alias_override = {}


def age_of_header(text):
    """「1歳児」「１歳」を 1 にする。年齢の見出しでなければ None"""
    t = cell(text)
    if t in _age_alias_override:
        return _age_alias_override[t]
    m = AGE_HEADER.match(t)
    if not m:
        return None
    return int(m.group(1).translate(ZEN))


def read_html(path):
    """自治体のページは文字コードがまちまちなので、順に試して読む"""
    with open(path, "rb") as f:
        raw = f.read()
    for enc in ("utf-8", "euc_jp", "shift_jis", "cp932"):
        try:
            return raw.decode(enc)
        except UnicodeDecodeError:
            continue
    fail("HTMLの文字コードを判別できませんでした")


def extract_html_tables(html_path, conf):
    """
    公式ページのHTMLの表を読む。

    年齢の列は**見出し行の文字から自動で決める**。
    「5歳児 4歳児 …」と降順に並べる自治体があり、列番号を設定に書くと間違えやすい。
    行の取り出しはPDFと同じ rows_from_grid に任せ、ここは表の選び分けだけをする。
    """
    parser = TableGrabber()
    parser.feed(read_html(html_path))

    mode = conf.get("categoryFrom", "row")
    only = conf.get("onlyTablesContaining")
    stop = conf.get("stopSection")

    def trim(text):
        for pat in conf.get("categoryTrim", []):
            text = re.sub(pat, "", text)
        return text.strip() or None

    rows = []
    category = None
    for t in parser.tables:
        heading = t["heading"]
        if only and not re.search(only, heading):
            continue
        if stop and re.search(stop, heading):
            continue
        seed = trim(heading) if mode == "heading" else category
        # 施設を横（列）に、年齢を縦（行）に並べる表がある（川越町）。
        # PDF と同じく縦横を入れ替えてから読む
        grid = transpose_grid(t["grid"]) if conf.get("transpose") else t["grid"]
        got, carried = rows_from_grid(grid, conf, seed)
        if mode == "row":
            category = carried
        rows.extend(got)

    return rows


def extract_side_by_side(pdf, conf):
    """左右2組に分かれた表を読む

    紙を節約するために**同じ表を左右に2つ並べる**自治体がある（長岡市）。
    さらに0歳・1歳が「ほふくしない／する」の2列に割れていて、
    0歳の空きは2列のどちらかに空きがあれば「空きあり」になる。

    設定
      blocks … 各組の [施設名の列, 年齢の列を並べた配列]
      mergePairs … 2列で1つの年齢を表す組み合わせ。片方でも空きがあれば空きとする
    """
    blocks = conf["blocks"]
    as_symbol = "symbol" in conf.get("metrics", ["vacancy"])
    symbol_map = conf.get("symbolMap") or {}
    open_marks = set(conf.get("openMarks", []))
    skip = [cell(x) for x in conf.get("skipRowsContaining", [])]
    unit = conf.get("valueUnit", "")
    rows = []
    for table in tables_of(pdf, conf.get("tableSettings")):
        for raw in table:
            r = [cell(c) for c in raw]
            for blk in blocks:
                name_col, age_cols = blk["name"], blk["ages"]
                # ages には「[1,2]」のように2列を束ねた指定が混ざる
                flat = [c for spec in age_cols for c in (spec if isinstance(spec, list) else [spec])]
                if len(r) <= max(flat):
                    continue
                name = r[name_col]
                if not name or age_of_header(name) is not None:
                    continue
                if any(x and x in name for x in skip):
                    continue
                values, symbols, ok = [None] * 6, [None] * 6, False
                for age, spec in enumerate(age_cols):
                    cols = spec if isinstance(spec, list) else [spec]
                    texts = [r[c] for c in cols if c < len(r) and r[c]]
                    if not texts:
                        continue
                    if as_symbol:
                        vals = [symbol_map.get(t, t) for t in texts]
                        # 2列に割れている年齢は、片方でも空きがあれば空きとみなす
                        pick = next((v for v in vals if v in open_marks), vals[0])
                        symbols[age] = pick
                    else:
                        nums = [parse_number(t, unit) for t in texts]
                        nums = [n for n in nums if n is not None]
                        if not nums:
                            continue
                        values[age] = sum(nums)
                    ok = True
                if ok:
                    row = {"name": name, "vacancy": values}
                    if as_symbol:
                        row["symbols"] = symbols
                    rows.append(row)
    return rows


def extract_word_grid(pdf, conf):
    """文字の位置から年齢の列を決めて読む

    罫線はきれいなのに pdfplumber の表抽出だと値が隣のマスに寄ってしまう
    PDFがある（江津市。空きのある年齢だけ数字を書く形）。
    そういう表は、**年齢の見出しが紙のどこに置かれているか**を測り、
    数字のx座標がどの見出しに近いかで年齢を決めたほうが確実に読める。
    """
    unit = conf.get("valueUnit", "人")
    empty_value = conf.get("emptyValue")
    skip = [cell(s) for s in conf.get("skipRowsContaining", [])]
    rows = []
    # 同じPDFに園の一覧表などが続く自治体があるので、読むページ数を絞れるようにする
    max_pages = conf.get("maxPages")
    for page in (pdf.pages[:max_pages] if max_pages else pdf.pages):
        words = page.extract_words()
        # 年齢の見出しの中心x
        centers = {}
        for w in words:
            m = re.fullmatch(r"([0-5０-５])歳児?", cell(w["text"]))
            if m:
                a = int(m.group(1).translate(ZEN))
                centers.setdefault(a, (w["x0"] + w["x1"]) / 2)
        if len(centers) != 6:
            continue
        left = min(centers.values())
        # 1ページに空き状況の表と園の一覧表が同居する自治体がある（みどり市）。
        # 「ここから下は読まない」と紙の下端を割合で指定できるようにする
        stop_at = conf.get("stopBelow")
        limit = page.height * stop_at if stop_at else None
        # 行ごとに words をまとめる（同じ高さのものを1行とみなす）
        # 何画素ぶんを「同じ行」とみなすか。1施設が上下2段になる表では
        # 段の高さぶんまとめないと、記号と施設名が別の行になってしまう
        band = conf.get("rowBand", 8)
        lines = {}
        for w in words:
            key = round(w["top"] / band)
            lines.setdefault(key, []).append(w)
        for key in sorted(lines):
            ws = sorted(lines[key], key=lambda w: w["x0"])
            if limit and ws and ws[0]["top"] > limit:
                break
            # 施設名 = 年齢の見出しより左にある文字をつないだもの
            name = "".join(cell(w["text"]) for w in ws if (w["x0"] + w["x1"]) / 2 < left - 10)
            name = re.sub(r"[0-9０-９]+人?$", "", name)
            for pat in conf.get("nameTrim", []):
                name = re.sub(pat, "", name)
            if not name or age_of_header(name) is not None or "保育所名" in name:
                continue
            if any(x and x in name for x in skip):
                continue
            # 縦書きの「私立保育園」が1文字ずつ別行になることがある（みどり市）。
            # 施設の行だけを残す形を設定で書けるようにする
            drop = conf.get("skipRowsMatching")
            if drop and re.search(drop, name):
                continue
            values = [None] * 6
            symbols = [None] * 6
            ok = False
            # 1施設が上下2段になっていて、上段が記号（空き状況）、
            # 下段が数字（入所待ち児童数）という表がある（小樽市）。
            # 記号だけを読む指定ができるようにする
            as_symbol = "symbol" in conf.get("metrics", ["vacancy"])
            symbol_map = conf.get("symbolMap") or {}
            marks = set(conf.get("symbolMarks", []))
            if as_symbol:
                base = ws[0]["top"] if ws else 0
                for w in ws:
                    t = cell(w["text"])
                    if t not in marks:
                        continue
                    x = (w["x0"] + w["x1"]) / 2
                    if x < left - 10:
                        continue
                    a = min(centers, key=lambda k: abs(centers[k] - x))
                    if abs(centers[a] - x) > 40:
                        continue
                    symbols[a] = symbol_map.get(t, t)
                    ok = True
                em = conf.get("emptyMark")
                if em:
                    symbols = [em if v is None else v for v in symbols]
                    ok = True
                if ok:
                    rows.append({"name": name, "vacancy": [None] * 6, "symbols": symbols})
                continue
            for w in ws:
                t = cell(w["text"]).replace(unit, "")
                if not re.fullmatch(r"\d+", t):
                    continue
                x = (w["x0"] + w["x1"]) / 2
                if x < left - 10:
                    continue
                # いちばん近い年齢の見出しに割り当てる
                a = min(centers, key=lambda k: abs(centers[k] - x))
                if abs(centers[a] - x) > 40:
                    continue
                values[a] = int(t)
                ok = True
            if empty_value is not None:
                values = [empty_value if v is None else v for v in values]
                ok = True
            if ok:
                rows.append({"name": name, "vacancy": values})
    return rows


def extract_age_rows(pdf, conf):
    """
    1施設が「0歳児〜5歳児」の6行に縦に分かれ、列は入所月などになっている表を読む。

    長浜市の「募集人数一覧表」がこの形で、施設名は6行のうち先頭にしか入っていない
    （PDFの結合セル）。読みたい列は設定の columns.value で指定する。
    """
    cols = conf["columns"]
    name_col = cols["name"]
    age_col = cols["age"]
    value_col = cols["value"]
    cat_col = cols.get("category")
    unit = conf.get("valueUnit", "")
    skip = [cell(s) for s in conf.get("skipRowsContaining", [])]

    rows = []
    cur_name = ""
    cur_cat = None
    values = [None] * 6
    seen_any = False

    def flush():
        nonlocal values, seen_any
        if cur_name and seen_any:
            row = {"name": cur_name, "vacancy": values}
            if cat_col is not None and cur_cat:
                row["category"] = cur_cat
            rows.append(row)
        values = [None] * 6
        seen_any = False

    for table in tables_of(pdf, conf.get("tableSettings")):
        for raw in table:
            if raw is None:
                continue
            width = max(name_col, age_col, value_col, cat_col or 0) + 1
            if len(raw) < width:
                continue
            r = [cell(c) for c in raw]
            if any(x and x in "".join(r) for x in skip):
                continue
            age = age_of_header(r[age_col])
            if age is None:
                continue
            name = r[name_col]
            if name:
                # 施設名が入っている行が、次の施設の始まり
                flush()
                cur_name = name
            if cat_col is not None and r[cat_col]:
                text = r[cat_col]
                for pat in conf.get("categoryTrim", []):
                    text = re.sub(pat, "", text)
                cur_cat = text.strip() or cur_cat
            n = parse_number(r[value_col], unit)
            if n is not None:
                values[age] = n
                seen_any = True
    flush()
    return rows


def main():
    # Windowsの既定（cp932）だと日本語が化けてJSONとして読めなくなる
    sys.stdout.reconfigure(encoding="utf-8")
    if len(sys.argv) != 3:
        fail("使い方: python scripts/vacancy-generic-extract.py <pdf> <config.json>")
    pdf_path, conf_path = sys.argv[1], sys.argv[2]
    with open(conf_path, encoding="utf-8") as f:
        conf = json.load(f)

    # 年齢の見出しに学年の呼び方を使う自治体のために、読み替え表を差し込む
    alias = conf.get("ageHeaderMap")
    if alias:
        _age_alias_override.update({cell(k): v for k, v in alias.items()})

    layout = conf.get("layout", "one-table")
    if layout == "image-table":
        # 紙をスキャンしただけのPDFは文字が入っていないので、罫線から升目を
        # 割り出して1マスずつ読む。専用の重い処理なので別のファイルに置いている
        import importlib.util
        import os

        spec = importlib.util.spec_from_file_location(
            "vacancy_image_table", os.path.join(os.path.dirname(__file__), "vacancy-image-table.py")
        )
        vit = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(vit)
        rows = vit.extract(open(pdf_path, "rb").read(), conf)
        minimum = conf.get("minFacilities", 3)
        if len(rows) < minimum:
            fail(f"読み取れた施設が {len(rows)} 件で、想定の {minimum} 件を下回りました")
        print(json.dumps({"rows": rows, "text": conf.get("imageAsOfText", "")}, ensure_ascii=False))
        return

    if layout == "html-tables":
        rows = extract_html_tables(pdf_path, conf)
        minimum = conf.get("minFacilities", 3)
        if len(rows) < minimum:
            fail(f"読み取れた施設が {len(rows)} 件で、想定の {minimum} 件を下回りました")
        print(json.dumps({"rows": rows, "text": ""}, ensure_ascii=False))
        return

    with pdfplumber.open(pdf_path) as pdf:
        if not pdf.pages:
            fail("PDFにページがありません")
        text = "\n".join((p.extract_text() or "") for p in pdf.pages)
        if layout == "auto-table":
            rows = extract_auto_table(pdf, conf)
        elif layout == "one-table":
            rows = extract_one_table(pdf, conf)
        elif layout == "age-sections":
            rows = extract_age_sections(pdf, conf)
        elif layout == "side-by-side":
            rows = extract_side_by_side(pdf, conf)
        elif layout == "word-grid":
            rows = extract_word_grid(pdf, conf)
        elif layout == "age-rows":
            rows = extract_age_rows(pdf, conf)
        else:
            fail(f"未対応の layout: {layout}")

    minimum = conf.get("minFacilities", 3)
    if len(rows) < minimum:
        fail(f"読み取れた施設が {len(rows)} 件で、想定の {minimum} 件を下回りました")

    print(json.dumps({"rows": rows, "text": text}, ensure_ascii=False))


if __name__ == "__main__":
    main()
