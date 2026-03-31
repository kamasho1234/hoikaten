import type { MunicipalityData } from '../types';
import { setagayaData } from './setagaya';
import { yokohamaData } from './yokohama';
import { osakaData } from './osaka';
import { kawasakiData } from './kawasaki';
import { nagoyaData } from './nagoya';
import { saitamaData } from './saitama';

const municipalityMap: Record<string, MunicipalityData> = {
  [setagayaData.municipality.slug]: setagayaData,
  [yokohamaData.municipality.slug]: yokohamaData,
  [osakaData.municipality.slug]: osakaData,
  [kawasakiData.municipality.slug]: kawasakiData,
  [nagoyaData.municipality.slug]: nagoyaData,
  [saitamaData.municipality.slug]: saitamaData,
};

export function getMunicipalityData(slug: string): MunicipalityData | undefined {
  return municipalityMap[slug];
}

export function getAllMunicipalities() {
  return Object.values(municipalityMap).map((d) => d.municipality);
}

export { setagayaData, yokohamaData, osakaData, kawasakiData, nagoyaData, saitamaData };
