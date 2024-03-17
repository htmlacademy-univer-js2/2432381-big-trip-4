import dayjs from 'dayjs';

const DAY_DATE_FORMAT = 'MMM D';
const HOUR_DATE_FORMAT = 'HH:mm';
const LONG_DAY_DATE_FROMAT = 'DD/MM/YY HH:mm';

function getRandomArrayElement(points){
  return points[Math.floor(Math.random() * points.length)];
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function sortPointsArr(points) {
  return points.sort((a, b) => dayjs(a.date_from) - dayjs(b.date_from));
}

function GetTotalOffersPrice(offers) {
  const ofLength = offers.offers.length;
  let totalPrice = 0;
  switch(true) {
    case(ofLength === 0):
      totalPrice = totalPrice;
      break;
    case(ofLength === 1):
      totalPrice = offers.offers[0].price;
      break;
    case(ofLength > 1):
      totalPrice = offers.offers.reduce((a, b) => a.price + b.price);
      break;
  }
  return totalPrice;
}

function normalizeDate(date) {
  return date ? dayjs(date).format(DAY_DATE_FORMAT) : '';
}

function normalizeHour(date) {
  return date ? dayjs(date).format(HOUR_DATE_FORMAT) : '';
}

function normalizeLongDayDate(date) {
  return date ? dayjs(date).format(LONG_DAY_DATE_FROMAT) : '';
}

function TimeDifference(dateTo, dateFrom) {

  const dif = dayjs(dateTo).diff(dayjs(dateFrom), 'm');
  const hh = Math.floor(dif / 60);
  const dd = Math.floor(hh / 24);
  const mm = dif % 60;

  if (dif < 60) {
    return dif + 1 + 'M';
  } else if (dif >= 60 && dif < 1440) {
    return hh + 'H ' + (mm + 1) + 'M';
  } else if (dif >= 1440) {
    return dd + 'D ' + (hh % 24) + 'H ' + (mm + 1) + 'M';
  }
  return dif;
}

function createElementFromHTML(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

export {getRandomArrayElement, normalizeDate, normalizeHour, TimeDifference, normalizeLongDayDate, getRandomInt, sortPointsArr, GetTotalOffersPrice, createElementFromHTML};