import EditPointView from '../view/edit-point-view';
import PointView from '../view/point-view';
import NewPointView from '../view/add-new-point';

import { render, replace, remove } from '../framework/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #eventListComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #pointComponent = null;
  #pointEditComponent = null;
  #newPointComponent = null;

  #point = null;
  #offer = null;
  #destination = null;
  #mode = Mode.DEFAULT;

  constructor({ eventListComponent, onDataChange, onModeChange }) {
    this.#eventListComponent = eventListComponent;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;

  }

  init(point, offer, destination) {
    this.#point = point;
    this.#offer = offer;
    this.#destination = destination;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      offer: this.#offer,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new EditPointView({
      point: this.#point,
      offer: this.#offer,
      destination: this.#destination,
      onFormSubmit: this.#handleFormSubmit,
      onFormClose: this.#resetClickHandler,
    });

    this.#newPointComponent = new NewPointView({
      onAddPoint: this.#handleAddNewPoint,
    });

    if(prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#eventListComponent.element);
      return;
    }

    if(this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if(this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if(this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }

  #resetClickHandler = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToPoint();
  }

  #replacePointToForm () {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escapeKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint () {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escapeKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escapeKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFormSubmit = (point, offer, dest) => {
    this.#handleDataChange(point, offer, dest);
    this.#replaceFormToPoint();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleAddNewPoint() {
    render(new NewPointView(), this.#eventListComponent);
  }
}
