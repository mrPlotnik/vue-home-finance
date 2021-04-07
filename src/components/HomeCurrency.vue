<template lang="pug">
.col.s12.m6.l8
  .card.orange.darken-3.bill-card
    .card-content.white-text
      .card-header
        span.card-title {{ 'HomeCurrency_Rates' | localize }}
      table
        thead
          tr
            th {{ 'HomeCurrency_Currency' | localize }}
            th {{ 'HomeCurrency_Rate' | localize }}
            th {{ 'HomeCurrency_Date' | localize }}
        tbody
          tr(v-for="cur in currencies" :key="cur")
            td {{ cur }}
            td {{ getCurrency(cur).toFixed(5) }}
            td {{ date | date('date') }}

</template>

<script>
export default {

  props: ['rates', 'date'],

  data: () => ({
    currencies: ['USD', 'EUR']
  }),

  methods: {

    getCurrency (currency) {
      return this.rates.RUB / this.rates[currency]
    }

  }

}
</script>
