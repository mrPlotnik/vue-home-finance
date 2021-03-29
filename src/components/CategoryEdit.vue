<template lang="pug">
  .col.s12.m6
      div
        .page-subtitle
          h4 Редактировать
        form(@submit.prevent="submitHandler")
          .input-field
            select(
              ref="select"
              v-model="current"
            )
              option(
                v-for="c in categories"
                :key="c.id"
                :value="c.id"
              ) {{ c.title }}
            label Выберите категорию

          .input-field
            input#name(
              type="text"
              v-model.trim="title"
              :class="{invalid: $v.title.$dirty && !$v.title.required}"
            )
            label(for="name") Название
            span.helper-text.invalid(
              v-if="$v.title.$dirty && !$v.title.required"
            ) Введите название категории

          .input-field
            input#limit(
              type="number"
              v-model.number="limit"
              :class="{invalid: ($v.limit.$dirty && !$v.limit.minValue) || ($v.limit.$dirty && !$v.limit.required)}"
            )
            label(for="limit") Лимит
            span.helper-text.invalid(
              v-if="$v.limit.$dirty && !$v.limit.minValue"
            ) Минимальное значение {{ $v.limit.$params.minValue.min }}
            span.helper-text.invalid(
              v-else-if="$v.limit.$dirty && !$v.limit.required"
            ) Введите значение

          button.btn.waves-effect.waves-light(type="submit")
            | Обновить
            i.material-icons.right send
</template>

<script>
/* global M */
/* eslint no-undef: "error" */
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  props: {
    // Мы ожидаем строго только массив с названием Categories,
    categories: {
      type: Array,
      required: true
    }

  },
  // Делаем модели
  data: () => ({
    select: null,
    title: '',
    limit: 100,
    current: null
  }),

  validations: {
    title: { required },
    limit: { required, minValue: minValue(100) }
  },

  watch: {
    // Следим за моделью current (текущая категория)
    current (catId) {
      // console.log(catId)
      const { title, limit } = this.categories.find(c => c.id === catId)
      this.title = title
      this.limit = limit
    }
  },

  created () {
    // Когда id категории совпадет c id из state, метод вернет индекс где это произошло
    let index = this.categories.findIndex(c => c.id === this.categoryFromState)
    // Когда state пустой (при перврй отрисовке) отображаем с нулевого индекса
    index = index >= 0 ? index : 0
    const { id, title, limit } = this.categories[index]
    this.current = id
    this.title = title
    this.limit = limit
  },

  computed: {
    // Свойство подтягивает id текущей категории из геттера хранилища
    categoryFromState () {
      return this.$store.getters.currentCategoryId
    }
  },

  methods: {
    async submitHandler () {
      // Если вся форма находится в состоянии "invalid", то мы вызываем метод "$touch()", который позволяет активизировать валидацию и делаем return, что бы в дальнейшем логика данного метода не вызывалась
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$message('Форма невалидна')
        return
      }
      // Если форма валидна...
      // Формируем новый объект

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('Категория успешно обновлена')
        this.$emit('updated', categoryData)
      } catch (e) {}
    }
  },

  mounted () {
    // Оживляем select (materialize-css)
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },

  destroyed () {
    // Позаботимся о возможных утечках памяти
    // Если в модели select что-то есть и у нее есть метод destroy()
    if (this.select && this.select.destroy) {
      // То вызываем метод destroy()
      this.select.destroy()
    }
  }
}
</script>
