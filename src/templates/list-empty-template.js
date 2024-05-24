import { EmptyFilter } from '../mock/const';

function createListEmpty(filterType) {

  const msg = EmptyFilter.find((filter) => filter.type === filterType).emptyMsg;

  return `<section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>

      <p class="trip-events__msg">${msg}</p>

      <!--
        Значение отображаемого текста зависит от выбранного фильтра:
          * Everthing – 'Click New Event to create your first point'
          * Past — 'There are no past events now';
          * Present — 'There are no present events now';
          * Future — 'There are no future events now'.
      -->
    </section>`;
}

export { createListEmpty };
