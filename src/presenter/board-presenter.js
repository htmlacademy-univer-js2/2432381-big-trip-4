import { render } from '../render';
import EventListView from '../view/event-list-view';
import ListSortElement from '../view/sort-view';
import NewPoint from '../view/add-new-point';
import PointView from '../view/point-view';
import EditPoint from '../view/edit-point-view';

export default class BoardPresenter {
  sortComponent = new ListSortElement();
  eventListComponent = new EventListView();

  constructor({container}) {
    this.container = container;
  }
  init(){
    render(this.sortComponent, this.container);
    render(this.eventListComponent, this.container);

    render(new EditPoint(), this.eventListComponent.getElement());
    render(new NewPoint(), this.eventListComponent.getElement());

    for(let i = 0; i < 3; i++){
      render(new PointView(), this.eventListComponent.getElement())
    }
  }
}
