// このファイルは scripts/gen-fact-index.py が作る。手で編集しない
import type { IchijiRecord } from "../types";

import adachi from "./adachi.json";
import arakawa from "./arakawa.json";
import bunkyo from "./bunkyo.json";
import chiba from "./chiba.json";
import chiyoda from "./chiyoda.json";
import chuo from "./chuo.json";
import edogawa from "./edogawa.json";
import fukuoka from "./fukuoka.json";
import hamamatsu from "./hamamatsu.json";
import hiroshima from "./hiroshima.json";
import itabashi from "./itabashi.json";
import katsushika from "./katsushika.json";
import kawasaki from "./kawasaki.json";
import kita from "./kita.json";
import kitakyushu from "./kitakyushu.json";
import kobe from "./kobe.json";
import koto from "./koto.json";
import kumamoto from "./kumamoto.json";
import kyoto from "./kyoto.json";
import meguro from "./meguro.json";
import minato from "./minato.json";
import nagoya from "./nagoya.json";
import nakano from "./nakano.json";
import nerima from "./nerima.json";
import niigata from "./niigata.json";
import okayama from "./okayama.json";
import osaka from "./osaka.json";
import ota from "./ota.json";
import sagamihara from "./sagamihara.json";
import saitama from "./saitama.json";
import sakai from "./sakai.json";
import sapporo from "./sapporo.json";
import sendai from "./sendai.json";
import setagaya from "./setagaya.json";
import shibuya from "./shibuya.json";
import shinagawa from "./shinagawa.json";
import shinjuku from "./shinjuku.json";
import shizuoka from "./shizuoka.json";
import suginami from "./suginami.json";
import sumida from "./sumida.json";
import taito from "./taito.json";
import toshima from "./toshima.json";
import yokohama from "./yokohama.json";

// JSON の文字列は union 型に狭まらないので、ここで型を付ける。
// 値の検査は scripts/verify-fact-records.py が行う
export const ichijiRecords: IchijiRecord[] = [
  adachi as IchijiRecord,
  arakawa as IchijiRecord,
  bunkyo as IchijiRecord,
  chiba as IchijiRecord,
  chiyoda as IchijiRecord,
  chuo as IchijiRecord,
  edogawa as IchijiRecord,
  fukuoka as IchijiRecord,
  hamamatsu as IchijiRecord,
  hiroshima as IchijiRecord,
  itabashi as IchijiRecord,
  katsushika as IchijiRecord,
  kawasaki as IchijiRecord,
  kita as IchijiRecord,
  kitakyushu as IchijiRecord,
  kobe as IchijiRecord,
  koto as IchijiRecord,
  kumamoto as IchijiRecord,
  kyoto as IchijiRecord,
  meguro as IchijiRecord,
  minato as IchijiRecord,
  nagoya as IchijiRecord,
  nakano as IchijiRecord,
  nerima as IchijiRecord,
  niigata as IchijiRecord,
  okayama as IchijiRecord,
  osaka as IchijiRecord,
  ota as IchijiRecord,
  sagamihara as IchijiRecord,
  saitama as IchijiRecord,
  sakai as IchijiRecord,
  sapporo as IchijiRecord,
  sendai as IchijiRecord,
  setagaya as IchijiRecord,
  shibuya as IchijiRecord,
  shinagawa as IchijiRecord,
  shinjuku as IchijiRecord,
  shizuoka as IchijiRecord,
  suginami as IchijiRecord,
  sumida as IchijiRecord,
  taito as IchijiRecord,
  toshima as IchijiRecord,
  yokohama as IchijiRecord,
];
