"""
足立区の「保育施設募集人数（例月入所分）」PDF 3本から表を抜き出してJSONで返す

実行: python scripts/adachi-pdf-extract.py <認可等.pdf> <保育ママ.pdf> <認定こども園.pdf>
出力: 標準出力にJSON（fetch-adachi-vacancy.ts から呼ぶ）

## 3本とも表の作りが違う
1. 認可保育所・区立認定こども園・小規模保育室
   見出しが2行（1行目に「クラス別募集人員」、2行目に「０歳〜５歳」）。
   **ページによって空列の有無が変わり、11列だったり12列だったりする**ので、
   2行目の年齢ラベルの位置から列を決める。
2. 家庭的保育（保育ママ）
   **0〜2歳の値が「クラス別内訳人数」1セルに3文字で詰まっている**（"010" なら1歳だけ1）。
   保育ママは定員3〜5人なので1桁で収まる前提。3文字でなければ中断する。
3. 私立認定こども園
   27列に細かく割れているが、値は 2,5,8,11,14,17 列目に入る。3施設だけ。

## 記号
- `－` `----` `※` は募集をしない/休業でクラスなし扱い。空きが0であることとは違う
"""

import json
import re
import sys

import pdfplumber

AGE_LABELS = ["０歳", "１歳", "２歳", "３歳", "４歳", "５歳"]
NO_CLASS = {"－", "-", "ー", "----", "－－－－", "※", "―"}


def fail(message):
    raise SystemExit(f"[中断] {message}")


def normalize(s):
    if s is None:
        return ""
    return "".join(str(s).split())


def canonical_ward(name, known):
    """
    地区名は縦書きのセルがあり、抽出すると文字順が乱れることがある
    （「江北・興野・本木地域」が「江本北木・地興域野・」になる）。
    文字の多重集合が一致する既知の地区名に寄せる。一致しなければ呼び出し側で中断する。
    """
    if not name:
        return ""
    if name in known:
        return name
    key = sorted(name)
    for k in known:
        if sorted(k) == key:
            return k
    return None


def parse_value(v, where):
    """募集人数のセルを数値かNone（クラスなし）にする"""
    v = normalize(v)
    if v == "":
        return None
    if v in NO_CLASS or set(v) <= {"-", "－", "―", "ー"} or set(v) <= {"※"}:
        return None
    if re.fullmatch(r"\d+", v):
        return int(v)
    fail(f"{where}: 募集人数として読めない値です: 「{v}」")


def extract_ninka(path):
    """1. 認可保育所・区立認定こども園・小規模保育室"""
    rows = []
    as_of = set()
    target = set()
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            m = re.search(r"(\d{4})/(\d{1,2})/(\d{1,2})\s*現在", text)
            if m:
                as_of.add((int(m.group(1)), int(m.group(2)), int(m.group(3))))
            m = re.search(r"令和(\d+)年(\d+)月入所募集分", text)
            if m:
                target.add((int(m.group(1)), int(m.group(2))))
            for table in page.extract_tables():
                if len(table) < 3:
                    continue
                head1 = [normalize(c) for c in table[0]]
                head2 = [normalize(c) for c in table[1]]
                if head1[:3] != ["地区", "区分", "保育園名(定員:単位人)"]:
                    fail(f"{path}: 見出しが想定と違います: {head1}")
                # 年齢の列位置は2行目から引く（ページによって空列の数が変わる）
                age_index = []
                for label in AGE_LABELS:
                    if label not in head2:
                        fail(f"{path}: 2行目に「{label}」がありません: {head2}")
                    age_index.append(head2.index(label))
                ward = ""
                for raw in table[2:]:
                    cells = [normalize(c) for c in raw]
                    if not any(cells):
                        continue
                    if cells[0]:
                        ward = cells[0]
                    name = cells[2]
                    if not name:
                        continue
                    rows.append(
                        {
                            "kind": "認可等",
                            "ward": ward,
                            "category": cells[1],
                            "name": name,
                            "ages": [
                                parse_value(cells[i] if i < len(cells) else "", f"{path} {name}")
                                for i in age_index
                            ],
                        }
                    )
    return rows, as_of, target


def extract_mama(path):
    """2. 家庭的保育（保育ママ）"""
    rows = []
    target = set()
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            m = re.search(r"令和(\d+)年(\d+)月入所募集分", text)
            if m:
                target.add((int(m.group(1)), int(m.group(2))))
            for table in page.extract_tables():
                head = [normalize(c) for c in table[0]]
                if "クラス別内訳人数" not in head:
                    continue
                i_ward = head.index("地区") if "地区" in head else 0
                i_name = head.index("保育施設名(定員:単位人)")
                i_addr = head.index("施設所在地") if "施設所在地" in head else None
                i_val = head.index("クラス別内訳人数")
                ward = ""
                for raw in table[1:]:
                    cells = [normalize(c) for c in raw]
                    if not any(cells):
                        continue
                    if i_ward < len(cells) and cells[i_ward]:
                        ward = cells[i_ward]
                    name = cells[i_name] if i_name < len(cells) else ""
                    if not name or name == "保育施設名(定員:単位人)":
                        continue
                    v = cells[i_val] if i_val < len(cells) else ""
                    if v == "":
                        continue
                    if len(v) != 3:
                        fail(f"{path}: {name} の内訳が3文字ではありません: 「{v}」（2桁の募集数が出た可能性）")
                    ages = [parse_value(ch, f"{path} {name}") for ch in v]
                    rows.append(
                        {
                            "kind": "保育ママ",
                            "ward": ward,
                            "category": "家庭的保育（保育ママ）",
                            "name": name,
                            "address": cells[i_addr] if i_addr is not None and i_addr < len(cells) else "",
                            "ages": ages + [None, None, None],
                        }
                    )
    return rows, target


def extract_kodomoen(path):
    """3. 私立認定こども園"""
    rows = []
    target = set()
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            m = re.search(r"令和([０-９\d]+)年([０-９\d]+)月入所募集分", text)
            if m:
                z = str.maketrans("０１２３４５６７８９", "0123456789")
                target.add((int(m.group(1).translate(z)), int(m.group(2).translate(z))))
            for table in page.extract_tables():
                head = [normalize(c) for c in table[0]]
                if head[0] != "園名" or "0歳" not in head:
                    continue
                age_index = []
                for label in ["0歳", "1歳", "2歳", "3歳", "4歳", "5歳"]:
                    if label not in head:
                        fail(f"{path}: 見出しに「{label}」がありません: {head}")
                    age_index.append(head.index(label))
                for raw in table[1:]:
                    cells = [normalize(c) for c in raw]
                    name = cells[0] if cells else ""
                    if not name or name == "園名":
                        continue
                    # 値は見出しの次の列に入る（見出し列そのものは空）
                    ages = []
                    for i in age_index:
                        v = ""
                        for j in (i, i + 1, i - 1):
                            if 0 <= j < len(cells) and cells[j]:
                                v = cells[j]
                                break
                        ages.append(parse_value(v, f"{path} {name}"))
                    rows.append({"kind": "認定こども園", "ward": "", "category": "私立認定こども園", "name": name, "ages": ages})
    return rows, target


def main():
    paths = sys.argv[1:]
    if len(paths) != 3:
        fail("PDFを3本（認可等・保育ママ・認定こども園）指定してください。")
    ninka, as_of, t1 = extract_ninka(paths[0])
    mama, t2 = extract_mama(paths[1])
    koen, t3 = extract_kodomoen(paths[2])

    # 認可等のPDFに出てくる地区名を正とし、保育ママ側の乱れた地区名を寄せる
    known = []
    for r in ninka:
        if r["ward"] and r["ward"] not in known:
            known.append(r["ward"])
    for r in ninka + mama + koen:
        fixed = canonical_ward(r["ward"], known)
        if fixed is None:
            fail(f"地区名を既知の地区に対応づけられません: 「{r['ward']}」（既知: {known}）")
        r["ward"] = fixed
    out = {
        "wards": known,
        "asOf": sorted(as_of),
        "targets": {"認可等": sorted(t1), "保育ママ": sorted(t2), "認定こども園": sorted(t3)},
        "rows": ninka + mama + koen,
    }
    sys.stdout.reconfigure(encoding="utf-8")
    json.dump(out, sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
