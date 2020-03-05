<template lang="pug">
  layout
    #archive
      h1.title {{ $context.title }}
</template>

<script>
export default {
  metaInfo() {
    return {
      title: 'Newsletter'
    }
  },
  data () {
    return {
      lang: 'en'
    }
  },
  computed: {

  },
  created () {
    // let lang = this.$store.state.lang
    if (process.isClient) {
      let lang = this.$context.lang
      if (lang.includes('fr')) { this.lang = 'fr' }
    }
  },
  watch: {
    $route (to){
      if (to.path.includes('fr')) {
        this.lang = 'fr'
      } else {
        this.lang = 'en'
      }
    }
  }
}
</script>
