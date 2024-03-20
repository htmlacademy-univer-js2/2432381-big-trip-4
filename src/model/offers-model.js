import { getOffer } from '../mock/offers';

export default class OffersModel {
  #offers = getOffer();

  get offers(){
    return this.#offers;
  }
}
