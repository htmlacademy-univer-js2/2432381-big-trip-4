//import { getRandomPoint } from '../mock/point.js';
//import { sortPointsArrByDay } from '../utils/task.js';
//import { getRandomInt } from '../utils/common.js';
import Observable from '../framework/observable.js';
import { UpdateType } from '../mock/const.js';

//const POINTS_COUNT = getRandomInt(0, 2);

export default class PointsModel extends Observable{
  #pointsApiService = null;
  #points = [];
  //#points = Array.from({length: POINTS_COUNT}, getRandomPoint).sort(sortPointsArrByDay);

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
    /* this.#pointsApiService.points.then((points) => {
      console.log(points.map(this.#adaptToClient));
    }); */
  }

  get points() {
    return this.#points;
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
    } catch(err) {
      this.#points = [];
    }

    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if(index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);

      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];
    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    if (update === undefined) {
      return;
    }
    const index = this.#points.findIndex((point) => point.id === update.id);

    if(index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      isFavorite: point['is_favorite'],

    };

    // Ненужные ключи мы удаляем
    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
