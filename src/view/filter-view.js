import { createListFilterElement } from '../templates/filter-template';
import AbstractView from '../framework/view/abstract-view';

export default class ListFilterElement extends AbstractView {
  #filters = [];

  constructor({filters}) {
    super();
    this.#filters = filters;
  }
  
  get template() {
    return createListFilterElement(this.#filters);
  }
}

