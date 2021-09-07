import { Repository } from 'typeorm';

import Area from './db/entities/Area';
import toRadian from './toRadian';

// https://king24.tistory.com/4
async function getNearbyArea({
  areaRepository,
  longitude,
  latitude,
}: {
  areaRepository: Repository<Area>;
  longitude: number;
  latitude: number;
}) {
  const sinLongitude = Math.sin(toRadian(longitude));
  const sinLatitude = Math.sin(toRadian(latitude));
  const cosLongitude = Math.cos(toRadian(longitude));
  const cosLatitude = Math.cos(toRadian(latitude));

  const areas = await areaRepository
    .createQueryBuilder('area')
    .addSelect(
      `
      (${cosLatitude} *
        area.cosLatitude *
        (area.cosLongitude * ${cosLongitude} + area.sinLongitude * ${sinLongitude}) +
        ${sinLatitude} * area.sinLatitude) AS distance
      `
    )
    .orderBy('distance', 'DESC')
    .where(`distance > ${Math.cos(5000 / 6371)}`)
    .andWhere('area.cosLatitude != 0')
    .take(50)
    .getMany();

  return areas.map((area) => ({
    ...area,
    distance:
      6371 *
      Math.acos(
        Math.cos(toRadian(area.latitude)) *
          Math.cos(toRadian(latitude)) *
          Math.cos(toRadian(longitude) - toRadian(area.longitude)) +
          Math.sin(toRadian(area.latitude)) * Math.sin(toRadian(latitude))
      ),
  }));
}

export default getNearbyArea;
