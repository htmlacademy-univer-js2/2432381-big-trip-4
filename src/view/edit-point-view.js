import BaseView from './view';
import { editPointTemplate } from '../templates/edit-point-template';

export default class EditPointView extends BaseView {
  constructor({point, offer, destination}){
    super(editPointTemplate, point, offer, destination);
  }
}
