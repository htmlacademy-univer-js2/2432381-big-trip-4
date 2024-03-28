import ListFilterElement from './view/filter-view';
import { render } from './framework/render';
import BoardPresenter from './presenter/board-presenter';
import PointsModel from './model/points-model';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import ListEmpty from './view/list-empty-view';
import { generateFilter } from './mock/filter';

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.page-header');
const mainElement = bodyElement.querySelector('.page-main');
const siteListFilter = headerElement.querySelector('.trip-controls__filters');
const tripMain = headerElement.querySelector('.trip-main');
const eventsList = bodyElement.querySelector('.trip-events');
const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filters = generateFilter(pointsModel.points);

const boardPresenter = new BoardPresenter({
  container: eventsList,
  headerContainer: tripMain,
  pointsModel,
  offersModel,
  destinationsModel,
});

if(pointsModel.points.length === 0) {
  mainElement.innerHTML = new ListEmpty({filters}).template;
}
render(new ListFilterElement({filters}), siteListFilter);

boardPresenter.init();

