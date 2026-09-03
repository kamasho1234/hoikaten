/**
 * 名古屋市の保育所等の募集人数を取り込む
 *
 * 実行: npm run vacancy:fetch:nagoya
 *
 * ## この自治体の特徴
 * - 出典は名古屋市の教育・保育情報サイト「ここなご」。**各月1日時点の募集枠**を
 *   16区ぶんまとめたExcelで公開している（同じ内容のPDFもある）。
 * - **0歳が「産明け」と「6ケ月以上」の2列**に分かれているので、合わせて0歳の人数にする。
 * - 人数以外の値が4種類ある（原典の注記より）。いずれも人数が確定しないので「—」にする。
 *   - `-` … 受入可能年齢ではないクラス年齢
 *   - `←` … 左隣のクラス年齢と合わせて募集する（左隣に人数が計上されている）
 *   - `本園に含む` … 分園の人数が本園に含まれている
 *   - `要相談`・`確認中` … 人数が示されていない
 *   ただし0歳の「6ケ月以上」が `←` のときは産明けと合わせた人数なので、産明けの値を使う。
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MUNICIPALITY_SLUG = "nagoya";
const MUNICIPALITY_NAME = "名古屋市";
const SOURCE_NAME = "名古屋市 教育・保育情報サイト「ここなご」募集枠一覧";
const INDEX_URL = "https://kodomokosodate.city.nagoya.jp/firstuse/boshuwaku.html";
const AGE_COUNT = 6;
const MIN_FACILITIES = 600;
const WARD_COUNT = 16;
const UA = "Mozilla/5.0 (compatible; hoikaten/1.0; +https://hoikaten.com)";

/** 人数が確定しない値。「—」にする */
const NOT_A_NUMBER = new Set(["-", "－", "←", "本園に含む", "要相談", "確認中"]);

/**
 * 募集人数の欄が空のまま公表される施設がある（令和8年10月分の「ぶれあ保育室山腰」）。
 * 空きが0なのか、そのクラスがないのかは市の資料からは分からないので、
 * **決めつけずに「—」にし、出典の注記でそのことを伝える。**
 */
const blankFacilities: string[] = [];

const OUT_PATH = path.join(process.cwd(), "src", "lib", "vacancy", `${MUNICIPALITY_SLUG}.json`);
const EXTRACTOR = path.join(process.cwd(), "scripts", "nagoya-xlsx-extract.py");

function fail(message: string): never {
  console.error(`\n[中断] ${message}`);
  process.exit(1);
}

function todayJst(): string {
  const jst = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function squeeze(s: string): string {
  return (s ?? "").replace(/<[^>]+>/g, "").replace(/[\s　]/g, "");
}

function toHalfWidth(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

/** 令和の年を西暦にする */
function reiwaToYear(reiwa: number): number {
  return reiwa + 2018;
}

type XlsxResult = {
  title: string;
  asOf: [number, number, number];
  target: [number, number];
  notes: string[];
  facilities: {
    code: string;
    ward: string;
    name: string;
    classes: string[];
    acceptAge: string;
    note: string;
  }[];
};

function runPython(args: string[]): string {
  const candidates = process.env.PYTHON ? [process.env.PYTHON] : ["python3", "python"];
  let lastError = "";
  for (const bin of candidates) {
    try {
      return execFileSync(bin, args, { encoding: "utf-8", maxBuffer: 128 * 1024 * 1024 });
    } catch (err) {
      const e = err as { code?: string; stderr?: string; message?: string };
      if (e.code === "ENOENT") {
        lastError = `${bin} が見つかりません`;
        continue;
      }
      fail(`Excelの抽出に失敗しました（${bin}）: ${e.stderr || e.message}`);
    }
  }
  fail(`Pythonを実行できません（${lastError}）。openpyxl が入った python が必要です。`);
}

async function main() {
  console.log(`${MUNICIPALITY_NAME}の募集人数を取り込みます`);
  console.log(`公式ページ: ${INDEX_URL}\n`);

  const res = await fetch(INDEX_URL, { headers: { "User-Agent": UA } });
  if (!res.ok) fail(`公式ページが ${res.status} を返しました`);
  const html = await res.text();

  const links = [...html.matchAll(/<a[^>]+href="([^"]+\.xlsx)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ url: new URL(m[1], INDEX_URL).toString(), text: toHalfWidth(squeeze(m[2])) }))
    .filter((l) => l.text.includes("16区"));
  if (links.length !== 1) {
    fail(`16区の募集枠のExcelが${links.length}件あります（1件のはず）`);
  }
  const link = links[0];
  console.log(`Excel: ${link.text}\n  ${link.url}`);

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "nagoya-vacancy-"));
  try {
    const r = await fetch(link.url, { headers: { "User-Agent": UA } });
    if (!r.ok) fail(`Excelの取得に失敗しました（${r.status}）: ${link.url}`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.subarray(0, 2).toString() !== "PK") fail(`Excelではありません: ${link.url}`);
    const file = path.join(tmpDir, "nagoya.xlsx");
    fs.writeFileSync(file, buf);

    let xlsx: XlsxResult;
    try {
      xlsx = JSON.parse(runPython([EXTRACTOR, file])) as XlsxResult;
    } catch (err) {
      fail(`抽出結果を読めません: ${String(err)}`);
    }

    const [reiwa, month, day] = xlsx.asOf;
    const asOf = `${reiwaToYear(reiwa)}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf)) fail(`時点の日付を組み立てられません: ${asOf}`);
    if (asOf > todayJst()) fail(`時点の日付（${asOf}）が今日より先になっています`);
    const targetLabel = `${reiwaToYear(xlsx.target[0])}年${xlsx.target[1]}月`;
    console.log(`時点: ${asOf} ／ 対象: ${targetLabel}利用申込分`);

    const wards: string[] = [];
    const facilities: {
      id: string;
      name: string;
      w: number;
      c: null;
      vacancy: (number | null)[];
    }[] = [];
    const seen = new Set<string>();
    let unknown = 0;
    let merged = 0;
    let total = 0;

    for (const f of xlsx.facilities) {
      const name = squeeze(f.name);
      const code = squeeze(f.code);
      if (!name) fail(`施設CD ${code}: 施設名が空です`);
      if (seen.has(code)) fail(`施設CDが重複しています: ${code}（${name}）`);
      seen.add(code);

      // 区の名前は「千種」のように区が省かれている
      const ward = `${squeeze(f.ward)}区`;
      let w = wards.indexOf(ward);
      if (w < 0) {
        wards.push(ward);
        w = wards.length - 1;
      }

      const raw = f.classes.map((c) => squeeze(c));
      const vacancy: (number | null)[] = [];
      // 欄がまるごと空の施設は、人数が公表されていないものとして「—」にする
      const allBlank = raw.every((v) => v === "" || NOT_A_NUMBER.has(v));
      if (allBlank && raw.some((v) => v === "")) blankFacilities.push(name);

      // 0歳は「産明け」と「6ケ月以上」の2列。
      // 「6ケ月以上」が「←」のときは産明けと合わせた人数なので産明けの値だけを使う
      const [ubuake, sixMonth] = raw;
      const nUbuake = /^\d+$/.test(ubuake) ? Number(ubuake) : null;
      const nSixMonth = /^\d+$/.test(sixMonth) ? Number(sixMonth) : null;
      if (nUbuake !== null && nSixMonth !== null) {
        vacancy.push(nUbuake + nSixMonth);
      } else if (nUbuake !== null || nSixMonth !== null) {
        vacancy.push(nUbuake ?? nSixMonth);
      } else {
        if (!allBlank && (!NOT_A_NUMBER.has(ubuake) || !NOT_A_NUMBER.has(sixMonth))) {
          fail(`${name}: 0歳の値を読めません（「${ubuake}」「${sixMonth}」）`);
        }
        vacancy.push(null);
        unknown += 1;
      }

      for (let age = 1; age < AGE_COUNT; age++) {
        const value = raw[1 + age];
        if (/^\d+$/.test(value)) {
          vacancy.push(Number(value));
          continue;
        }
        if (!allBlank && !NOT_A_NUMBER.has(value)) {
          fail(`${name}: ${age}歳の値を読めません（「${value}」）`);
        }
        if (value === "←") merged += 1;
        vacancy.push(null);
        unknown += 1;
      }

      total += vacancy.reduce<number>((acc, v) => acc + (v ?? 0), 0);
      // 備考（「※0歳2人も可」など）は施設ごとに載せる仕組みがないので取り込まない
      facilities.push({ id: code, name, w, c: null, vacancy });
    }

    if (facilities.length < MIN_FACILITIES) {
      fail(`施設が${facilities.length}件しか取れていません（${MIN_FACILITIES}件以上のはず）`);
    }
    if (wards.length !== WARD_COUNT) {
      fail(`区が${wards.length}件です（${WARD_COUNT}区のはず）`);
    }

    // 検算: 人数の合計をExcelの数字から直接数え直して照合する
    let check = 0;
    for (const f of xlsx.facilities) {
      const raw = f.classes.map((c) => squeeze(c));
      for (const value of raw) {
        if (/^\d+$/.test(value)) check += Number(value);
      }
    }
    if (check !== total) {
      fail(`募集人数の合計が合いません（Excelの数字 ${check} / 取り込み ${total}）`);
    }
    console.log(`募集人数の合計はExcelの数字と一致しました（${total}人）`);

    const previous = fs.existsSync(OUT_PATH)
      ? (JSON.parse(fs.readFileSync(OUT_PATH, "utf-8")) as { asOf?: string; facilities?: unknown[] })
      : null;
    if (previous?.facilities && facilities.length < previous.facilities.length * 0.9) {
      fail(
        `施設数が大きく減っています（前回 ${previous.facilities.length}件 → 今回 ${facilities.length}件）`
      );
    }
    if (previous?.asOf === asOf) {
      console.log(`公式データの時点が前回と同じ（${asOf}）のため更新はありません。`);
      return;
    }

    const notes = [
      `名古屋市が公開しているのは${targetLabel}利用申込分の募集枠で、${asOf}時点のものです。`,
      ...xlsx.notes.filter((n) => !n.startsWith("http") && !n.includes("下記ページ")),
      "0歳は「産明け」と「6ケ月以上」の2つの枠に分かれて公表されているため、合わせた人数にしています。",
      "募集人数が数字で示されていない欄（受入可能年齢ではない・左隣の年齢と合わせて募集・本園に含む・要相談・確認中）は「—」にしています。",
      ...(blankFacilities.length
        ? [
            `次の施設は市の資料で募集人数の欄が空になっています。空きが無いのか、そのクラスがないのかは資料からは分からないため、当サイトでは「—」にしています: ${blankFacilities.join("、")}`,
          ]
        : []),
    ];

    const dataset = {
      municipalitySlug: MUNICIPALITY_SLUG,
      municipalityName: MUNICIPALITY_NAME,
      asOf,
      fetchedAt: todayJst(),
      sourceName: SOURCE_NAME,
      sourceUrl: INDEX_URL,
      sourceFiles: { vacancy: link.url },
      metrics: ["vacancy"],
      subtitle: `${targetLabel}利用申込分の募集人数`,
      notes,
      wards,
      categories: [],
      facilities,
    };

    const { facilities: _f, ...meta } = dataset;
    const metaJson = JSON.stringify(meta, null, 2);
    const metaHead = metaJson.slice(0, metaJson.lastIndexOf("}")).trimEnd();
    const bodyJson = facilities.map((f) => `    ${JSON.stringify(f)}`).join(",\n");
    const out = `${metaHead},\n  "facilities": [\n${bodyJson}\n  ]\n}\n`;
    try {
      JSON.parse(out);
    } catch (err) {
      fail(`生成したJSONが不正です: ${String(err)}`);
    }
    fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
    fs.writeFileSync(OUT_PATH, out, "utf-8");

    console.log(`書き出しました: ${path.relative(process.cwd(), OUT_PATH)}`);
    console.log(`  ${facilities.length}施設 / ${wards.length}区 / 募集${total}人`);
    console.log(`  人数が示されていない欄: ${unknown}（うち左隣と合わせて募集: ${merged}）`);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => fail(String(err)));
