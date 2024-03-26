import { normalizeDate, normalizeDay } from "../utils/task";

function createMainInfo(points, offers, dests){

  const firstDest = dests[dests.length - 1].name;
  const midDest = points.points.length > 3 || points.points.length === 1 ? '...' : dests[1].name;
  const lastDest = dests[0].name;

  let pricesArr = [];
  points.points.forEach((x) => pricesArr.push(x.basePrice));
  offers.forEach((x) => x.offers.forEach((x) => { if(x.price !== undefined){pricesArr.push(x.price)}}));

  const totalPrice = pricesArr.reduce((x, y) => x + y)

  const firstDate = normalizeDate(points.points[points.points.length - 1].dateFrom);
  const lastDate = normalizeDay(points.points[points.points.length - 1].dateFrom, points.points[0].dateFrom);
  
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
