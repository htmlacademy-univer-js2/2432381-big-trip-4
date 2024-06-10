/* eslint-disable arrow-body-style */
import { normalizeLongDayDate } from '../utils/task';
import { TRANSPORT_IMAGES } from '../mock/const';
import he from 'he';

export const editPointTemplate = (data, allOffers, allDestinations) => {
  const point = data.state.point || {};
  const destination = data.dest || {};
  const { isDeleting, isSaving, isDisabled } = data.state;
  const { dateFrom = '', dateTo = '', type = '', basePrice = '' } = point;
  const { description = '', name = '', pictures = [] } = destination;
  const formattedDateFrom = dateFrom ? normalizeLongDayDate(dateFrom) : '';
  const formattedDateTo = dateTo ? normalizeLongDayDate(dateTo) : '';

  function generateTypeElements() {
    return TRANSPORT_IMAGES.map((transportType) => {
      const capitalizedTransportType = transportType.charAt(0).toUpperCase() + transportType.slice(1);
      const isChecked = (type === transportType) ? 'checked' : '';

      return `
        <div class="event__type-item">
          <input id="event-type-${transportType}-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="${transportType}" ${isChecked}>
          <label class="event__type-label event__type-label--${transportType}" for="event-type-${transportType}-1">${capitalizedTransportType}</label>
        </div>
      `;
    }).join('');
  }

  function generateCityOptions() {
    const cities = [];
    allDestinations.forEach((el) => { if(!cities.includes(el.name)) { cities.push(`<option value="${el.name}"></option>`); } });
    return cities.join('');
  }

  function generateOffersElements() {
    const relevantOffers = allOffers.filter((offerGroup) => offerGroup.type === type);
    return relevantOffers.map((offerGroup) => {
      return offerGroup.offers.map((offer) => {
        const isChecked = data.offers?.offers?.some((o) => o.title === offer.title) ? 'checked' : '';
        const offerTitle = he.encode(String(offer.title));
        const offerPrice = he.encode(String(offer.price));

        return `
          <div class="event__offer-selector">
            <input class="event__offer-checkbox visually-hidden" id="event-offer-${offerTitle}-1" type="checkbox" name="event-offer-${offerTitle}" ${isChecked}>
            <label class="event__offer-label" for="event-offer-${offerTitle}-1">
              <span class="event__offer-title">${offerTitle}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offerPrice}</span>
            </label>
          </div>
        `;
      }).join('');
    }).join('');
  }

  const offersHtml = `
    <div class="event__available-offers">
      ${generateOffersElements()}
    </div>
  `;

  const eventIconHtml = type ? `<img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">` : '';

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type event__type-btn" for="event-type-toggle-1" ${isDisabled ? 'disabled' : ''}>
              <span class="visually-hidden">Choose event type</span>
              ${eventIconHtml}
            </label>
            <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${generateTypeElements()}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group event__field-group--destination">
            <label class="event__label event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(String(name))}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
            <datalist id="destination-list-1">
              ${generateCityOptions()}
            </datalist>
          </div>

          <div class="event__field-group event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formattedDateFrom}" ${isDisabled ? 'disabled' : ''}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formattedDateTo}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <div class="event__field-group event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input event__input--price" id="event-price-1" type="number" name="event-price" value="${he.encode(String(basePrice))}" ${isDisabled ? 'disabled' : ''}>
          </div>
          <button class="event__save-btn btn btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'saving...' : 'save'}</button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'deleting...' : 'delete'}</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section event__section--offers">
            <h3 class="event__section-title event__section-title--offers">Offers</h3>
            ${offersHtml}
          </section>

          <section class="event__section event__section--destination">
            <h3 class="event__section-title event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>
            ${pictures.length > 0 ? `
              <div class="event__photos-container">
                <div class="event__photos-tape">
                  ${pictures.map((picture)=> `<img class="event__photo" src="${picture.src}" alt="Event photo">`).join('')}
                </div>
              </div>
            ` : ''}
          </section>
        </section>
      </form>
    </li>
  `;
};

