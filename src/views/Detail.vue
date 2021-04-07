<template lang="pug">

Loader(v-if="loading")

div(v-else-if="record")
  .breadcrumb-wrap
    router-link.breadcrumb(to="/history") {{ 'Detail_History' | localize }}
    a.breadcrumb(@click.prevent)
      | {{ record.type === 'income' ? 'Detail_Income' : 'Detail_Outcome' | localize}}
  .row
    .col.s12.m6
      .card(:class="{'red' : record.type === 'outcome', 'green' : record.type === 'income'}")
        .card-content.white-text
          p {{ 'Detail_Description' | localize }}: {{ record.description }}
          p {{ 'Detail_Amount' | localize }}: {{ record.amount | currency }}
          p {{ 'Detail_Category' | localize }}: {{ record.categoryName }}
          small {{ record.date | date('datetime') }}

p.center(v-else) {{ 'Detail_RecordWithID' | localize }}
  b {{ $route.params.id }}
  | {{ 'Detail_NotFound' | localize }}

</template>

<script>
export default {
  name: 'detail',

  metaInfo () {
    return {
      title: this.$title('Detail_Title')
    }
  },

  data: () => ({
    record: null,
    loading: true
  }),

  async mounted () {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    console.log('🚀 ~ file: Detail.vue ~ line 42 ~ mounted ~ record', record)

    if (record.categoryId) {
      const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)
      this.record = {
        ...record,
        categoryName: category.title
      }
    }

    this.loading = false
  }
}
</script>
