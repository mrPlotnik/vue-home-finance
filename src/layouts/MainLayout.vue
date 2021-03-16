<template lang="pug">
div

  Loader(v-if="loading")

  div(v-else)
    .app-main-layout

      //- Прослушиваеи клик из дочернего компонента Navbar
      //- И тогглим с true на false
      Navbar(@click="isOpen = !isOpen")

      //- Отображаем Sidebar, если isOpen = true
      //- Если мы передаем Sidebar`у какую-то модель
      //- То нужно прописать ему параметр props созначение 'value'
      //- 'value' и будет соответствовать состоянию isOpen
      Sidebar(v-model="isOpen")

      //- Байндим класс full (растягиваем на всю длину), если isOpen = false
      main.app-content(:class="{full: !isOpen}")
        .app-page

          //- Рендерим нужный компонент
          router-view

      //- Кнопка "+"
      .fixed-action-btn
        router-link.btn-floating.btn-large.blue(
          to="/record"
          v-tooltip="'Создать новую запись'"
        )
          i.large.material-icons add
</template>

<script>
// Импортируем компоненты
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true,
    loading: true
  }),
  async mounted () {
    // Если store пустой, тогда делаем запрос на получение информации с сервера
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
  // Регистрируем компоненты
  components: {
    Navbar, Sidebar
  }
}
</script>
