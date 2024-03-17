import { render } from '../render';
import NewPointView from '../view/add-new-point';
import EditPointView from '../view/edit-point-view';
import EventListView from '../view/event-list-view';
import PointView from '../view/point-view';
import ListSortElement from '../view/sort-view';

export default class BoardPresenter {

  constructor({container, sortComponent, eventListComponent, editPoint, newPoint, pointView, pointsModel, offersModel, destinationsModel}) {
    this.container = container;
    this.pointsModel = pointsModel;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
    this.sortComponent = sortComponent || new ListSortElement(); // защитное программироване с оператором ||
    this.eventListComponent = eventListComponent || new EventListView();
    this.editPoint = editPoint || (() => new EditPointView());
    this.newPoint = newPoint || (() => new NewPointView());
    this.pointView = pointView || (() => new PointView());
  }

  init() {
    this.boardPoints = [...this.pointsModel.getPoints()];
    this.boardOffers = [...this.offersModel.getOffers()];
    this.boardDestinations = [...this.destinationsModel.getDestinations()];
    this.renderComponents();
  }

  renderComponents() {
    render(this.sortComponent, this.container);
    render(this.eventListComponent, this.container);

    this.renderDynamicComponents();
  }

  renderDynamicComponents() {
    const eventListElement = this.eventListComponent.getElement();
    render(new EditPointView({point: this.boardPoints[0], offer: this.boardOffers.find((x) => x.offers[0].id === this.boardPoints[0].offers[0]),
      destination: this.boardDestinations.find((x) => x.id === this.boardPoints[0].destination)}), eventListElement);
    render(this.newPoint(), eventListElement);

    for (let i = 0; i < this.boardPoints.length; i++) {

      const offer = this.boardOffers.find((x) => x.offers[0].id === this.boardPoints[i].offers[0]);
      const dest = this.boardDestinations.find((x) => x.id === this.boardPoints[i].destination);

      render(new PointView({point: this.boardPoints[i], offer: offer, destination: dest}), eventListElement);
    }
  }
}
