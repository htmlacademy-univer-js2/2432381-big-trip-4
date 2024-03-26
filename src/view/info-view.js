import { createMainInfo } from '../templates/info-template';
import AbstractView from '../framework/view/abstract-view';

export default class MainInfo extends AbstractView {
  #points = null;
  #offers = null;
  #dests = null;

  constructor({points, offers, dests}) {
    super();
    this.#points = points;
    this.#offers = offers;
    this.#dests = dests;
  }
  
  get template() {
    return createMainInfo({points: this.#points} , this.#offers, this.#dests);
  }
}
