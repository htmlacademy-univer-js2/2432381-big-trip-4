import { render } from '../render';
import NewPointView from '../view/add-new-point';
import EditPointView from '../view/edit-point-view';
import EventListView from '../view/event-list-view';
import PointView from '../view/point-view';
import ListSortElement from '../view/sort-view';

export default class BoardPresenter {

  constructor({container, sortComponent, eventListComponent, editPoint, newPoint, pointView}) {
    this.container = container; // контейнер
    this.sortComponent = sortComponent || new ListSortElement(); // защитное программироване с оператором ||
    this.eventListComponent = eventListComponent || new EventListView();
    this.editPoint = editPoint || (() => new EditPointView());
    this.newPoint = newPoint || (() => new NewPointView());
    this.pointView = pointView || (() => new PointView());
  }

  init() {
    this.renderComponents();
  }

  renderComponents() {
    render(this.sortComponent, this.container);
    render(this.eventListComponent, this.container);

    this.renderDynamicComponents();
  }

  renderDynamicComponents() {
    const eventListElement = this.eventListComponent.getElement();
    render(this.editPoint(), eventListElement);
    render(this.newPoint(), eventListElement);

    const pointsCount = 3;
    for (let i = 0; i < pointsCount; i++) {
      render(this.pointView(), eventListElement);
    }
  }
}
