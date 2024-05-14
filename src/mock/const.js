const TRANSPORT_IMAGES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const TRANSPORT_OFFERS = [
  {'taxi': [{title: 'taxi-offer-1', price: 10}, {title: 'taxi-offer-2', price: 20}, {title: 'taxi-offer-3', price: 30}]},
  {'bus': [{title: 'bus-offer-1', price: 10}, {title: 'bus-offer-2', price: 20}, {title: 'bus-offer-3', price: 30}]},
  {'train': [{title: 'train-offer-1', price: 10}, {title: 'train-offer-2', price: 20}, {title: 'train-offer-3', price: 30}]},
  {'ship': [{title: 'ship-offer-1', price: 10}, {title: 'ship-offer-2', price: 20}, {title: 'ship-offer-3', price: 30}]},
  {'drive': [{title: 'drive-offer-1', price: 10}, {title: 'drive-offer-2', price: 20}, {title: 'drive-offer-3', price: 30}]},
  {'flight': [{title: 'flight-offer-1', price: 10}, {title: 'flight-offer-2', price: 20}, {title: 'flight-offer-3', price: 30}]},
  {'check-in': [{title: 'check-in-offer-1', price: 10}, {title: 'check-in-offer-2', price: 20}, {title: 'check-in-offer-3', price: 30}]},
  {'sightseeing': [{title: 'sightseeing-offer-1', price: 10}, {title: 'sightseeing-offer-2', price: 20}, {title: 'sightseeing-offer-3', price: 30}]},
  {'restaurant': [{title: 'restaurant-offer-1', price: 10}, {title: 'restaurant-offer-2', price: 20}, {title: 'restaurant-offer-3', price: 30}]},
];

const CITIES = [
  'Amsterdam',
  'Geneva',
  'Chamonix',
  'Tokyo',
  'Moscow',
  'Abu Dhabi',
  'Brussels',
  'Budapest',
  'Cairo',
  'Cape Town',
  'Chicago',
  'Dubai',
  'Helsinki',
];

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

const OFFERS = [
  {ofName: 'Add luggage', price: 30},
  {ofName: 'Switch to comfort class', price: 100},
  {ofName: 'Add meal', price: 15},
  {ofName: 'Choose seats', price: 5},
  {ofName: 'Travel by train', price: 40},
];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const EmptyFilter = [
  {type: 'everything', emptyMsg: 'Click New Event to create your first point'},
  {type: 'future', emptyMsg: 'There are no future events now'},
  {type: 'present', emptyMsg: 'There are no present events now'},
  {type: 'past', emptyMsg: 'There are no past events now'},
];

const SortType = {
  DAY: 'Day',
  EVENT: 'Event',
  TIME: 'Time',
  PRICE: 'Price',
  OFFERS: 'Offers',
};


export {TRANSPORT_IMAGES, CITIES, OFFERS, FilterType, EmptyFilter, SortType, TRANSPORT_OFFERS, citiesData};
