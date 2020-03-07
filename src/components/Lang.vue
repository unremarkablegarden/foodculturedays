<template lang="pug">
  #lang(v-if='hasTranslation')
    button(@click="changeLang(0)", v-bind:class="activeLang(0)").lang.en EN
    button(@click="changeLang(1)", v-bind:class="activeLang(1)").lang.fr FR
</template>

<script>
import {animatedScrollTo} from 'es6-scroll-to'
import menu from '~/components/menu.js'

export default {
  name: 'Lang',
  data () {
    return {
      hasTranslation: true,
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
    if (!process.isClient) return

    this.menu = menu
    // set the language to french if its in the user browser setting
    if (process.isClient) {
      if (window.location.pathname.includes('fr')) {
        this.lang = 1
      }
    }
  },
  computed: {
  },
  methods: {
    changeLang (l) {
      if (process.isClient) {

        let path = window.location.pathname
        let newPath = this.$context.altPath
        if (!newPath) {
          this.hasTranslation = false
        } else {
          if (path !== newPath) {
            let top = window.pageYOffset
            animatedScrollTo({
                duration: top,
                to: 0
            })
            setTimeout(() => {
              this.$router.push(newPath)
            }, top)
          }
          if (this.lang == 0) { this.lang = 1}
          else { this.lang = 0 }
        }
      }
    },
    activeLang (l) {
      if (l === this.lang) return 'is-active'
    },
    // logoHome () {
    //   if (!process.isClient) return
    //   let top = window.pageYOffset
    //   animatedScrollTo({
    //       duration: top,
    //       to: 0
    //   })
    //   setTimeout(() => {
    //     this.$router.push('/')
    //   }, top)
    // },
  }
}
</script>

<style lang="scss">
  // $green: #11ff36;
  $green: rgb(17,230,54);
  #lang {
    button {
      font-size: 0.9rem;
      font-weight: bold;
      border: 0;
      font-family: 'D', -apple-system,system-ui,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;
      background: transparent;
      color: $green;
      border: 1px $green solid;
      // padding: 0.5rem 0.6rem 0.2rem;
      padding: 0.7rem 0.7rem 0.4rem;
      margin: 0;
      line-height: 1rem;
      &.is-active {
        color: white;
        background: $green;
      }
      border-radius: 6px;
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