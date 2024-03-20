import { getRandomPoint } from '../mock/point.js';
import { sortPointsArr } from '../utils/task.js';

const POINTS_COUNT = 6;

export default class PointsModel {
  #points = sortPointsArr(Array.from({length: POINTS_COUNT}, getRandomPoint));

  get points() {
    return this.#points;
  }
}
