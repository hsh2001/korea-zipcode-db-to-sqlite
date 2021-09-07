import axios from 'axios';

import connection from './db/connection';
import Area from './db/entities/Area';
import getAreaKeys from './getAreaKeys';
import getNearbyArea from './getNearbyArea';
import getValidAreaNames from './getValidAreaNames';
import requestPlaceData from './requestPlaceData';
import toRadian from './toRadian';

console.clear();
console.log('데이터 처리중...');

connection.then(async (db) => {
  const areaNames = await getValidAreaNames();
  const areaRepository = db.getRepository(Area);

  for (const areaName of areaNames) {
    const areaKeys = await getAreaKeys(areaName);

    for (const areaKey of areaKeys) {
      if (areaKey.match(/출장소?/)) {
        continue;
      }

      const area = await areaRepository.findOne({ name: areaKey });

      if (area?.longitude) {
        continue;
      }

      const placeData =
        (area?.address ? await requestPlaceData(area.address) : null) ||
        (await requestPlaceData(areaKey)) ||
        (await requestPlaceData(areaKey.replace(/제\s?\d동/, '동')));

      let longitude = 0;
      let latitude = 0;
      let address = '';

      if (placeData) {
        const { data } = await axios.get<{
          longitude: number;
          latitude: number;
          address: string;
        }>(
          `http://server.echoad.co.kr:30009/place?id=${encodeURIComponent(
            placeData.placeId
          )}`
        );

        ({ longitude, latitude, address } = data);
      }

      await areaRepository.save({
        longitude,
        latitude,
        address,
        id: area?.id,
        name: areaKey,

        sinLongitude: Math.sin(toRadian(longitude)),
        sinLatitude: Math.sin(toRadian(latitude)),
        cosLongitude: Math.cos(toRadian(longitude)),
        cosLatitude: Math.cos(toRadian(latitude)),
      });
    }
  }

  const areas = await getNearbyArea({
    areaRepository,
    latitude: 37.54482931967665,
    longitude: 126.86444708971052,
  });

  console.clear();

  for (const area of areas) {
    console.log(`${+area.distance.toFixed(2) * 1000}m 떨어진 ${area.name}`);
  }

  await db.close();
});
