// このファイルは scripts/gen-fact-index.py が作る。手で編集しない
import type { HokatsuRecord } from "../types";

import abiko from "./abiko.json";
import adachi from "./adachi.json";
import ageo from "./ageo.json";
import akashi from "./akashi.json";
import akita from "./akita.json";
import aomori from "./aomori.json";
import arakawa from "./arakawa.json";
import asahikawa from "./asahikawa.json";
import atsugi from "./atsugi.json";
import ayase from "./ayase.json";
import bunkyo from "./bunkyo.json";
import chigasaki from "./chigasaki.json";
import chikushino from "./chikushino.json";
import chiyoda from "./chiyoda.json";
import chofu from "./chofu.json";
import chuo from "./chuo.json";
import edogawa from "./edogawa.json";
import fuchu from "./fuchu.json";
import fuji from "./fuji.json";
import fujimino from "./fujimino.json";
import fujisawa from "./fujisawa.json";
import fukaya from "./fukaya.json";
import fukui from "./fukui.json";
import fukuoka from "./fukuoka.json";
import fukushima from "./fukushima.json";
import fukuyama from "./fukuyama.json";
import funabashi from "./funabashi.json";
import gifu from "./gifu.json";
import hachioji from "./hachioji.json";
import hakodate from "./hakodate.json";
import hamamatsu from "./hamamatsu.json";
import hatsukaichi from "./hatsukaichi.json";
import higashihiroshima from "./higashihiroshima.json";
import higashiosaka from "./higashiosaka.json";
import hikone from "./hikone.json";
import himeji from "./himeji.json";
import hirakata from "./hirakata.json";
import hiratsuka from "./hiratsuka.json";
import hiroshima from "./hiroshima.json";
import ibaraki from "./ibaraki.json";
import ichikawa from "./ichikawa.json";
import ichinomiya from "./ichinomiya.json";
import isesaki from "./isesaki.json";
import itabashi from "./itabashi.json";
import itami from "./itami.json";
import iwaki from "./iwaki.json";
import izumi from "./izumi.json";
import joetsu from "./joetsu.json";
import kagoshima from "./kagoshima.json";
import kakogawa from "./kakogawa.json";
import kanazawa from "./kanazawa.json";
import kashiwa from "./kashiwa.json";
import kasugai from "./kasugai.json";
import kasukabe from "./kasukabe.json";
import katsushika from "./katsushika.json";
import kawagoe from "./kawagoe.json";
import kawaguchi from "./kawaguchi.json";
import kawanishi from "./kawanishi.json";
import kishiwada from "./kishiwada.json";
import kita from "./kita.json";
import kitakyushu from "./kitakyushu.json";
import kobe from "./kobe.json";
import kochi from "./kochi.json";
import kofu from "./kofu.json";
import koriyama from "./koriyama.json";
import koshigaya from "./koshigaya.json";
import koto from "./koto.json";
import kumagaya from "./kumagaya.json";
import kumamoto from "./kumamoto.json";
import kurashiki from "./kurashiki.json";
import kure from "./kure.json";
import kurume from "./kurume.json";
import kusatsu from "./kusatsu.json";
import kyoto from "./kyoto.json";
import machida from "./machida.json";
import maebashi from "./maebashi.json";
import matsudo from "./matsudo.json";
import matsue from "./matsue.json";
import matsumoto from "./matsumoto.json";
import matsuyama from "./matsuyama.json";
import meguro from "./meguro.json";
import minato from "./minato.json";
import misato from "./misato.json";
import mitaka from "./mitaka.json";
import mito from "./mito.json";
import miyazaki from "./miyazaki.json";
import moriguchi from "./moriguchi.json";
import morioka from "./morioka.json";
import nagano from "./nagano.json";
import nagaokakyo from "./nagaokakyo.json";
import nagasaki from "./nagasaki.json";
import nagoya from "./nagoya.json";
import naha from "./naha.json";
import nakano from "./nakano.json";
import nara from "./nara.json";
import nasushiobara from "./nasushiobara.json";
import nerima from "./nerima.json";
import neyagawa from "./neyagawa.json";
import niigata from "./niigata.json";
import nishinomiya from "./nishinomiya.json";
import nishitokyo from "./nishitokyo.json";
import nisshin from "./nisshin.json";
import numazu from "./numazu.json";
import obihiro from "./obihiro.json";
import obu from "./obu.json";
import odawara from "./odawara.json";
import ogaki from "./ogaki.json";
import oita from "./oita.json";
import okayama from "./okayama.json";
import okazaki from "./okazaki.json";
import okegawa from "./okegawa.json";
import osaka from "./osaka.json";
import ota from "./ota.json";
import otsu from "./otsu.json";
import saga from "./saga.json";
import sagamihara from "./sagamihara.json";
import saitama from "./saitama.json";
import sakai from "./sakai.json";
import sapporo from "./sapporo.json";
import sasebo from "./sasebo.json";
import sayama from "./sayama.json";
import sendai from "./sendai.json";
import setagaya from "./setagaya.json";
import settsu from "./settsu.json";
import shibuya from "./shibuya.json";
import shimonoseki from "./shimonoseki.json";
import shinagawa from "./shinagawa.json";
import shinjuku from "./shinjuku.json";
import shizuoka from "./shizuoka.json";
import soka from "./soka.json";
import suginami from "./suginami.json";
import suita from "./suita.json";
import sumida from "./sumida.json";
import suzuka from "./suzuka.json";
import taito from "./taito.json";
import takamatsu from "./takamatsu.json";
import takarazuka from "./takarazuka.json";
import takasaki from "./takasaki.json";
import takatsuki from "./takatsuki.json";
import tokorozawa from "./tokorozawa.json";
import tokushima from "./tokushima.json";
import toshima from "./toshima.json";
import tottori from "./tottori.json";
import toyama from "./toyama.json";
import toyohashi from "./toyohashi.json";
import toyokawa from "./toyokawa.json";
import toyonaka from "./toyonaka.json";
import toyota from "./toyota.json";
import tsu from "./tsu.json";
import tsukuba from "./tsukuba.json";
import wakayama from "./wakayama.json";
import yamagata from "./yamagata.json";
import yamaguchi from "./yamaguchi.json";
import yamato from "./yamato.json";
import yao from "./yao.json";
import yokkaichi from "./yokkaichi.json";
import yokohama from "./yokohama.json";
import yokosuka from "./yokosuka.json";

// JSON の文字列は union 型に狭まらないので、ここで型を付ける。
// 値の検査は scripts/verify-fact-records.py が行う
export const hokatsuRecords: HokatsuRecord[] = [
  abiko as HokatsuRecord,
  adachi as HokatsuRecord,
  ageo as HokatsuRecord,
  akashi as HokatsuRecord,
  akita as HokatsuRecord,
  aomori as HokatsuRecord,
  arakawa as HokatsuRecord,
  asahikawa as HokatsuRecord,
  atsugi as HokatsuRecord,
  ayase as HokatsuRecord,
  bunkyo as HokatsuRecord,
  chigasaki as HokatsuRecord,
  chikushino as HokatsuRecord,
  chiyoda as HokatsuRecord,
  chofu as HokatsuRecord,
  chuo as HokatsuRecord,
  edogawa as HokatsuRecord,
  fuchu as HokatsuRecord,
  fuji as HokatsuRecord,
  fujimino as HokatsuRecord,
  fujisawa as HokatsuRecord,
  fukaya as HokatsuRecord,
  fukui as HokatsuRecord,
  fukuoka as HokatsuRecord,
  fukushima as HokatsuRecord,
  fukuyama as HokatsuRecord,
  funabashi as HokatsuRecord,
  gifu as HokatsuRecord,
  hachioji as HokatsuRecord,
  hakodate as HokatsuRecord,
  hamamatsu as HokatsuRecord,
  hatsukaichi as HokatsuRecord,
  higashihiroshima as HokatsuRecord,
  higashiosaka as HokatsuRecord,
  hikone as HokatsuRecord,
  himeji as HokatsuRecord,
  hirakata as HokatsuRecord,
  hiratsuka as HokatsuRecord,
  hiroshima as HokatsuRecord,
  ibaraki as HokatsuRecord,
  ichikawa as HokatsuRecord,
  ichinomiya as HokatsuRecord,
  isesaki as HokatsuRecord,
  itabashi as HokatsuRecord,
  itami as HokatsuRecord,
  iwaki as HokatsuRecord,
  izumi as HokatsuRecord,
  joetsu as HokatsuRecord,
  kagoshima as HokatsuRecord,
  kakogawa as HokatsuRecord,
  kanazawa as HokatsuRecord,
  kashiwa as HokatsuRecord,
  kasugai as HokatsuRecord,
  kasukabe as HokatsuRecord,
  katsushika as HokatsuRecord,
  kawagoe as HokatsuRecord,
  kawaguchi as HokatsuRecord,
  kawanishi as HokatsuRecord,
  kishiwada as HokatsuRecord,
  kita as HokatsuRecord,
  kitakyushu as HokatsuRecord,
  kobe as HokatsuRecord,
  kochi as HokatsuRecord,
  kofu as HokatsuRecord,
  koriyama as HokatsuRecord,
  koshigaya as HokatsuRecord,
  koto as HokatsuRecord,
  kumagaya as HokatsuRecord,
  kumamoto as HokatsuRecord,
  kurashiki as HokatsuRecord,
  kure as HokatsuRecord,
  kurume as HokatsuRecord,
  kusatsu as HokatsuRecord,
  kyoto as HokatsuRecord,
  machida as HokatsuRecord,
  maebashi as HokatsuRecord,
  matsudo as HokatsuRecord,
  matsue as HokatsuRecord,
  matsumoto as HokatsuRecord,
  matsuyama as HokatsuRecord,
  meguro as HokatsuRecord,
  minato as HokatsuRecord,
  misato as HokatsuRecord,
  mitaka as HokatsuRecord,
  mito as HokatsuRecord,
  miyazaki as HokatsuRecord,
  moriguchi as HokatsuRecord,
  morioka as HokatsuRecord,
  nagano as HokatsuRecord,
  nagaokakyo as HokatsuRecord,
  nagasaki as HokatsuRecord,
  nagoya as HokatsuRecord,
  naha as HokatsuRecord,
  nakano as HokatsuRecord,
  nara as HokatsuRecord,
  nasushiobara as HokatsuRecord,
  nerima as HokatsuRecord,
  neyagawa as HokatsuRecord,
  niigata as HokatsuRecord,
  nishinomiya as HokatsuRecord,
  nishitokyo as HokatsuRecord,
  nisshin as HokatsuRecord,
  numazu as HokatsuRecord,
  obihiro as HokatsuRecord,
  obu as HokatsuRecord,
  odawara as HokatsuRecord,
  ogaki as HokatsuRecord,
  oita as HokatsuRecord,
  okayama as HokatsuRecord,
  okazaki as HokatsuRecord,
  okegawa as HokatsuRecord,
  osaka as HokatsuRecord,
  ota as HokatsuRecord,
  otsu as HokatsuRecord,
  saga as HokatsuRecord,
  sagamihara as HokatsuRecord,
  saitama as HokatsuRecord,
  sakai as HokatsuRecord,
  sapporo as HokatsuRecord,
  sasebo as HokatsuRecord,
  sayama as HokatsuRecord,
  sendai as HokatsuRecord,
  setagaya as HokatsuRecord,
  settsu as HokatsuRecord,
  shibuya as HokatsuRecord,
  shimonoseki as HokatsuRecord,
  shinagawa as HokatsuRecord,
  shinjuku as HokatsuRecord,
  shizuoka as HokatsuRecord,
  soka as HokatsuRecord,
  suginami as HokatsuRecord,
  suita as HokatsuRecord,
  sumida as HokatsuRecord,
  suzuka as HokatsuRecord,
  taito as HokatsuRecord,
  takamatsu as HokatsuRecord,
  takarazuka as HokatsuRecord,
  takasaki as HokatsuRecord,
  takatsuki as HokatsuRecord,
  tokorozawa as HokatsuRecord,
  tokushima as HokatsuRecord,
  toshima as HokatsuRecord,
  tottori as HokatsuRecord,
  toyama as HokatsuRecord,
  toyohashi as HokatsuRecord,
  toyokawa as HokatsuRecord,
  toyonaka as HokatsuRecord,
  toyota as HokatsuRecord,
  tsu as HokatsuRecord,
  tsukuba as HokatsuRecord,
  wakayama as HokatsuRecord,
  yamagata as HokatsuRecord,
  yamaguchi as HokatsuRecord,
  yamato as HokatsuRecord,
  yao as HokatsuRecord,
  yokkaichi as HokatsuRecord,
  yokohama as HokatsuRecord,
  yokosuka as HokatsuRecord,
];
