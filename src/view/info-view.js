import { createElement } from '../render';
import { mainInfo } from '../templates/info-template';

export default class MainInfo {
  getFilter(){
    return mainInfo();
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
