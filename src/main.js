import ListFilterElement from './view/filter-view';
import {render, RenderPosition} from './render';
import BoardPresenter from './presenter/board-presenter';
import MainInfo from './view/info-view';
import PointsModel from './model/points-model';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';

const bodyElement = document.querySelector('body');
const headerElement = bodyElement.querySelector('.page-header');
const siteListFilter = headerElement.querySelector('.trip-controls__filters');
const tripMain = headerElement.querySelector('.trip-main');
const eventsList = bodyElement.querySelector('.trip-events');
const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

const boardPresenter = new BoardPresenter({
  container: eventsList,
  pointsModel,
  offersModel,
  destinationsModel,
});
render(new MainInfo(), tripMain, RenderPosition.AFTERBEGIN);
render(new ListFilterElement(), siteListFilter);

boardPresenter.init();
