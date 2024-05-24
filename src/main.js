import BoardPresenter from './presenter/board-presenter';
import PointsModel from './model/points-model';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import NewPointBtnView from './view/new-point-button-view';
import FilterModel from './model/filters-model';
import FilterPresenter from './presenter/filter-presenter';
import { render } from './framework/render';

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.page-header');
//const mainElement = bodyElement.querySelector('.page-main');
const siteListFilter = headerElement.querySelector('.trip-controls__filters');
const tripMain = headerElement.querySelector('.trip-main');
const eventsList = bodyElement.querySelector('.trip-events');
const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  container: eventsList,
  headerContainer: tripMain,
  pointsModel,
  offersModel,
  destinationsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteListFilter,
  filterModel,
  pointsModel,
});

const newPointButtonComponent = new NewPointBtnView({
  onClick: handleNewPointButtonClick,
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

render(newPointButtonComponent, tripMain);

filterPresenter.init();
boardPresenter.init();

