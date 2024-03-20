import { addNewPoint } from '../templates/add-new-point-template';
import AbstractView from '../framework/view/abstract-view';

export default class NewPointView extends AbstractView{
  get template() {
    return addNewPoint();
  }
}

