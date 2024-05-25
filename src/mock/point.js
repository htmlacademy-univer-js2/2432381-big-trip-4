/* import { getRandomArrayElement, getRandomInt } from '../utils/common';
import { TRANSPORT_IMAGES, TRANSPORT_OFFERS, CITIES } from './const';
import { NOW } from '../utils/task';
import dayjs from 'dayjs';

const mockOffers = [];
const mockDests = [];
//`cfe${d}16cq-10xa-ye10-8077-2fs9a01edcab`

const citiesData = CITIES.map((city, index) => ({
  id: crypto.randomUUID(),
  description: `${city}, is a beautiful city, a true Asian pearl, with crowded streets.`,
  name: city,
  pictures: [
    {
      src: `https://loremflickr.com/300/200?random=${index}`,
      description: `${city} parliament building`,
    }
  ]
}));

function getRandomPoint() {

  const id = crypto.randomUUID();
  const price = getRandomInt(20, 2000);
  const isFavorite = getRandomInt(0, 2) === 1;
  const type = getRandomArrayElement(TRANSPORT_IMAGES);
  const dates = [];
  dates.push(NOW.subtract(getRandomInt(0, 20), 'day').subtract(getRandomInt(0, 24), 'hour').subtract(getRandomInt(1, 50), 'minute').toISOString());
  dates.push(NOW.add(getRandomInt(0, 20), 'day').add(getRandomInt(0, 24), 'hour').add(getRandomInt(1, 50), 'minute').toISOString());
  dates.push(NOW.toISOString());
  const dateFrom = getRandomArrayElement(dates);
  const dateTo = dayjs(dateFrom).add(getRandomInt(0, 20), 'day').add(getRandomInt(0, 24), 'hour').add(getRandomInt(1, 50), 'minute').toISOString();
  //const d = getRandomInt(4,8);
  const offersIds = [];
  const destId = getRandomArrayElement(citiesData).id;

  for(let i = 0; i < getRandomInt(0,4); i++) {
    offersIds.push(crypto.randomUUID());
  }

  const point = {
    id: id,
    basePrice: price,
    dateFrom: dateFrom,
    dateTo: dateTo,
    destination: destId,
    isFavorite: isFavorite,
    offers: [
      ...offersIds,
    ],
    type: type
  };

  getOffers(point);
  getDests(point);

  return point;
}

function getOffers(point) {
  if(point === undefined) {
    return;
  }
  const allOffers = [];
  const offersArr = Object.values(TRANSPORT_OFFERS.find((x) => Object.keys(x)[0] === point.type));
  if(point.offers.length > 0) {
    for(let i = 0; i < point.offers.length; i++) {

      const ofEl = offersArr[0][i];

      const of = {
        id: point.offers[i],
        title: ofEl.title,
        price: ofEl.price
      };

      allOffers.push(of);
    }
  }

  const offer = {
    type: point.type,
    offers: [
      ...allOffers,
    ]
  };
  mockOffers.push(offer);
  //console.log(offer)
  return offer;
}

function getDests(point) {
  const id = point.destination;
  const city = getRandomArrayElement(CITIES);
  const dest = {
    id: id,
    description: `${city}, is a beautiful city, a true asian pearl, with crowded streets.`,
    name: `${city}`,
    pictures: [
      {
        src: `https://loremflickr.com/300/200?random=${point.destination}`,
        description: `${city} parliament building`,
      }
    ]
  };
  mockDests.push(dest);

}

export {getRandomPoint, mockOffers, mockDests, getDests, getOffers, citiesData};
 */
