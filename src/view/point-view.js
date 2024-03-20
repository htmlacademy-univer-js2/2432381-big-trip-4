import { createPointTemplate, openEditForm } from '../templates/point-template';
import AbstractView from '../framework/view/abstract-view';

export default class PointView extends AbstractView{
  #point = null;
  #offer = null;
  #handleEditClick = null;

  constructor({point, offer, onEditClick}){
    super();
    this.#point = point;
    this.#offer = offer;

    this.#handleEditClick = onEditClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler)
  }

  get template() {
    return createPointTemplate(this.#point, this.#offer);
  }

  #editClickHandler = (evt, isEditWindowOpened) => {
    evt.preventDefault();
    this.#handleEditClick();
  }
}
