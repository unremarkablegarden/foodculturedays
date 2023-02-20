<template lang="pug">
#menu
  .columns
    //- transition(name='slide-left')
    .column.is-6.desktop.no-pad.gallery-column
      client-only
        #gallery(v-if='gallery && gallery.length', v-bind:class='{ showGallery: showGallery, gallery: true }')
          .item(v-for="(item, i) in gallery", :key="i", :style="'background-image: url('+constrainImageUrl(item.item.url)+')'", v-bind:class="{ active: i == galleryItem }", v-if='item.item')

    .column.is-6.menu.left
      .menu-item(v-for="(item, i) in menu", :key="item.title[lang]", v-if='! item.hide || item.hide === "en" && lang === 1 || item.hide === "fr" && lang === 0', :class='slug(item.to[lang])')
        //- xmp {{ item }}
        span.linkwrap(@mouseover='galleryItem = (i+1)', @mouseleave='galleryItem = 0')
          div(v-if='item.blank')
            a(:href="item.to[lang]", target="_blank") {{ item.title[lang] }}
          g-link(v-else, :to="item.to[lang]") {{ item.title[lang] }}
      
      .marquee-wrapper
        .marquee.marquee1.is-hidden-desktop
          .subtitle
            //- span.sans {{ subtitle[langpath[lang]] }}&nbsp;
            //- span.sans Biennale:&nbsp;
            //- span.serif 2/2: 27-30 may 2021,
            //- span.sans &nbsp;Vevey
            span(v-if='lang === 0')
              span.sans « Art Biennale:&nbsp;
              span.serif May 26 — June 4, Vevey - Full 2023 Program Announcement:&nbsp;
              span.sans 15 March 2023 »&nbsp;
            span(v-else)
              span.sans « Biennale D’Art&nbsp;
              span.serif 26 Mai — 4 Juin 2023, Vevey - Divulgation Du Programme 2023 Compet:&nbsp;
              span.sans 15 Mars&nbsp;
          
              
              
          
        .marquee.marquee2.is-hidden-desktop
          .subtitle
            //- span.sans {{ subtitle[langpath[lang]] }}&nbsp;
            //- span.sans Biennale:&nbsp;
            //- span.serif 2/2: 27-30 may 2021,
            //- span.sans &nbsp;Vevey
            span(v-if='lang === 0')
              span.sans « Art Biennale:&nbsp;
              span.serif May 26 — June 4, Vevey - Full 2023 Program Announcement:&nbsp;
              span.sans 15 March 2023 »&nbsp;
            span(v-else)
              span.sans « Biennale D’Art&nbsp;
              span.serif 26 Mai — 4 Juin 2023, Vevey - Divulgation Du Programme 2023 Compet:&nbsp;
              span.sans 15 Mars&nbsp;
</template>

<script>
import menu from '~/components/menu.js'
import { mapGetters } from 'vuex'

export default {
  name: 'Menu',
  data () {
    return {
      // lang: 0,
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
      showGallery: true,
      subtitle: {
        en: 'Next Edition',
        fr: 'Prochaine édition'
      },
      lang: 0
    }
  },
  computed: {
    // ...mapGetters({
    //   langCode: 'getLang'
    // }),
    // lang () {
    //   // if (this.langCode == 'fr') return 1
    //   // else return 0
      
    //   let lang = this.$store.state.lang
    //   // console.log('lang: computed in menu', lang);
      
    //   // let path = window.location.pathname
    //   // let pathLang = null
    //   // if (path !== '/') {
    //   //   if (path == '/en' || path.includes('/en/')) {
    //   //     pathLang = 'en'
    //   //   } else if (path == '/fr' || path.includes('/fr/')) {
    //   //     pathLang = 'fr'
    //   //   }
    //   // }
    //   // let stateLang = this.$store.state.lang
      
      
    //   if (lang == 'fr') return 1
    //   // if (pathLang == 'fr') return 1
    //   else return 0
    // },
    loaded () {
      // show menu after loaded is set in store by Logo.vue
      let loaded = this.$store.state.loaded
      return loaded
    }
  },
  created () {
    this.menu = menu
    
    // this.showGallery = false
    // if (this.$route.path.includes('fr')) {
    //   this.lang = 1
    // } else {
    //   this.lang = 0
    // }
    
    if (!this.loaded) {
      this.showGallery = false
    }
    
    if (this.$route.path !== '/') {
      this.getGallery()
    }
    
    this.checkPath()
  },
  mounted () {
    // console.log('menu > mounted > loaded = ' + this.loaded);
    // if (this.$route.path == '/en/' || this.$route.path == '/fr/') {
      // if (!this.loaded) {
      //   this.hideImage()
      // }
    // }
  },
  watch: {
    loaded (loadedTrue) {
      if (!process.isClient) return
      if (loadedTrue) {
      //   this.showImage()
        this.showGallery = true
      }
    },
    $route (to, from){
      // if (to.path.includes('fr')) {
      //   this.lang = 1
      // } else {
      //   this.lang = 0
      // }
      if (to.path == '/en/' || to.path == '/fr/') {
        this.getGallery()
        this.showGallery = true
      }
      this.checkPath()
    }
  },
  methods: {
    checkPath () {
      if (this.$route.path.includes('fr')) {
        this.lang = 1
      } else {
        this.lang = 0
      }
      // console.log('checkPath' , this.lang);
    },
    slug (url) {
      // remove trailing slash
      if (url.substr(-1) == '/') {
        url = url.substr(0, url.length - 1)
      }
      // get last part of url
      let slug = url.substr(url.lastIndexOf('/') + 1)
      return slug
    },
    constrainImageUrl (url) {
      let newUrl = url.replace('?auto=compress,format', '?fit=max&h=1600&w=1200&auto=compress,format=auto')
      // console.log(newUrl)
      return newUrl
    },
    hideImage () {
      if (!process.isClient) return
      console.log('hide image');

      // this.$anime({
      //   targets: this.$el.querySelector('#gallery'),
      //   duration: 0,
      //   easing: 'easeOutSine',
      //   'margin-left': '-33%',
      //   opacity: 0,
      //   delay: 0
      // })
    },
    showImage () {
      if (!process.isClient) return
      console.log('SHOW IT');
      
      // setTimeout(() => {
      //   this.showGallery = true
      // }, 200)
      
      // this.$anime({
      //   targets: this.$el.querySelector('#gallery'),
      //   easing: 'easeInOutSine',
      //   'margin-left': 0,
      //   opacity: 1,
      //   duration: 700,
      //   delay: 300,
      // })
    },
    hoverMenu (e) {
      console.log(e);
    },
    getGallery () {
      let c = this.$context.gallery
      if (c) {
        if ('node' in c) { c = c.node }
        if ('gallery' in c) { c = c.gallery }
        this.total = c.length
        this.gallery = c
      }
      // c.reverse()
      // const c = this.$state.homepageGallery
      // if (c)
      
    }
  }
}
</script>

<style lang="scss" scoped>
// $green: #11ff36;
$green: rgb(17,230,54);
$headingSize: 2.2rem;
$headingSizeMobile: 1.9rem;

.subtitle {
  text-transform: uppercase;
  font-size: 1.4rem;
  // display: flex;
  white-space: nowrap;
  // background: red;
  .spacer {
    width: 20vw;
  }
  .serif {
    font-size: 1.55rem;
    margin: 0 0.3rem;
  }
  // width: 24rem;
  // background: pink;;
}

/* @media (max-width: 960px) { */
@media (max-width: 736px) {
  .marquee-wrapper {
    display: block;
  }  
}
/* @media (min-width: 960px) { */
@media (min-width: 737px) {
  .marquee-wrapper {
    display: none;
  }  
}
.marquee-wrapper {
  // position: fixed;
  // bottom: 4rem;
  width: 100vw; 
  overflow: hidden;
  // border: 1px red solid;
  left: 0;  
  height: 3rem;
  position: absolute;
  bottom: 3rem;
  position: fixed;
  bottom: 4rem;
  /* display: flex;
  justify-content: flex-start;
  align-items: flex-start; */
}
.marquee {
  position: absolute;
}
.marquee1 { 
  /* position: absolute; */
  transform: translateX(0%);
  animation: demo-1 13s linear infinite;
  //  padding-left: 50vw;
  /* background: red; */
  /* .subtitle {
    margin-right: 25vw;
  } */
}
.marquee2 { 
  /* position: absolute; */
  transform: translateX(0%);
  /* translateY(-100%); */
  bottom: 10vh;
  
  /* animation: demo-1 13s linear infinite; */
 display: none;
  background: blue;
  /* .subtitle {
   margin-left: 25vw;
  } */
}

#gallery {
  margin-left: -50vw;
}
#gallery, .showGallery {
  transition: all 500ms;
  transition-delay: 100ms;
}
#gallery.showGallery {
  position: relative;
  margin-left: 0vw;
}

.menu {
  // display: flex;
  // flex-direction: column;
}
.linkwrap {
  // background: pink;
  // padding-top: 1rem;
  padding-top: 0.63rem;
}
.menu-item {
  // display: inline-block;
  // border: 1px blue solid;
  // padding-top: 0.63rem;
  &:first-child {
    // padding-top: 1.8rem;
    padding-top: 1.0rem;
  }
  text-transform: uppercase;
  font-size: $headingSize;
  /* define for mobile */
  @media (max-width: 736px) {
    font-size: $headingSizeMobile;
  }
  // line-height: 1.3em;
  line-height: 1.0em;
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
// #gallery {
//   opacity: 0;
//   margin-left: '-33%';
// }


@-moz-keyframes demo-1 {
 0%   { -moz-transform: translateX(100vw); }
 100% { -moz-transform: translateX(-100%); }
}
@-webkit-keyframes demo-1 {
 0%   { -webkit-transform: translateX(100vw); }
 100% { -webkit-transform: translateX(-100%); }
}
@keyframes demo-1 {
 0%   { 
 -moz-transform: translateX(100vw); /* Firefox bug fix */
 -webkit-transform: translateX(100vw); /* Firefox bug fix */
 transform: translateX(100vw);       
 }
 100% { 
 -moz-transform: translateX(-100%); /* Firefox bug fix */
 -webkit-transform: translateX(-100%); /* Firefox bug fix */
 transform: translateX(-100%); 
 }
}
.menu-item.biennale a {
  color: $green;
}
</style>