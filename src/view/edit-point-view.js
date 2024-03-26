import { editPointTemplate } from '../templates/edit-point-template';
import AbstractView from '../framework/view/abstract-view';

export default class EditPointView extends AbstractView{
  #point = null;
  #offer = null;
  #destination = null;
  #handleFormSubmit = null;
  #handleFormClose = null;

  constructor({point, offer, destination, onFormSubmit, onFormClose}){
    super();
    this.#point = point;
    this.#offer = offer;
    this.#destination = destination;

    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onFormClose;

    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formcloseHandler);
  }

  get template() {
    return editPointTemplate(this.#point, this.#offer, this.#destination);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };
  #formcloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };
}
