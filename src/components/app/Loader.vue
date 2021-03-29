<template lang="pug">

.app-loader
  .preloader-wrapper.active
    .spinner-layer(:class="color")
      .circle-clipper.left
        .circle
      .gap-patch
        .circle
      .circle-clipper.right
        .circle

</template>

<script>
export default {
  computed: {
    color () {
      const colors = ['spinner-red-only', 'spinner-blue-only', 'spinner-green-only']
      return colors[Math.floor(Math.random() * 3)]
    }
  }
}
</script>
