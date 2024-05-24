import { normalizeLongDayDate } from '../utils/task';
import { TRANSPORT_IMAGES, TRANSPORT_OFFERS } from '../mock/const';
import { citiesData } from '../mock/point';
import he from '../../node_modules/he';

export const editPointTemplate = (data) => {
  const point = data.state.point || {};
  const dest = data.dest || {};

  const { dateFrom = '', dateTo = '', type = '', basePrice = '' } = point;
  const { description = '', name = '', pictures = [] } = dest;
  const dateF = dateFrom ? normalizeLongDayDate(dateFrom) : '';
  const dateT = dateTo ? normalizeLongDayDate(dateTo) : '';

  function typeElements() {
    const transportTypes = TRANSPORT_IMAGES.map((transportType) => {
      const tName = transportType.charAt(0).toUpperCase() + transportType.slice(1);
      const checkedType = (type === transportType) ? 'checked' : '';

      return `<div class="event__type-item">
        <input id="event-type-${transportType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${transportType}" ${checkedType}>
        <label class="event__type-label  event__type-label--${transportType}" for="event-type-${transportType}-1">${tName}</label>
      </div>`;
    });

    return transportTypes.join('');
  }

  function cities() {
    return citiesData.map((city) => `<option value="${city.name}"></option>`).join('');
  }

  function offersElements() {
    const typeOffers = TRANSPORT_OFFERS.reduce((acc, offerGroup) => {
      const trType = Object.keys(offerGroup)[0];
      const offersArr = offerGroup[trType];

      if (trType === type) {
        offersArr.forEach((offer) => {
          const title = offer.title;
          const price = offer.price;
          const typeOf = title.split(' ')[0];

          const isChecked = data.offers && data.offers.offers && data.offers.offers.some((o) => o.title === title);

          acc.push(`<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${typeOf}-1" type="checkbox" name="event-offer-${typeOf}" ${isChecked ? 'checked' : ''}>
            <label class="event__offer-label" for="event-offer-${typeOf}-1">
              <span class="event__offer-title">${title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
            </label>
          </div>`);
        });
      }

      return acc;
    }, []);

    return typeOffers.join('');
  }
  const offersHtml =
    `<div class="event__available-offers">
      ${offersElements()}
    </div>`;

  const htmlImg = (type !== '') ? `<img class="event__type-icon" width="17" height="17" src='img/icons/${type}.png' alt="Event type icon"></img>` : '';

  const htmlStr =
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              ${htmlImg}
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${typeElements()}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(String(name))}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${cities()}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateF}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateT}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${he.encode(String(basePrice))}">
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            ${offersHtml}
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>
            ${pictures.length > 0 ? `<img src="${pictures[0].src}" alt="Picture">` : ''}
          </section>
        </section>
      </form>
    </li>`;

  return htmlStr;
};

