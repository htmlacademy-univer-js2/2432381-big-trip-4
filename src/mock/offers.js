import { getRandomArrayElement } from '../utils';
import { TRANSPORT_IMAGES } from './const';

const mockOffers = [
  {
    type: getRandomArrayElement(TRANSPORT_IMAGES),
    offers: [
      {
        id: 'b4c3e4e6-9053-42ce-b747-e281314baa31',
        title: 'Switch to comfort',
        price: 700
      }
    ]
  },
  {
    type: getRandomArrayElement(TRANSPORT_IMAGES),
    offers: [
      {
        id: 'b5c3e4e6-9053-42ce-b747-e281314baa31',
        title: 'Upgrade to a low class',
        price: 90
      }
    ]
  },
  {
    type: getRandomArrayElement(TRANSPORT_IMAGES),
    offers: [
      {
        id: 'b6c3e4e6-9053-42ce-b747-e281314baa31',
        title: 'Add luggage',
        price: 50
      },
      {
        id: 'b6c3e4e6-9053-42ce-b747-e281314baa31',
        title: 'Add meal',
        price: 80
      }
    ]
  },
  {
    type: getRandomArrayElement(TRANSPORT_IMAGES),
    offers: [
      {
        id: 'b7c3e4e6-9053-42ce-b747-e281314baa31'
      }
    ]
  },
];

function getOffer() {
  return mockOffers;
}

export { mockOffers, getOffer };
