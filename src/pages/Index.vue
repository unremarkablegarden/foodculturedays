<template lang="pug">
  layout
    //- Splash
    Menu(v-if='notSlashIndex')
</template>

<script>
import Menu from '~/components/Menu.vue'
// import Splash from '~/components/Splash.vue'

export default {
  components: {
    Menu, 
    // Splash
  },
  metaInfo: {
    title: function () {
      let title = 'Home'
      if (process.isClient) {
        if (location.pathname == '/fr/') {
          title = 'Accueil'
        }
      }
      return title
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    // console.log('were in index');
  },
  computed: {
    lang () {
      // return this.$store.state.lang
      if (!process.isClient) return
      return this.$context.lang
    },
    notSlashIndex () {
      let path = this.$route.path
      if (path !== '/') {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
