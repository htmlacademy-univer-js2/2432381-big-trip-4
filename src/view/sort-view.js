import { createElement } from '../render';
import { createListSortElement } from '../templates/sort-template';

export default class ListSortElement {
  getFilter(){
    return createListSortElement();
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
