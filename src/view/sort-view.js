import { createListSortElement } from '../templates/sort-template';
import AbstractView from '../framework/view/abstract-view';

export default class ListSortElement extends AbstractView {
  #handleSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#SortTypeChangeHandler);

  }

  get template() {
    return createListSortElement();
  }

  #SortTypeChangeHandler = (evt) => {
    if(evt.target.tagName !== 'LABEL') {
      return;
    }
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
