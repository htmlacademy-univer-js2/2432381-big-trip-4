import { FilterType } from '../mock/const';
import { futureFilterPoints, pastFilterPoints, presentFilterPoints } from './task.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => [...points],
  [FilterType.FUTURE]: (points) => points.filter((point) => futureFilterPoints(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => presentFilterPoints(point)),
  [FilterType.PAST]: (points) => points.filter((point) => pastFilterPoints(point)),
};

export { filter };
