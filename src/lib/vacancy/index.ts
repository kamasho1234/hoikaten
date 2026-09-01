// 保育所等の空き状況データのレジストリと集計ヘルパー
//
// データは scripts/fetch-{slug}-vacancy.ts が公式データから生成する。
// 自治体を増やすときは JSON を生成して registry に1行足すだけでよい。
//
// 自治体によって公開されている指標が違う（横浜市は入所待ちまであるが目黒区は空き数だけ）。
// 集計ヘルパーは metrics を見て、持っていない指標には null を返す。

import type {
  AgeSummary,
  AgeSymbols,
  AgeValues,
  FacilityWebsite,
  GroupSummary,
  SymbolLegend,
  VacancyDataset,
  VacancyMetric,
} from "./types";
import yokohamaVacancy from "./yokohama.json";
import yokohamaWebsites from "./yokohama-websites.json";
import meguroVacancy from "./meguro.json";
import meguroWebsites from "./meguro-websites.json";
import kawasakiVacancy from "./kawasaki.json";
import kawasakiWebsites from "./kawasaki-websites.json";
import saitamaVacancy from "./saitama.json";
import saitamaWebsites from "./saitama-websites.json";
import otaVacancy from "./ota.json";
import otaWebsites from "./ota-websites.json";
import adachiVacancy from "./adachi.json";
import adachiWebsites from "./adachi-websites.json";
import edogawaVacancy from "./edogawa.json";
import nerimaVacancy from "./nerima.json";
import nerimaWebsites from "./nerima-websites.json";
import edogawaWebsites from "./edogawa-websites.json";
import setagayaVacancy from "./setagaya.json";
import setagayaWebsites from "./setagaya-websites.json";
import suginamiVacancy from "./suginami.json";
import suginamiWebsites from "./suginami-websites.json";
import katsushikaVacancy from "./katsushika.json";
import katsushikaWebsites from "./katsushika-websites.json";
// 品川区は施設ごとのWebページを持たず（一覧はPDFのみ・sitemap.xml も無い）、
// 確認できるURLが無いので施設リンクを付けていない
import shinagawaVacancy from "./shinagawa.json";
// 江東区の施設リンクは区が出している園ごとの紹介PDF（施設のWebページは無い）
import kotoVacancy from "./koto.json";
import kotoWebsites from "./koto-websites.json";
// 中野区の施設リンクは区の一覧が案内している園の公式サイト
import nakanoWebsites from "./nakano-websites.json";
// 新宿区は施設サイトのURLを調査中のため、いまは空き状況だけを登録している
import shinjukuVacancy from "./shinjuku.json";
// 豊島区は施設サイトのURLを調査中のため、いまは空き状況だけを登録している
import toshimaVacancy from "./toshima.json";
// 文京区は施設サイトのURLを調査中のため、いまは空き状況だけを登録している
import bunkyoVacancy from "./bunkyo.json";
// 台東区も施設サイトのURLを調査中
import taitoVacancy from "./taito.json";
// 千代田区も施設サイトのURLを調査中
import chiyodaVacancy from "./chiyoda.json";
// 港区も施設サイトのURLを調査中
import minatoVacancy from "./minato.json";
// 板橋区も施設サイトのURLを調査中
import itabashiVacancy from "./itabashi.json";
// 墨田区も施設サイトのURLを調査中
import sumidaVacancy from "./sumida.json";
// 北区も施設サイトのURLを調査中
import kitaVacancy from "./kita.json";
// 大阪市も施設サイトのURLを調査中
import osakaVacancy from "./osaka.json";
// 広島市も施設サイトのURLを調査中
import hiroshimaVacancy from "./hiroshima.json";
// 仙台市も施設サイトのURLを調査中
import sendaiVacancy from "./sendai.json";
// 堺市も施設サイトのURLを調査中
import sakaiVacancy from "./sakai.json";
// 相模原市も施設サイトのURLを調査中
import sagamiharaVacancy from "./sagamihara.json";
// 八王子市も施設サイトのURLを調査中
import hachiojiVacancy from "./hachioji.json";
// 船橋市も施設サイトのURLを調査中
import funabashiVacancy from "./funabashi.json";
// 川口市・市川市も施設サイトのURLを調査中
import kawaguchiVacancy from "./kawaguchi.json";
import ichikawaVacancy from "./ichikawa.json";
// 町田市も施設サイトのURLを調査中
import machidaVacancy from "./machida.json";
// 柏市も施設サイトのURLを調査中
import kashiwaVacancy from "./kashiwa.json";
// 西東京市も施設サイトのURLを調査中
import nishitokyoVacancy from "./nishitokyo.json";
// 三鷹市も施設サイトのURLを調査中
import mitakaVacancy from "./mitaka.json";
// 調布市も施設サイトのURLを調査中
import chofuVacancy from "./chofu.json";
// 府中市も施設サイトのURLを調査中
import fuchuVacancy from "./fuchu.json";
// 大和市も施設サイトのURLを調査中
import yamatoVacancy from "./yamato.json";
// 浦安市も施設サイトのURLを調査中
import urayasuVacancy from "./urayasu.json";
// 小平市も施設サイトのURLを調査中
import kodairaVacancy from "./kodaira.json";
// 日野市も施設サイトのURLを調査中
import hinoVacancy from "./hino.json";
// 立川市も施設サイトのURLを調査中
import tachikawaVacancy from "./tachikawa.json";
import musashinoVacancy from "./musashino.json";
import kokubunjiVacancy from "./kokubunji.json";
import koganeiVacancy from "./koganei.json";
import higashimurayamaVacancy from "./higashimurayama.json";
import tamaVacancy from "./tama.json";
import kiyoseVacancy from "./kiyose.json";
import higashikurumeVacancy from "./higashikurume.json";
import komaeVacancy from "./komae.json";
import inagiVacancy from "./inagi.json";
import kunitachiVacancy from "./kunitachi.json";
import akishimaVacancy from "./akishima.json";
import yokosukaVacancy from "./yokosuka.json";
import ageoVacancy from "./ageo.json";
import matsuyamaVacancy from "./matsuyama.json";
import narashinoVacancy from "./narashino.json";
import kasukabeVacancy from "./kasukabe.json";
import fujisawaVacancy from "./fujisawa.json";
import nagareyamaVacancy from "./nagareyama.json";
import koshigayaVacancy from "./koshigaya.json";
import mitoVacancy from "./mito.json";
import gifuVacancy from "./gifu.json";
import tokorozawaVacancy from "./tokorozawa.json";
import chigasakiVacancy from "./chigasaki.json";
import yachiyoVacancy from "./yachiyo.json";
import himejiVacancy from "./himeji.json";
import chibaVacancy from "./chiba.json";
import kawagoeVacancy from "./kawagoe.json";
import nishinomiyaVacancy from "./nishinomiya.json";
import naraVacancy from "./nara.json";
import toyonakaVacancy from "./toyonaka.json";
import akashiVacancy from "./akashi.json";
import niigataVacancy from "./niigata.json";
import kobeVacancy from "./kobe.json";
import kyotoVacancy from "./kyoto.json";
import kagoshimaVacancy from "./kagoshima.json";
import takamatsuVacancy from "./takamatsu.json";
import nagasakiVacancy from "./nagasaki.json";
import fukuyamaVacancy from "./fukuyama.json";
import miyazakiVacancy from "./miyazaki.json";
import nahaVacancy from "./naha.json";
import maebashiVacancy from "./maebashi.json";
import yokkaichiVacancy from "./yokkaichi.json";
import kurumeVacancy from "./kurume.json";
import naganoVacancy from "./nagano.json";
import kochiVacancy from "./kochi.json";
import koriyamaVacancy from "./koriyama.json";
import akitaVacancy from "./akita.json";
import fukuokaVacancy from "./fukuoka.json";
import shizuokaVacancy from "./shizuoka.json";
import shibuyaVacancy from "./shibuya.json";
import chuoVacancy from "./chuo.json";
import hiratsukaVacancy from "./hiratsuka.json";
import hirakataVacancy from "./hirakata.json";
import ibarakiVacancy from "./ibaraki.json";
import takarazukaVacancy from "./takarazuka.json";
import kamakuraVacancy from "./kamakura.json";
import kakogawaVacancy from "./kakogawa.json";
import wakayamaVacancy from "./wakayama.json";
import shimonosekiVacancy from "./shimonoseki.json";
import asahikawaVacancy from "./asahikawa.json";
import fujiVacancy from "./fuji.json";
import kumagayaVacancy from "./kumagaya.json";
import ujiVacancy from "./uji.json";
import kawanishiVacancy from "./kawanishi.json";
import kisarazuVacancy from "./kisarazu.json";
import anjoVacancy from "./anjo.json";
import kureVacancy from "./kure.json";
import tsuVacancy from "./tsu.json";
import aomoriVacancy from "./aomori.json";
import hachinoheVacancy from "./hachinohe.json";
import obihiroVacancy from "./obihiro.json";
import iwataVacancy from "./iwata.json";
import komakiVacancy from "./komaki.json";
import abikoVacancy from "./abiko.json";
import inazawaVacancy from "./inazawa.json";
import fukayaVacancy from "./fukaya.json";
import izumiVacancy from "./izumi.json";
import todaVacancy from "./toda.json";
import irumaVacancy from "./iruma.json";
import tsukubaVacancy from "./tsukuba.json";
import utsunomiyaVacancy from "./utsunomiya.json";
import hitachiVacancy from "./hitachi.json";
import oyamaVacancy from "./oyama.json";
import tomakomaiVacancy from "./tomakomai.json";
import sagaVacancy from "./saga.json";
import iizukaVacancy from "./iizuka.json";
import ebinaVacancy from "./ebina.json";
import isesakiVacancy from "./isesaki.json";
import yamaguchiVacancy from "./yamaguchi.json";
import saseboVacancy from "./sasebo.json";
import sokaVacancy from "./soka.json";
import kasugaiVacancy from "./kasugai.json";
import toyohashiVacancy from "./toyohashi.json";
import kumamotoVacancy from "./kumamoto.json";
import okinawaVacancy from "./okinawa.json";
import ubeVacancy from "./ube.json";
import fujimiVacancy from "./fujimi.json";
import tokaiVacancy from "./tokai.json";
import minohVacancy from "./minoh.json";
import tochigiVacancy from "./tochigi-city.json";
import okayamaVacancy from "./okayama.json";
import chikugoVacancy from "./chikugo.json";
import nagoyaVacancy from "./nagoya.json";
import ichiharaVacancy from "./ichihara.json";
import matsueVacancy from "./matsue.json";
import yamagataVacancy from "./yamagata.json";
import tottoriVacancy from "./tottori.json";
import naritaVacancy from "./narita.json";
import fukushimaVacancy from "./fukushima.json";
import onomichiVacancy from "./onomichi.json";
import numazuVacancy from "./numazu.json";
import kariyaVacancy from "./kariya.json";
import kofuVacancy from "./kofu.json";
import yonagoVacancy from "./yonago.json";
import izumoVacancy from "./izumo.json";
import miyakonojoVacancy from "./miyakonojo.json";
import karatsuVacancy from "./karatsu.json";
import shunanVacancy from "./shunan.json";
import isahayaVacancy from "./isahaya.json";
import nobeokaVacancy from "./nobeoka.json";
import higashihiroshimaVacancy from "./higashihiroshima.json";
import omuraVacancy from "./omura.json";
import tsuchiuraVacancy from "./tsuchiura.json";
import kukiVacancy from "./kuki.json";
import kameokaVacancy from "./kameoka.json";
import shiroiVacancy from "./shiroi.json";
import shiraokaVacancy from "./shiraoka.json";
import kusatsuVacancy from "./kusatsu.json";
import nakatsuVacancy from "./nakatsu.json";
import komatsuVacancy from "./komatsu.json";
import moriyamaVacancy from "./moriyama.json";
import yasuVacancy from "./yasu.json";
import urasoeVacancy from "./urasoe.json";
import ginowanVacancy from "./ginowan.json";
import neyagawaVacancy from "./neyagawa.json";
import fussaVacancy from "./fussa.json";
import akirunoVacancy from "./akiruno.json";
import hamuraVacancy from "./hamura.json";
import musashimurayamaVacancy from "./musashimurayama.json";
import gyodaVacancy from "./gyoda.json";
import shikiVacancy from "./shiki.json";
import inzaiVacancy from "./inzai.json";
import kamagayaVacancy from "./kamagaya.json";
import kitamotoVacancy from "./kitamoto.json";
import okegawaVacancy from "./okegawa.json";
import hasudaVacancy from "./hasuda.json";
import yoshikawaVacancy from "./yoshikawa.json";
import sayamaVacancy from "./sayama.json";
import sakadoVacancy from "./sakado.json";
import ushikuVacancy from "./ushiku.json";
import hitachinakaVacancy from "./hitachinaka.json";
import hatsukaichiVacancy from "./hatsukaichi.json";
import hofuVacancy from "./hofu.json";
import miharaVacancy from "./mihara.json";
import torideVacancy from "./toride.json";
import niihamaVacancy from "./niihama.json";
import munakataVacancy from "./munakata.json";
import nanjoVacancy from "./nanjo.json";
import koshiVacancy from "./koshi.json";
import tosuVacancy from "./tosu.json";
import ichinomiyaVacancy from "./ichinomiya.json";
import handaVacancy from "./handa.json";
import toyokawaVacancy from "./toyokawa.json";
import konanVacancy from "./konan.json";
import chitaVacancy from "./chita.json";
import amagasakiVacancy from "./amagasaki.json";
import ayaseVacancy from "./ayase.json";
import fujiminoVacancy from "./fujimino.json";
import hidakaVacancy from "./hidaka.json";
import warabiVacancy from "./warabi.json";
import kamisuVacancy from "./kamisu.json";
import osakiVacancy from "./osaki.json";
import higashimatsuyamaVacancy from "./higashimatsuyama.json";
import konosuVacancy from "./konosu.json";
import kadomaVacancy from "./kadoma.json";
import settsuVacancy from "./settsu.json";
import kizugawaVacancy from "./kizugawa.json";
import yotsukaidoVacancy from "./yotsukaido.json";
import ryugasakiVacancy from "./ryugasaki.json";
import takatsukiVacancy from "./takatsuki.json";
import kitanagoyaVacancy from "./kitanagoya.json";
import inuyamaVacancy from "./inuyama.json";
import nisshinVacancy from "./nisshin.json";
import toyoakeVacancy from "./toyoake.json";
import obuVacancy from "./obu.json";
import kaniVacancy from "./kani.json";
import kimitsuVacancy from "./kimitsu.json";
import chikuseiVacancy from "./chikusei.json";
import omeVacancy from "./ome.json";
import chikushinoVacancy from "./chikushino.json";
import nogataVacancy from "./nogata.json";
import fukuroiVacancy from "./fukuroi.json";
import sojaVacancy from "./soja.json";
import ishinomakiVacancy from "./ishinomaki.json";
import muroranVacancy from "./muroran.json";
import oshuVacancy from "./oshu.json";
import satsumasendaiVacancy from "./satsumasendai.json";
import hiokiVacancy from "./hioki.json";
import itoVacancy from "./ito.json";
import ikedaVacancy from "./ikeda.json";
import futtsuVacancy from "./futtsu.json";
import fuchuHiroshimaVacancy from "./fuchu-hiroshima.json";
import akaiwaVacancy from "./akaiwa.json";
import nakanoVacancy from "./nakano.json";
import azuminoVacancy from "./azumino.json";
import katanoVacancy from "./katano.json";
import aizuwakamatsuVacancy from "./aizuwakamatsu.json";
import yahabaVacancy from "./yahaba.json";
import hayamaVacancy from "./hayama.json";
import utoVacancy from "./uto.json";
import hannoVacancy from "./hanno.json";
import hamamatsuVacancy from "./hamamatsu.json";
import kitakyushuVacancy from "./kitakyushu.json";
import shinjoVacancy from "./shinjo.json";
import ureshinoVacancy from "./ureshino.json";
import ozuVacancy from "./ozu.json";
import nakanoNaganoVacancy from "./nakano-nagano.json";
import ranzanVacancy from "./ranzan.json";
import matsubushiVacancy from "./matsubushi.json";
import omitamaVacancy from "./omitama.json";
import nihonmatsuVacancy from "./nihonmatsu.json";
import hanamakiVacancy from "./hanamaki.json";
import matsudoVacancy from "./matsudo.json";
import joetsuVacancy from "./joetsu.json";
import nagaokaVacancy from "./nagaoka.json";
import midoriVacancy from "./midori.json";
import gotsuVacancy from "./gotsu.json";
import usaVacancy from "./usa.json";
import kosaiVacancy from "./kosai.json";
import kamaishiVacancy from "./kamaishi.json";
import hekinanVacancy from "./hekinan.json";
import misatoAkitaVacancy from "./misato-akita.json";
import kumanoHiroshimaVacancy from "./kumano-hiroshima.json";
import hokutoHokkaidoVacancy from "./hokuto-hokkaido.json";
import tachiaraiVacancy from "./tachiarai.json";
import aikawaVacancy from "./aikawa.json";
import imariVacancy from "./imari.json";
import taiwaVacancy from "./taiwa.json";
import yoshiokaVacancy from "./yoshioka.json";
import ibaraVacancy from "./ibara.json";
import taketoyoVacancy from "./taketoyo.json";
import airaVacancy from "./aira.json";
import suitaVacancy from "./suita.json";
import asakaVacancy from "./asaka.json";
import nishioVacancy from "./nishio.json";
import yamagataNaganoVacancy from "./yamagata-nagano.json";
import iizunaVacancy from "./iizuna.json";
import tagaVacancy from "./taga.json";
import kinVacancy from "./kin.json";
import katsuragiVacancy from "./katsuragi.json";
import susakiVacancy from "./susaki.json";
import nagoVacancy from "./nago.json";
import yamadaIwateVacancy from "./yamada-iwate.json";
import haebaruVacancy from "./haebaru.json";
import miyakojimaVacancy from "./miyakojima.json";
import izunokuniVacancy from "./izunokuni.json";
import goshogawaraVacancy from "./goshogawara.json";
import minamisomaVacancy from "./minamisoma.json";
import hitachiotaVacancy from "./hitachiota.json";
import tsukubamiraiVacancy from "./tsukubamirai.json";
import kasumigauraVacancy from "./kasumigaura.json";
import samukawaVacancy from "./samukawa.json";
import miuraVacancy from "./miura.json";
import nomiVacancy from "./nomi.json";
import tsubataVacancy from "./tsubata.json";
import asoVacancy from "./aso.json";
import nagatoVacancy from "./nagato.json";
import mizuhoGifuVacancy from "./mizuho-gifu.json";
import maniwaVacancy from "./maniwa.json";
import sammuVacancy from "./sammu.json";
import tateyamaVacancy from "./tateyama.json";
import ogiVacancy from "./ogi.json";
import kobayashiVacancy from "./kobayashi.json";
import miyakoVacancy from "./miyako.json";
import takanezawaVacancy from "./takanezawa.json";
import tainaiVacancy from "./tainai.json";
import towadaVacancy from "./towada.json";
import misawaVacancy from "./misawa.json";
import shiojiriVacancy from "./shiojiri.json";
import sakuragawaVacancy from "./sakuragawa.json";
import sukagawaVacancy from "./sukagawa.json";
import tamuraVacancy from "./tamura.json";
import rittoVacancy from "./ritto.json";
import nishiharaOkinawaVacancy from "./nishihara-okinawa.json";
import yaeseVacancy from "./yaese.json";
import yonabaruVacancy from "./yonabaru.json";
import tsubameVacancy from "./tsubame.json";
import kiyosuVacancy from "./kiyosu.json";
import oharuVacancy from "./oharu.json";
import ananVacancy from "./anan.json";
import kaitaVacancy from "./kaita.json";
import fuchuHiroshimaCityVacancy from "./fuchu-hiroshima-city.json";
import shiwaVacancy from "./shiwa.json";
import takahataVacancy from "./takahata.json";
import shimamotoVacancy from "./shimamoto.json";
import tomeVacancy from "./tome.json";
import tadaokaVacancy from "./tadaoka.json";
import saikiVacancy from "./saiki.json";
import yoriiVacancy from "./yorii.json";
import shiraoiVacancy from "./shiraoi.json";
import atsumaVacancy from "./atsuma.json";
import namegawaVacancy from "./namegawa.json";
import nikkoVacancy from "./nikko.json";
import kaiVacancy from "./kai.json";
import higashiyamatoVacancy from "./higashiyamato.json";
import hashimotoVacancy from "./hashimoto.json";
import yaoVacancy from "./yao.json";
import zamaVacancy from "./zama.json";
import mikiVacancy from "./miki.json";
import kushiroVacancy from "./kushiro.json";
import kyotanabeVacancy from "./kyotanabe.json";
import yameVacancy from "./yame.json";
import nakagawaVacancy from "./nakagawa.json";
import shibataVacancy from "./shibata.json";
import sanoVacancy from "./sano.json";
import saijoVacancy from "./saijo.json";
import nasushiobaraVacancy from "./nasushiobara.json";
import mokaVacancy from "./moka.json";
import nagahamaVacancy from "./nagahama.json";
import rifuVacancy from "./rifu.json";
import minamiAlpsVacancy from "./minami-alps.json";
import toyoyamaVacancy from "./toyoyama.json";
import kuwanaVacancy from "./kuwana.json";
import itomanVacancy from "./itoman.json";
import mizuhoVacancy from "./mizuho.json";
import dazaifuVacancy from "./dazaifu.json";
import chitoseVacancy from "./chitose.json";
import ishigakiVacancy from "./ishigaki.json";
import shibukawaVacancy from "./shibukawa.json";
import ichikikushikinoVacancy from "./ichikikushikino.json";
import tsurugashimaVacancy from "./tsurugashima.json";
import setouchiVacancy from "./setouchi.json";
import murakamiVacancy from "./murakami.json";
import yamagaVacancy from "./yamaga.json";
import kikuyoVacancy from "./kikuyo.json";
import masakiVacancy from "./masaki.json";
import sanjoVacancy from "./sanjo.json";
import kakamigaharaVacancy from "./kakamigahara.json";
import higashiomiVacancy from "./higashiomi.json";
import honjoVacancy from "./honjo.json";
import natoriVacancy from "./natori.json";
import urumaVacancy from "./uruma.json";
import fujiokaVacancy from "./fujioka.json";
import nodaVacancy from "./noda.json";
import itoshimaVacancy from "./itoshima.json";
import kanumaVacancy from "./kanuma.json";
import sakuraVacancy from "./sakura.json";
import shimotsukeVacancy from "./shimotsuke.json";
import tomisatoVacancy from "./tomisato.json";
import moriguchiVacancy from "./moriguchi.json";

export type {
  AgeSummary,
  AgeSymbols,
  AgeValues,
  FacilityWebsite,
  GroupSummary,
  SymbolLegend,
  VacancyDataset,
  VacancyMetric,
};
export type { VacancyFacility } from "./types";

/** 0歳児〜5歳児 */
export const AGE_COUNT = 6;
export const AGE_LABELS = [
  "0歳児",
  "1歳児",
  "2歳児",
  "3歳児",
  "4歳児",
  "5歳児",
] as const;

/**
 * 公式サイトのURLは空き状況とは別ファイルで持つ。
 * 空き状況JSONは取り込みスクリプトが毎回まるごと上書きするため、
 * 同じファイルに混ぜると自動更新のたびに消えてしまう。
 * ここで施設番号をキーに結合してから配る。
 */
function withWebsites(
  data: VacancyDataset,
  sites: Record<string, { url: string; type: string }>
): VacancyDataset {
  return {
    ...data,
    facilities: data.facilities.map((f) => {
      const site = sites[f.id];
      return site ? { ...f, site: site as FacilityWebsite } : f;
    }),
  };
}

const registry: Record<string, VacancyDataset> = {
  yokohama: withWebsites(
    yokohamaVacancy as unknown as VacancyDataset,
    yokohamaWebsites.sites
  ),
  meguro: withWebsites(
    meguroVacancy as unknown as VacancyDataset,
    meguroWebsites.sites
  ),
  kawasaki: withWebsites(
    kawasakiVacancy as unknown as VacancyDataset,
    kawasakiWebsites.sites
  ),
  saitama: withWebsites(
    saitamaVacancy as unknown as VacancyDataset,
    saitamaWebsites.sites
  ),
  ota: withWebsites(otaVacancy as unknown as VacancyDataset, otaWebsites.sites),
  adachi: withWebsites(adachiVacancy as unknown as VacancyDataset, adachiWebsites.sites),
  edogawa: withWebsites(edogawaVacancy as unknown as VacancyDataset, edogawaWebsites.sites),
  nerima: withWebsites(nerimaVacancy as unknown as VacancyDataset, nerimaWebsites.sites),
  setagaya: withWebsites(setagayaVacancy as unknown as VacancyDataset, setagayaWebsites.sites),
  suginami: withWebsites(suginamiVacancy as unknown as VacancyDataset, suginamiWebsites.sites),
  katsushika: withWebsites(katsushikaVacancy as unknown as VacancyDataset, katsushikaWebsites.sites),
  shinagawa: shinagawaVacancy as unknown as VacancyDataset,
  koto: withWebsites(kotoVacancy as unknown as VacancyDataset, kotoWebsites.sites),
  nakano: withWebsites(nakanoVacancy as unknown as VacancyDataset, nakanoWebsites.sites),
  shinjuku: shinjukuVacancy as unknown as VacancyDataset,
  toshima: toshimaVacancy as unknown as VacancyDataset,
  bunkyo: bunkyoVacancy as unknown as VacancyDataset,
  taito: taitoVacancy as unknown as VacancyDataset,
  chiyoda: chiyodaVacancy as unknown as VacancyDataset,
  minato: minatoVacancy as unknown as VacancyDataset,
  itabashi: itabashiVacancy as unknown as VacancyDataset,
  sumida: sumidaVacancy as unknown as VacancyDataset,
  kita: kitaVacancy as unknown as VacancyDataset,
  osaka: osakaVacancy as unknown as VacancyDataset,
  hiroshima: hiroshimaVacancy as unknown as VacancyDataset,
  sendai: sendaiVacancy as unknown as VacancyDataset,
  sakai: sakaiVacancy as unknown as VacancyDataset,
  sagamihara: sagamiharaVacancy as unknown as VacancyDataset,
  hachioji: hachiojiVacancy as unknown as VacancyDataset,
  funabashi: funabashiVacancy as unknown as VacancyDataset,
  kawaguchi: kawaguchiVacancy as unknown as VacancyDataset,
  ichikawa: ichikawaVacancy as unknown as VacancyDataset,
  machida: machidaVacancy as unknown as VacancyDataset,
  kashiwa: kashiwaVacancy as unknown as VacancyDataset,
  nishitokyo: nishitokyoVacancy as unknown as VacancyDataset,
  mitaka: mitakaVacancy as unknown as VacancyDataset,
  chofu: chofuVacancy as unknown as VacancyDataset,
  fuchu: fuchuVacancy as unknown as VacancyDataset,
  yamato: yamatoVacancy as unknown as VacancyDataset,
  urayasu: urayasuVacancy as unknown as VacancyDataset,
  kodaira: kodairaVacancy as unknown as VacancyDataset,
  hino: hinoVacancy as unknown as VacancyDataset,
  tachikawa: tachikawaVacancy as unknown as VacancyDataset,
  musashino: musashinoVacancy as unknown as VacancyDataset,
  kokubunji: kokubunjiVacancy as unknown as VacancyDataset,
  koganei: koganeiVacancy as unknown as VacancyDataset,
  higashimurayama: higashimurayamaVacancy as unknown as VacancyDataset,
  tama: tamaVacancy as unknown as VacancyDataset,
  kiyose: kiyoseVacancy as unknown as VacancyDataset,
  higashikurume: higashikurumeVacancy as unknown as VacancyDataset,
  komae: komaeVacancy as unknown as VacancyDataset,
  inagi: inagiVacancy as unknown as VacancyDataset,
  kunitachi: kunitachiVacancy as unknown as VacancyDataset,
  akishima: akishimaVacancy as unknown as VacancyDataset,
  yokosuka: yokosukaVacancy as unknown as VacancyDataset,
  ageo: ageoVacancy as unknown as VacancyDataset,
  matsuyama: matsuyamaVacancy as unknown as VacancyDataset,
  narashino: narashinoVacancy as unknown as VacancyDataset,
  kasukabe: kasukabeVacancy as unknown as VacancyDataset,
  fujisawa: fujisawaVacancy as unknown as VacancyDataset,
  nagareyama: nagareyamaVacancy as unknown as VacancyDataset,
  koshigaya: koshigayaVacancy as unknown as VacancyDataset,
  mito: mitoVacancy as unknown as VacancyDataset,
  gifu: gifuVacancy as unknown as VacancyDataset,
  tokorozawa: tokorozawaVacancy as unknown as VacancyDataset,
  chigasaki: chigasakiVacancy as unknown as VacancyDataset,
  yachiyo: yachiyoVacancy as unknown as VacancyDataset,
  himeji: himejiVacancy as unknown as VacancyDataset,
  chiba: chibaVacancy as unknown as VacancyDataset,
  kawagoe: kawagoeVacancy as unknown as VacancyDataset,
  nishinomiya: nishinomiyaVacancy as unknown as VacancyDataset,
  nara: naraVacancy as unknown as VacancyDataset,
  toyonaka: toyonakaVacancy as unknown as VacancyDataset,
  akashi: akashiVacancy as unknown as VacancyDataset,
  niigata: niigataVacancy as unknown as VacancyDataset,
  kobe: kobeVacancy as unknown as VacancyDataset,
  kyoto: kyotoVacancy as unknown as VacancyDataset,
  kagoshima: kagoshimaVacancy as unknown as VacancyDataset,
  takamatsu: takamatsuVacancy as unknown as VacancyDataset,
  nagasaki: nagasakiVacancy as unknown as VacancyDataset,
  fukuyama: fukuyamaVacancy as unknown as VacancyDataset,
  miyazaki: miyazakiVacancy as unknown as VacancyDataset,
  naha: nahaVacancy as unknown as VacancyDataset,
  maebashi: maebashiVacancy as unknown as VacancyDataset,
  yokkaichi: yokkaichiVacancy as unknown as VacancyDataset,
  kurume: kurumeVacancy as unknown as VacancyDataset,
  nagano: naganoVacancy as unknown as VacancyDataset,
  kochi: kochiVacancy as unknown as VacancyDataset,
  koriyama: koriyamaVacancy as unknown as VacancyDataset,
  akita: akitaVacancy as unknown as VacancyDataset,
  fukuoka: fukuokaVacancy as unknown as VacancyDataset,
  shizuoka: shizuokaVacancy as unknown as VacancyDataset,
  shibuya: shibuyaVacancy as unknown as VacancyDataset,
  chuo: chuoVacancy as unknown as VacancyDataset,
  hiratsuka: hiratsukaVacancy as unknown as VacancyDataset,
  hirakata: hirakataVacancy as unknown as VacancyDataset,
  ibaraki: ibarakiVacancy as unknown as VacancyDataset,
  takarazuka: takarazukaVacancy as unknown as VacancyDataset,
  kamakura: kamakuraVacancy as unknown as VacancyDataset,
  kakogawa: kakogawaVacancy as unknown as VacancyDataset,
  wakayama: wakayamaVacancy as unknown as VacancyDataset,
  shimonoseki: shimonosekiVacancy as unknown as VacancyDataset,
  asahikawa: asahikawaVacancy as unknown as VacancyDataset,
  fuji: fujiVacancy as unknown as VacancyDataset,
  kumagaya: kumagayaVacancy as unknown as VacancyDataset,
  uji: ujiVacancy as unknown as VacancyDataset,
  kawanishi: kawanishiVacancy as unknown as VacancyDataset,
  kisarazu: kisarazuVacancy as unknown as VacancyDataset,
  anjo: anjoVacancy as unknown as VacancyDataset,
  kure: kureVacancy as unknown as VacancyDataset,
  tsu: tsuVacancy as unknown as VacancyDataset,
  aomori: aomoriVacancy as unknown as VacancyDataset,
  hachinohe: hachinoheVacancy as unknown as VacancyDataset,
  obihiro: obihiroVacancy as unknown as VacancyDataset,
  iwata: iwataVacancy as unknown as VacancyDataset,
  komaki: komakiVacancy as unknown as VacancyDataset,
  abiko: abikoVacancy as unknown as VacancyDataset,
  inazawa: inazawaVacancy as unknown as VacancyDataset,
  fukaya: fukayaVacancy as unknown as VacancyDataset,
  izumi: izumiVacancy as unknown as VacancyDataset,
  toda: todaVacancy as unknown as VacancyDataset,
  iruma: irumaVacancy as unknown as VacancyDataset,
  tsukuba: tsukubaVacancy as unknown as VacancyDataset,
  utsunomiya: utsunomiyaVacancy as unknown as VacancyDataset,
  hitachi: hitachiVacancy as unknown as VacancyDataset,
  oyama: oyamaVacancy as unknown as VacancyDataset,
  tomakomai: tomakomaiVacancy as unknown as VacancyDataset,
  saga: sagaVacancy as unknown as VacancyDataset,
  iizuka: iizukaVacancy as unknown as VacancyDataset,
  ebina: ebinaVacancy as unknown as VacancyDataset,
  isesaki: isesakiVacancy as unknown as VacancyDataset,
  yamaguchi: yamaguchiVacancy as unknown as VacancyDataset,
  sasebo: saseboVacancy as unknown as VacancyDataset,
  soka: sokaVacancy as unknown as VacancyDataset,
  kasugai: kasugaiVacancy as unknown as VacancyDataset,
  toyohashi: toyohashiVacancy as unknown as VacancyDataset,
  kumamoto: kumamotoVacancy as unknown as VacancyDataset,
  okinawa: okinawaVacancy as unknown as VacancyDataset,
  ube: ubeVacancy as unknown as VacancyDataset,
  fujimi: fujimiVacancy as unknown as VacancyDataset,
  tokai: tokaiVacancy as unknown as VacancyDataset,
  minoh: minohVacancy as unknown as VacancyDataset,
  "tochigi-city": tochigiVacancy as unknown as VacancyDataset,
  okayama: okayamaVacancy as unknown as VacancyDataset,
  chikugo: chikugoVacancy as unknown as VacancyDataset,
  nagoya: nagoyaVacancy as unknown as VacancyDataset,
  ichihara: ichiharaVacancy as unknown as VacancyDataset,
  matsue: matsueVacancy as unknown as VacancyDataset,
  yamagata: yamagataVacancy as unknown as VacancyDataset,
  tottori: tottoriVacancy as unknown as VacancyDataset,
  narita: naritaVacancy as unknown as VacancyDataset,
  fukushima: fukushimaVacancy as unknown as VacancyDataset,
  onomichi: onomichiVacancy as unknown as VacancyDataset,
  numazu: numazuVacancy as unknown as VacancyDataset,
  kariya: kariyaVacancy as unknown as VacancyDataset,
  kofu: kofuVacancy as unknown as VacancyDataset,
  yonago: yonagoVacancy as unknown as VacancyDataset,
  izumo: izumoVacancy as unknown as VacancyDataset,
  miyakonojo: miyakonojoVacancy as unknown as VacancyDataset,
  karatsu: karatsuVacancy as unknown as VacancyDataset,
  shunan: shunanVacancy as unknown as VacancyDataset,
  isahaya: isahayaVacancy as unknown as VacancyDataset,
  nobeoka: nobeokaVacancy as unknown as VacancyDataset,
  higashihiroshima: higashihiroshimaVacancy as unknown as VacancyDataset,
  omura: omuraVacancy as unknown as VacancyDataset,
  tsuchiura: tsuchiuraVacancy as unknown as VacancyDataset,
  kuki: kukiVacancy as unknown as VacancyDataset,
  kameoka: kameokaVacancy as unknown as VacancyDataset,
  shiroi: shiroiVacancy as unknown as VacancyDataset,
  shiraoka: shiraokaVacancy as unknown as VacancyDataset,
  kusatsu: kusatsuVacancy as unknown as VacancyDataset,
  nakatsu: nakatsuVacancy as unknown as VacancyDataset,
  komatsu: komatsuVacancy as unknown as VacancyDataset,
  moriyama: moriyamaVacancy as unknown as VacancyDataset,
  yasu: yasuVacancy as unknown as VacancyDataset,
  urasoe: urasoeVacancy as unknown as VacancyDataset,
  ginowan: ginowanVacancy as unknown as VacancyDataset,
  neyagawa: neyagawaVacancy as unknown as VacancyDataset,
  fussa: fussaVacancy as unknown as VacancyDataset,
  akiruno: akirunoVacancy as unknown as VacancyDataset,
  hamura: hamuraVacancy as unknown as VacancyDataset,
  musashimurayama: musashimurayamaVacancy as unknown as VacancyDataset,
  gyoda: gyodaVacancy as unknown as VacancyDataset,
  shiki: shikiVacancy as unknown as VacancyDataset,
  inzai: inzaiVacancy as unknown as VacancyDataset,
  kamagaya: kamagayaVacancy as unknown as VacancyDataset,
  kitamoto: kitamotoVacancy as unknown as VacancyDataset,
  okegawa: okegawaVacancy as unknown as VacancyDataset,
  hasuda: hasudaVacancy as unknown as VacancyDataset,
  yoshikawa: yoshikawaVacancy as unknown as VacancyDataset,
  sayama: sayamaVacancy as unknown as VacancyDataset,
  sakado: sakadoVacancy as unknown as VacancyDataset,
  ushiku: ushikuVacancy as unknown as VacancyDataset,
  hitachinaka: hitachinakaVacancy as unknown as VacancyDataset,
  hatsukaichi: hatsukaichiVacancy as unknown as VacancyDataset,
  hofu: hofuVacancy as unknown as VacancyDataset,
  mihara: miharaVacancy as unknown as VacancyDataset,
  toride: torideVacancy as unknown as VacancyDataset,
  niihama: niihamaVacancy as unknown as VacancyDataset,
  munakata: munakataVacancy as unknown as VacancyDataset,
  nanjo: nanjoVacancy as unknown as VacancyDataset,
  koshi: koshiVacancy as unknown as VacancyDataset,
  tosu: tosuVacancy as unknown as VacancyDataset,
  ichinomiya: ichinomiyaVacancy as unknown as VacancyDataset,
  handa: handaVacancy as unknown as VacancyDataset,
  toyokawa: toyokawaVacancy as unknown as VacancyDataset,
  konan: konanVacancy as unknown as VacancyDataset,
  chita: chitaVacancy as unknown as VacancyDataset,
  amagasaki: amagasakiVacancy as unknown as VacancyDataset,
  ayase: ayaseVacancy as unknown as VacancyDataset,
  fujimino: fujiminoVacancy as unknown as VacancyDataset,
  hidaka: hidakaVacancy as unknown as VacancyDataset,
  warabi: warabiVacancy as unknown as VacancyDataset,
  kamisu: kamisuVacancy as unknown as VacancyDataset,
  osaki: osakiVacancy as unknown as VacancyDataset,
  higashimatsuyama: higashimatsuyamaVacancy as unknown as VacancyDataset,
  konosu: konosuVacancy as unknown as VacancyDataset,
  kadoma: kadomaVacancy as unknown as VacancyDataset,
  settsu: settsuVacancy as unknown as VacancyDataset,
  kizugawa: kizugawaVacancy as unknown as VacancyDataset,
  yotsukaido: yotsukaidoVacancy as unknown as VacancyDataset,
  ryugasaki: ryugasakiVacancy as unknown as VacancyDataset,
  takatsuki: takatsukiVacancy as unknown as VacancyDataset,
  kitanagoya: kitanagoyaVacancy as unknown as VacancyDataset,
  inuyama: inuyamaVacancy as unknown as VacancyDataset,
  nisshin: nisshinVacancy as unknown as VacancyDataset,
  toyoake: toyoakeVacancy as unknown as VacancyDataset,
  obu: obuVacancy as unknown as VacancyDataset,
  kani: kaniVacancy as unknown as VacancyDataset,
  kimitsu: kimitsuVacancy as unknown as VacancyDataset,
  chikusei: chikuseiVacancy as unknown as VacancyDataset,
  ome: omeVacancy as unknown as VacancyDataset,
  chikushino: chikushinoVacancy as unknown as VacancyDataset,
  nogata: nogataVacancy as unknown as VacancyDataset,
  fukuroi: fukuroiVacancy as unknown as VacancyDataset,
  soja: sojaVacancy as unknown as VacancyDataset,
  ishinomaki: ishinomakiVacancy as unknown as VacancyDataset,
  muroran: muroranVacancy as unknown as VacancyDataset,
  oshu: oshuVacancy as unknown as VacancyDataset,
  satsumasendai: satsumasendaiVacancy as unknown as VacancyDataset,
  hioki: hiokiVacancy as unknown as VacancyDataset,
  ito: itoVacancy as unknown as VacancyDataset,
  ikeda: ikedaVacancy as unknown as VacancyDataset,
  futtsu: futtsuVacancy as unknown as VacancyDataset,
  "fuchu-hiroshima": fuchuHiroshimaVacancy as unknown as VacancyDataset,
  akaiwa: akaiwaVacancy as unknown as VacancyDataset,
  azumino: azuminoVacancy as unknown as VacancyDataset,
  katano: katanoVacancy as unknown as VacancyDataset,
  aizuwakamatsu: aizuwakamatsuVacancy as unknown as VacancyDataset,
  yahaba: yahabaVacancy as unknown as VacancyDataset,
  hayama: hayamaVacancy as unknown as VacancyDataset,
  uto: utoVacancy as unknown as VacancyDataset,
  hanno: hannoVacancy as unknown as VacancyDataset,
  hamamatsu: hamamatsuVacancy as unknown as VacancyDataset,
  kitakyushu: kitakyushuVacancy as unknown as VacancyDataset,
  shinjo: shinjoVacancy as unknown as VacancyDataset,
  ureshino: ureshinoVacancy as unknown as VacancyDataset,
  ozu: ozuVacancy as unknown as VacancyDataset,
  "nakano-nagano": nakanoNaganoVacancy as unknown as VacancyDataset,
  ranzan: ranzanVacancy as unknown as VacancyDataset,
  matsubushi: matsubushiVacancy as unknown as VacancyDataset,
  omitama: omitamaVacancy as unknown as VacancyDataset,
  nihonmatsu: nihonmatsuVacancy as unknown as VacancyDataset,
  hanamaki: hanamakiVacancy as unknown as VacancyDataset,
  matsudo: matsudoVacancy as unknown as VacancyDataset,
  joetsu: joetsuVacancy as unknown as VacancyDataset,
  nagaoka: nagaokaVacancy as unknown as VacancyDataset,
  midori: midoriVacancy as unknown as VacancyDataset,
  gotsu: gotsuVacancy as unknown as VacancyDataset,
  usa: usaVacancy as unknown as VacancyDataset,
  kosai: kosaiVacancy as unknown as VacancyDataset,
  kamaishi: kamaishiVacancy as unknown as VacancyDataset,
  hekinan: hekinanVacancy as unknown as VacancyDataset,
  "misato-akita": misatoAkitaVacancy as unknown as VacancyDataset,
  "kumano-hiroshima": kumanoHiroshimaVacancy as unknown as VacancyDataset,
  "hokuto-hokkaido": hokutoHokkaidoVacancy as unknown as VacancyDataset,
  tachiarai: tachiaraiVacancy as unknown as VacancyDataset,
  aikawa: aikawaVacancy as unknown as VacancyDataset,
  imari: imariVacancy as unknown as VacancyDataset,
  taiwa: taiwaVacancy as unknown as VacancyDataset,
  yoshioka: yoshiokaVacancy as unknown as VacancyDataset,
  ibara: ibaraVacancy as unknown as VacancyDataset,
  taketoyo: taketoyoVacancy as unknown as VacancyDataset,
  aira: airaVacancy as unknown as VacancyDataset,
  suita: suitaVacancy as unknown as VacancyDataset,
  asaka: asakaVacancy as unknown as VacancyDataset,
  nishio: nishioVacancy as unknown as VacancyDataset,
  "yamagata-nagano": yamagataNaganoVacancy as unknown as VacancyDataset,
  iizuna: iizunaVacancy as unknown as VacancyDataset,
  taga: tagaVacancy as unknown as VacancyDataset,
  kin: kinVacancy as unknown as VacancyDataset,
  katsuragi: katsuragiVacancy as unknown as VacancyDataset,
  susaki: susakiVacancy as unknown as VacancyDataset,
  nago: nagoVacancy as unknown as VacancyDataset,
  "yamada-iwate": yamadaIwateVacancy as unknown as VacancyDataset,
  haebaru: haebaruVacancy as unknown as VacancyDataset,
  miyakojima: miyakojimaVacancy as unknown as VacancyDataset,
  izunokuni: izunokuniVacancy as unknown as VacancyDataset,
  goshogawara: goshogawaraVacancy as unknown as VacancyDataset,
  minamisoma: minamisomaVacancy as unknown as VacancyDataset,
  hitachiota: hitachiotaVacancy as unknown as VacancyDataset,
  tsukubamirai: tsukubamiraiVacancy as unknown as VacancyDataset,
  kasumigaura: kasumigauraVacancy as unknown as VacancyDataset,
  samukawa: samukawaVacancy as unknown as VacancyDataset,
  miura: miuraVacancy as unknown as VacancyDataset,
  nomi: nomiVacancy as unknown as VacancyDataset,
  tsubata: tsubataVacancy as unknown as VacancyDataset,
  aso: asoVacancy as unknown as VacancyDataset,
  nagato: nagatoVacancy as unknown as VacancyDataset,
  "mizuho-gifu": mizuhoGifuVacancy as unknown as VacancyDataset,
  maniwa: maniwaVacancy as unknown as VacancyDataset,
  sammu: sammuVacancy as unknown as VacancyDataset,
  tateyama: tateyamaVacancy as unknown as VacancyDataset,
  ogi: ogiVacancy as unknown as VacancyDataset,
  kobayashi: kobayashiVacancy as unknown as VacancyDataset,
  miyako: miyakoVacancy as unknown as VacancyDataset,
  takanezawa: takanezawaVacancy as unknown as VacancyDataset,
  tainai: tainaiVacancy as unknown as VacancyDataset,
  towada: towadaVacancy as unknown as VacancyDataset,
  misawa: misawaVacancy as unknown as VacancyDataset,
  shiojiri: shiojiriVacancy as unknown as VacancyDataset,
  sakuragawa: sakuragawaVacancy as unknown as VacancyDataset,
  sukagawa: sukagawaVacancy as unknown as VacancyDataset,
  tamura: tamuraVacancy as unknown as VacancyDataset,
  ritto: rittoVacancy as unknown as VacancyDataset,
  "nishihara-okinawa": nishiharaOkinawaVacancy as unknown as VacancyDataset,
  yaese: yaeseVacancy as unknown as VacancyDataset,
  yonabaru: yonabaruVacancy as unknown as VacancyDataset,
  tsubame: tsubameVacancy as unknown as VacancyDataset,
  kiyosu: kiyosuVacancy as unknown as VacancyDataset,
  oharu: oharuVacancy as unknown as VacancyDataset,
  anan: ananVacancy as unknown as VacancyDataset,
  kaita: kaitaVacancy as unknown as VacancyDataset,
  "fuchu-hiroshima-city": fuchuHiroshimaCityVacancy as unknown as VacancyDataset,
  shiwa: shiwaVacancy as unknown as VacancyDataset,
  takahata: takahataVacancy as unknown as VacancyDataset,
  shimamoto: shimamotoVacancy as unknown as VacancyDataset,
  tome: tomeVacancy as unknown as VacancyDataset,
  tadaoka: tadaokaVacancy as unknown as VacancyDataset,
  saiki: saikiVacancy as unknown as VacancyDataset,
  yorii: yoriiVacancy as unknown as VacancyDataset,
  shiraoi: shiraoiVacancy as unknown as VacancyDataset,
  atsuma: atsumaVacancy as unknown as VacancyDataset,
  namegawa: namegawaVacancy as unknown as VacancyDataset,
  nikko: nikkoVacancy as unknown as VacancyDataset,
  kai: kaiVacancy as unknown as VacancyDataset,
  higashiyamato: higashiyamatoVacancy as unknown as VacancyDataset,
  hashimoto: hashimotoVacancy as unknown as VacancyDataset,
  yao: yaoVacancy as unknown as VacancyDataset,
  zama: zamaVacancy as unknown as VacancyDataset,
  miki: mikiVacancy as unknown as VacancyDataset,
  kushiro: kushiroVacancy as unknown as VacancyDataset,
  kyotanabe: kyotanabeVacancy as unknown as VacancyDataset,
  yame: yameVacancy as unknown as VacancyDataset,
  nakagawa: nakagawaVacancy as unknown as VacancyDataset,
  shibata: shibataVacancy as unknown as VacancyDataset,
  sano: sanoVacancy as unknown as VacancyDataset,
  saijo: saijoVacancy as unknown as VacancyDataset,
  nasushiobara: nasushiobaraVacancy as unknown as VacancyDataset,
  moka: mokaVacancy as unknown as VacancyDataset,
  nagahama: nagahamaVacancy as unknown as VacancyDataset,
  rifu: rifuVacancy as unknown as VacancyDataset,
  "minami-alps": minamiAlpsVacancy as unknown as VacancyDataset,
  toyoyama: toyoyamaVacancy as unknown as VacancyDataset,
  kuwana: kuwanaVacancy as unknown as VacancyDataset,
  itoman: itomanVacancy as unknown as VacancyDataset,
  mizuho: mizuhoVacancy as unknown as VacancyDataset,
  dazaifu: dazaifuVacancy as unknown as VacancyDataset,
  chitose: chitoseVacancy as unknown as VacancyDataset,
  ishigaki: ishigakiVacancy as unknown as VacancyDataset,
  shibukawa: shibukawaVacancy as unknown as VacancyDataset,
  ichikikushikino: ichikikushikinoVacancy as unknown as VacancyDataset,
  tsurugashima: tsurugashimaVacancy as unknown as VacancyDataset,
  setouchi: setouchiVacancy as unknown as VacancyDataset,
  murakami: murakamiVacancy as unknown as VacancyDataset,
  yamaga: yamagaVacancy as unknown as VacancyDataset,
  kikuyo: kikuyoVacancy as unknown as VacancyDataset,
  masaki: masakiVacancy as unknown as VacancyDataset,
  sanjo: sanjoVacancy as unknown as VacancyDataset,
  kakamigahara: kakamigaharaVacancy as unknown as VacancyDataset,
  higashiomi: higashiomiVacancy as unknown as VacancyDataset,
  honjo: honjoVacancy as unknown as VacancyDataset,
  natori: natoriVacancy as unknown as VacancyDataset,
  uruma: urumaVacancy as unknown as VacancyDataset,
  fujioka: fujiokaVacancy as unknown as VacancyDataset,
  noda: nodaVacancy as unknown as VacancyDataset,
  itoshima: itoshimaVacancy as unknown as VacancyDataset,
  kanuma: kanumaVacancy as unknown as VacancyDataset,
  sakura: sakuraVacancy as unknown as VacancyDataset,
  shimotsuke: shimotsukeVacancy as unknown as VacancyDataset,
  tomisato: tomisatoVacancy as unknown as VacancyDataset,
  moriguchi: moriguchiVacancy as unknown as VacancyDataset,
};

export function getVacancyData(slug: string): VacancyDataset | undefined {
  return registry[slug];
}

export function hasVacancyData(slug: string): boolean {
  return slug in registry;
}

export function getVacancySlugs(): string[] {
  return Object.keys(registry);
}

export function hasMetric(data: VacancyDataset, metric: VacancyMetric): boolean {
  return data.metrics.includes(metric);
}

/**
 * 空き1枠あたりの申込数（入所待ち人数 ÷ 受入可能数）。
 *
 * 横浜市の「入所待ち人数」は**園ごとの申請数**で、1人が複数園を希望すると
 * 希望した各園に計上される。したがってこの値は実際の競争倍率ではなく、
 * 「申込がどれだけ集中しているか」の目安である。UI・記事でもそのように説明すること。
 *
 * 受入可能数が0のとき、または入所待ちを公開していない自治体では null を返す。
 */
export function calcRatio(waiting: number | null, vacancy: number): number | null {
  if (waiting === null) return null;
  if (vacancy <= 0) return null;
  return waiting / vacancy;
}

/** クラスなし(null)を除いた合計。全クラスなしなら null */
export function sumAges(values: AgeValues | undefined): number | null {
  if (!values) return null;
  let sum = 0;
  let hasValue = false;
  for (const v of values) {
    if (v === null) continue;
    sum += v;
    hasValue = true;
  }
  return hasValue ? sum : null;
}

/**
 * 年齢を指定すればその年齢の値、null を渡せば全年齢の合計を返す。
 * クラスなしの場合は null。
 */
export function valueAt(
  values: AgeValues | undefined,
  age: number | null
): number | null {
  if (!values) return null;
  if (age === null) return sumAges(values);
  return values[age] ?? null;
}

/**
 * その施設の空き数。年齢別に分かれていない施設（目黒区の家庭福祉員）は、
 * 全年齢を見るときだけ合計値を返し、年齢を指定されたときは null を返す。
 */
export function facilityVacancy(
  f: { vacancy: AgeValues; vacancyTotal?: number },
  age: number | null
): number | null {
  const v = valueAt(f.vacancy, age);
  if (v !== null) return v;
  if (age === null && f.vacancyTotal !== undefined) return f.vacancyTotal;
  return null;
}

/**
 * 空きを記号で出している自治体かどうか。
 *
 * 記号（○△×）から人数は決められないので、合計や倍率のような数の集計はできない。
 * 代わりに「記号ごとに何施設あるか」を数えて見せる
 */
export function isSymbolBased(data: VacancyDataset): boolean {
  return hasMetric(data, "symbol");
}

/** その施設・その年齢の記号。年齢に null を渡すと、いちばん空きの多い記号を返す */
export function symbolAt(
  data: VacancyDataset,
  facility: { symbols?: AgeSymbols },
  age: number | null
): string | null {
  const symbols = facility.symbols;
  if (!symbols) return null;
  if (age !== null) return symbols[age] ?? null;
  // 全年齢のときは、凡例の並び（空きの多い順）でいちばん上に来るものを出す
  const order = (data.symbolLegend ?? []).map((l) => l.mark);
  let best: string | null = null;
  for (const mark of symbols) {
    if (!mark) continue;
    if (best === null) {
      best = mark;
      continue;
    }
    const a = order.indexOf(mark);
    const b = order.indexOf(best);
    if (a >= 0 && (b < 0 || a < b)) best = mark;
  }
  return best;
}

/** その記号が「空きあり」を表すか。凡例にない記号は空きなしとみなす */
export function isOpenSymbol(data: VacancyDataset, mark: string | null): boolean {
  if (!mark) return false;
  return (data.symbolLegend ?? []).some((l) => l.mark === mark && l.open);
}

/** 記号ごとの施設数。年齢を指定すればその年齢だけを数える */
export function countBySymbol(
  data: VacancyDataset,
  age: number | null
): { legend: SymbolLegend; count: number }[] {
  const legend = data.symbolLegend ?? [];
  return legend.map((item) => ({
    legend: item,
    count: data.facilities.filter((f) => symbolAt(data, f, age) === item.mark).length,
  }));
}

/** 市全体の年齢別サマリー */
export function summarizeByAge(data: VacancyDataset): AgeSummary[] {
  const hasWaiting = hasMetric(data, "waiting");
  const hasEnrolled = hasMetric(data, "enrolled");
  return Array.from({ length: AGE_COUNT }, (_, age) => {
    let vacancy = 0;
    let waiting = 0;
    let enrolled = 0;
    let facilitiesWithVacancy = 0;
    for (const f of data.facilities) {
      vacancy += f.vacancy[age] ?? 0;
      waiting += f.waiting?.[age] ?? 0;
      enrolled += f.enrolled?.[age] ?? 0;
      if ((f.vacancy[age] ?? 0) > 0) facilitiesWithVacancy++;
    }
    return {
      age,
      vacancy,
      waiting: hasWaiting ? waiting : null,
      enrolled: hasEnrolled ? enrolled : null,
      ratio: hasWaiting ? calcRatio(waiting, vacancy) : null,
      facilitiesWithVacancy,
    };
  });
}

/**
 * 施設をグループごとに集計する共通処理。
 * groupOf が null を返した施設は、どのグループにも入れない。
 */
function summarizeBy(
  data: VacancyDataset,
  names: string[],
  groupOf: (f: VacancyDataset["facilities"][number]) => number | null | undefined,
  age: number | null
): GroupSummary[] {
  const hasWaiting = hasMetric(data, "waiting");
  return names.map((name, index) => {
    let facilityCount = 0;
    let vacancy = 0;
    let waiting = 0;
    let facilitiesWithVacancy = 0;
    for (const f of data.facilities) {
      if (groupOf(f) !== index) continue;
      facilityCount++;
      const v = facilityVacancy(f, age) ?? 0;
      vacancy += v;
      waiting += valueAt(f.waiting, age) ?? 0;
      if (v > 0) facilitiesWithVacancy++;
    }
    return {
      name,
      facilityCount,
      vacancy,
      waiting: hasWaiting ? waiting : null,
      ratio: hasWaiting ? calcRatio(waiting, vacancy) : null,
      facilitiesWithVacancy,
    };
  });
}

/**
 * 区別サマリー。age を指定するとその年齢だけで集計する。
 * 並びは公式データの区の出現順（行政区の順）をそのまま使う。
 */
export function summarizeByWard(
  data: VacancyDataset,
  age: number | null = null
): GroupSummary[] {
  return summarizeBy(data, data.wards, (f) => f.w, age);
}

/** 施設類型別サマリー。類型を公開していない自治体では空配列 */
export function summarizeByCategory(
  data: VacancyDataset,
  age: number | null = null
): GroupSummary[] {
  return summarizeBy(data, data.categories ?? [], (f) => f.c, age);
}

/** 市全体の合計（全年齢） */
export function totalSummary(data: VacancyDataset) {
  const hasWaiting = hasMetric(data, "waiting");
  const byAge = summarizeByAge(data);
  // 年齢別に分かれていない施設（家庭福祉員など）の分を足す
  const mergedOnly = data.facilities.reduce(
    (acc, f) => acc + (sumAges(f.vacancy) === null ? (f.vacancyTotal ?? 0) : 0),
    0
  );
  const vacancy = byAge.reduce((acc, a) => acc + a.vacancy, 0) + mergedOnly;
  const waiting = byAge.reduce((acc, a) => acc + (a.waiting ?? 0), 0);
  const facilitiesWithVacancy = data.facilities.filter(
    (f) => (facilityVacancy(f, null) ?? 0) > 0
  ).length;
  return {
    facilityCount: data.facilities.length,
    vacancy,
    waiting: hasWaiting ? waiting : null,
    ratio: hasWaiting ? calcRatio(waiting, vacancy) : null,
    facilitiesWithVacancy,
  };
}

/** "2026-08-01" → "2026年8月1日" */
export function formatJapaneseDate(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return iso;
  return `${Number(m[1])}年${Number(m[2])}月${Number(m[3])}日`;
}

/**
 * 空き1枠あたりの申込数の表示文字列。10以上は整数に丸める。
 * 「倍」ではなく「件」で表記する（実際の競争倍率ではないため。calcRatio のコメント参照）。
 */
export function formatRatio(ratio: number | null): string {
  if (ratio === null) return "—";
  if (ratio >= 10) return `${Math.round(ratio)}件`;
  return `${ratio.toFixed(1)}件`;
}
