import AbstractView from '../framework/view/abstract-view';
import { loadingTemplate } from '../templates/loading-template';

export default class LoadingView extends AbstractView {
  get template() {
    return loadingTemplate();
  }
}
