import { normalizeLongDayDate, getTotalOffersPrice } from '../utils/task';
import { TRANSPORT_IMAGES, TRANSPORT_OFFERS, CITIES } from '../mock/const';

export const editPointTemplate = (data) => {
  console.log(data)
  const {dateFrom, dateTo, type, basePrice} = data.state.point || {};
  const {description, name, pictures} = data.dest || {};

  const totalOffersPrice = getTotalOffersPrice(data.offers);
  const dateF = normalizeLongDayDate(dateFrom);
  const dateT = normalizeLongDayDate(dateTo);

  function typeElements() {
    let transportTypes = [];

    for( let i = 0; i < TRANSPORT_IMAGES.length; i++){

      let name = TRANSPORT_IMAGES[i].charAt(0).toUpperCase() + TRANSPORT_IMAGES[i].slice(1);
      let checkedType = (type === TRANSPORT_IMAGES[i]) ? 'checked' : '';

      transportTypes.push(`<div class="event__type-item">
        <input id="event-type-${TRANSPORT_IMAGES[i]}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${TRANSPORT_IMAGES[i]}" ${checkedType}>
        <label class="event__type-label  event__type-label--${TRANSPORT_IMAGES[i]}" for="event-type-${TRANSPORT_IMAGES[i]}-1">${name}</label>
        </div>`);
    }
    return transportTypes.join('');
  }

  function cities() {
    let cityArr = [];
    CITIES.forEach((x) => cityArr.push(`<option value=${x}></option>`));
    return cityArr;
  }

  function offersElements() {
    let typeOffers = [];

    for(let i = 0;  i < TRANSPORT_OFFERS.length; i++){

      const offersArr = Object.values(TRANSPORT_OFFERS[i])[0];
      const trType = Object.keys(TRANSPORT_OFFERS[i])[0];

      for(let j = 0; j < offersArr.length; j++){

        if(trType === type) {

          const title = offersArr[j].title;
          const price = offersArr[j].price;
          const type = title.split(' ')[0];

          let isChecked;
          if(data.offers.offers.sort()[j] !== undefined) {
            isChecked = data.offers.offers[j].title === title;
          }

          typeOffers.push(`<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox" name="event-offer-" ${type} ${isChecked === true ? 'checked' : ''}>
            <label class="event__offer-label" for="event-offer-${type}-1">
              <span class="event__offer-title">${title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
            </label>
            </div>`);
        }
      }
    }
    return typeOffers.join('')
  }

  const offersHtml =
    `<div class="event__available-offers">
      ${offersElements()}
    </div>`;

  const htmlStr =
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src='img/icons/${type}.png' alt="Event type icon">
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
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${cities()}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateF === undefined ? '' : dateF}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateT === undefined ? '' : dateT}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice === undefined ? '' : basePrice}">
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
            <img src="${pictures[0].src}"/>
          </section>
        </section>
      </form>
    </li>`;
  return htmlStr;
};

