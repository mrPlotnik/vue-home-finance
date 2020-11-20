<template lang="pug">
div
  .app-main-layout
    nav.navbar.orange.lighten-1
      .nav-wrapper
        .navbar-left
          a(href="#")
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

    ul.sidenav.app-sidenav.open
      li
        a.waves-effect.waves-orange.pointer(href="#") Счет
      li
        a.waves-effect.waves-orange.pointer(href="#") История
      li
        a.waves-effect.waves-orange.pointer(href="#") Планирование
      li
        a.waves-effect.waves-orange.pointer(href="#") Новая запись
      li
        a.waves-effect.waves-orange.pointer(href="#") Категории

    main.app-content
      .app-page
        router-view

    .fixed-action-btn
      a.btn-floating.btn-large.blue(href="#")
        i.large.material-icons add

</template>
