import { createMainInfo } from '../templates/info-template';
import AbstractView from '../framework/view/abstract-view';

export default class MainInfo extends AbstractView {
  get template() {
    return createMainInfo();
  }
}
