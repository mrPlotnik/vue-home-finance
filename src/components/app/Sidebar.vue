<template lang="pug">

//- Байндим класс open, если isOpen = true
ul.sidenav.app-sidenav(:class="{open: value}")
  router-link(
    v-for="link in links"
    :key="link.url"
    tag="li"
    active-class="active"
    :to="link.url"
    :exact="link.exact"
  )
    a.waves-effect.waves-orange.pointer(href="#") {{link.title}}
</template>

<script>
export default {
  // Если мы передаем Sidebar`у какую-то модель
  // То нужно прописать ему параметр props созначение 'value'
  // 'value' и будет соответствовать состоянию isOpen
  props: ['value'],
  data: () => ({
    links: [
      { title: 'Счет', url: '/', exact: true },
      { title: 'История', url: '/history' },
      { title: 'Планирование', url: '/planning' },
      { title: 'Новая запись', url: '/record' },
      { title: 'Категории', url: '/categories' }
    ]
  })
}
</script>
