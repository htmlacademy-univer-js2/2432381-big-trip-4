import { createListEmpty } from '../templates/list-empty-template';
import AbstractView from '../framework/view/abstract-view';

export default class ListEmpty extends AbstractView {
  get template() {
    return createListEmpty();
  }
}
