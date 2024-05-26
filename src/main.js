import BoardPresenter from './presenter/board-presenter';
import PointsModel from './model/points-model';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import NewPointBtnView from './view/new-point-button-view';
import FilterModel from './model/filters-model';
import FilterPresenter from './presenter/filter-presenter';
import { render } from './framework/render';
import PointsApiService from './points-api-service';
import DestinationsApiService from './destinations-api-service';
import OffersApiService from './offers-api-service';

const AUTHORIZATION = 'Basic hsdl3232JDSkfkd';
const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.page-header');
//const mainElement = bodyElement.querySelector('.page-main');
const siteListFilter = headerElement.querySelector('.trip-controls__filters');
const tripMain = headerElement.querySelector('.trip-main');
const eventsList = bodyElement.querySelector('.trip-events');
const filterModel = new FilterModel();

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION),
});

const destinationsModel = new DestinationsModel({
  destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION),
});

const offersModel = new OffersModel({
  offersApiService: new OffersApiService(END_POINT, AUTHORIZATION),
});

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

const awaiter = async () => {
  await Promise.all([
    filterPresenter.init(),
    offersModel.init(),
    destinationsModel.init(),
  ]);
  boardPresenter.init();
  pointsModel.init();
  //pointsModel.init();
  //filterPresenter.init();
  //boardPresenter.init();
};
awaiter();

