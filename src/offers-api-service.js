/* eslint-disable no-console */
import ApiService from './framework/api-service.js';

export default class OffersApiService extends ApiService {
  get offers() {
    return this._fetchData({url: 'offers'});
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
}
