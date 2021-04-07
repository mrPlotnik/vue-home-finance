<template lang="pug">
div
  .page-title
    h3 {{ 'Record_Head' | localize }}

  Loader(v-if="loading")

  p.center(v-else-if="!categories.length") {{ 'Record_NoCategory' | localize }}
    router-link(to="/categories") {{ 'Record_AddNewCategory' | localize }}

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
      label {{ 'Record_SelectCategory' | localize }}
    p
      label
        input.with-gap(
          v-model="type"
          name="type"
          type="radio"
          value="income"
        )
        span {{ 'Record_Income' | localize }}
    p
      label
        input.with-gap(
          v-model="type",
          name="type"
          type="radio"
          value="outcome"
        )
        span {{ 'Record_Outcome' | localize }}

    .input-field
      input#amount(
        v-model.number="amount"
        type="number"
        :class="{invalid: ($v.amount.$dirty && !$v.amount.minValue) || ($v.amount.$dirty && !$v.amount.required)}"
      )
      label(for="amount") {{ 'Record_Amount' | localize }}
      span.helper-text.invalid(
        v-if="$v.amount.$dirty && !$v.amount.minValue"
      ) {{ 'Record_MinValue' | localize }} {{ $v.amount.$params.minValue.min }}
      span.helper-text.invalid(
         v-else-if="$v.amount.$dirty && !$v.amount.required"
      ) {{ 'Record_EnterValue' | localize }}

    .input-field
      input#description(
        v-model.number="description"
        type="text"
        :class="{invalid: $v.description.$dirty && !$v.description.required}"
      )
      label(for="description") {{ 'Record_Descripton' | localize }}
      span.helper-text.invalid(
        v-if="$v.description.$dirty && !$v.description.required"
      ) {{ 'Record_EnterDescription' | localize }}

    button.btn.waves-effect.waves-light(type="submit")
      | {{ 'Record_Create' | localize }}
      i.material-icons.right send
</template>

<script>
/* global M */

// Импортируем валидаторы
import { required, minValue } from 'vuelidate/lib/validators'
// Импортируем функцию, которая позволяет в автоматическом режиме получать определенный геттер
import { mapGetters } from 'vuex'

export default {

  name: 'record',

  metaInfo () {
    return {
      title: this.$title('Menu_NewRecord')
    }
  },

  data: () => ({
    loading: true,
    // Здесь хранится селект (для правильной отрисовки, через materialize-css)
    select: null,
    // Список категорий (получакм с сервера)
    categories: [],
    // Текущая категория (для показа в инпуте)
    category: null,
    // Тип статьи. Расход или доход
    type: 'outcome',
    // Сумма расхода
    amount: 1,
    // Описание статьи расхода
    description: ''
  }),

  // Указываем какие поля будем валидировать
  validations: {
    amount: { required, minValue: minValue(1) },
    description: { required }
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
          // Создаем объект и отправляем его на сервер
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

          // Обновляем состояние счета на сервере
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

  async mounted () {
    // Получаем список категорий с сервера
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    // Показываем первую категорию из массива
    if (this.categories.length) {
      this.category = this.categories[0].id
    }

    this.$nextTick(() => {
      // Оживляем select, чтобы не было наложений
      this.select = M.FormSelect.init(this.$refs.select)
      // Решение проблемы с перекрытием label
      M.updateTextFields()
    })
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
