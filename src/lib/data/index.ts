import type { MunicipalityData } from '../types';
import { setagayaData } from './setagaya';
import { yokohamaData } from './yokohama';
import { osakaData } from './osaka';
import { kawasakiData } from './kawasaki';
import { nagoyaData } from './nagoya';
import { saitamaData } from './saitama';
import { sapporoData } from './sapporo';
import { kobeData } from './kobe';
import { fukuokaData } from './fukuoka';
import { hiroshimaData } from './hiroshima';
import { sendaiData } from './sendai';
import { kyotoData } from './kyoto';
import { kitakyushuData } from './kitakyushu';
import { hamamatsuData } from './hamamatsu';
import { chibaData } from './chiba';
import { adachiData } from './adachi';
import { suginamiData } from './suginami';
import { itabashiData } from './itabashi';
import { nerimaData } from './nerima';
import { otaData } from './ota';
import { edogawaData } from './edogawa';
import { sakaiData } from './sakai';
import { niigataData } from './niigata';
import { sagamiharaData } from './sagamihara';
import { nakanoData } from './nakano';
import { toshimaData } from './toshima';
import { kitaData } from './kita';
import { arakawaData } from './arakawa';
import { shinagawaData } from './shinagawa';
import { meguroData } from './meguro';
import { shibuyaData } from './shibuya';
import { shinjukuData } from './shinjuku';
import { bunkyoData } from './bunkyo';
import { taitoData } from './taito';
import { sumidaData } from './sumida';
import { katsushikaData } from './katsushika';
import { minatoData } from './minato';
import { chuoData } from './chuo';
import { chiyodaData } from './chiyoda';
import { kotoData } from './koto';
import { okayamaData } from './okayama';
import { kumamotoData } from './kumamoto';
import { shizuokaData } from './shizuoka';

const municipalityMap: Record<string, MunicipalityData> = {
  [setagayaData.municipality.slug]: setagayaData,
  [yokohamaData.municipality.slug]: yokohamaData,
  [osakaData.municipality.slug]: osakaData,
  [kawasakiData.municipality.slug]: kawasakiData,
  [nagoyaData.municipality.slug]: nagoyaData,
  [saitamaData.municipality.slug]: saitamaData,
  [sapporoData.municipality.slug]: sapporoData,
  [kobeData.municipality.slug]: kobeData,
  [fukuokaData.municipality.slug]: fukuokaData,
  [hiroshimaData.municipality.slug]: hiroshimaData,
  [sendaiData.municipality.slug]: sendaiData,
  [kyotoData.municipality.slug]: kyotoData,
  [kitakyushuData.municipality.slug]: kitakyushuData,
  [hamamatsuData.municipality.slug]: hamamatsuData,
  [chibaData.municipality.slug]: chibaData,
  [adachiData.municipality.slug]: adachiData,
  [suginamiData.municipality.slug]: suginamiData,
  [itabashiData.municipality.slug]: itabashiData,
  [nerimaData.municipality.slug]: nerimaData,
  [otaData.municipality.slug]: otaData,
  [edogawaData.municipality.slug]: edogawaData,
  [sakaiData.municipality.slug]: sakaiData,
  [niigataData.municipality.slug]: niigataData,
  [sagamiharaData.municipality.slug]: sagamiharaData,
  [nakanoData.municipality.slug]: nakanoData,
  [toshimaData.municipality.slug]: toshimaData,
  [kitaData.municipality.slug]: kitaData,
  [arakawaData.municipality.slug]: arakawaData,
  [shinagawaData.municipality.slug]: shinagawaData,
  [meguroData.municipality.slug]: meguroData,
  [shibuyaData.municipality.slug]: shibuyaData,
  [shinjukuData.municipality.slug]: shinjukuData,
  [bunkyoData.municipality.slug]: bunkyoData,
  [taitoData.municipality.slug]: taitoData,
  [sumidaData.municipality.slug]: sumidaData,
  [katsushikaData.municipality.slug]: katsushikaData,
  [minatoData.municipality.slug]: minatoData,
  [chuoData.municipality.slug]: chuoData,
  [chiyodaData.municipality.slug]: chiyodaData,
  [kotoData.municipality.slug]: kotoData,
  [okayamaData.municipality.slug]: okayamaData,
  [kumamotoData.municipality.slug]: kumamotoData,
  [shizuokaData.municipality.slug]: shizuokaData,
};

export function getMunicipalityData(slug: string): MunicipalityData | undefined {
  return municipalityMap[slug];
}

export function getAllMunicipalities() {
  return Object.values(municipalityMap).map((d) => d.municipality);
}

export { setagayaData, yokohamaData, osakaData, kawasakiData, nagoyaData, saitamaData, sapporoData, kobeData, fukuokaData, hiroshimaData, sendaiData, kyotoData, kitakyushuData, hamamatsuData, chibaData, adachiData, suginamiData, itabashiData, nerimaData, otaData, edogawaData, sakaiData, niigataData, sagamiharaData, nakanoData, toshimaData, kitaData, arakawaData, shinagawaData, meguroData, shibuyaData, shinjukuData, bunkyoData, taitoData, sumidaData, katsushikaData, minatoData, chuoData, chiyodaData, kotoData, okayamaData, kumamotoData, shizuokaData };
