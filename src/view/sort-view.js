import { createListSortElement } from '../templates/sort-template';
import AbstractView from '../framework/view/abstract-view';

export default class ListSortElement extends AbstractView {
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#SortTypeChangeHandler);

  }

  get template() {
    return createListSortElement(this.#currentSortType);
  }

  #SortTypeChangeHandler = (evt) => {
    if(evt.target.tagName !== 'LABEL') {
      return;
    }
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
