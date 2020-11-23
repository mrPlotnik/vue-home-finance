<template lang="pug">
div
  .app-main-layout

    Navbar(@click="isOpen = !isOpen")

    Sidebar(v-model="isOpen")

    main.app-content(:class="{full: !isOpen}")
      .app-page
        router-view

    .fixed-action-btn
      a.btn-floating.btn-large.blue(href="#")
        i.large.material-icons add
</template>

<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true
  }),
  components: {
    Navbar, Sidebar
  }
}
</script>
