import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';

dayjs.extend(utc);
dayjs.extend(duration);

const DAY_DATE_FORMAT = 'MMM D';
const DAY_FORMAT = 'D';
const HOUR_DATE_FORMAT = 'HH:mm';
const LONG_DAY_DATE_FORMAT = 'DD/MM/YY HH:mm';
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
  return date ? dayjs(date).format(LONG_DAY_DATE_FORMAT) : '';
}

export const getTimeDifference = (dateTo, dateFrom) => {

  const timeDifference = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)));

  const timeDifferenceInMinutes = timeDifference.asMinutes();
  const timeDifferenceInHours = timeDifference.asHours();
  const timeDifferenceInDays = timeDifference.asDays();

  if (timeDifferenceInHours < 1) {
    // если разница меньше часа, то возвращаем разницу в минутах
    return `${Math.floor(timeDifferenceInMinutes)}M`;
  } else if (timeDifferenceInDays < 1) {
    // если разница меньше дня, то возвращаем разницу в часах и минутах
    const hours = Math.floor(timeDifferenceInHours);
    const minutes = Math.floor(timeDifferenceInMinutes % 60);
    return `${hours}H ${minutes}M`;
  } else {
    // если разница больше дня, то возвращаем разницу в днях, часах и минутах
    const days = Math.floor(timeDifferenceInDays);
    const hours = Math.floor(timeDifferenceInHours % 24);
    const minutes = Math.floor(timeDifferenceInMinutes % 60);
    return `${days}D ${hours}H ${minutes}M`;
  }
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

function sortPointsByDay (a, b) {
  const dateA = dayjs(a.dateFrom);
  const dateB = dayjs(b.dateFrom);

  if (dateA.isBefore(dateB)) {
    return -1;
  } else if (dateA.isAfter(dateB)) {
    return 1;
  } else {
    return 0;
  }
}

function sortPointsByPrice (a, b) {
  return b.basePrice - a.basePrice;
}

function sortPointsByTime (a, b) {
  const ft = dayjs(b.dateTo).diff(dayjs(b.dateFrom), 'm');
  const st = dayjs(a.dateTo).diff(dayjs(a.dateFrom), 'm');
  return ft - st;
}

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateA, 'D');
}

export { sortPointsByDay, normalizeDate, normalizeHour, normalizeLongDayDate, normalizeDay, futureFilterPoints, presentFilterPoints, NOW, pastFilterPoints, sortPointsByPrice, sortPointsByTime, isDatesEqual };
