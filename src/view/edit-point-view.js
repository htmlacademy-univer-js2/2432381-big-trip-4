import { createElement } from "../render";
import { editPointTemplate } from "../templates/edit-point-template";


export default class EditPoint {
  getFilter(){
    return editPointTemplate();
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
