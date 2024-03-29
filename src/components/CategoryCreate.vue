<template lang="pug">

.col.s12.m6
  div
    .page-subtitle
      h4 {{ 'CategoryCreate_Head' | localize }}

    form(@submit.prevent="submitHandler")

      .input-field
        input#name(
          type="text"
          v-model.trim="title"
          :class="{invalid: $v.title.$dirty && !$v.title.required}"
        )

        label(for="name") {{ 'CategoryCreate_Input_Name_Label'|localize }}

        span.helper-text.invalid(
          v-if="$v.title.$dirty && !$v.title.required"
        ) {{ 'CategoryCreate_Input_Name_FormMessage' | localize }}

      .input-field
        input#limit(
          type="number"
          v-model.number="limit"
          :class="{invalid: ($v.limit.$dirty && !$v.limit.minValue) || !$v.limit.required}"
        )

        label(for="limit") {{ 'CategoryCreate_Input_Limit_Label' | localize }}

        span.helper-text.invalid(
          v-if="$v.limit.$dirty && !$v.limit.minValue"
        ) {{ 'CategoryCreate_Input_Limit_FormMessage_MinLenght' | localize }} {{ $v.limit.$params.minValue.min }}

        span.helper-text.invalid(
          v-else-if="!$v.limit.required"
        ) {{ 'CategoryCreate_Input_Limit_FormMessage_Require' | localize }}

      button.btn.waves-effect.waves-light(type="submit")
        | {{ 'CategoryCreate_Button_Title' | localize }}
        i.material-icons.right send

</template>

<script>
/* global M */

// Импортируем валидаторы из "vuelidate"
import { required, minValue } from 'vuelidate/lib/validators'

export default {

  // Делаем две модели для инпутов
  data: () => ({
    title: '',
    limit: 100
  }),

  // Благодаря полю validations нам доступна глобальная переменная $v
  validations: {
    title: { required },
    limit: { required, minValue: minValue(100) }
  },

  // Решение проблемы с перекрытием label
  mounted () {
    M.updateTextFields()
  },

  methods: {

    // Метод который мы вызываем при сабмите формы
    async submitHandler () {
      // Если вся форма находится в состоянии "invalid", то мы вызываем метод "$touch()", который позволяет активизировать валидацию и делаем return, что бы в дальнейшем логика данного метода не вызывалась
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$message('Форма невалидна')
        return
      }
      try {
        // В переменой category будет лежать данные с сервера (поля limit, title и id категории)
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })
        // Сбрасываем форму
        this.title = ''
        this.limit = 100
        // Сбрасываем валидацию формы
        this.$v.$reset()
        this.$message('Категория была создана')
        // Эмитим событие, чтобы его мог слушать родитель и передаем объект
        this.$emit('created', category)
      } catch (e) {}
    }

  }

}

</script>
