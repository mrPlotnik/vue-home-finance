<template lang="pug">
div
  .page-title
    h3 Профиль
  form.form
    .input-field
      input#description(type="text")
      label(for="description") Имя
      span.helper-text.invalid name
    button.btn.waves-effect.waves-light(type="submit")
      | Обновить
      i.material-icons.right send
</template>
