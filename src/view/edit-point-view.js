import { editPointTemplate } from '../templates/edit-point-template';
import AbstractView from '../framework/view/abstract-view';

export default class EditPointView extends AbstractView{
  #point = null;
  #offer = null;
  #destination = null;
  #handleFormSubmit = null;

  constructor({point, offer, destination, onFormSubmit}){
    super();
    this.#point = point;
    this.#offer = offer;
    this.#destination = destination;

    this.#handleFormSubmit = onFormSubmit;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  get template() {
    return editPointTemplate(this.#point, this.#offer, this.#destination);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };
}
