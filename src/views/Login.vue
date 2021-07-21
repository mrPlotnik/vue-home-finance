<template lang="pug">

//- Ставим прослушку события. Данное событие вызывает перезагрузку страницы, поэтому отменяем стандартное поведение с помощью модификатора ".prevent"
form.card.auth-card(@submit.prevent="submitHandler")
  .card-content
    span.card-title {{ 'CRM_Title' | localize }}
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
      small.helper-text.invalid(v-if="$v.email.$dirty && !$v.email.required") {{ 'EmailRequire' | localize }}
      small.helper-text.invalid(v-else-if="$v.email.$dirty && !$v.email.email") {{ 'EmailValid' | localize }}

    .input-field
      input#password(
        type="password"
        v-model.trim="password"
        :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
      )
      label(for="password") {{ 'Password' | localize }}
      small.helper-text.invalid(v-if="$v.password.$dirty && !$v.password.required") {{ 'PasswordRequire' | localize }}
      small.helper-text.invalid(v-else-if="$v.password.$dirty && !$v.password.minLength") {{ 'PasswordMinLenght' | localize }} {{$v.password.$params.minLength.min}} {{ 'PasswordMinLenghtNow' | localize }} {{password.length}}
  .card-action
    div
      //- Убеждаемся, что у кнопки есть атрибут 'type="submit"' чтобы засабмитить форму
      button.btn.waves-effect.waves-light.auth-submit(type="submit") {{ 'ButtonTitleLogin' | localize }}
        i.material-icons.right send
    p.center {{ 'Login_HasAccount' | localize }}
      router-link.m-0(to="/register")  {{ 'Login_Register' | localize }}
    p.center {{ 'Or_Use' | localize }} test@test.ru/111111

</template>

<script>

// Импортируем валидаторы из "vuelidate"
import { email, required, minLength } from 'vuelidate/lib/validators'

// Импортируем ключи для тостов
import messages from '@/utils/messages'

export default {
  // Имя данной страницы
  name: 'login',

  metaInfo () {
    return {
      title: this.$title('Login')
    }
  },

  // Создаем модели для валидации
  data: () => ({
    email: '',
    password: ''
  }),

  // Правила валидации для моделей в нашей форме. Их нужно создать в методе "data"
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) }
  },

  mounted () {
    // Если в объекте messages есть ключ, который соответствует значению message в строке браузера, то показываем это сообщение в тосте
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },

  methods: {
    // Метод который мы вызываем при сабмите формы
    async submitHandler () {
      // Если вся форма находится в состоянии "invalid", то мы вызываем метод "$touch()", который позволяет активизировать валидацию и делаем return, что бы в дальнейшем логика данного метода не вызывалась
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      // Формируем объект с валидными данными, которые пользователь ввел в инпуты
      const formData = {
        email: this.email,
        password: this.password
      }

      // При успешном логине выкинет на главную страницу
      // При неудаче логика не будет выполнена и ошибка попадет в блок catch
      // Экшн login описан в модуле auth.js
      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e) {}
    }
  }
}
</script>

<style lang="sass" scoped>
  .m-0
    margin: 0 !important
</style>
