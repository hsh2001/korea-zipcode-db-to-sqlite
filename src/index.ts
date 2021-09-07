import axios from 'axios';

import connection from './db/connection';
import Area from './db/entities/Area';
import getAreaKeys from './getAreaKeys';
import getValidAreaNames from './getValidAreaNames';

connection.then(async (db) => {
  console.clear();

  const areaNames = await getValidAreaNames();
  const areaRepository = db.getRepository(Area);

  for (const areaName of areaNames) {
    console.log(areaName);
    const areaKeys = await getAreaKeys(areaName);

    for (const areaKey of areaKeys) {
      if (areaKey.match(/출장소?/)) {
        continue;
      }

      const area = await areaRepository.findOne({ name: areaKey });

      const {
        data: [placeData],
      } = await axios.get<
        ({ placeId: string; secondaryName: string } | undefined)[]
      >(
        `http://server.echoad.co.kr:30009/?query=${encodeURIComponent(areaKey)}`
      );

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
      });
    }
  }

  await db.close();
});
