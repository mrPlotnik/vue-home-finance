<template lang="pug">
nav.navbar.orange.lighten-1
  .nav-wrapper
    .navbar-left
      //- Добавляя модификатор .prevent избавляемся от дефолтного поведения ссылки
      //- Передаем событие 'click' в MainLayout c помощью метода $emit
      a(href="#" @click.prevent="$emit('click')")
        i.material-icons.black-text dehaze

      //- Применяем фильтр к дате через слэш
      //- Можно писать отдельно date или time
      span.black-text {{ date | date('datetime') }}

    ul.right.hide-on-small-and-down
      li
        a.dropdown-trigger.black-text(
          href="#"
          data-target="dropdown"
          ref="dropdown"
          )
          | {{ name }}
          i.material-icons.right arrow_drop_down
        ul#dropdown.dropdown-content
          li
            router-link.black-text(to="/profile")
              i.material-icons account_circle
              | Профиль
          li.divider(tabindex="-1")
          li
            a.black-text(href="#" @click.prevent="logout")
              i.material-icons assignment_return
              | Выйти
</template>

<script>
/* global M */

export default {
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null
  }),

  methods: {

    // Выход из системы
    async logout () {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    }

  },

  computed: {

    // Забираем имя пользователя
    name () {
      return this.$store.getters.info.name
    }

  },

  mounted () {
    // Обновление даты каждую секунду
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)

    // Инициализируем Dropdown
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false
    })
  },

  // Очищаем параметры при смене layout (для оптимизации)
  beforeDestroy () {
    // Отменяем интервал
    clearInterval(this.interval)

    // Убеждаемся, что dropdown ТОЧНО инициализировался (бывают случаи) и только тогда уничтожаем
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  }
}
</script>
