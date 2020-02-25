<template lang="pug">
  layout
    Menu
</template>

<script>
import Menu from '~/components/Menu.vue'

export default {
  components: {
    Menu
  },
  metaInfo: {
    title: 'Index'
  },
  data () {
    return {
    }
  },
  computed: {
    lang () {
      // return this.$store.state.lang
      return this.$context.lang
    },
  }
}
</script>

<style lang="scss">
</style>
