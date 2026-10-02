// このファイルは scripts/gen-fact-index.py が作る。手で編集しない
import type { HokatsuRecord } from "../types";

import abiko from "./abiko.json";
import adachi from "./adachi.json";
import ageo from "./ageo.json";
import akashi from "./akashi.json";
import akiruno from "./akiruno.json";
import akishima from "./akishima.json";
import akita from "./akita.json";
import aomori from "./aomori.json";
import arakawa from "./arakawa.json";
import asahikawa from "./asahikawa.json";
import asaka from "./asaka.json";
import ashikaga from "./ashikaga.json";
import ashiya from "./ashiya.json";
import atsugi from "./atsugi.json";
import ayase from "./ayase.json";
import beppu from "./beppu.json";
import bunkyo from "./bunkyo.json";
import chigasaki from "./chigasaki.json";
import chikushino from "./chikushino.json";
import chita from "./chita.json";
import chiyoda from "./chiyoda.json";
import chofu from "./chofu.json";
import chuo from "./chuo.json";
import daito from "./daito.json";
import dazaifu from "./dazaifu.json";
import edogawa from "./edogawa.json";
import eniwa from "./eniwa.json";
import fuchu from "./fuchu.json";
import fuji from "./fuji.json";
import fujieda from "./fujieda.json";
import fujimi from "./fujimi.json";
import fujimino from "./fujimino.json";
import fujinomiya from "./fujinomiya.json";
import fujisawa from "./fujisawa.json";
import fukaya from "./fukaya.json";
import fukui from "./fukui.json";
import fukuoka from "./fukuoka.json";
import fukushima from "./fukushima.json";
import fukuyama from "./fukuyama.json";
import funabashi from "./funabashi.json";
import fussa from "./fussa.json";
import gifu from "./gifu.json";
import ginowan from "./ginowan.json";
import gyoda from "./gyoda.json";
import habikino from "./habikino.json";
import hachinohe from "./hachinohe.json";
import hachioji from "./hachioji.json";
import hakodate from "./hakodate.json";
import hakusan from "./hakusan.json";
import hamamatsu from "./hamamatsu.json";
import hamura from "./hamura.json";
import hatsukaichi from "./hatsukaichi.json";
import higashihiroshima from "./higashihiroshima.json";
import higashikurume from "./higashikurume.json";
import higashimatsuyama from "./higashimatsuyama.json";
import higashimurayama from "./higashimurayama.json";
import higashiosaka from "./higashiosaka.json";
import hikone from "./hikone.json";
import himeji from "./himeji.json";
import hino from "./hino.json";
import hirakata from "./hirakata.json";
import hiratsuka from "./hiratsuka.json";
import hirosaki from "./hirosaki.json";
import hiroshima from "./hiroshima.json";
import hita from "./hita.json";
import hitachi from "./hitachi.json";
import hitachinaka from "./hitachinaka.json";
import ibaraki from "./ibaraki.json";
import ichikawa from "./ichikawa.json";
import ichinomiya from "./ichinomiya.json";
import ichinoseki from "./ichinoseki.json";
import iga from "./iga.json";
import iida from "./iida.json";
import iizuka from "./iizuka.json";
import ikeda from "./ikeda.json";
import ikoma from "./ikoma.json";
import imabari from "./imabari.json";
import iruma from "./iruma.json";
import isahaya from "./isahaya.json";
import ise from "./ise.json";
import isesaki from "./isesaki.json";
import ishigaki from "./ishigaki.json";
import ishinomaki from "./ishinomaki.json";
import itabashi from "./itabashi.json";
import itami from "./itami.json";
import itoman from "./itoman.json";
import itoshima from "./itoshima.json";
import iwaki from "./iwaki.json";
import iwakuni from "./iwakuni.json";
import iwata from "./iwata.json";
import izumi from "./izumi.json";
import izumiotsu from "./izumiotsu.json";
import izumisano from "./izumisano.json";
import izumo from "./izumo.json";
import joetsu from "./joetsu.json";
import kagoshima from "./kagoshima.json";
import kakamigahara from "./kakamigahara.json";
import kakegawa from "./kakegawa.json";
import kakogawa from "./kakogawa.json";
import kamagaya from "./kamagaya.json";
import kamakura from "./kamakura.json";
import kanazawa from "./kanazawa.json";
import kani from "./kani.json";
import kanoya from "./kanoya.json";
import kashiba from "./kashiba.json";
import kashihara from "./kashihara.json";
import kashiwa from "./kashiwa.json";
import kashiwara from "./kashiwara.json";
import kasuga from "./kasuga.json";
import kasugai from "./kasugai.json";
import kasukabe from "./kasukabe.json";
import katano from "./katano.json";
import katsushika from "./katsushika.json";
import kawagoe from "./kawagoe.json";
import kawaguchi from "./kawaguchi.json";
import kawanishi from "./kawanishi.json";
import kazo from "./kazo.json";
import kirishima from "./kirishima.json";
import kiryu from "./kiryu.json";
import kisarazu from "./kisarazu.json";
import kishiwada from "./kishiwada.json";
import kita from "./kita.json";
import kitahiroshima from "./kitahiroshima.json";
import kitakami from "./kitakami.json";
import kitakyushu from "./kitakyushu.json";
import kitami from "./kitami.json";
import kitanagoya from "./kitanagoya.json";
import kobe from "./kobe.json";
import kochi from "./kochi.json";
import kodaira from "./kodaira.json";
import kofu from "./kofu.json";
import koganei from "./koganei.json";
import kokubunji from "./kokubunji.json";
import konan from "./konan.json";
import konosu from "./konosu.json";
import koriyama from "./koriyama.json";
import koshigaya from "./koshigaya.json";
import koto from "./koto.json";
import kuki from "./kuki.json";
import kumagaya from "./kumagaya.json";
import kumamoto from "./kumamoto.json";
import kurashiki from "./kurashiki.json";
import kure from "./kure.json";
import kurume from "./kurume.json";
import kusatsu from "./kusatsu.json";
import kushiro from "./kushiro.json";
import kuwana from "./kuwana.json";
import kyoto from "./kyoto.json";
import machida from "./machida.json";
import maebashi from "./maebashi.json";
import matsubara from "./matsubara.json";
import matsudo from "./matsudo.json";
import matsue from "./matsue.json";
import matsumoto from "./matsumoto.json";
import matsusaka from "./matsusaka.json";
import matsuyama from "./matsuyama.json";
import meguro from "./meguro.json";
import mihara from "./mihara.json";
import miki from "./miki.json";
import minato from "./minato.json";
import misato from "./misato.json";
import mishima from "./mishima.json";
import mitaka from "./mitaka.json";
import mito from "./mito.json";
import miyazaki from "./miyazaki.json";
import moka from "./moka.json";
import moriguchi from "./moriguchi.json";
import morioka from "./morioka.json";
import moriya from "./moriya.json";
import munakata from "./munakata.json";
import musashino from "./musashino.json";
import nagahama from "./nagahama.json";
import nagano from "./nagano.json";
import nagaoka from "./nagaoka.json";
import nagaokakyo from "./nagaokakyo.json";
import nagareyama from "./nagareyama.json";
import nagasaki from "./nagasaki.json";
import nagoya from "./nagoya.json";
import naha from "./naha.json";
import nakano from "./nakano.json";
import nara from "./nara.json";
import narashino from "./narashino.json";
import narita from "./narita.json";
import nasushiobara from "./nasushiobara.json";
import natori from "./natori.json";
import nerima from "./nerima.json";
import neyagawa from "./neyagawa.json";
import niigata from "./niigata.json";
import niihama from "./niihama.json";
import niiza from "./niiza.json";
import nishinomiya from "./nishinomiya.json";
import nishitokyo from "./nishitokyo.json";
import nisshin from "./nisshin.json";
import nobeoka from "./nobeoka.json";
import noda from "./noda.json";
import numazu from "./numazu.json";
import obihiro from "./obihiro.json";
import obu from "./obu.json";
import odawara from "./odawara.json";
import ogaki from "./ogaki.json";
import oita from "./oita.json";
import okayama from "./okayama.json";
import okazaki from "./okazaki.json";
import okegawa from "./okegawa.json";
import okinawa from "./okinawa.json";
import ome from "./ome.json";
import omura from "./omura.json";
import omuta from "./omuta.json";
import onojo from "./onojo.json";
import onomichi from "./onomichi.json";
import osaka from "./osaka.json";
import osakasayama from "./osakasayama.json";
import osaki from "./osaki.json";
import oshu from "./oshu.json";
import ota from "./ota.json";
import otaGunma from "./ota-gunma.json";
import otaru from "./otaru.json";
import otsu from "./otsu.json";
import oyama from "./oyama.json";
import ryugasaki from "./ryugasaki.json";
import saga from "./saga.json";
import sagamihara from "./sagamihara.json";
import saitama from "./saitama.json";
import sakado from "./sakado.json";
import sakai from "./sakai.json";
import sakata from "./sakata.json";
import sakura from "./sakura.json";
import sanda from "./sanda.json";
import sano from "./sano.json";
import sanyoonoda from "./sanyoonoda.json";
import sapporo from "./sapporo.json";
import sasebo from "./sasebo.json";
import satsumasendai from "./satsumasendai.json";
import sayama from "./sayama.json";
import seki from "./seki.json";
import sendai from "./sendai.json";
import sennan from "./sennan.json";
import setagaya from "./setagaya.json";
import settsu from "./settsu.json";
import shibuya from "./shibuya.json";
import shijonawate from "./shijonawate.json";
import shiki from "./shiki.json";
import shimonoseki from "./shimonoseki.json";
import shinagawa from "./shinagawa.json";
import shinjuku from "./shinjuku.json";
import shizuoka from "./shizuoka.json";
import soka from "./soka.json";
import suginami from "./suginami.json";
import suita from "./suita.json";
import sumida from "./sumida.json";
import suzuka from "./suzuka.json";
import tagajo from "./tagajo.json";
import taito from "./taito.json";
import tajimi from "./tajimi.json";
import takamatsu from "./takamatsu.json";
import takaoka from "./takaoka.json";
import takarazuka from "./takarazuka.json";
import takasaki from "./takasaki.json";
import takatsuki from "./takatsuki.json";
import tama from "./tama.json";
import tenri from "./tenri.json";
import tochigiCity from "./tochigi-city.json";
import toda from "./toda.json";
import tokai from "./tokai.json";
import tokorozawa from "./tokorozawa.json";
import tokushima from "./tokushima.json";
import tomakomai from "./tomakomai.json";
import tomigusuku from "./tomigusuku.json";
import tomiya from "./tomiya.json";
import tondabayashi from "./tondabayashi.json";
import toride from "./toride.json";
import toshima from "./toshima.json";
import tottori from "./tottori.json";
import toyama from "./toyama.json";
import toyoake from "./toyoake.json";
import toyohashi from "./toyohashi.json";
import toyokawa from "./toyokawa.json";
import toyonaka from "./toyonaka.json";
import toyota from "./toyota.json";
import tsu from "./tsu.json";
import tsuchiura from "./tsuchiura.json";
import tsukuba from "./tsukuba.json";
import tsuruoka from "./tsuruoka.json";
import tsuyama from "./tsuyama.json";
import ueda from "./ueda.json";
import uji from "./uji.json";
import urayasu from "./urayasu.json";
import uruma from "./uruma.json";
import ushiku from "./ushiku.json";
import wakayama from "./wakayama.json";
import wako from "./wako.json";
import warabi from "./warabi.json";
import yachiyo from "./yachiyo.json";
import yaizu from "./yaizu.json";
import yamagata from "./yamagata.json";
import yamaguchi from "./yamaguchi.json";
import yamato from "./yamato.json";
import yamatokooriyama from "./yamatokooriyama.json";
import yao from "./yao.json";
import yashio from "./yashio.json";
import yatsushiro from "./yatsushiro.json";
import yokkaichi from "./yokkaichi.json";
import yokohama from "./yokohama.json";
import yokosuka from "./yokosuka.json";
import yonago from "./yonago.json";
import yoshikawa from "./yoshikawa.json";
import zama from "./zama.json";

// JSON の文字列は union 型に狭まらないので、ここで型を付ける。
// 値の検査は scripts/verify-fact-records.py が行う
export const hokatsuRecords: HokatsuRecord[] = [
  abiko as HokatsuRecord,
  adachi as HokatsuRecord,
  ageo as HokatsuRecord,
  akashi as HokatsuRecord,
  akiruno as HokatsuRecord,
  akishima as HokatsuRecord,
  akita as HokatsuRecord,
  aomori as HokatsuRecord,
  arakawa as HokatsuRecord,
  asahikawa as HokatsuRecord,
  asaka as HokatsuRecord,
  ashikaga as HokatsuRecord,
  ashiya as HokatsuRecord,
  atsugi as HokatsuRecord,
  ayase as HokatsuRecord,
  beppu as HokatsuRecord,
  bunkyo as HokatsuRecord,
  chigasaki as HokatsuRecord,
  chikushino as HokatsuRecord,
  chita as HokatsuRecord,
  chiyoda as HokatsuRecord,
  chofu as HokatsuRecord,
  chuo as HokatsuRecord,
  daito as HokatsuRecord,
  dazaifu as HokatsuRecord,
  edogawa as HokatsuRecord,
  eniwa as HokatsuRecord,
  fuchu as HokatsuRecord,
  fuji as HokatsuRecord,
  fujieda as HokatsuRecord,
  fujimi as HokatsuRecord,
  fujimino as HokatsuRecord,
  fujinomiya as HokatsuRecord,
  fujisawa as HokatsuRecord,
  fukaya as HokatsuRecord,
  fukui as HokatsuRecord,
  fukuoka as HokatsuRecord,
  fukushima as HokatsuRecord,
  fukuyama as HokatsuRecord,
  funabashi as HokatsuRecord,
  fussa as HokatsuRecord,
  gifu as HokatsuRecord,
  ginowan as HokatsuRecord,
  gyoda as HokatsuRecord,
  habikino as HokatsuRecord,
  hachinohe as HokatsuRecord,
  hachioji as HokatsuRecord,
  hakodate as HokatsuRecord,
  hakusan as HokatsuRecord,
  hamamatsu as HokatsuRecord,
  hamura as HokatsuRecord,
  hatsukaichi as HokatsuRecord,
  higashihiroshima as HokatsuRecord,
  higashikurume as HokatsuRecord,
  higashimatsuyama as HokatsuRecord,
  higashimurayama as HokatsuRecord,
  higashiosaka as HokatsuRecord,
  hikone as HokatsuRecord,
  himeji as HokatsuRecord,
  hino as HokatsuRecord,
  hirakata as HokatsuRecord,
  hiratsuka as HokatsuRecord,
  hirosaki as HokatsuRecord,
  hiroshima as HokatsuRecord,
  hita as HokatsuRecord,
  hitachi as HokatsuRecord,
  hitachinaka as HokatsuRecord,
  ibaraki as HokatsuRecord,
  ichikawa as HokatsuRecord,
  ichinomiya as HokatsuRecord,
  ichinoseki as HokatsuRecord,
  iga as HokatsuRecord,
  iida as HokatsuRecord,
  iizuka as HokatsuRecord,
  ikeda as HokatsuRecord,
  ikoma as HokatsuRecord,
  imabari as HokatsuRecord,
  iruma as HokatsuRecord,
  isahaya as HokatsuRecord,
  ise as HokatsuRecord,
  isesaki as HokatsuRecord,
  ishigaki as HokatsuRecord,
  ishinomaki as HokatsuRecord,
  itabashi as HokatsuRecord,
  itami as HokatsuRecord,
  itoman as HokatsuRecord,
  itoshima as HokatsuRecord,
  iwaki as HokatsuRecord,
  iwakuni as HokatsuRecord,
  iwata as HokatsuRecord,
  izumi as HokatsuRecord,
  izumiotsu as HokatsuRecord,
  izumisano as HokatsuRecord,
  izumo as HokatsuRecord,
  joetsu as HokatsuRecord,
  kagoshima as HokatsuRecord,
  kakamigahara as HokatsuRecord,
  kakegawa as HokatsuRecord,
  kakogawa as HokatsuRecord,
  kamagaya as HokatsuRecord,
  kamakura as HokatsuRecord,
  kanazawa as HokatsuRecord,
  kani as HokatsuRecord,
  kanoya as HokatsuRecord,
  kashiba as HokatsuRecord,
  kashihara as HokatsuRecord,
  kashiwa as HokatsuRecord,
  kashiwara as HokatsuRecord,
  kasuga as HokatsuRecord,
  kasugai as HokatsuRecord,
  kasukabe as HokatsuRecord,
  katano as HokatsuRecord,
  katsushika as HokatsuRecord,
  kawagoe as HokatsuRecord,
  kawaguchi as HokatsuRecord,
  kawanishi as HokatsuRecord,
  kazo as HokatsuRecord,
  kirishima as HokatsuRecord,
  kiryu as HokatsuRecord,
  kisarazu as HokatsuRecord,
  kishiwada as HokatsuRecord,
  kita as HokatsuRecord,
  kitahiroshima as HokatsuRecord,
  kitakami as HokatsuRecord,
  kitakyushu as HokatsuRecord,
  kitami as HokatsuRecord,
  kitanagoya as HokatsuRecord,
  kobe as HokatsuRecord,
  kochi as HokatsuRecord,
  kodaira as HokatsuRecord,
  kofu as HokatsuRecord,
  koganei as HokatsuRecord,
  kokubunji as HokatsuRecord,
  konan as HokatsuRecord,
  konosu as HokatsuRecord,
  koriyama as HokatsuRecord,
  koshigaya as HokatsuRecord,
  koto as HokatsuRecord,
  kuki as HokatsuRecord,
  kumagaya as HokatsuRecord,
  kumamoto as HokatsuRecord,
  kurashiki as HokatsuRecord,
  kure as HokatsuRecord,
  kurume as HokatsuRecord,
  kusatsu as HokatsuRecord,
  kushiro as HokatsuRecord,
  kuwana as HokatsuRecord,
  kyoto as HokatsuRecord,
  machida as HokatsuRecord,
  maebashi as HokatsuRecord,
  matsubara as HokatsuRecord,
  matsudo as HokatsuRecord,
  matsue as HokatsuRecord,
  matsumoto as HokatsuRecord,
  matsusaka as HokatsuRecord,
  matsuyama as HokatsuRecord,
  meguro as HokatsuRecord,
  mihara as HokatsuRecord,
  miki as HokatsuRecord,
  minato as HokatsuRecord,
  misato as HokatsuRecord,
  mishima as HokatsuRecord,
  mitaka as HokatsuRecord,
  mito as HokatsuRecord,
  miyazaki as HokatsuRecord,
  moka as HokatsuRecord,
  moriguchi as HokatsuRecord,
  morioka as HokatsuRecord,
  moriya as HokatsuRecord,
  munakata as HokatsuRecord,
  musashino as HokatsuRecord,
  nagahama as HokatsuRecord,
  nagano as HokatsuRecord,
  nagaoka as HokatsuRecord,
  nagaokakyo as HokatsuRecord,
  nagareyama as HokatsuRecord,
  nagasaki as HokatsuRecord,
  nagoya as HokatsuRecord,
  naha as HokatsuRecord,
  nakano as HokatsuRecord,
  nara as HokatsuRecord,
  narashino as HokatsuRecord,
  narita as HokatsuRecord,
  nasushiobara as HokatsuRecord,
  natori as HokatsuRecord,
  nerima as HokatsuRecord,
  neyagawa as HokatsuRecord,
  niigata as HokatsuRecord,
  niihama as HokatsuRecord,
  niiza as HokatsuRecord,
  nishinomiya as HokatsuRecord,
  nishitokyo as HokatsuRecord,
  nisshin as HokatsuRecord,
  nobeoka as HokatsuRecord,
  noda as HokatsuRecord,
  numazu as HokatsuRecord,
  obihiro as HokatsuRecord,
  obu as HokatsuRecord,
  odawara as HokatsuRecord,
  ogaki as HokatsuRecord,
  oita as HokatsuRecord,
  okayama as HokatsuRecord,
  okazaki as HokatsuRecord,
  okegawa as HokatsuRecord,
  okinawa as HokatsuRecord,
  ome as HokatsuRecord,
  omura as HokatsuRecord,
  omuta as HokatsuRecord,
  onojo as HokatsuRecord,
  onomichi as HokatsuRecord,
  osaka as HokatsuRecord,
  osakasayama as HokatsuRecord,
  osaki as HokatsuRecord,
  oshu as HokatsuRecord,
  ota as HokatsuRecord,
  otaGunma as HokatsuRecord,
  otaru as HokatsuRecord,
  otsu as HokatsuRecord,
  oyama as HokatsuRecord,
  ryugasaki as HokatsuRecord,
  saga as HokatsuRecord,
  sagamihara as HokatsuRecord,
  saitama as HokatsuRecord,
  sakado as HokatsuRecord,
  sakai as HokatsuRecord,
  sakata as HokatsuRecord,
  sakura as HokatsuRecord,
  sanda as HokatsuRecord,
  sano as HokatsuRecord,
  sanyoonoda as HokatsuRecord,
  sapporo as HokatsuRecord,
  sasebo as HokatsuRecord,
  satsumasendai as HokatsuRecord,
  sayama as HokatsuRecord,
  seki as HokatsuRecord,
  sendai as HokatsuRecord,
  sennan as HokatsuRecord,
  setagaya as HokatsuRecord,
  settsu as HokatsuRecord,
  shibuya as HokatsuRecord,
  shijonawate as HokatsuRecord,
  shiki as HokatsuRecord,
  shimonoseki as HokatsuRecord,
  shinagawa as HokatsuRecord,
  shinjuku as HokatsuRecord,
  shizuoka as HokatsuRecord,
  soka as HokatsuRecord,
  suginami as HokatsuRecord,
  suita as HokatsuRecord,
  sumida as HokatsuRecord,
  suzuka as HokatsuRecord,
  tagajo as HokatsuRecord,
  taito as HokatsuRecord,
  tajimi as HokatsuRecord,
  takamatsu as HokatsuRecord,
  takaoka as HokatsuRecord,
  takarazuka as HokatsuRecord,
  takasaki as HokatsuRecord,
  takatsuki as HokatsuRecord,
  tama as HokatsuRecord,
  tenri as HokatsuRecord,
  tochigiCity as HokatsuRecord,
  toda as HokatsuRecord,
  tokai as HokatsuRecord,
  tokorozawa as HokatsuRecord,
  tokushima as HokatsuRecord,
  tomakomai as HokatsuRecord,
  tomigusuku as HokatsuRecord,
  tomiya as HokatsuRecord,
  tondabayashi as HokatsuRecord,
  toride as HokatsuRecord,
  toshima as HokatsuRecord,
  tottori as HokatsuRecord,
  toyama as HokatsuRecord,
  toyoake as HokatsuRecord,
  toyohashi as HokatsuRecord,
  toyokawa as HokatsuRecord,
  toyonaka as HokatsuRecord,
  toyota as HokatsuRecord,
  tsu as HokatsuRecord,
  tsuchiura as HokatsuRecord,
  tsukuba as HokatsuRecord,
  tsuruoka as HokatsuRecord,
  tsuyama as HokatsuRecord,
  ueda as HokatsuRecord,
  uji as HokatsuRecord,
  urayasu as HokatsuRecord,
  uruma as HokatsuRecord,
  ushiku as HokatsuRecord,
  wakayama as HokatsuRecord,
  wako as HokatsuRecord,
  warabi as HokatsuRecord,
  yachiyo as HokatsuRecord,
  yaizu as HokatsuRecord,
  yamagata as HokatsuRecord,
  yamaguchi as HokatsuRecord,
  yamato as HokatsuRecord,
  yamatokooriyama as HokatsuRecord,
  yao as HokatsuRecord,
  yashio as HokatsuRecord,
  yatsushiro as HokatsuRecord,
  yokkaichi as HokatsuRecord,
  yokohama as HokatsuRecord,
  yokosuka as HokatsuRecord,
  yonago as HokatsuRecord,
  yoshikawa as HokatsuRecord,
  zama as HokatsuRecord,
];
