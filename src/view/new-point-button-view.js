import AbstractView from '../framework/view/abstract-view';
import { addNewPointBtn } from '../templates/add-new-point-btn-template';

export default class NewPointBtnView extends AbstractView {
  #handleClick = null;

  constructor({onClick}) {
    super();
    this.#handleClick = onClick;

    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return addNewPointBtn();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
