import axios from 'axios';

interface PlaceRow {
  placeId: string;
  secondaryName: string;
}

const _cache = new Map<string, PlaceRow>();

async function requestPlaceData(placeName: string) {
  const query = encodeURIComponent(placeName);
  const cacheData = _cache.get(query);

  if (cacheData) {
    return cacheData;
  }

  const {
    data: [placeData],
  } = await axios.get<(PlaceRow | undefined)[]>(
    `http://server.echoad.co.kr:30009/?query=${query}`
  );

  return placeData;
}

export default requestPlaceData;
