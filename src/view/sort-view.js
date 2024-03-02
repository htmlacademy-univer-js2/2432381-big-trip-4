import BaseView from './view';
import { createListSortElement } from '../templates/sort-template';

export default class ListSortElement extends BaseView {
  constructor(){
    super(createListSortElement);
  }
}
