/* eslint-disable no-console */
import ApiService from './framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class PointsApiService extends ApiService {
  get points() {
    return this._fetchData({ url: 'points' });
  }

  async updatePoint(point) {
    return this._fetchData({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
  }

  async addPoint(point) {
    return this._fetchData({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
  }

  async deletePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  async _fetchData(config) {
    try {
      const response = await this._load(config);
      return await ApiService.parseResponse(response);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      throw error;
    }
  }

  #adaptToServer(point) {
    const { basePrice, dateFrom, dateTo, isFavorite, ...rest } = point;
    return {
      ...rest,
      'base_price': basePrice,
      'date_from': dateFrom,
      'date_to': dateTo,
      'is_favorite': isFavorite,
    };
  }
}
