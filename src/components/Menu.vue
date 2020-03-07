<template lang="pug">
  #menu
    .menu-item(v-for="item in menu", :key="item.title[lang]")
      //- .disabled(v-if='item.disabled') {{ item.title[lang] }}
      //- g-link(v-else, :to="item.to[lang]") {{ item.title[lang] }}
      g-link(v-if='!item.disabled', :to="item.to[lang]") {{ item.title[lang] }}
</template>

<script>
import menu from '~/components/menu.js'

export default {
  name: 'Menu',
  data () {
    return {
      lang: 0,
      menu: null,
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
    if (!process.isClient) return
    if (process.isClient) {
      let lang = window.location.pathname
      if (lang.includes('fr')) {
        this.lang = 1
      } else {
        this.lang = 0
      }
    }
  },
  watch: {
    $route (to, from){
      if (to.path.includes('fr')) {
        this.lang = 1
      } else {
        this.lang = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// $green: #11ff36;
$green: rgb(17,230,54);
$headingSize: 2.2rem;

.menu-item {
  &:first-child {
    padding-top: 1.4rem;
  }
  text-transform: uppercase;
  font-size: $headingSize;
  line-height: 1.3em;
  font-weight: normal;
  position: relative;
  // left: -500px;
  // background-color: pink;
  a {
    color: black;
    &:hover, &:active {
      color: $green;
    }
  }
}
.disabled {
  display: inline-block;
  opacity: 0.2;
  // transform: rotateY(180deg);
}
</style>