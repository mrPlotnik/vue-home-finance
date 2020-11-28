<template lang="pug">
div
  .app-main-layout

    Navbar(@click="isOpen = !isOpen")

    Sidebar(v-model="isOpen")

    main.app-content(:class="{full: !isOpen}")
      .app-page
        router-view

    //- Кнопка "+"
    .fixed-action-btn
      router-link.btn-floating.btn-large.blue(to="/record")
        i.large.material-icons add
</template>

<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true
  }),
  async mounted () {
    // Если store пустой, тогда делаем запрос на получение информации с сервера
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
  },
  components: {
    Navbar, Sidebar
  }
}
</script>
