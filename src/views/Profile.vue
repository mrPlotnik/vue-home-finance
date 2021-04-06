<template lang="pug">
div
  .page-title
    h3 {{ 'ProfileTitle' | localize }}

  form.form(@submit.prevent="submitHandler")
    .input-field
      input#description(
        type="text"
        v-model="name"
        :class="{invalid: $v.name.$dirty && !$v.name.required}"
      )
      label(for="description") {{ 'Name' | localize }}
      small.helper-text.invalid(v-if="$v.name.$dirty && !$v.name.required") {{ 'Message_EnterName' | localize }}

    .switch
      label English
        input(type="checkbox" v-model="isRuLocale")
        span.lever
        | Русский

    button.btn.waves-effect.waves-light(type="submit")
      | {{ 'Update' | localize }}
      i.material-icons.right send
</template>

<script>
/* global M */

// Импортируем валидаторы из "vuelidate"
import { required } from 'vuelidate/lib/validators'

import { mapGetters, mapActions } from 'vuex'

export default {

  data: () => ({
    name: '',
    isRuLocale: true
  }),

  // Правила валидации для моделей в нашей форме. Их нужно создать в методе "data"
  validations: {
    name: { required }
  },

  mounted () {
    this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru-RU'
    setTimeout(() => {
      M.updateTextFields()
    })
  },

  computed: {
    ...mapGetters(['info'])
  },

  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler () {
      // Если вся форма находится в состоянии "invalid", то мы вызываем метод "$touch()", который позволяет активизировать валидацию и делаем return, что бы в дальнейшем логика данного метода не вызывалась
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        })
      } catch (e) {}
    }
  }

}
</script>

<style lang="sass" scoped>
  .switch
    margin-bottom: 2rem
</style>
