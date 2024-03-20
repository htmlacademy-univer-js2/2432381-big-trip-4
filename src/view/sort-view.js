import { createListSortElement } from '../templates/sort-template';
import AbstractView from '../framework/view/abstract-view';

export default class ListSortElement extends AbstractView {
  get template() {
    return createListSortElement();
  }
}
