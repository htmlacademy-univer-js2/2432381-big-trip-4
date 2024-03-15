import { getOffer } from "../mock/offers";

export default class OffersModel {
  offers = getOffer();

  getOffers() {
    return this.offers;
  }
}