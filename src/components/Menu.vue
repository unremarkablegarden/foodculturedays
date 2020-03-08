<template lang="pug">
#menu
  .columns
    .column.is-6.desktop.no-pad.gallery-column
      .gallery(v-if='gallery && gallery.length')
        .item(v-for="(item, i) in gallery", :key="i", :style="'background-image: url('+item.item.url+')'", v-bind:class="{ active: i == galleryItem }")

    .column.is-6.menu.left
      .menu-item(v-for="(item, i) in menu", :key="item.title[lang]")
        span.linkwrap(@mouseover='galleryItem = (i+1)', @mouseleave='galleryItem = 0')
          g-link(:to="item.to[lang]") {{ item.title[lang] }}
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
      ],
      gallery: false,
      galleryItem: 0,
      total: null,
    }
  },
  created () {
    if (!process.isClient) return
    this.menu = menu
    if (process.isClient) {
      let lang = window.location.pathname
      if (lang.includes('fr')) {
        this.lang = 1
      } else {
        this.lang = 0
      }
    }
    if (this.$route.path !== '/') {
      this.getGallery()
    }
  },
  watch: {
    $route (to, from){
      if (to.path.includes('fr')) {
        this.lang = 1
      } else {
        this.lang = 0
      }
      if (to.path == '/en/' || to.path == '/fr/') {
        this.getGallery()
      }
    }
  },
  methods: {
    hoverMenu (e) {
      console.log(e);
    },
    getGallery () {
      let c = this.$context.gallery
      if (c) {
        if ('node' in c) { c = c.node }
        if ('gallery' in c) { c = c.gallery }
      }
      // c.reverse()
      this.total = c.length
      this.gallery = c
    }
  }
}
</script>

<style lang="scss" scoped>
// $green: #11ff36;
$green: rgb(17,230,54);
$headingSize: 2.2rem;

.menu {
  // display: flex;
  // flex-direction: column;
}
.linkwrap {
  // background: pink;
}
.menu-item {
  // display: inline-block;
  // border: 1px blue solid;
  &:first-child {
    padding-top: 1.4rem;
  }
  text-transform: uppercase;
  font-size: $headingSize;
  line-height: 1.3em;
  font-weight: normal;
  position: relative;
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
.gallery .item {
  opacity: 0;
}
.gallery .item.active {
  opacity: 1;
}
</style>