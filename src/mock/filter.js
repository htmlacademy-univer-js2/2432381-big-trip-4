import { filter } from '../utils/filter';

//points
//filterPoint

function generateFilter() {
  return Object.entries(filter)
    .map(
      ([filterType]) => ({
        type: filterType,
      }),
    );
}

export { generateFilter };
