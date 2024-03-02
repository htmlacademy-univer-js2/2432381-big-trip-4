import BaseView from './view';
import { createPointTemplate } from '../templates/point-template';
export default class PointView extends BaseView {
  constructor(){
    super(createPointTemplate);
  }
}
