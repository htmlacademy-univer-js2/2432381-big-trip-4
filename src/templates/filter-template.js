function createFilterItemTemplate(filter, isChecked) {
  const {type} = filter;
  //if(filter)
  //console.log(filter)
  //const arr = []
  //console.log(arr.length === 0 ? 'dsdsadsadsa' : arr.filter((x) => x))
  return `<div class="trip-filters__filter">
  <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type} ${isChecked ? 'checked' : ''}">
  <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
  </div>`;
}

function createListFilterElement(filters){
  const filterItemsTemplate = filters
    .map((filter) => createFilterItemTemplate(filter))
    .join('');
  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
}
export { createListFilterElement, createFilterItemTemplate };
