import AreaData from './AreaData';
import readDataTxtFile from './readDataTxtFile';

async function getAreaKeys(name: string): Promise<string[]> {
  const rawData = await readDataTxtFile(name);
  const areaKeySet = new Set<string>();
  const areaDataList = AreaData.parseRawText(rawData);

  for (const areaData of areaDataList) {
    if (!areaData.행정동명 && !areaData.읍면) {
      continue;
    }

    areaKeySet.add(
      `${areaData.시도} ${areaData.시군구} ${
        areaData.행정동명 || areaData.읍면
      }`
    );
  }

  return [...areaKeySet];
}

export default getAreaKeys;
