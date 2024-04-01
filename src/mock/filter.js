import { filter } from '../utils/filter';

//points
//filterPoint

function generateFilter(points) {
  return Object.entries(filter)
    .map(
      ([filterType, filterPoints]) => ({
        type: filterType,
        count: filterPoints(points).length,
        txtMsg: filterType !== 'everything' ? `There are no ${filterType} events now` : 'Click New Event to create your first point',
      }),
    );
}

export { generateFilter };
