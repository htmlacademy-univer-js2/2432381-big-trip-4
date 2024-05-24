import Observable from '../framework/observable';
import { mockDests } from '../mock/point';

export default class DestinationsModel extends Observable{
  #destinations = mockDests;

  get destinations(){
    return this.#destinations;
  }
}
