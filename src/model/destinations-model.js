import Observable from '../framework/observable';

export default class DestinationsModel extends Observable{
  #destinations = [];
  #destinationsApiService = null;

  constructor({destinationsApiService}) {
    super();
    this.#destinationsApiService = destinationsApiService;
  }

  async init() {
    try {
      const destinations = await this.#destinationsApiService.destinations;
      this.#destinations = destinations.map((dest) => dest);
    } catch(err) {
      this.#destinations = [];
    }
  }

  get destinations(){
    return this.#destinations;
  }
}
