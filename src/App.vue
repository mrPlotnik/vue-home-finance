<template lang="pug">
#app

  //- Динамический компонент
  //- Свойство :is создает (заменяет) компонент значенияем этого свойства
  component(:is="layout")
    router-view

</template>

<script>

import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'

export default {

  computed: {
    layout () {
      // Возвращаем строку, которая определяет название макета (layout)
      // Из свойства layout объекта meta (файл router/index.js)
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },

  // Регистрируем компоненты
  components: {
    EmptyLayout, MainLayout
  }
}
</script>

<style lang="sass">
// Тильда позволяет перейти в папку node_modules
@import '~materialize-css/sass/materialize.scss'
@import 'assets/index.sass'
</style>
