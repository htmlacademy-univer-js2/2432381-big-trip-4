function createListEmpty(filters) {
  const { txtMsg } = filters[0];

  return `<main class="page-body__page-main  page-main">
  <div class="page-body__container">
    <section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>

      <p class="trip-events__msg">${txtMsg}</p>

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
