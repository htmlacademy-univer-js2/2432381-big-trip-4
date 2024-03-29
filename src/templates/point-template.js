import { normalizeDate, normalizeHour, timeDifference } from '../utils/task';

function createPointTemplate (point, offer) {

  const {dateFrom, dateTo, type, basePrice, isFavorite} = point || {};

  const elOffers = [];
  //console.log(offer[2].offers)
  for(let i = 0; i < offer.offers.length; i++) {
    elOffers.push(`<li class="event__offer">
    <span class="event__offer-title">${offer.offers[i].title === undefined ? '' : offer.offers[i].title}</span>
    ${offer.offers[i].title === undefined ? '' : '&plus;&euro;&nbsp'}
    <span class="event__offer-price">${offer.offers[i].price === undefined ? '' : offer.offers[i].price}</span>
    </li>`);
  }

  const date = normalizeDate(dateFrom);
  const dateFromDur = normalizeHour(dateFrom);
  const dateToDur = normalizeHour(dateTo);
  const duration = timeDifference(dateTo, dateFrom);

  const isF = isFavorite === true ? 'active' : 'disabled';

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${date}">${date}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src='img/icons/${type}.png' alt="Event type icon">
    </div>
    <h3 class="event__title">${type}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">${dateFromDur}</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T11:00">${dateToDur}</time>
      </p>
      <p class="event__duration">${duration}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${elOffers.join('')}
    </ul>
    <button class="event__favorite-btn event__favorite-btn--${isF}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
}

export { createPointTemplate };
