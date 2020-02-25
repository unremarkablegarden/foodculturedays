<template lang="pug">
  #lang
    button(@click="changeLang(0)", v-bind:class="activeLang(0)").lang.en EN
    button(@click="changeLang(1)", v-bind:class="activeLang(1)").lang.fr FR
</template>

<script>
import menu from '~/components/menu.js'

export default {
  name: 'Lang',
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
  created () {
    this.menu = menu
    // set the language to french if its in the user browser setting
    if (process.isClient) {
      if (window.location.pathname.includes('fr')) {
        this.lang = 1
      }
    }
  },
  methods: {
    changeLang (l) {
      if (process.isClient) {
        let path = window.location.pathname
        let newPath

        if (path == '/en/') {
          newPath = '/fr/'
        } else if (path == '/fr/'){
          newPath = '/en/'
        } else {
          this.menu.forEach((m, index) => {
            if (m.to[0] == path) {
              newPath = m.to[1]
            } else if (m.to[1] == path) {
              newPath = m.to[0]
            }
          })
        }

        document.documentElement.lang = this.langs[l]
        this.$store.commit('setLang', this.langs[l])
        this.lang = l

        if (path !== newPath) {
          this.$router.push(newPath)
        }
      }
    },
    activeLang (l) {
      if (l === this.lang) return 'is-active'
    }
  }
}
</script>

<style lang="scss">
  $green: #11ff36;
  #lang {
    button {
      font-size: 0.7rem;
      font-weight: bold;
      border: 0;
      font-family: 'D', -apple-system,system-ui,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;
      background: transparent;
      color: $green;
      border: 1px $green solid;
      padding: 0.5rem 0.6rem 0.2rem;
      margin: 0;
      line-height: 1rem;
      &.is-active {
        color: white;
        background: $green;
      }
      border-radius:6px;
    }
    .en {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .fr {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left: 0;
    }
  }
</style>