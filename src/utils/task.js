import dayjs from 'dayjs';

const DAY_DATE_FORMAT = 'MMM D';
const HOUR_DATE_FORMAT = 'HH:mm';
const LONG_DAY_DATE_FROMAT = 'DD/MM/YY HH:mm';

function normalizeDate (date) {
  return date ? dayjs(date).format(DAY_DATE_FORMAT) : '';
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

function sortPointsArr (points) {
  return points.sort((a, b) => dayjs(a.dateFrom) - dayjs(b.dateFrom));
}

export { sortPointsArr, normalizeDate, normalizeHour, normalizeLongDayDate };
