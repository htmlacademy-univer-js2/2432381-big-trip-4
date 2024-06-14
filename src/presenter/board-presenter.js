/* eslint-disable no-console */
/* eslint-disable no-shadow */
import { render, RenderPosition, remove } from '../framework/render';
import EditPointView from '../view/edit-point-view';
import EventListView from '../view/event-list-view';
import PointView from '../view/point-view';
import SortView from '../view/sort-view';
import ListEmptyView from '../view/list-empty-view';
import MainInfoView from '../view/info-view';
import LoadingView from '../view/loading-view';
import PointPresenter from './point-presenter';
import { filter } from '../utils/filter';
import { SortType, UpdateType, UserAction } from '../mock/const';
import { sortPointsByPrice, sortPointsByTime, sortPointsByDay } from '../utils/task';
import { FilterType } from '../mock/const';
import NewPointPresenter from './new-point-presenter';
import UiBlocker from '../framework/ui-blocker/ui-blocker';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class BoardPresenter {
  #boardContainer = null;
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

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  #allDestinations = null;
  #currentDestinations = [];
  #isLoading = true;
  #onNewPointDestroy = null;

  constructor({
    boardContainer,
    headerContainer,
    eventListComponent,
    editPointView,
    infoView,
    pointView,
    pointsModel,
    offersModel,
    destinationsModel,
    noPointsComponent,
    filterModel,
    onNewPointDestroy
  }) {
    this.#boardContainer = boardContainer;
    this.#headerContainer = headerContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
    this.#destinationsModel = destinationsModel;
    this.#eventListComponent = eventListComponent || new EventListView();
    this.editPointView = editPointView || (() => new EditPointView());
    this.pointView = pointView || (() => new PointView());
    this.#noPointsComponent = noPointsComponent;
    this.infoView = infoView || (() => new MainInfoView());

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#offersModel.addObserver(this.#handleModelEvent);
    this.#destinationsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#onNewPointDestroy = onNewPointDestroy;
  }

  init() {
    this.#renderComponents();
    this.#newPointPresenter = this.#createNewPointPresenter(this.#onNewPointDestroy);
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }
  }

  #createNewPointPresenter(onNewPointDestroy) {
    return new NewPointPresenter({
      pointListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
      allDestinations: this.destinations,
      allOffers: this.offers,
    });
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.PRICE:
        return filteredPoints.sort(sortPointsByPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortPointsByTime);
      case SortType.DAY:
        return filteredPoints.sort(sortPointsByDay);
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
  }

  #clearBoard({ resetSortType = false } = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    remove(this.#mainInfoComponent);
    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearBoard();
    this.#renderComponents();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });
    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
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

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    try {
      switch (actionType) {
        case UserAction.UPDATE_POINT:
          this.#pointPresenter.get(update.id).setSaving();
          await this.#pointsModel.updatePoint(updateType, update);
          break;
        case UserAction.ADD_POINT:
          this.#newPointPresenter.setSaving();
          await this.#pointsModel.addPoint(updateType, update);
          break;
        case UserAction.DELETE_POINT:
          this.#pointPresenter.get(update.id).setDeleting();
          await this.#pointsModel.deletePoint(updateType, update);
          break;
      }
    } catch (err) {
      switch (actionType) {
        case UserAction.UPDATE_POINT:
          this.#pointPresenter.get(update.id).setAborting();
          break;
        case UserAction.ADD_POINT:
          this.#newPointPresenter.setAborting();
          break;
        case UserAction.DELETE_POINT:
          this.#pointPresenter.get(update.id).setAborting();
          break;
      }
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data, this.#findOffer(data), this.#findDestination(data));
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderComponents();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
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
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderMainInfo() {
    if (this.points.length > 0) {
      const midIndex = Math.floor(this.points.length / 2);
      const destinations = [
        this.#findDestination(this.points[0]),
        this.#findDestination(this.points[midIndex]),
        this.#findDestination(this.points[this.points.length - 1])
      ];

      const currentOffers = this.points.map((point) => this.#findOffer(point).offers);
      this.#mainInfoComponent = new MainInfoView({ points: this.points, offers: currentOffers, destinations: destinations });
      render(this.#mainInfoComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
    }
  }

  #renderNoPoints() {
    if (this.points.length === 0 && this.#currentDestinations.length === 0) {
      this.#noPointsComponent = new ListEmptyView({
        filterType: this.#filterType,
      });
      render(this.#noPointsComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
    }
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #findOffer(point) {
    const matchedOffers = this.offers.find((offer) => offer.type === point.type);
    if (!matchedOffers) { return { type: point.type, offers: [] }; }

    const selectedOffers = matchedOffers.offers.filter((offer) => point.offers.includes(offer.id));
    return { type: point.type, offers: selectedOffers };
  }

  #findDestination(point) {
    const destination = this.destinations.find((destination) => destination.id === point.destination) ||
      this.#allDestinations.find((destination) => destination.id === point.destination);
    return destination;
  }

  #renderDynamicComponents() {
    if (!this.#boardContainer) {
      console.error('Board container is not defined');
      return;
    }

    render(this.#eventListComponent, this.#boardContainer);
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    this.#renderSort();
    if (this.points.length === 0) {
      this.#renderNoPoints();
      remove(this.#sortComponent);
    }
    this.#renderMainInfo();
    for (const point of this.points) {
      this.#renderPoint(point, this.#findOffer(point), this.#findDestination(point));
    }
  }
}
