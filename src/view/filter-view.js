import { createListFilterElement } from '../templates/filter-template';
import AbstractView from '../framework/view/abstract-view';

export default class ListFilterElement extends AbstractView{
  get template() {
    return createListFilterElement();
  }
}

