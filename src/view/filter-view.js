import { createListFilterElement } from '../templates/filter-template';
import AbstractView from '../framework/view/abstract-view';

export default class ListFilterElement extends AbstractView {
  #currentFilterType = null;
  #filters = [];
  #handleFilterTypeChange = null;

  constructor({ currentFilterType, filters, onFilterTypeChange }) {
    super();
    this.#currentFilterType = currentFilterType;
    this.#filters = filters;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChange);
  }

  get template() {
    return createListFilterElement(this.#filters, this.#currentFilterType);
  }

  #filterTypeChange = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
