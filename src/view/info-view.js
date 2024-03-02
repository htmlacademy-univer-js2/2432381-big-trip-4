import BaseView from './view';
import { createMainInfo } from '../templates/info-template';

export default class MainInfo extends BaseView {
  constructor(){
    super(createMainInfo);
  }
}
