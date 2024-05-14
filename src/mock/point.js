import { getRandomArrayElement, getRandomInt } from '../utils/common';
import { TRANSPORT_IMAGES, TRANSPORT_OFFERS, CITIES } from './const';
import { NOW } from '../utils/task';

const mockOffers = [];
const mockDests = [];
//`cfe${d}16cq-10xa-ye10-8077-2fs9a01edcab`

function getRandomPoint() {

  const id = crypto.randomUUID();
  const price = getRandomInt(20, 2000);
  const isFavorite = getRandomInt(0, 2) === 1;
  const type = getRandomArrayElement(TRANSPORT_IMAGES);
  const dateFrom = NOW.toISOString();
  const dateTo = NOW.set('day', getRandomInt(1, 10)).set('hour', getRandomInt(NOW.$H, 24)).toISOString();
  //const d = getRandomInt(4,8);
  const offersIds = [];
  const destId = crypto.randomUUID();

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

export {getRandomPoint, mockOffers, mockDests, getDests, getOffers};
