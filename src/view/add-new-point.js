import { addNewPoint } from '../templates/add-new-point-template';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';

export default class NewPointView extends AbstractStatefulView{
  #handleAddPoint = null;

  constructor() {
    super();
    document.querySelector('.trip-main__event-add-btn').addEventListener('click', this.#addNewPointHandler);
  }

  get template() {
    return addNewPoint();
  }

  #addNewPointHandler = (evt) => {
    evt.preventDefault();
    this.#handleAddPoint();
  };
}

