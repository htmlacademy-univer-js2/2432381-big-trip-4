import { mockOffers } from '../mock/point';

export default class OffersModel {
  #offers = mockOffers;

  get offers(){
    return this.#offers;
  }
}
