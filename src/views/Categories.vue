<template lang="pug">
div
  .page-title
    h3 Категории
  section
    .row
      .col.s12.m6
        div
          .page-subtitle
            h4 Создать
          form
            .input-field
              input#name(type="text")
              label(for="name") Название
              span.helper-text.invalid Введите название
            .input-field
              input#limit(type="number")
              label(for="limit") Лимит
              span.helper-text.invalid Минимальная величина
            button.btn.waves-effect.waves-light(type="submit")
              | Создать
              i.material-icons.right send
      .col.s12.m6
        div
          .page-subtitle
            h4 Редактировать
          form
            .input-field
              select
                option Category
              label Выберите категорию
            .input-field
              input#name(type="text")
              label(for="name") Название
              span.helper-text.invalid TITLE
            .input-field
              input#limit(type="number")
              label(for="limit") Лимит
              span.helper-text.invalid LIMIT
            button.btn.waves-effect.waves-light(type="submit")
              | Обновить
              i.material-icons.right send
</template>
