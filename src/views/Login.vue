<template lang="pug">
form.card.auth-card
  .card-content
    span.card-title Домашняя бухгалтерия
    .input-field
      input#email.validate(type="text")
      label(for="email") Email
      small.helper-text.invalid Email
    .input-field
      input#password.validate(type="password")
      label(for="password") Пароль
      small.helper-text.invalid Password
  .card-action
    div
      button.btn.waves-effect.waves-light.auth-submit(type="submit")
        | Войти
        i.material-icons.right send
    p.center
      | Нет аккаунта?
      a(href="/") Зарегистрироваться
</template>
