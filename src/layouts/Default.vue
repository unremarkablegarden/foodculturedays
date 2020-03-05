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
  created () {
    if (process.isClient) {
      // if in the root path redirect to user's language index page
      if (window.location.pathname == '/') {
        let to
        if (this.lang == 'fr') {
          to = '/fr/'
        } else {
          to = '/en/'
        }
        this.$router.push(to)
      }
    }
  },
  computed: {
    lang () {
      if (process.isClient) {
        let lang = navigator.language || navigator.userLanguage
        if (lang.includes('fr')) lang = 'fr'
        else lang = 'en'
        return lang
      }
    }
  }
}
</script>

<style lang="scss">
</style>
