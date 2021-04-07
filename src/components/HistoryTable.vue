<template lang="pug">

  table
    thead
      tr
        th #
        th {{ 'HistoryTable_Amount' | localize }}
        th {{ 'HistoryTable_Date' | localize }}
        th {{ 'HistoryTable_Category' | localize }}
        th {{ 'HistoryTable_Type' | localize }}
        th {{ 'HistoryTable_Open' | localize }}
    tbody
      tr(
        v-for="(record,idx) in records"
        :key="record.id"
      )
        td {{ idx + 1 }}
        td {{ record.amount | currency('RUB') }}
        td {{ record.date | date('datetime') }}
        td {{ record.categoryName }}
        td
          span.white-text.badge(:class="[record.typeClass]") {{ record.typeText }}
        td
          button.btn-small.btn(
            @click="$router.push('/detail/' + record.id)"
            v-tooltip="'HistoryTable_Tooltip_Open'"
            )
            i.material-icons open_in_new

</template>

<script>
export default {
  props: {
    records: {
      required: true,
      type: Array
    }
  }
}
</script>
