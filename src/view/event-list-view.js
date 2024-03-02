import BaseView from './view';
import { createEventListTemplate } from '../templates/event-list-template';

export default class EventListView extends BaseView {
  constructor(){
    super(createEventListTemplate);
  }
}
