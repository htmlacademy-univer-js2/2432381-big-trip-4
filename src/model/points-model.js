import { getRandomPoint } from '../mock/point.js';
import { sortPointsArrByDay } from '../utils/task.js';
import { getRandomInt } from '../utils/common.js';

const POINTS_COUNT = getRandomInt(0, 5);

export default class PointsModel {
  #points = Array.from({length: POINTS_COUNT}, getRandomPoint).sort(sortPointsArrByDay);

  get points() {
    return this.#points;
  }
}
