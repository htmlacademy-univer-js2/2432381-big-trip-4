import { createElement } from '../render';
import { createEventListTemplate } from '../templates/event-list-template';

export default class EventListView {
  getFilter(){
    return createEventListTemplate();
  }
  getElement(){
    if(!this.element){
      this.element = createElement(this.getFilter());
    }
    return this.element;
  }
  removeElement(){
    this.element = null;
  }
}
