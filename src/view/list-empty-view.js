import { createListEmpty } from '../templates/list-empty-template';
import AbstractView from '../framework/view/abstract-view';

export default class ListEmpty extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createListEmpty(this.#filterType);
  }
}
