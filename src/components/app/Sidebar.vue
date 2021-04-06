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
import localizeFilter from '@/filters/localize.filter'
export default {
  // Если мы передаем Sidebar`у какую-то модель
  // То нужно прописать ему параметр props созначение 'value'
  // 'value' и будет соответствовать состоянию isOpen
  props: ['value'],
  data: () => ({
    links: [
      { title: localizeFilter('Menu_Bill'), url: '/', exact: true },
      { title: localizeFilter('Menu_History'), url: '/history' },
      { title: localizeFilter('Menu_Planning'), url: '/planning' },
      { title: localizeFilter('Menu_NewRecord'), url: '/record' },
      { title: localizeFilter('Menu_Categories'), url: '/categories' }
    ]
  })
}
</script>
