<template lang="pug">
.home
  .page-title
    h3 Счет
    button.btn.waves-effect.waves-light.btn-small
      i.material-icons refresh
  .row
    .col.s12.m6.l4
      .card.light-blue.bill-card
        .card-content.white-text
          span.card-title Счет в валюте
          p.currency-line
            span 12.0 Р
    .col.s12.m6.l8
      .card.orange.darken-3.bill-card
        .card-content.white-text
          .card-header
            span.card-title Курс валют
          table
            thead
              tr
                th Валюта
                th Курс
                th Дата
            tbody
              tr
                td руб
                td 12121
                td 12.12.12
</div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
