import type { MunicipalityData } from '../types';
import { setagayaData } from './setagaya';

/**
 * slug をキーにした全自治体データのマップ
 */
const municipalityMap: Record<string, MunicipalityData> = {
  [setagayaData.municipality.slug]: setagayaData,
};

/**
 * slug から自治体データを取得する
 */
export function getMunicipalityData(slug: string): MunicipalityData | undefined {
  return municipalityMap[slug];
}

/**
 * 対応自治体の一覧を返す
 */
export function getAllMunicipalities() {
  return Object.values(municipalityMap).map((d) => d.municipality);
}

export { setagayaData };
