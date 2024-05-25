import { render, RenderPosition, remove } from '../framework/render';
import EditPointView from '../view/edit-point-view';
import EventListView from '../view/event-list-view';
import PointView from '../view/point-view';
import ListSortElement from '../view/sort-view';
import ListEmpty from '../view/list-empty-view';
import MainInfo from '../view/info-view';
import LoadingView from '../view/loading-view';
import PointPresenter from './point-presenter';
import { filter } from '../utils/filter';
import { SortType, UpdateType, UserAction } from '../mock/const';
import { sortPointsArrByPrice, sortPointsArrByTime, sortPointsArrByDay } from '../utils/task';
import { FilterType } from '../mock/const';
import NewPointPresenter from './new-point-presenter';
import { citiesData } from '../mock/point';

export default class BoardPresenter {
  #container = null;
  #headerContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #filterModel = null;
  #destinationsModel = null;

  #sortComponent = null;
  #mainInfoComponent = null;
  #eventListComponent = null;
  #newPointComponent = null;
  #noPointsComponent = null;
  #loadingComponent = new LoadingView();

  #pointPresenter = new Map();
  #newPointPresenter = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  #allDests = null;
  #curDests = [];
  #isLoading = true;

  constructor({container, headerContainer, eventListComponent, editPoint, infoView, pointView, pointsModel, offersModel, destinationsModel, noPointsComponent, filterModel, onNewPointDestroy}) {
    this.#container = container;
    this.#headerContainer = headerContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
    this.#destinationsModel = destinationsModel;
    this.#eventListComponent = eventListComponent || new EventListView();
    this.editPoint = editPoint || (() => new EditPointView());
    this.pointView = pointView || (() => new PointView());
    this.#noPointsComponent = noPointsComponent;
    this.infoView = infoView || (() => new MainInfo());

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#offersModel.addObserver(this.#handleModelEvent);
    this.#destinationsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
    });
  }

  init() {
    this.#allDests = citiesData;
    this.#renderComponents();

  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
    if(this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch(this.#currentSortType) {
      case SortType.PRICE:
        return filteredPoints.sort(sortPointsArrByPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortPointsArrByTime);
      case SortType.DAY:
        return filteredPoints.sort(sortPointsArrByDay);
    }
    return filteredPoints;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  #renderComponents() {
    this.#renderDynamicComponents();
    //this.#renderNoPoints();
  }

  #clearBoard({resetSortType = false} = {}) {

    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    remove(this.#mainInfoComponent);
    if(this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearBoard();
    this.#renderComponents();
  };

  #renderSort() {
    this.#sortComponent = new ListSortElement({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point, offer, destination) {
    const pointPresenter = new PointPresenter({
      eventListComponent: this.#eventListComponent,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      destinations: this.destinations,
      offers: this.offers,
    });

    pointPresenter.init(point, offer, destination);
    this.#pointPresenter.set(point.id, pointPresenter);

  }

  #handleViewAction = (actionType, updateType, update) => {
    switch(actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data, this.#findOffer(data), this.#findDest(data));
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderComponents();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderComponents();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderComponents();
        break;
    }
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((p) => p.resetView());
  };

  #renderMainInfo() {
    if (this.points.length > 0) {
      const dests = [this.#findDest(this.points[0]), this.#findDest(this.points[Math.floor(this.points.length / 2)]), this.#findDest(this.points[this.points.length - 1])];
      this.#mainInfoComponent = new MainInfo({ points: this.points, offers: this.offers, dests: dests });
      render(this.#mainInfoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
    }
  }

  #renderNoPoints() {
    if(this.points.length === 0 && this.#curDests.length === 0) {
      this.#noPointsComponent = new ListEmpty({
        filterType: this.#filterType,
      });
      render(this.#noPointsComponent, this.#container, RenderPosition.AFTERBEGIN);
    }
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #findOffer(point) {
    const matchedOffers = this.offers.find((offer) => offer.type === point.type);
    if (!matchedOffers) { return { type: point.type, offers: [] }; }

    const selectedOffers = matchedOffers.offers.filter((offer) => point.offers.includes(offer.id));
    return { type: point.type, offers: selectedOffers };

  }

  #findDest(point) {
    const destination = this.destinations.find((x) => x.id === point.destination) === undefined ?
      this.#allDests.find((x) => x.id === point.destination) :
      this.destinations.find((x) => x.id === point.destination);
    return destination;
  }

  #renderDynamicComponents() {
    render(this.#eventListComponent, this.#container);
    if(this.#isLoading) {
      this.#renderLoading();
      return;
    }
    this.#renderSort();
    if (this.points.length === 0) {
      this.#renderNoPoints();
      remove(this.#sortComponent);
    }
    this.#renderMainInfo();
    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint(this.points[i], this.#findOffer(this.points[i]), this.#findDest(this.points[i]));
    }
  }
}
