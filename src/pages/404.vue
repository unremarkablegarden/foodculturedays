<template lang="pug">
  layout
    .notfound
      h1 404
      h2
        em {{ msg }}
</template>

<script>
export default {
  data () {
    return {
      menu: null,
      lang: 0,
      langs: [
        'en-gb',
        'fr-ch'
      ],
      langpath: [
        'en',
        'fr'
      ]
    }
  },
  computed: {
    msg () {
      if (!process.isClient) return
      let lang = this.$store.state.lang
      if (!lang) {
        let path = window.location.pathname
        if (path == '/en' || path.includes('/en/')) {
          lang = 'en'
        } else if (path == '/fr' || path.includes('/fr/')) {
          lang = 'fr'
        }
      }
      if (lang.includes('fr')) {
        return 'Page non trouvée'
      } else {
        return 'Page not found'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// $green: #11ff36;
$green: rgb(17,230,54);
.notfound {
  // text-align: center;
  height: 82vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: $green;
  justify-content: center;
  h1 {
    // font-family:
    margin: 0;
    color: white;
    font-size: 50px;
  }
  h2 {
    text-transform: none;
    color: black;
  }
}
</style>
