<template lang="pug">
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
  props: ['value'],
  data: () => ({
    links: [
      { title: 'Счет', url: '/', exact: true },
      { title: 'История', url: '/history' },
      { title: 'Планирование', url: '/planning' },
      { title: 'Новая запись', url: 'record' },
      { title: 'Категории', url: 'categories' }
    ]
  })
}
</script>
