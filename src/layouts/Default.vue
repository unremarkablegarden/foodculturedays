<template lang="pug">
  .layout
    slot
</template>


<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>


<script>
export default {
  data () {
    return {
      lang: 'en'
    }
  },
  created () {
    if (!process.isClient) return

    let lang = navigator.language || navigator.userLanguage
    if (lang.includes('fr')) { this.lang = 'fr' }

    if (window.location.pathname == '/') {
      this.$router.push('/'+this.lang+'/')
    }
  },

}
</script>

<style lang="scss">
</style>
