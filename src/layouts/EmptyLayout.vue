<template lang="pug">
  .grey.darken-1.empty-layout

    //- Рендерим нужный компонент
    router-view

</template>
<script>

// Импортируем коды ошибок
import messages from '@/utils/messages'

// Следим за наличием ошибок
// Тут следует понять и запомнить одну вещь
// watch - следит за свойствами, и когда оно меняется, то выполняет функцию
// computed - вычисляет значение свойства, которое может зависеть от других свойств, но делает это лишь тогда, когда какое-то из них изменилось.
export default {
  computed: {
    error () {
      return this.$store.getters.error
    },
    locale () {
      return this.$store.getters.info.locale
    }
  },
  watch: {
    error (fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    }
  }
}
</script>
