import { mockDests } from '../mock/point';

export default class DestinationsModel {
  #destinations = mockDests;

  get destinations(){
    return this.#destinations;
  }
}
