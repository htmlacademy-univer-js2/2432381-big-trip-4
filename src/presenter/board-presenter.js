import { render, RenderPosition, remove } from '../framework/render';
import { updateItem } from '../utils/common';
import EditPointView from '../view/edit-point-view';
import EventListView from '../view/event-list-view';
import PointView from '../view/point-view';
import ListSortElement from '../view/sort-view';
import MainInfo from '../view/info-view';
import PointPresenter from './point-presenter';

export default class BoardPresenter {
  #container = null;
  #headerContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #sortComponent = null;
  #eventListComponent = null;
  #pointPresenter = new Map();

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
    this.editPoint = editPoint || (() => new EditPointView());
    this.pointView = pointView || (() => new PointView());
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

    const pointPresenter = new PointPresenter({
      eventListComponent: this.#eventListComponent,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point, offer, destination);

    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #clearPointList() {
    this.#pointPresenter.forEach((p) => p .destroy());
    this.#pointPresenter.clear();
    remove(this.infoView);
  }

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.#findOffer(updatedPoint), this.#findDest(updatedPoint));
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((p) => p.resetView());
  };

  #renderMainInfo(points, sOffers, sDests){
    render(
      new MainInfo({points: points, offers: sOffers, dests: sDests}),
      this.#headerContainer,
      RenderPosition.AFTERBEGIN,
    );
  }

  #findOffer(point) {
    return this.#boardOffers.find((x) => x.offers[0].id === point.offers[0]);
  }

  #findDest(point) {
    return this.#boardDestinations.find((x) => x.id === point.destination);
  }

  #renderDynamicComponents() {
    const sortedOffers = [];
    const sortedDests = [];

    for (let i = 0; i < this.#boardPoints.length; i++) {
      const offer = this.#findOffer(this.#boardPoints[i]);
      const dest = this.#findDest(this.#boardPoints[i]);

      sortedOffers.push(offer);
      sortedDests.push(dest);

      this.#renderPoint(this.#boardPoints[i], offer, dest);
    }
    this.#renderMainInfo(this.#boardPoints, sortedOffers, sortedDests);
  }
}
