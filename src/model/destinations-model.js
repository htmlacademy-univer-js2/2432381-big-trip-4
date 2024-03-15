import { getDestination } from "../mock/destinations";

export default class DestinationsModel {
  destinations = getDestination();

  getDestinations() {
    return this.destinations;
  }
}