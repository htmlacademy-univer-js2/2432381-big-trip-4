

function createFilterItemTemplate(filter, currentFilter) {
  const { type, name, count } = filter;
  const isChecked = currentFilter === type ? 'checked' : '';
  const isDisabled = count === 0 ? 'disabled' : '';
  return `<div class="trip-filters__filter">
  <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}"${isDisabled} ${isChecked}>
  <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
  </div>`;
}

function createListFilterElement(filters, currentFilter){
  const filterItemsTemplate = filters
    .map((filter) => createFilterItemTemplate(filter, currentFilter))
    .join('');
  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
}

export { createListFilterElement, createFilterItemTemplate};
