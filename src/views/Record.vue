<template lang="pug">
div
  .page-title
    h3 Новая запись

  Loader(v-if="loading")

  p.center(v-else-if="!categories.length") Категорий пока нет
    router-link(to="/categories") Добавить новую категорию

  form.form(v-else @submit.prevent="submitHandler")
    .input-field
      select(
        v-model="category"
        ref="select"
      )
        option(
          v-for="c in categories"
          :key="c.id"
          :value="c.id"
        ) {{ c.title }}
      label Выберите категорию
    p
      label
        input.with-gap(
          v-model="type"
          name="type"
          type="radio"
          value="income"
        )
        span Доход
    p
      label
        input.with-gap(
          v-model="type",
          name="type"
          type="radio"
          value="outcome"
        )
        span Расход

    .input-field
      input#amount(
        v-model.number="amount"
        type="number"
        :class="{invalid: ($v.amount.$dirty && !$v.amount.minValue) || ($v.amount.$dirty && !$v.amount.required)}"
      )
      label(for="amount") Сумма
      span.helper-text.invalid(
        v-if="$v.amount.$dirty && !$v.amount.minValue"
      ) Минимальное значение {{ $v.amount.$params.minValue.min }}
      span.helper-text.invalid(
         v-else-if="$v.amount.$dirty && !$v.amount.required"
      ) Введите значение

    .input-field
      input#description(
        v-model.number="description"
        type="text"
        :class="{invalid: $v.description.$dirty && !$v.description.required}"
      )
      label(for="description") Описание
      span.helper-text.invalid(
        v-if="$v.description.$dirty && !$v.description.required"
      ) Введите описание

    button.btn.waves-effect.waves-light(type="submit")
      | Создать
      i.material-icons.right send
</template>

<script>
import M from 'materialize-css'
import { required, minValue } from 'vuelidate/lib/validators'
// Импортируем функцию, которая позволяет в автом-м режиме получать опред-1 геттер
import { mapGetters } from 'vuex'

export default {
  name: 'record',
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),

  validations: {
    amount: { required, minValue: minValue(1) },
    description: { required }
  },

  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    // Показываем первую категорию из массива
    if (this.categories.length) {
      this.category = this.categories[0].id
    }

    // Оживляем select (materialize-css)
    this.$nextTick(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    })
  },

  computed: {
    ...mapGetters(['info']),
    canCreateRecord () {
      // Если это доход, то запись можно сделать всегда
      if (this.type === 'income') {
        return true
      }
      // Иначе, считаем хватает ли денег на расход
      return this.info.bill >= this.amount
    }
  },

  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$message('Форма невалидна')
        return
      }

      // Выясняем, может ли данный человек создать новую запись
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })

          // После этого обновляем состояние счета
          const bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount

          // Обновляем на сервере
          await this.$store.dispatch('updateInfo', { bill })
          this.$message('Запись успешно создана')

          // Сбрасываем форму
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (e) {}
      } else {
        this.$message(`Недостаточно средст на счете (${this.amount - this.info.bill})`)
      }
    }
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
