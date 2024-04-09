import { render, RenderPosition } from '../framework/render';
import { updateItem } from '../utils/common';
import NewPointView from '../view/add-new-point';
import EditPointView from '../view/edit-point-view';
import EventListView from '../view/event-list-view';
import PointView from '../view/point-view';
import ListSortElement from '../view/sort-view';
import ListEmpty from '../view/list-empty-view';
import MainInfo from '../view/info-view';
import PointPresenter from './point-presenter';
import { SortType } from '../mock/const';
import { sortPointsArrByPrice, sortPointsArrByTime } from '../utils/task';

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

  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;
  #sourcedBoardPoints = [];

  #boardPoints = [];
  #boardOffers = [];
  #boardDestinations = [];

  #sortedOffers = [];
  #sortedDests = [];

  constructor({container, headerContainer, eventListComponent, editPoint, newPoint, infoView, pointView, pointsModel, offersModel, destinationsModel, listEmpty}) {
    this.#container = container;
    this.#headerContainer = headerContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
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

    this.#sourcedBoardPoints = [...this.#pointsModel.points];

    this.#renderComponents();
  }

  #renderComponents() {
    this.#renderSort();
    render(this.#eventListComponent, this.#container);
    this.#renderDynamicComponents();
    this.#renderMainInfo(this.#boardPoints, this.#sortedOffers, this.#sortedDests);
  }

  #sortPoints(sortType) {
    switch(sortType) {
      case SortType.PRICE:
        this.#boardPoints.sort(sortPointsArrByPrice);
        break;
      case SortType.TIME:
        this.#boardPoints.sort(sortPointsArrByTime);
        break;
      default:
        this.#boardPoints = [...this.#sourcedBoardPoints];
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderDynamicComponents();
  };

  #renderSort() {
    this.#sortComponent = new ListSortElement({
      onSortTypeChange: this.#handleSortTypeChange,
    });
    render(this.#sortComponent, this.#container);
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
    this.#pointPresenter.forEach((p) => p.destroy());
    this.#pointPresenter.clear();
  }

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
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
    for (let i = 0; i < this.#boardPoints.length; i++) {
      const offer = this.#findOffer(this.#boardPoints[i]);
      const dest = this.#findDest(this.#boardPoints[i]);

      this.#sortedOffers.push(offer);
      this.#sortedDests.push(dest);

      this.#renderPoint(this.#boardPoints[i], offer, dest);
    }
  }
}
