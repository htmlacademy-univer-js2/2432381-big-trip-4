import { createEventListTemplate } from '../templates/event-list-template';
import AbstractView from '../framework/view/abstract-view';

export default class EventListView extends AbstractView {
  get template() {
    return createEventListTemplate();
  }
}
