import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const DAY_DATE_FORMAT = 'MMM D';
const DAY_FORMAT = 'D';
const HOUR_DATE_FORMAT = 'HH:mm';
const LONG_DAY_DATE_FROMAT = 'DD/MM/YY HH:mm';
const NOW = dayjs();


function normalizeDate (date) {
  return date ? dayjs(date).format(DAY_DATE_FORMAT) : '';
}

function normalizeDay (date1, date2) {
  if(dayjs(date1).format('MMM') === dayjs(date2).format('MMM')){
    return date1 ? dayjs(date1).format(DAY_FORMAT) : '';
  }
  return date1 ? dayjs(date1).format(DAY_DATE_FORMAT) : '';
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

function futureFilterPoints (point) {
  return dayjs().isBefore(point.dateFrom);
}

function pastFilterPoints (point) {
  return dayjs().isAfter(point.dateTo);
}

function presentFilterPoints (point) {
  return (dayjs().isAfter(point.dateFrom) && dayjs().isBefore(point.dateTo));
}

function sortPointsArrByDay (a, b) {
  return Number(dayjs(a.dateFrom).format(DAY_FORMAT)) - Number(dayjs(b.dateFrom).format(DAY_FORMAT));
}

function sortPointsArrByPrice (a, b) {
  return b.basePrice - a.basePrice;
}

function sortPointsArrByTime (a, b) {
  const ft = dayjs(b.dateTo).diff(dayjs(b.dateFrom), 'm');
  const st = dayjs(a.dateTo).diff(dayjs(a.dateFrom), 'm');
  return ft - st;
}

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateA, 'D');
}

export { sortPointsArrByDay, normalizeDate, normalizeHour, normalizeLongDayDate, normalizeDay, futureFilterPoints, presentFilterPoints, NOW, pastFilterPoints, sortPointsArrByPrice, sortPointsArrByTime, isDatesEqual };
