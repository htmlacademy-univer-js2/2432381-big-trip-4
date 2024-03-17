import { getRandomPoint } from '../mock/point.js';
import { sortPointsArr } from '../utils.js';

const POINTS_COUNT = 3;

export default class PointsModel {
  points = Array.from({length: POINTS_COUNT}, getRandomPoint);

  getPoints(){
    this.points = sortPointsArr(this.points);
    return this.points;
  }
}