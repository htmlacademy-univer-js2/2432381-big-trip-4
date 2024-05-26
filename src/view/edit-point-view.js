import { editPointTemplate } from '../templates/edit-point-template';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class EditPointView extends AbstractStatefulView {
  #offers = null;
  #dest = null;
  #handleFormSubmit = null;
  #handleFormClose = null;
  #handleFormDelete = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #allDests = null;
  #allOffers = null;

  constructor({ point, offer, destination, onFormSubmit, onFormClose, onDeleteClick, allDestinations, allOffers }) {
    super();
    this.#offers = offer;
    this.#dest = destination;
    this.#allDests = allDestinations;
    this.#allOffers = allOffers;
    this._setState(EditPointView.parsePointToState({point}));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onFormClose;
    this.#handleFormDelete = onDeleteClick;

    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formcloseHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationInputHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changeEventTypeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#changeOffersHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#changeEventPriceHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  }

  get template() {
    return editPointTemplate({
      state: this._state,
      offers: this.#offers,
      dest: this.#dest,
    }, this.#allOffers, this.#allDests);

  }

  #changeEventTypeHandler = (evt) => {
    const type = evt.target.value;
    this.updateElement({
      point: {
        ...this._state.point,
        type: type,
        offers: []
      },
    });
  };

  reset = (point) => this.updateElement({point});

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #formcloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };

  #destinationInputHandler = (evt) => {
    evt.preventDefault();
    const selectedDest = this.#allDests.find((d) => d.name === evt.target.value);
    this.#dest = selectedDest;
    const selectedDestId = (selectedDest) ? selectedDest.id : '';
    this.updateElement({
      point: {
        ...this._state.point,
        destination: selectedDestId,
      }
    });
  };

  #changeOffersHandler = () => {
    let checkBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    checkBoxes = checkBoxes.map((el) => el.id);
    checkBoxes = checkBoxes.map((el) => this.element.querySelector(`label[for='${el}']`).children[0].textContent);
    const typeOffers = this.#allOffers.find((offer) => offer.type === this._state.point.type).offers;
    checkBoxes = checkBoxes.map((name) => {
      for(let i = 0; i < typeOffers.length; i++) {
        if(name === typeOffers[i].title) {
          return typeOffers[i].id;
        }
      }
    });

    this._setState({
      point: {
        ...this._state.point,
        offers: checkBoxes
      }
    });
  };

  #changeEventPriceHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      point: {
        ...this._state.point,
        basePrice: Number(evt.target.value),
      }
    });
  };

  static parsePointToState(point) {
    return {
      ...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state.point};

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }

  #DateFromChangeHandler = ([userDateFrom]) => {
    this.updateElement({
      point: {
        ...this._state.point,
        dateFrom: userDateFrom.toISOString(),
      }
    });
  };

  #DateToChangeHandler = ([userDateTo]) => {
    this.updateElement({
      point: {
        ...this._state.point,
        dateTo: userDateTo.toISOString(),
      }
    });
  };

  #setDatepickerFrom() {
    //if (this._state.point && this._state.point.dateFrom) {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('[name="event-start-time"]'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: null,
        onChange: this.#DateFromChangeHandler,
      },
    );
    //}
  }

  #setDatepickerTo() {
    //if (this._state.point && this._state.point.dateTo) {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('[name="event-end-time"]'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: null,
        onChange: this.#DateToChangeHandler,
      },
    );
    //}
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormDelete(EditPointView.parseStateToPoint(this._state));
  };
}
