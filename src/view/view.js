import { createElement } from '../render';


export default class BaseView {

  constructor(getTemplateCallback, point, offer,  destination) {
    this.getTemplateCallback = getTemplateCallback;
    this.point = point;
    this.offer = offer;
    this.destination = destination;

  }
  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplateCallback(this.point, this.offer, this.destination));
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
