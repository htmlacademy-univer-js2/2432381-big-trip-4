import { normalizeDate, normalizeDay } from '../utils/task';

function createMainInfo(points = { points: [] }, offers, destinations) {
  const pointDestinations = points.points.map((point) => point.destination);
  destinations = destinations.filter((dest) => pointDestinations.includes(dest.id));
  const firstDest = destinations.length > 0 ? destinations[0].name : '';
  const midDest = points.points.length > 3 || points.points.length === 1 || destinations.length < 2 ? '...' : destinations[1].name || '';
  const lastDest = destinations.length > 0 ? destinations[destinations.length - 1].name : '';

  const pricesArr = [];

  if (Array.isArray(points.points)) {
    points.points.forEach((x) => pricesArr.push(x.basePrice || 0));
  }

  offers.forEach((of) => {
    pricesArr.push(of.price);
  });

  const totalPrice = pricesArr.filter((el) => el !== undefined).reduce((x, y) => x + y, 0);

  const lastDate = points.points.length > 0 ? normalizeDay(points.points[points.points.length - 1].dateTo, points.points[0].dateTo) : '';
  const firstDate = points.points.length > 0 ? normalizeDate(points.points[0].dateFrom) : '';

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${firstDest} &mdash; ${midDest} &mdash; ${lastDest}</h1>

      <p class="trip-info__dates">${firstDate}&nbsp;&mdash;&nbsp;${lastDate}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>
  </section>`;
}

export { createMainInfo };
