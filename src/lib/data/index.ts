import type { MunicipalityData } from '../types';
import { setagayaData } from './setagaya';
import { yokohamaData } from './yokohama';
import { osakaData } from './osaka';

const municipalityMap: Record<string, MunicipalityData> = {
  [setagayaData.municipality.slug]: setagayaData,
  [yokohamaData.municipality.slug]: yokohamaData,
  [osakaData.municipality.slug]: osakaData,
};

export function getMunicipalityData(slug: string): MunicipalityData | undefined {
  return municipalityMap[slug];
}

export function getAllMunicipalities() {
  return Object.values(municipalityMap).map((d) => d.municipality);
}

export { setagayaData, yokohamaData, osakaData };
