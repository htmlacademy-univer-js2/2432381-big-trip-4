import { render, replace, RenderPosition } from '../framework/render';
import NewPointView from '../view/add-new-point';
import EditPointView from '../view/edit-point-view';
import EventListView from '../view/event-list-view';
import PointView from '../view/point-view';
import ListSortElement from '../view/sort-view';
import ListEmpty from '../view/list-empty-view';
import MainInfo from '../view/info-view';

export default class BoardPresenter {
  #container = null;
  #headerContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #sortComponent = null;
  #eventListComponent = null;
  #newPoint = null;
  #listEmpty = null;
  #isOpenEditForm = false;

  #boardPoints = [];
  #boardOffers = [];
  #boardDestinations = [];

  constructor({container, headerContainer, sortComponent, eventListComponent, editPoint, newPoint, infoView, pointView, pointsModel, offersModel, destinationsModel, listEmpty}) {
    this.#container = container;
    this.#headerContainer = headerContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#sortComponent = sortComponent || new ListSortElement(); // защитное программироване с оператором ||
    this.#eventListComponent = eventListComponent || new EventListView();
    this.#newPoint = newPoint || (() => new NewPointView());
    this.editPoint = editPoint || (() => new EditPointView());
    this.pointView = pointView || (() => new PointView());
    this.#listEmpty = listEmpty || (() => new ListEmpty());
    this.infoView = infoView || (() => new MainInfo());
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

  #renderPoint(point, offer, destination) {

    const escapeKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        this.#isOpenEditForm = false;
        document.removeEventListener('keydown', escapeKeyDownHandler);
      }
    };
    const pointComponent = new PointView({
      point,
      offer,
      onEditClick: () => {
        if (this.#isOpenEditForm === false) {
          replacePointToForm();
          this.#isOpenEditForm = true;
          document.addEventListener('keydown', escapeKeyDownHandler);
        }
      }
    });

    const pointEditComponent = new EditPointView({
      point,
      offer,
      destination,
      onFormSubmit: () => {
        replaceFormToPoint();
        this.#isOpenEditForm = false;
        document.addEventListener('keydown', escapeKeyDownHandler);
      },
      onFormClose: () => {
        replaceFormToPoint();
        this.#isOpenEditForm = false;
      }
    });

    function replacePointToForm () {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToPoint () {
      replace(pointComponent, pointEditComponent);
    }
    render(pointComponent, this.#eventListComponent.element);
  }

  #renderDynamicComponents() {
    //render(this.#newPoint(), this.#eventListComponent.element);
    //console.log(this.#boardPoints[0])
    const sortedOffers = [];
    const sortedDests = [];

    for (let i = 0; i < this.#boardPoints.length; i++) {
      const offer = this.#boardOffers.find((x) => x.offers[0].id === this.#boardPoints[i].offers[0]);
      const dest = this.#boardDestinations.find((x) => x.id === this.#boardPoints[i].destination);

      sortedOffers.push(offer);
      sortedDests.push(dest);

      this.#renderPoint(this.#boardPoints[i], offer, dest);
    }

    render(new MainInfo({points: this.#boardPoints, offers: sortedOffers, dests: sortedDests}), this.#headerContainer, RenderPosition.AFTERBEGIN);
  }
}


