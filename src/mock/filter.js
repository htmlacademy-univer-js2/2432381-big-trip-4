import { filter } from "../utils/filter";

function generateFilter(points) {
  return Object.entries(filter)
    .map(
      ([filterType, filterPoint]) => ({
        type: filterType,
      }),
    );
}

export { generateFilter };
