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

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export {TRANSPORT_IMAGES, FilterType, SortType, EmptyFilter, UserAction, UpdateType};
