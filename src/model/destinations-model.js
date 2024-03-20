import { getDestination } from '../mock/destinations';

export default class DestinationsModel {
  #destinations = getDestination();

  get destinations(){
    return this.#destinations;
  }
}
