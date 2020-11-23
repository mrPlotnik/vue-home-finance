<template lang="pug">
nav.navbar.orange.lighten-1
  .nav-wrapper
    .navbar-left
      a(href="#" @click.prevent="$emit('click')")
        i.material-icons.black-text dehaze
      span.black-text 12.12.12
    ul.right.hide-on-small-and-down
      li
        a.dropdown-trigger.black-text(href="#", data-target="dropdown")
          | USER NAME
          i.material-icons.right arrow_drop_down
        ul#dropdown.dropdown-content
          li
            a.black-text(href="#")
              i.material-icons account_circle
              | Профиль
          li.divider(tabindex="-1")
          li
            a.black-text(href="#")
              i.material-icons assignment_return
              | Выйти
</template>
