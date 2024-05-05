import { editPointTemplate } from '../templates/edit-point-template';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import flatpickr from 'flatpickr';
import { CITIES } from '../mock/const';

import 'flatpickr/dist/flatpickr.min.css';

export default class EditPointView extends AbstractStatefulView {
  #offers = null;
  #dest = null;
  #handleFormSubmit = null;
  #handleFormClose = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #allDests = null;

  constructor({ point, offer, destination, onFormSubmit, onFormClose }) {
    super();
    this.#offers = offer;
    this.#dest = destination;
    this.#allDests = CITIES;
    this._setState(EditPointView.parsePointToState({point}));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormClose = onFormClose;

    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formcloseHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationInputHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changeEventTypeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#changeOffersHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#changeEventPriceHandler);
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  }

  get template() {
    return editPointTemplate({
      state: this._state,
      offers: this.#offers,
      dest: this.#dest,
    });

  }

  #changeEventTypeHandler = (evt) => {
    this.updateElement({
      point: {
        ...this._state.point,
        type: evt.target.value,
        offers: []
      }
    });
  };

  reset = (point) => this.updateElement({point});

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
    if (this._state.point.dateFrom) {
      this.#datepickerFrom = flatpickr(
        this.element.querySelector(`[name='event-start-time']`),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.point.dateFrom,
          onChange: this.#DateFromChangeHandler,
        },
      );
    }
  }

  #setDatepickerTo() {
    if (this._state.point.dateTo) {
      this.#datepickerTo = flatpickr(
        this.element.querySelector(`[name='event-end-time']`),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.point.dateTo,
          onChange: this.#DateToChangeHandler,
        },
      );
    }
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #formcloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };

  #destinationInputHandler = (evt) => {
    const selectedDest = this.#allDests.find((d) => d === evt.target.value);
    const selectedDestId = (selectedDest) ? selectedDest.id : '';
    this.updateElement({
      point: {
        ...this._state.point,
        destination: selectedDestId,
      }
    });
  };

  #changeOffersHandler = () => {
    const checkBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({
      point: {
        ...this._state.point,
        offers: checkBoxes.map((e) => e.dataset.offerId)
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

  static parsePointToState = (point) => (point);

  static parseStateToPoint = (state) => state.point;
}
