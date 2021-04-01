<template lang="pug">

  table
    thead
      tr
        th №
        th Сумма
        th Дата
        th Категория
        th Тип
        th Открыть
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
            v-tooltip="'Посмотреть запись'"
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
