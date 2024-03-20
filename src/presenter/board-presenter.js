import { render, remove, replace } from '../framework/render';
import NewPointView from '../view/add-new-point';
import EditPointView from '../view/edit-point-view';
import EventListView from '../view/event-list-view';
import PointView from '../view/point-view';
import ListSortElement from '../view/sort-view';

export default class BoardPresenter {
  #container = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #sortComponent = null;
  #eventListComponent = null;
  #newPoint = null;

  #boardPoints = [];
  #boardOffers = [];
  #boardDestinations = [];

  constructor({container, sortComponent, eventListComponent, editPoint, newPoint, pointView, pointsModel, offersModel, destinationsModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#sortComponent = sortComponent || new ListSortElement(); // защитное программироване с оператором ||
    this.#eventListComponent = eventListComponent || new EventListView();
    this.#newPoint = newPoint || (() => new NewPointView());
    this.editPoint = editPoint || (() => new EditPointView());
    this.pointView = pointView || (() => new PointView());
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#boardOffers = [...this.#offersModel.offers];
    this.#boardDestinations = [...this.#destinationsModel.destinations];
    this.#renderComponents();
  }

  #renderComponents() {
    render(this.#sortComponent, this.#container);
    render(this.#eventListComponent, this.#container);

    this.#renderDynamicComponents();
  }

  #renderDynamicComponents() {
    const eventListElement = this.#eventListComponent.element;

    render(this.#newPoint(), eventListElement);

    let isOpenEditForm = false;
    for (let i = 0; i < this.#boardPoints.length; i++) {

      const offer = this.#boardOffers.find((x) => x.offers[0].id === this.#boardPoints[i].offers[0]);
      const dest = this.#boardDestinations.find((x) => x.id === this.#boardPoints[i].destination);

      const escapeKeyDownHandler = (evt) => {
        if(evt.key === 'Escape') {
          evt.preventDefault();
          replaceFormToPoint();
          document.removeEventListener('keydown', escapeKeyDownHandler)
        }
      }

      const pointComponent = new PointView({point: this.#boardPoints[i], offer: offer, destination: dest, onEditClick: () => {
        if(isOpenEditForm === false){
          replacePointToForm();
          isOpenEditForm = true;
        }
        document.addEventListener('keydown', escapeKeyDownHandler);
      }});

      const pointEditComponent = new EditPointView({point: this.#boardPoints[i], offer: offer, destination: dest, onFormSubmit: () => {
        replaceFormToPoint();
        isOpenEditForm = false;
        document.addEventListener('keydown', escapeKeyDownHandler);
      }});

      function replacePointToForm() {
        replace(pointEditComponent, pointComponent);
      }

      function replaceFormToPoint() {
        replace(pointComponent, pointEditComponent);
      }

      render(pointComponent, eventListElement);
    }
  }
}
