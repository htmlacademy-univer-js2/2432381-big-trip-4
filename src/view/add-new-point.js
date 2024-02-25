import { createElement } from '../render';
import { addNewPoint } from '../templates/add-new-point-template';

export default class NewPoint {
  getFilter(){
    return addNewPoint();
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

