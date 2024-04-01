import { createListEmpty } from '../templates/list-empty-template';
import AbstractView from '../framework/view/abstract-view';

export default class ListEmpty extends AbstractView {
  #filters = null;

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createListEmpty(this.#filters);
  }
}
