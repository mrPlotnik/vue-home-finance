<template lang="pug">
.home
  .page-title
    h3 Счет
    button.btn.waves-effect.waves-light.btn-small
      i.material-icons refresh

  Loader(v-if="loading")

  .row(v-else)
    HomeBill
    HomeCurrency
</div>
</template>

<script>
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'

export default {
  name: 'Home',
  data: () => ({
    loading: true,
    currency: null
  }),
  components: {
    HomeBill, HomeCurrency
  }
}
</script>
