const TRANSPORT_IMAGES = [
  'bus',
  'taxi',
  'check-in',
  'drive',
  'flight',
  'restaurant',
  'ship',
  'sightseeing',
  'train',
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
  {type: 'future', emptyMsg: 'There are no future events now'},
  {type: 'present', emptyMsg: 'There are no present events now'},
  {type: 'past', emptyMsg: 'There are no past events now'},
  {type: 'everything', emptyMsg: 'Click New Event to create your first point'},
];


export {TRANSPORT_IMAGES, CITIES, OFFERS, FilterType, EmptyFilter};
