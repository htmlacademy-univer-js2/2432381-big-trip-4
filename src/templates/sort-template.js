import { SortType } from '../mock/const';

function createListSortElement(currentSortType) {
  const createAllSortElements = () => {

    const typesArr = [];

    for(let i = 0; i < Object.keys(SortType).length; i++) {

      const isChecked = currentSortType.toUpperCase() === Object.keys(SortType)[i] ? 'checked' : '';
      const isDisabled = (Object.keys(SortType)[i] === 'OFFERS' || Object.keys(SortType)[i] === 'EVENT') ? 'disabled' : '';
      const type = Object.keys(SortType)[i].toLowerCase();

      typesArr.push(`<div class="trip-sort__item  trip-sort__item--${type}">
        <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}"${isDisabled}${isDisabled === 'disabled' ? '' : isChecked}>
        <label class="trip-sort__btn" for="sort-${type}" data-sort-type="${SortType[Object.keys(SortType)[i]]}">${type.toUpperCase()}</label>
      </div>`);
    }

    return typesArr.join('');
  };

  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${createAllSortElements()}
</form>`;

}

export { createListSortElement };
