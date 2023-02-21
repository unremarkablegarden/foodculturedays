<template lang="pug">
  #app(:class='uid')
    #preloader
      //- img(src="https://images.prismic.io/foodculturedays2020/acb5863c-bbf5-4f37-9c82-14176e46a8a8_191123_FCD45580.jpg?auto=compress,format")
    //- Loader
    .body(v-bind:class="{ 'splash': splash, 'loaded': loaded, 'home': isHome }")
      Logo
      //- Radio
      Splash(v-bind:class="{ 'splash': splash }")
      #buttons(v-bind:class="{ 'abs': animating }")
        Social#social
        button.menu-button(@click='toggleMenu', v-bind:class="{ 'is-hidden': !menubuttonShown, 'on': menuShown }") MENU
        Lang#lang
      //- Menu(v-if='notSlashIndex').global-menu
      client-only
        Menu(v-bind:class="{ 'is-hidden-menu': !menuShown }", v-if='isMobile').global-menu
        Cookies
      transition(:name='transitionName')
        router-view(class='child-view')
</template>

<static-query>
query {
  metadata {
    siteName
    siteDescription
  }
}
</static-query>

<script>
import Lang from '~/components/Lang.vue'
import Social from '~/components/Social.vue'
import Loader from '~/components/Loader.vue'
import Logo from '~/components/Logo.vue'
import Splash from '~/components/Splash.vue'
import Menu from '~/components/Menu.vue'
import Cookies from '~/components/Cookies.vue'
// import Statement from '~/components/Statement.vue'
// import Radio from '~/components/Radio.vue'

import {animatedScrollTo} from 'es6-scroll-to'

if (process.isClient) {
  var browserUpdate = require('browser-update')  
}
// import browserUpdate from 'browser-update'

export default {
  components: {
    Lang, Social, Loader, Logo, Splash, Menu, Cookies,
    // Radio
  },
  data () {
    return {
      animating: false,
      menuShown: false,
      splash: false,
      winH: 0,
      winW: 0,
      isMobile: true,
      isHome: false,
      menubuttonShown: true,
      responsiveSize: 736,
      uid: '',
    }
  },
  computed: {
    transitionName () {
      return this.$store.state.transitionName
    },
    loaded () {
      // show menu after loaded is set in store by Logo.vue
      
      let loaded = this.$store.state.loaded
      
      let path = this.$route.path
      if (path == '/en/' || path == '/fr/') {   
        if (loaded) {
          setTimeout(() => {
            this.showMenu()
            // this.showDesktop()
          }, 1800)
        }
      }
      return loaded
    },
  },
  watch: {
    menuShown (val) {
      console.log('menushown watcher')
      if (this.isMobile) {
        if (val == true) {
          document.body.classList.add("noscroll")
        }
        else {
          document.body.classList.remove("noscroll")    
        }
      }
    },
    splash (val) {
      console.log('splash = ' + val);
      if (this.loaded) {
        this.hideMenu(true)
        if (val == false) {
          this.showMenu(true)
        } 
        if (val == true) {
          this.hideMenu(true)
        }
      }
    },
    loaded (loadedTrue) {
      if (loadedTrue) {
        
        let path = this.$route.path
        if (path == '/en/' || path == '/fr/') {   
          this.showMenu()
          
          this.$anime({
            targets: this.$el.querySelector('#buttons'),
            easing: 'easeInOutSine',
            bottom: 0,
            opacity: 1,
            duration: 250,
            delay: 500
          })
          
        }
        
        // this.showDesktop()
      }
    },
    $route (to, from) {
      // get last part of route
      let uid = to.path
      if (uid[uid.length - 1] == '/') uid = uid.slice(0, -1)
      uid = uid.split('/')
      uid = uid[uid.length - 1]
      this.uid = uid
      console.log('uid change = ' + uid)
      
      // if (!process.isClient) return
      console.log('GA page > ' + to.path)
      this.$ga.page(to.path)


      this.animating = true
      setTimeout(() => {
        this.animating = false
      }, 600)

      if (from.path == '/') {
        this.hideMenu()
      }
      // this.hideMenu()
      
      if (to.path == '/en/' && from.path == '/fr/' || to.path == '/fr/' && from.path == '/en/') {
        // lang switch
      }
      else if (to.path == '/en/' && from.path !== '/fr/' || to.path == '/fr/' && from.path !== '/en/') {
        console.log('back home')
        // setTimeout(() => {
        //   this.splash = true  
        // }, 500);
        this.splash = true
        this.isHome = true
        // this.menuShown = true
      } 
      else {
        console.log('route not back home');
        if (this.isMobile) this.hideMenu(true)
        this.splash = false
        this.isHome = false
        if (this.isMobile) this.menuShown = false
      }
    }
  },
  mounted () {
    if (!process.isClient) return
    // set up the menu outside the screen while curtain is up
    this.hideMenu()
    
    let rp = this.$route.path
    if (rp == '/en/' || rp == '/fr/' || rp == '/') {
      this.$anime({
        targets: this.$el.querySelector('#buttons'),
        easing: 'easeInOutSine',
        bottom: '-4rem',
        opacity: 0,
        duration: 0,
        delay: 0
      })
    }

    
    browserUpdate({
      // required: {e:-4,f:-6,o:-3,s:-2,c:-6},
      required: {e:-4,f:-6,o:-6,s:-3,c:-6},
      insecure:true,
      unsupported:true,
      api:2020.06,
      test: false,
      shift_page_down: false,
      reminder: 9999,
      // after how many hours should the message reappear
      // 0 = show all the time
      reminderClosed: 9999,
      // if the user explicitly closes message it reappears after x hours
    })
    
  },
  created () {
    if (!process.isClient) return
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
    this.setSize()
    this.checkPath()
    this.checkMobile()
    this.oribi()
  },
  destroyed () {
    if (!process.isClient) return
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    oribi () {
      // console.log('oribi');
      // (function (b, o, n, g, s, r, c) {
      //     if (b[s]) return;
      //     b[s] = {};
      //     b[s].scriptToken = "Xy0yMDc5ODMzNTMw";
      //     b[s].callsQueue = [];
      //     b[s].api = function () {
      //         b[s].callsQueue.push(arguments);
      //     };
      //     r = o.createElement(n);
      //     c = o.getElementsByTagName(n)[0];
      //     r.async = 1;
      //     r.src = g;
      //     r.id = s + n;
      //     c.parentNode.insertBefore(r, c);
      // })(window, document, "script", "https://cdn.oribi.io/Xy0yMDc5ODMzNTMw/oribi.js", "ORIBI");

    },
    // hideMenu () {
    //   console.log('hide menu');
    //   return false
    // },
    notSlashIndex () {
      let path = this.$route.path
      if (path !== '/') {
        return true
      }
    },
    setSize () {
      if (!process.isClient) return
      let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
      let iw = (iOS) ? screen.width : window.innerWidth
      let ih = (iOS) ? screen.height : window.innerHeight
      this.winW = iw
      this.winH = ih
    },
    handleResize (event) {
      this.setSize()
      this.checkMobile()
    },
    checkMobile () {
      
      if (this.winW >= this.responsiveSize) {
        this.isMobile = false
        this.splash = false
      } else {
        this.isMobile = true
        if (this.isHome) this.splash = true
      }
    },
    checkLang () {
      // new 2023
      let path = window.location.pathname
      let pathLang = null
      if (path !== '/') {
        if (path == '/en' || path.includes('/en/')) {
          pathLang = 'en'
        } else if (path == '/fr' || path.includes('/fr/')) {
          pathLang = 'fr'
        }
      }
      let stateLang = this.$store.state.lang
      if (pathLang !== stateLang) {
        this.$store.dispatch('setLang', pathLang)
        console.log('set lang from path', pathLang)
      }  
    },  
    checkPath () {
      if (!process.isClient) return
      let p = this.$route.path
      
      let uid = p
      if (uid[uid.length - 1] == '/') uid = uid.slice(0, -1)
      uid = uid.split('/')
      uid = uid[uid.length - 1]
      this.uid = uid
      
      // console.log('PATH ==== ' + p);
      
      if (p == '/') {
        // if at the root, determine language. get from state as set by 
        let lang = this.$store.state.userLang
        // set state lang to userLang if it's not set, FROM ROOT  ONLY
        if (!this.$store.state.lang) {
          this.$store.dispatch('setLang', lang)  
        }
        let path = '/' + lang + '/'
        this.$router.push(path)
      } else {
        // not root, maybe loading /fr or /en directly, check the lang based on path
        this.checkLang()
      }
      
      
      if (p == '/en/' || p =='/en' || p == '/fr/' || p == '/fr' || p == '/') {
        // is home
        this.splash = true  
        this.isHome = true
      } else {
        // is page
        this.splash = false
        this.isHome = false
      }
    },
    // hideImage () {
    //   if (!process.isClient) return
    //   console.log('hide image');

    //   this.$anime({
    //     targets: this.$el.querySelector('#gallery'),
    //     duration: 0,
    //     easing: 'easeOutSine',
    //     'margin-left': '-33%',
    //     opacity: 0,
    //     delay: 0
    //   })
    // },
    toggleMenu () {
      console.log('toggle menu');
      // this.menuActive = !this.menuActive
      
      let homePath, path = window.location.pathname
      
      if (path == '/en/' || path == '/fr/') {
        console.log('home toggle');
        this.splash = !this.splash
      }
      
      this.menuShown = !this.menuShown
      
      if (this.menuShown == true) {
        let top = window.pageYOffset
        animatedScrollTo({
          duration: top,
          to: 0
        })
        this.showMenu(true)
      } else {
        this.hideMenu(true)
      }

    },
    hideMenu (bypass) {
      if (!process.isClient) return
      if (this.menuShown == false && this.$route.path !== '/' || bypass) {
        // console.log('hidemenu');
        // this.$anime({
        //   targets: this.$el.querySelectorAll('.menu-item'),
        //   duration: 0,
        //   easing: 'easeOutSine',
        //   left: '-33%',
        //   opacity: 0,
        //   delay: 0
        // })
        
        // this.hideImage()
        
        this.$anime({
          targets: this.$el.querySelectorAll('.menu-item'),
          easing: 'easeInOutSine',
          left: '-33%',
          opacity: 0,
          // duration: 250,
          duration: 0,
          // delay: [this.$anime.stagger(50)]
          delay: 0
        })
        
        // console.log(this.$route.path);
      }
    },
    showMenu (bypass) {
      if (!process.isClient) return
      console.log('SHOW MENU ' + this.menuShown);
      

      if (this.menuShown == false && this.$route.path !== '/' || bypass) {
        
        // console.log(this.winW); 
        
        if (this.winW >= this.responsiveSize || bypass) {
          // menu items
          this.$anime({
            targets: this.$el.querySelectorAll('.menu-item'),
            easing: 'easeInOutSine',
            left: 0,
            opacity: 1,
            duration: 250,
            delay: [this.$anime.stagger(50)]
          })
          this.menuShown = true
          
          // desktop side image
          // this.$anime({
          //   targets: this.$el.querySelector('#gallery'),
          //   easing: 'easeInOutSine',
          //   'margin-left': 0,
          //   opacity: 1,
          //   duration: 700,
          //   delay: 300,
          // })
        }
      }  
    },
  },
  metaInfo() {
    function customMeta () {
      let i = 0
      if (process.isClient) {
        if (location.pathname.substr(1,2) == 'fr') i = 1
      }
      let descs = [
        'foodculture days is a transdisciplinary knowledge-sharing platform based in Vevey (Switzerland)',
        'foodculture days est une plateforme transdisciplinaire de partage de connaissances basée à Vevey (Suisse)'
      ]
      return [
        {
          key: 'og:image',
          name: 'og:image',
          content: 'https://images.prismic.io/foodculturedays2020/030721da-4fee-4898-a855-b80ad7daf65b_1.jpg?h=2400&auto=compress,format'
        },
        {
          key: 'description',
          name: 'description',
          content: descs[i]
        }
      ]
    }
    return {
      title: this.$static.metadata.siteName,
      titleTemplate: '%s — ' + this.$static.metadata.siteName,
      meta: customMeta()
    }
  }
}
</script>

<style lang="scss">
$green: rgb(17,230,54);
.green { color: $green; }
// $green: #11ff36;
$headingSize: 2.2rem;

#preloader { display: none !important; }

// MOBILE
/* @media (max-width: 960px) { */
@media (max-width: 736px) {
  
  .home.splash {
    #menu  {
      display: none;
    }
    #splash {
      .image {
        // background-image: url(https://images.prismic.io/foodculturedays2020/83b8c76d-b3cb-458a-a1b1-65598cf92502_web+1.jpg?auto=compress,format);
        
        background-image: url(https://images.prismic.io/foodculturedays2020/4122721b-1ec3-449f-b8c0-9a39ef133b14_web+2.jpg?auto=compress,format);
        
        // background-image: url(https://images.prismic.io/foodculturedays2020/030721da-4fee-4898-a855-b80ad7daf65b_1.jpg?h=2400&auto=compress,format);
        // background-image: url(https://images.prismic.io/foodculturedays2020/ec37bea2-c3c1-4890-9e55-d9e4a16f4f7b_POSTER_VISUAL2.jpg?auto=compress,format);
        
        
        
        // background-image: url(https://images.prismic.io/foodculturedays2020/acb5863c-bbf5-4f37-9c82-14176e46a8a8_191123_FCD45580.jpg?auto=compress,format);
        
        
        // background-image: url(https://images.prismic.io/foodculturedays2020/dbd163b0-c536-4394-ac85-003f4dd36652_background.jpg?auto=compress,format);
        
        /* background-image: url(https://images.prismic.io/foodculturedays2020/4c9181ba-1442-434d-95f7-b208c5d4199a_FCD_agenda_riviera_2.jpg?auto=compress,format); */
        background-position: top center;
        background-size: cover;
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        width: 100%;
        z-index: 0;
        margin: 0 !important;
      }
      display: block;
    }
    #buttons {
      background: transparent;
      // mix-blend-mode: color;
    }
    .menu-button {
      // mix-blend-mode: difference;
      color: $green;
      border: 1px $green solid;
      background: transparent;
      // font-size: 1rem;
      // font-weight: bold;
      // padding: 0.52rem 0.6rem 0.3rem !important;
    }
    #menu .menu-item a {
      color: white;
      // mix-blend-mode: difference;
    }
        
    .intro {
      color: white;
      mix-blend-mode: difference;
    }
    .index.intro {
      display: block;
    }
  }
  
  .menu-button {
      // mix-blend-mode: difference;
      color: $green;
      border: 1px $green solid;
      background: transparent;
      // font-size: 1rem;
      // font-weight: bold;
      // padding: 0.52rem 0.6rem 0.3rem !important;
    }
  .menu-button {
    // color: $green;
    // padding: 0.48rem 0.6rem 0;
    // padding: 0.52rem 0.6rem 0.3rem !important;
    border-radius: 6px;
    font-weight: bold;
    // padding: 0.52rem 0.6rem 0.3rem !important;
    font-size: 0.8rem;
  }
  .menu-button.on {
    color: white;
    background: $green;
    border: 1px $green solid;
  }
  
  .biennale {
    .menu-button {
      color: black;
      border: 1px black solid;
    }
    .menu-button.on {
      color: white;
      background: black;
      border: 1px black solid;
    }
  }
  
  .home.splash.loaded {
    #logo {
      .part-wrapper {
        filter: invert(100%);  
      }
      mix-blend-mode: difference; 
    }
  }
  
    .menu-button, #lang .lang {
      // transform: scale(0.8);
      font-size: 0.8rem;
      line-height: 1em;
    }
    #lang .lang {
      padding: 0.52rem 0.6rem 0.3rem !important;
      // padding: 0 !important;
    }
      
    .menu-button {
      // padding: 0.45rem 0.5rem 0.35rem;
      // height: 1.75rem;
      // box-sizing: border-box;
      // padding-top: 0.5rem
      // padding: 0.52rem 0.6rem 0.3rem !important;
      padding: 7px 10px !important;
    }
  
  .desktop {
    display: none;
  }
  #logo {
    margin-top: 0.8rem;
  }
  .layout {
    margin: 0 auto 0;
    // margin: calc(95vw * 0.105) auto 0;
    // position: absolute;
    // top: 0;
    // margin: 50px auto 0;
    padding-left: 0.7rem;
    padding-right: 0.7rem;
    background: white;
  }
  #buttons {
    width: 100vw;
    left: 0;
  }
  .global-menu {
    padding-left: 0.7rem;
    padding-right: 0.7rem;
  }
  .splash.home #buttons {
    #social a {
      color: white !important;
    }
    .menu-button {
      color: white !important;
      border-color: white !important;
    }
    #lang button{ 
      border-color: white !important;
      color: white !important;
      &.is-active {
        background: white !important;
        color: black !important;
      }
    }
  }
}


// DESKTOP
/* @media (min-width: 960px) { */
@media (min-width: 737px) {
  // .home .layout {
  //   z-index: 0;
  //   // position: absolute;
  //   display: none;
  // }
  .global-menu {
    position: absolute;
    top: 0;
    z-index: 10;
    display: none
  }
  .home .global-menu {
    display: block;
  }
  .mobile {
    display: none;
  }
  .menu-button {
    display: none;
  }
  #logo {
    padding-top: 0.8rem;
    transform: scale(0.49);
    transform-origin: 0 0;
    margin-left: calc(49.5vw + 1rem);
  }
  #buttons {
    right: 0;
    transform-origin: bottom right;
    // transform: scale(0.9);
    width: 50vw;
  }
  .layout {
    position: absolute;
    left: 0;
    top: 0;
    padding: 0;
    margin: 0;
    width: 100vw;
    min-height: 100vh;
    box-sizing: border-box;
  }
  .columns {
    display: flex;
    .column {
      padding: 1rem;
      box-sizing: border-box;
    }
    .column.no-pad {
      padding: 0;
    }
    .is-6 {
      width: 50%;
    }
  }

  .column.is-6.desktop {
    width: 50vw;
    position: fixed;
    top: 0;
    left: 0;
  }
  .column.is-6.left {
    width: 50vw;
    position: absolute;
    top: 0;
    left: 50vw;
  }

  .body {
    min-height: 100vh;
  }

  #app {
    min-height: 100vh;
  }
  
  html, body, #app {  
    cursor: url(assets/cursor-1x.png) 15 15, auto !important;
  }
  a, .link, #pixi, #pixi1, #pixi2, button, .back, .clicker {
    // cursor: pointer;
    cursor: url(assets/cursorB-1x.png) 12 12, pointer !important;
  }

  .gallery-column {
    height: 100vh;
    position: relative;
    z-index: 10;
  }

  .column.left {
    padding-top: 6vw;
    padding-right: 4rem;
  }

  .gallery {
    /* background-color: #f5f5f5; */
    background:white;
    color: #ccc;
    height: 100%;
    width: 50vw;
    .item {
      height: 100%;
      background-position: center center;
      background-size: cover;
      background-repeat: no-repeat;
      position: absolute;
      width: 50vw;
      box-sizing: border-box;
      padding: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}


h1 {
  text-transform: uppercase;
  color: $green;
  font-weight: normal;
  margin: 0 0 0.3rem 0;
  padding: 0;
  line-height: 1em;
  font-size: $headingSize;
  margin-left: -0.15rem;
}
.titleLike {
  text-transform: uppercase;
  color: $green;
  font-weight: normal;
  // margin: 0 0 0.3rem 0;
  padding: 0;
  line-height: 1em;
  font-size: $headingSize;
  margin-left: -0.15rem;
}

input {
  -webkit-appearance: none;
  -webkit-border-radius:0;
  border-radius:0;
}

#buttons {
  height: 3.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  // position: absolute;
  // z-index: 888;
  z-index: 1030;
  bottom: 0;
  // left: 0;
  margin: 0;
  padding: 0.7rem 0.7rem 0.8rem 1.2rem;
  // border: 1px red solid;
  box-sizing: border-box;
  // padding: 1rem;
  background: white;
  box-sizing: border-box;
  // box-shadow: 0 0 30px white;
  // box-shadow: 0 -10px 20px 5px white;
}

textarea, select, input, button { outline: none; }

a {
  color: $green;
  text-decoration: none;
}

body {
  font-family: 'D', -apple-system,system-ui,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.275em;
  font-size: 18px;
  letter-spacing: -0.01rem;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.004);
  text-rendering: optimizeLegibility !important;
  -webkit-font-smoothing: antialiased !important;
}
.serif {
  font-family: 'CE', Times, serif;
}

i, em, label {
  font-family: 'CE', Times, serif;
  font-size: 1.285rem;
}


xmp {
  background: black;
  font-size: 12px;
  line-height: 1em;
  color: white;
}

.title {
  position: sticky;
  top: 0;
  background: white;
  padding: 1.7rem 0 0rem;
  z-index: 1010;
  box-sizing: border-box;
}
.title.lowerz {
  z-index: 0 !important;
}
.title.unstick {
  position: relative;
}
.stick {
  top: 0;
  position: sticky;
}
.bg-white {
  background: white;
}

.subtitle {
  margin-top: 1rem;
  * {
    font-weight: normal;
    margin: 0 0 0.3rem 0;
    padding: 0;
  }
}

.content {
  p {
    margin-top: 0;
    margin-block-start: 0;
  }
  a {
    /* color: black; */
    color: $green;
  }
  strong a, a strong {
    color: $green;
    text-decoration: underline;
  }
}
.page-wrapper {
  padding-bottom: 6rem;
}






.abs {
  position: absolute !important;
  bottom: 0;
}

/* @media (min-width: 960px) { */
@media (min-width: 737px) {
  .abs {
    background: transparent !important;  
  }
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
  position: absolute;
  // width: calc(100vw - 1.4rem)
  box-sizing: border-box;
  width: 100vw;
  
}
.slide-right-leave-active, .slide-left-leave-active {
  top: 0;
  padding-top: 50px; 
  // z-index: 999; 
  // border: 20px red solid;
  
}
.slide-right-enter-active, .slide-left-enter-active {
  // border: 20px blue solid;
}


.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(100vw, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-100vw, 0);
}

.is-hidden {
  display: none;
}

.noscroll {
  overflow: hidden !important;
}

.global-menu, .is-hidden-menu {
  transition: all 300ms;
  // height: 20rem;
  height: 100vh
}
.global-menu {
  position: fixed;
  left: 0;
  // top: 0;
  width: 100vw;
  
  box-sizing: border-box;
  background: white;
  z-index: 1020;
  /* height: calc(100vh - 6.85rem); */
  height: calc(100vh);
  // height: 0;
}
.is-hidden-menu {
  height: 100vh;  
  // width:
  overflow: hidden;
  left: -100vw;
  .marquee-wrapper {
    display: none;
  }
}

@font-face {
    font-family: 'CE';
    src: url('./assets/ce-i.woff2') format('woff2'),
         url('./assets/ce-i.woff') format('woff');
    font-weight: 500;
    font-style: italic;
}

@font-face {
    font-family: 'D';
    src: url('./assets/d.woff2') format('woff2'),
         url('./assets/d.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'CE';
    src: url('./assets/ce.woff2') format('woff2'),
         url('./assets/ce.woff') format('woff');
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: 'Maxi';
    src: url('./assets/ABCMaxiRound-Light.woff2') format('woff2'),
         url('./assets/ABCMaxiRound-Light.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

</style>

<style>
  .buorg {
    /* position: absolute; */
    position: fixed;
    z-index: 111111;
    width: 50% !important;
    top: 30% !important;
    left: 25% !important;
    border-bottom: 1px solid #A29330;
    text-align: center;
    color: #000;
    background-color: #fff !important;
    font: 18px Calibri, Helvetica, sans-serif;
    /* box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); */
    box-shadow: 0 0 1px black !important;
    animation: 1s ease-out 0s buorgfly
    }

    .buorg-pad {
      padding: 50px;
      line-height: 1.7em;
    }

    .buorg-buttons {
      display: block;
      text-align: center;
      margin-top: 20px;
    }

    #buorgig, #buorgul, #buorgpermanent {
      color: #fff;
      text-decoration: none;
      cursor: pointer;
      /* box-shadow: 0 0 2px rgba(0, 0, 0, 0.4); */
      box-shadow: 0 0 0 black !important;
      padding: 1px 10px;
      border-radius: 4px;
      font-weight: normal;
      background: #5ab400;
      white-space: nowrap;
      margin: 0 2px;
      display: inline-block;
    }

    #buorgig {
      /* background-color: #fff !important; */
    }

    @media only screen and (max-width: 700px) {
        .buorg div {
            padding: 5px 12px 5px 9px;
            line-height: 1.3em;
        }
    }

    @keyframes buorgfly {
        from {
            opacity: 0;
            transform: translateY(-50px)
        }
        to {
            opacity: 1;
            transform: translateY(0px)
        }
    }

    .buorg-fadeout {
        transition: visibility 0s 8.5s, opacity 8s ease-out .5s;
    }

    .buorg-icon {
        width: 22px;
        height: 16px;
        vertical-align: middle;
        position: relative;
        top: -0.05em;
        display: inline-block;
        background: no-repeat 0px center;
    }
</style>


<style lang='scss'>
.buorg-pad {
  padding: 20px !important;
}
#buorgig, #buorgul, #buorgpermanent {
  background: black !important;
}
</style>