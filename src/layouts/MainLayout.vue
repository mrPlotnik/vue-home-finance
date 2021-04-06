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
      Sidebar(v-model="isOpen" :key="locale")

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
import messages from '@/utils/messages'

export default {

  name: 'main-layout',

  data: () => ({
    isOpen: true,
    loading: true
  }),

  async mounted () {
    // Если store пустой, тогда делаем запрос на получение информации с сервера
    // Object.keys возвращает массив, проверяем его длинну
    // Если .lenght = 0, тогда делаем запрос
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },

  // Регистрируем компоненты
  components: {
    Navbar, Sidebar
  },

  // Следим за наличием ошибок
  // Тут следует понять и запомнить одну вещь
  // watch - следит за свойствами, и когда оно меняется, то выполняет функцию
  // computed - вычисляет значение свойства, которое может зависеть от других свойств, но делает это лишь тогда, когда какое-то из них изменилось.
  computed: {
    error () {
      return this.$store.getters.error
    },
    locale () {
      return this.$store.getters.info.locale
    }
  },

  watch: {
    // locale () {
    //   console.log('PRO')
    // },
    error (fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  }

}
</script>
