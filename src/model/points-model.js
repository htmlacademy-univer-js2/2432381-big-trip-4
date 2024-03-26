import { getRandomPoint } from '../mock/point.js';
import { sortPointsArr } from '../utils/task.js';
import { getRandomInt } from '../utils/common.js';

const POINTS_COUNT = getRandomInt(0, 10);

export default class PointsModel {
  #points = sortPointsArr(Array.from({length: POINTS_COUNT}, getRandomPoint));

  get points() {
    return this.#points;
  }
}
