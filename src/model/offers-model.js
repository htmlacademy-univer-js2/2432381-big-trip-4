import Observable from '../framework/observable';
import { mockOffers } from '../mock/point';

export default class OffersModel extends Observable{
  #offers = mockOffers;

  get offers(){
    return this.#offers;
  }
}
