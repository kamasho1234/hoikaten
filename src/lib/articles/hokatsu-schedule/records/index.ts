// このファイルは scripts/gen-fact-index.py が作る。手で編集しない
import type { HokatsuRecord } from "../types";

import abiko from "./abiko.json";
import adachi from "./adachi.json";
import ageo from "./ageo.json";
import akashi from "./akashi.json";
import aomori from "./aomori.json";
import ayase from "./ayase.json";
import chikushino from "./chikushino.json";
import fujimino from "./fujimino.json";
import fukaya from "./fukaya.json";
import fukui from "./fukui.json";
import fukuoka from "./fukuoka.json";
import fukushima from "./fukushima.json";
import gifu from "./gifu.json";
import hachioji from "./hachioji.json";
import hamamatsu from "./hamamatsu.json";
import hatsukaichi from "./hatsukaichi.json";
import higashihiroshima from "./higashihiroshima.json";
import higashiosaka from "./higashiosaka.json";
import hikone from "./hikone.json";
import hirakata from "./hirakata.json";
import ibaraki from "./ibaraki.json";
import ichinomiya from "./ichinomiya.json";
import itami from "./itami.json";
import iwaki from "./iwaki.json";
import joetsu from "./joetsu.json";
import kagoshima from "./kagoshima.json";
import kakogawa from "./kakogawa.json";
import kanazawa from "./kanazawa.json";
import kasukabe from "./kasukabe.json";
import kawagoe from "./kawagoe.json";
import kawanishi from "./kawanishi.json";
import kitakyushu from "./kitakyushu.json";
import kobe from "./kobe.json";
import kochi from "./kochi.json";
import kofu from "./kofu.json";
import koriyama from "./koriyama.json";
import koshigaya from "./koshigaya.json";
import kumagaya from "./kumagaya.json";
import kurashiki from "./kurashiki.json";
import kure from "./kure.json";
import kurume from "./kurume.json";
import kusatsu from "./kusatsu.json";
import kyoto from "./kyoto.json";
import machida from "./machida.json";
import matsudo from "./matsudo.json";
import matsumoto from "./matsumoto.json";
import misato from "./misato.json";
import mito from "./mito.json";
import miyazaki from "./miyazaki.json";
import moriguchi from "./moriguchi.json";
import morioka from "./morioka.json";
import nagaokakyo from "./nagaokakyo.json";
import nagasaki from "./nagasaki.json";
import naha from "./naha.json";
import nasushiobara from "./nasushiobara.json";
import neyagawa from "./neyagawa.json";
import niigata from "./niigata.json";
import nishinomiya from "./nishinomiya.json";
import nishitokyo from "./nishitokyo.json";
import nisshin from "./nisshin.json";
import obihiro from "./obihiro.json";
import obu from "./obu.json";
import ogaki from "./ogaki.json";
import oita from "./oita.json";
import okazaki from "./okazaki.json";
import okegawa from "./okegawa.json";
import ota from "./ota.json";
import saga from "./saga.json";
import sagamihara from "./sagamihara.json";
import sasebo from "./sasebo.json";
import sayama from "./sayama.json";
import sendai from "./sendai.json";
import setagaya from "./setagaya.json";
import settsu from "./settsu.json";
import shimonoseki from "./shimonoseki.json";
import suita from "./suita.json";
import suzuka from "./suzuka.json";
import takamatsu from "./takamatsu.json";
import takarazuka from "./takarazuka.json";
import takasaki from "./takasaki.json";
import takatsuki from "./takatsuki.json";
import tokorozawa from "./tokorozawa.json";
import tokushima from "./tokushima.json";
import toyama from "./toyama.json";
import toyohashi from "./toyohashi.json";
import toyokawa from "./toyokawa.json";
import toyonaka from "./toyonaka.json";
import toyota from "./toyota.json";
import tsu from "./tsu.json";
import wakayama from "./wakayama.json";
import yamagata from "./yamagata.json";
import yao from "./yao.json";
import yokkaichi from "./yokkaichi.json";

// JSON の文字列は union 型に狭まらないので、ここで型を付ける。
// 値の検査は scripts/verify-fact-records.py が行う
export const hokatsuRecords: HokatsuRecord[] = [
  abiko as HokatsuRecord,
  adachi as HokatsuRecord,
  ageo as HokatsuRecord,
  akashi as HokatsuRecord,
  aomori as HokatsuRecord,
  ayase as HokatsuRecord,
  chikushino as HokatsuRecord,
  fujimino as HokatsuRecord,
  fukaya as HokatsuRecord,
  fukui as HokatsuRecord,
  fukuoka as HokatsuRecord,
  fukushima as HokatsuRecord,
  gifu as HokatsuRecord,
  hachioji as HokatsuRecord,
  hamamatsu as HokatsuRecord,
  hatsukaichi as HokatsuRecord,
  higashihiroshima as HokatsuRecord,
  higashiosaka as HokatsuRecord,
  hikone as HokatsuRecord,
  hirakata as HokatsuRecord,
  ibaraki as HokatsuRecord,
  ichinomiya as HokatsuRecord,
  itami as HokatsuRecord,
  iwaki as HokatsuRecord,
  joetsu as HokatsuRecord,
  kagoshima as HokatsuRecord,
  kakogawa as HokatsuRecord,
  kanazawa as HokatsuRecord,
  kasukabe as HokatsuRecord,
  kawagoe as HokatsuRecord,
  kawanishi as HokatsuRecord,
  kitakyushu as HokatsuRecord,
  kobe as HokatsuRecord,
  kochi as HokatsuRecord,
  kofu as HokatsuRecord,
  koriyama as HokatsuRecord,
  koshigaya as HokatsuRecord,
  kumagaya as HokatsuRecord,
  kurashiki as HokatsuRecord,
  kure as HokatsuRecord,
  kurume as HokatsuRecord,
  kusatsu as HokatsuRecord,
  kyoto as HokatsuRecord,
  machida as HokatsuRecord,
  matsudo as HokatsuRecord,
  matsumoto as HokatsuRecord,
  misato as HokatsuRecord,
  mito as HokatsuRecord,
  miyazaki as HokatsuRecord,
  moriguchi as HokatsuRecord,
  morioka as HokatsuRecord,
  nagaokakyo as HokatsuRecord,
  nagasaki as HokatsuRecord,
  naha as HokatsuRecord,
  nasushiobara as HokatsuRecord,
  neyagawa as HokatsuRecord,
  niigata as HokatsuRecord,
  nishinomiya as HokatsuRecord,
  nishitokyo as HokatsuRecord,
  nisshin as HokatsuRecord,
  obihiro as HokatsuRecord,
  obu as HokatsuRecord,
  ogaki as HokatsuRecord,
  oita as HokatsuRecord,
  okazaki as HokatsuRecord,
  okegawa as HokatsuRecord,
  ota as HokatsuRecord,
  saga as HokatsuRecord,
  sagamihara as HokatsuRecord,
  sasebo as HokatsuRecord,
  sayama as HokatsuRecord,
  sendai as HokatsuRecord,
  setagaya as HokatsuRecord,
  settsu as HokatsuRecord,
  shimonoseki as HokatsuRecord,
  suita as HokatsuRecord,
  suzuka as HokatsuRecord,
  takamatsu as HokatsuRecord,
  takarazuka as HokatsuRecord,
  takasaki as HokatsuRecord,
  takatsuki as HokatsuRecord,
  tokorozawa as HokatsuRecord,
  tokushima as HokatsuRecord,
  toyama as HokatsuRecord,
  toyohashi as HokatsuRecord,
  toyokawa as HokatsuRecord,
  toyonaka as HokatsuRecord,
  toyota as HokatsuRecord,
  tsu as HokatsuRecord,
  wakayama as HokatsuRecord,
  yamagata as HokatsuRecord,
  yao as HokatsuRecord,
  yokkaichi as HokatsuRecord,
];
