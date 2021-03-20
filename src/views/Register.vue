<template lang="pug">

//- Ставим прослушку события. Данное событие вызывает перезагрузку страницы, поэтому отменяем стандартное поведение с помощью модификатора ".prevent"
form.card.auth-card(@submit.prevent="submitHandler")
  .card-content
    span.card-title Домашняя бухгалтерия

    .input-field

      //- Привязываем модели к инпутам
      //- Используем модификатор ".trim", чтобы удалить ненужные пробелы, если они будут присутствовать
      //- Байндим класс "invalid", если невалидное значение. Добавляем его в случае, если объект "$v" (который отвечает за валидацию) "потрогали" и он не валиден или это не тот тип данных, который нужен
      //- Состояние "$dirty" говорит о том, что мы уже пытались что-то вписывать и написали не правильно. То есть, если прописано $dirty, то пока пользователь не введет что-либо и не отправит на проверку, input не будет подчеркиваться красным

      input#email(
        type="text"
        v-model.trim="email"
        :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
      )
      label(for="email") Email
      small.helper-text.invalid(v-if="$v.email.$dirty && !$v.email.required") Поле Email не должно быть пустым
      small.helper-text.invalid(v-else-if="$v.email.$dirty && !$v.email.email") Введите корректный Email

    .input-field

      input#password(
        type="password"
        v-model.trim="password"
        :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
      )
      label(for="password") Пароль
      small.helper-text.invalid(v-if="$v.password.$dirty && !$v.password.required") Введите пароль
      small.helper-text.invalid(v-else-if="$v.password.$dirty && !$v.password.minLength") Пароль должен быть минимум {{$v.password.$params.minLength.min}} символов, сейчас он {{password.length}}

    .input-field

      input#name.validate(
        type="text"
        v-model.trim="name"
        :class="{invalid: $v.name.$dirty && !$v.name.required}"
        )
      label(for="name") Имя
      small.helper-text.invalid(v-if="$v.name.$dirty && !$v.name.required") Введите Ваше имя

    p
      label
        input(type="checkbox" v-model="$v.agree.$model")
        span С правилами согласен

  .card-action
    div
      button.btn.waves-effect.waves-light.auth-submit(type="submit") Зарегистрироваться
        i.material-icons.right send
    p.center Уже есть аккаунт?
      router-link(to="/login") Войти!

</template>
<script>
// Импортируем валидаторы из "vuelidate"
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  // Имя данной страницы
  name: 'register',

  // Создаем модели для валидации
  data: () => ({
    email: '',
    password: '',
    name: '',
    // agree - модель для чекбокса (согласие с правилами)
    agree: false
  }),

  // Правила валидации для моделей в нашей форме. Их нужно создать в методе "data"
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    // Можно, также, добавить минимальную длину...
    name: { required },
    // Пишем свой собственный валидатор в библиотеке vuelidate
    // Назовем его checked. Это функция, которая принимает некоторое знаение value и должна вернуть значение true
    agree: { checked: v => v }
  },

  methods: {
    async submitHandler () {
      // При успешном логине выкинет на главную страницу
      // Если вся форма находится в состоянии "invalid", то мы вызываем метод "$touch()", который позволяет активизировать валидацию и делаем return, что бы в дальнейшем логика данного метода не вызывалась
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      // А если форма валидна, то создаем объект с данными для передачи на сервер
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }

      // Ждем пока уйдут данные на сервер и делаем редирект на главную страницу
      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (e) {}
    }
  }
}
</script>
