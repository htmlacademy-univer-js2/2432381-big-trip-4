import BaseView from './view';
import { addNewPoint } from '../templates/add-new-point-template';

export default class NewPointView extends BaseView {
  constructor(){
    super(addNewPoint);
  }
}

