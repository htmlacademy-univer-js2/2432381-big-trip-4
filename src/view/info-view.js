import { createMainInfo } from '../templates/info-template';
import AbstractView from '../framework/view/abstract-view';

export default class MainInfo extends AbstractView {
  #points = null;
  #offers = null;
  #destinations = null;

  constructor({ points, offers, destinations }) {
    super();
    this.#points = points;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template() {
    return createMainInfo({ points: this.#points }, this.#offers, this.#destinations);
  }
}
