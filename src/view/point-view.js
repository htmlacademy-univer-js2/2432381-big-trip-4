import { createPointTemplate } from '../templates/point-template';
import AbstractView from '../framework/view/abstract-view';

export default class PointView extends AbstractView {
  #point = null;
  #offer = null;
  #destination = null;

  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({point, offer, destination, onEditClick, onFavoriteClick}){
    super();
    this.#point = point;
    this.#offer = offer;
    this.#destination = destination;
    this.#handleEditClick = onEditClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);

    this.#handleFavoriteClick = onFavoriteClick;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point, this.#offer, this.#destination);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
