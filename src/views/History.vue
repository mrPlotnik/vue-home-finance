<template lang="pug">
div
  .page-title
    h3 История записей
  .history-chart
    canvas
  section
    table
      thead
        tr
          th #
          th Сумма
          th Дата
          th Категория
          th Тип
          th Открыть
      tbody
        tr
          td 1
          td 1212
          td 12.12.32
          td name
          td
            span.white-text.badge.red Расход
          td
            button.btn-small.btn
              i.material-icons open_in_new
</template>
