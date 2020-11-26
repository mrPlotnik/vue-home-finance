<template lang="pug">
form.card.auth-card
  .card-content
    span.card-title Домашняя бухгалтерия
    .input-field
      input#email(type="text")
      label(for="email") Email
      small.helper-text.invalid Email
    .input-field
      input#password.validate(type="password")
      label(for="password") Пароль
      small.helper-text.invalid Password
    .input-field
      input#name.validate(type="text")
      label(for="name") Имя
      small.helper-text.invalid Name
    p
      label
        input(type="checkbox")
        span С правилами согласен
  .card-action
    div
      button.btn.waves-effect.waves-light.auth-submit(type="submit") Зарегистрироваться
        i.material-icons.right send
    p.center Уже есть аккаунт?
      a(href="/") Войти!
</template>
