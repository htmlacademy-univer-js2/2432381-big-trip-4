import { createElement } from '../render';
import { createPointTemplate } from '../templates/point-template';

export default class PointView {
  getFilter() {
    return createPointTemplate();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getFilter());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
