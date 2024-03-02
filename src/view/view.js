import { createElement } from '../render';

export default class BaseView {

  constructor(getTemplateCallback) {
    this.getTemplateCallback = getTemplateCallback;
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplateCallback());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
