// このファイルは scripts/gen-fact-index.py が作る。手で編集しない
import type { ShurouRecord } from "../types";

import arao from "./arao.json";
import chiba from "./chiba.json";
import chitose from "./chitose.json";
import chuo from "./chuo.json";
import daito from "./daito.json";
import edogawa from "./edogawa.json";
import fuchuHiroshima from "./fuchu-hiroshima.json";
import fujinomiya from "./fujinomiya.json";
import fukuoka from "./fukuoka.json";
import ginowan from "./ginowan.json";
import hachinohe from "./hachinohe.json";
import hamamatsu from "./hamamatsu.json";
import hamura from "./hamura.json";
import hasuda from "./hasuda.json";
import hatsukaichi from "./hatsukaichi.json";
import higashihiroshima from "./higashihiroshima.json";
import higashiosaka from "./higashiosaka.json";
import himeji from "./himeji.json";
import hioki from "./hioki.json";
import hiroshima from "./hiroshima.json";
import iki from "./iki.json";
import inabe from "./inabe.json";
import inagi from "./inagi.json";
import isesaki from "./isesaki.json";
import kadoma from "./kadoma.json";
import kagamino from "./kagamino.json";
import kakogawa from "./kakogawa.json";
import kanazawa from "./kanazawa.json";
import kashiwazaki from "./kashiwazaki.json";
import kawachinagano from "./kawachinagano.json";
import kawasaki from "./kawasaki.json";
import kitakyushu from "./kitakyushu.json";
import kobe from "./kobe.json";
import koryo from "./koryo.json";
import koto from "./koto.json";
import kumamoto from "./kumamoto.json";
import kuwana from "./kuwana.json";
import kyotanabe from "./kyotanabe.json";
import kyoto from "./kyoto.json";
import marugame from "./marugame.json";
import minamiAlps from "./minami-alps.json";
import misato from "./misato.json";
import miyaki from "./miyaki.json";
import miyazaki from "./miyazaki.json";
import muko from "./muko.json";
import musashino from "./musashino.json";
import nagaokakyo from "./nagaokakyo.json";
import nagoya from "./nagoya.json";
import naha from "./naha.json";
import nankoku from "./nankoku.json";
import niigata from "./niigata.json";
import nishinomiya from "./nishinomiya.json";
import nishitokyo from "./nishitokyo.json";
import nisshin from "./nisshin.json";
import numazu from "./numazu.json";
import obu from "./obu.json";
import ogano from "./ogano.json";
import okayama from "./okayama.json";
import osaka from "./osaka.json";
import ota from "./ota.json";
import otsu from "./otsu.json";
import rokunohe from "./rokunohe.json";
import ryugasaki from "./ryugasaki.json";
import sagamihara from "./sagamihara.json";
import saitama from "./saitama.json";
import sakai from "./sakai.json";
import sapporo from "./sapporo.json";
import sendai from "./sendai.json";
import setagaya from "./setagaya.json";
import shibukawa from "./shibukawa.json";
import shinano from "./shinano.json";
import shizuoka from "./shizuoka.json";
import sosa from "./sosa.json";
import suita from "./suita.json";
import suzuka from "./suzuka.json";
import takaoka from "./takaoka.json";
import takasaki from "./takasaki.json";
import tendo from "./tendo.json";
import tochigiCity from "./tochigi-city.json";
import tokorozawa from "./tokorozawa.json";
import toyohashi from "./toyohashi.json";
import toyota from "./toyota.json";
import tsu from "./tsu.json";
import yamato from "./yamato.json";
import yao from "./yao.json";
import yokohama from "./yokohama.json";
import yokote from "./yokote.json";

// JSON の文字列は union 型に狭まらないので、ここで型を付ける。
// 値の検査は scripts/verify-fact-records.py が行う
export const shurouRecords: ShurouRecord[] = [
  arao as ShurouRecord,
  chiba as ShurouRecord,
  chitose as ShurouRecord,
  chuo as ShurouRecord,
  daito as ShurouRecord,
  edogawa as ShurouRecord,
  fuchuHiroshima as ShurouRecord,
  fujinomiya as ShurouRecord,
  fukuoka as ShurouRecord,
  ginowan as ShurouRecord,
  hachinohe as ShurouRecord,
  hamamatsu as ShurouRecord,
  hamura as ShurouRecord,
  hasuda as ShurouRecord,
  hatsukaichi as ShurouRecord,
  higashihiroshima as ShurouRecord,
  higashiosaka as ShurouRecord,
  himeji as ShurouRecord,
  hioki as ShurouRecord,
  hiroshima as ShurouRecord,
  iki as ShurouRecord,
  inabe as ShurouRecord,
  inagi as ShurouRecord,
  isesaki as ShurouRecord,
  kadoma as ShurouRecord,
  kagamino as ShurouRecord,
  kakogawa as ShurouRecord,
  kanazawa as ShurouRecord,
  kashiwazaki as ShurouRecord,
  kawachinagano as ShurouRecord,
  kawasaki as ShurouRecord,
  kitakyushu as ShurouRecord,
  kobe as ShurouRecord,
  koryo as ShurouRecord,
  koto as ShurouRecord,
  kumamoto as ShurouRecord,
  kuwana as ShurouRecord,
  kyotanabe as ShurouRecord,
  kyoto as ShurouRecord,
  marugame as ShurouRecord,
  minamiAlps as ShurouRecord,
  misato as ShurouRecord,
  miyaki as ShurouRecord,
  miyazaki as ShurouRecord,
  muko as ShurouRecord,
  musashino as ShurouRecord,
  nagaokakyo as ShurouRecord,
  nagoya as ShurouRecord,
  naha as ShurouRecord,
  nankoku as ShurouRecord,
  niigata as ShurouRecord,
  nishinomiya as ShurouRecord,
  nishitokyo as ShurouRecord,
  nisshin as ShurouRecord,
  numazu as ShurouRecord,
  obu as ShurouRecord,
  ogano as ShurouRecord,
  okayama as ShurouRecord,
  osaka as ShurouRecord,
  ota as ShurouRecord,
  otsu as ShurouRecord,
  rokunohe as ShurouRecord,
  ryugasaki as ShurouRecord,
  sagamihara as ShurouRecord,
  saitama as ShurouRecord,
  sakai as ShurouRecord,
  sapporo as ShurouRecord,
  sendai as ShurouRecord,
  setagaya as ShurouRecord,
  shibukawa as ShurouRecord,
  shinano as ShurouRecord,
  shizuoka as ShurouRecord,
  sosa as ShurouRecord,
  suita as ShurouRecord,
  suzuka as ShurouRecord,
  takaoka as ShurouRecord,
  takasaki as ShurouRecord,
  tendo as ShurouRecord,
  tochigiCity as ShurouRecord,
  tokorozawa as ShurouRecord,
  toyohashi as ShurouRecord,
  toyota as ShurouRecord,
  tsu as ShurouRecord,
  yamato as ShurouRecord,
  yao as ShurouRecord,
  yokohama as ShurouRecord,
  yokote as ShurouRecord,
];
