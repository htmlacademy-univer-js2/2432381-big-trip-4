function createListEmpty(filters) {

  const filtersList = document.querySelectorAll('.trip-filters__filter input');
  const checkedFilterType = filtersList[Array.from(filtersList).findIndex((x) => x.outerHTML.indexOf('checked') !== -1)].value;
  const msg = filters.find((x) => x.type === checkedFilterType).txtMsg;

  return `<main class="page-body__page-main  page-main">
  <div class="page-body__container">
    <section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>

      <p class="trip-events__msg">${msg}</p>

      <!--
        Значение отображаемого текста зависит от выбранного фильтра:
          * Everthing – 'Click New Event to create your first point'
          * Past — 'There are no past events now';
          * Present — 'There are no present events now';
          * Future — 'There are no future events now'.
      -->
    </section>
  </div>
</main>`;
}

export { createListEmpty };
