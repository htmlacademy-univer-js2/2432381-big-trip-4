import BaseView from "./view";
import { createListFilterElement } from "../templates/filter-template";

export default class ListFilterElement extends BaseView {
  constructor(){
    super(createListFilterElement);
  }
}

