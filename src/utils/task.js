import dayjs from 'dayjs';

var utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

const DAY_DATE_FORMAT = 'MMM D';
const DAY_FORMAT = 'D';
const HOUR_DATE_FORMAT = 'HH:mm';
const DATE_FORMAT = 'DD/MM/YY';
const LONG_DAY_DATE_FROMAT = 'DD/MM/YY HH:mm';
const NOW = dayjs();


function normalizeDate (date) {
  return date ? dayjs(date).format(DAY_DATE_FORMAT) : '';
}

function normalizeDay (date1, date2) {
  //return date ? dayjs(date).format(DAY_FORMAT) : '';
  if(dayjs(date1).format('MMM') === dayjs(date2).format('MMM')){
    return date2 ? dayjs(date2).format(DAY_FORMAT) : '';
  }
  return date2 ? dayjs(date2).format(DAY_DATE_FORMAT) : '';
}

function normalizeHour (date) {
  return date ? dayjs(date).format(HOUR_DATE_FORMAT) : '';
}

function normalizeLongDayDate (date) {
  return date ? dayjs(date).format(LONG_DAY_DATE_FROMAT) : '';
}

export const timeDifference = (dateTo, dateFrom) => {

  const dif = dayjs(dateTo).diff(dayjs(dateFrom), 'm');
  const hh = Math.floor(dif / 60);
  const dd = Math.floor(hh / 24);
  const mm = dif % 60;

  if (dif < 60) {
    return `${dif + 1}M`;
  } else if (dif >= 60 && dif < 1440) {
    return `${hh}H ${(mm + 1)}M`;
  } else if (dif >= 1440) {
    return `${dd}D ${(hh % 24)}H ${(mm + 1)}M`;
  }
  return dif;
};

export const getTotalOffersPrice = (offers) => {
  const ofLength = offers.offers.length;
  let totalPrice;
  switch(true) {
    case(ofLength === 0):
      totalPrice = 0;
      break;
    case(ofLength === 1):
      totalPrice = offers.offers[0].price;
      break;
    case(ofLength > 1):
      totalPrice = offers.offers.reduce((a, b) => a.price + b.price);
      break;
  }
  return totalPrice;
};

const futureFilterPoints = (point) => {
  return dayjs().isBefore(point.dateFrom);
}

const pastFilterPoints = (point) => {
  return dayjs().isAfter(point.dateTo);
}

const presentFilterPoints = (point) => {
  return (dayjs().isAfter(point.dateFrom) && dayjs().isBefore(point.dateTo));
}

function sortPointsArr (points) {
  return points.sort((a, b) => dayjs(b.dateFrom) - dayjs(a.dateFrom));
}

export { sortPointsArr, normalizeDate, normalizeHour, normalizeLongDayDate, normalizeDay, futureFilterPoints, presentFilterPoints, NOW, pastFilterPoints };
