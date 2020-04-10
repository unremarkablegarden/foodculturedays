<template lang="pug">
  #app
    #preloader
      img(src="https://images.prismic.io/foodculturedays2020/acb5863c-bbf5-4f37-9c82-14176e46a8a8_191123_FCD45580.jpg?auto=compress,format")
    //- Loader
    .body(v-bind:class="{ 'splash': splash, 'loaded': loaded }")
      Logo
      Splash(v-bind:class="{ 'splash': splash }")
      #buttons(v-bind:class="{ 'abs': animating }")
        Social#social
        .menu-button(@click='toggleMenu', v-bind:class="{ 'is-hidden': !menuShown }") MENU
        Lang#lang
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

export default {
  components: {
    Lang, Social, Loader, Logo, Splash
  },
  data () {
    return {
      animating: false,
      menuShown: true,
      splash: false,
      winH: 0,
      winW: 0,
      isMobile: true,
      isHome: false,
    }
  },
  computed: {
    transitionName () {
      return this.$store.state.transitionName
    },
    loaded () {
      // show menu after loaded is set in store by Logo.vue
      let loaded = this.$store.state.loaded
      if (loaded) {
        setTimeout(() => {
          this.showMenu()
          // this.showDesktop()
        }, 1800)
      }
      return loaded
    },
  },
  watch: {
    splash (val) {
      if (this.loaded) {
        // console.log('splash = ' + val);
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
        this.showMenu()
        // this.showDesktop()
      }
    },
    $route (to, from) {
      // if (!process.isClient) return

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
        // this.menuShown = false
      }
    }
  },
  mounted () {
    if (!process.isClient) return
    // set up the menu outside the screen while curtain is up
    this.hideMenu()
  },
  created () {
    if (!process.isClient) return
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
    this.setSize()
    this.checkPath()
    this.checkMobile()
  },
  destroyed () {
    if (!process.isClient) return
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    hideMenu () {
      return false
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
      if (this.winW >= 960) {
        this.isMobile = false
        this.splash = false
      } else {
        this.isMobile = true
        if (this.isHome) this.splash = true
      }
    },
    checkPath () {
      if (!process.isClient) return
      let p = this.$route.path
      // console.log('PATH ==== ' + p);
      
      if (p == '/en/' || p == '/fr/' || p == '/fr/' || p == '/fr' || p == '/') {
        // is home
        this.splash = true  
        this.isHome = true
      } else {
        // is page
        this.splash = false
        this.isHome = false
      }
    },
    toggleMenu () {
      console.log('toggle menu');
      // this.menuActive = !this.menuActive
      this.splash = !this.splash
    },
    hideMenu (bypass) {
      if (!process.isClient) return
      if (this.menuShown == false && this.$route.path !== '/' || bypass) {
        // console.log('hidemenu');
        this.$anime({
          targets: this.$el.querySelectorAll('.menu-item'),
          duration: 0,
          easing: 'easeOutSine',
          left: '-33%',
          opacity: 0,
          delay: 0
        })
      }
    },
    showMenu (bypass) {
      if (!process.isClient) return

      if (this.menuShown == false && this.$route.path !== '/' || bypass) {
        
        console.log(this.winW);
        
        if (this.winW >= 960 || bypass) {
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
          this.$anime({
            targets: this.$el.querySelector('#gallery'),
            easing: 'easeInOutSine',
            'margin-left': 0,
            opacity: 1,
            duration: 700,
            delay: 300,
          })
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
        'A multidisciplinary platform for knowledge exchange',
        'Une plateforme multidisciplinaire d‘échange de connaissances'
      ]
      return [
        {
          key: 'og:image',
          name: 'og:image',
          content: 'https://images.prismic.io/foodculturedays2020/acb5863c-bbf5-4f37-9c82-14176e46a8a8_191123_FCD45580.jpg?auto=compress,format'
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
@media (max-width: 960px) {
  .splash {
    #menu  {
      display: none;
    }
    #splash {
      .image {
        background-image: url(https://images.prismic.io/foodculturedays2020/acb5863c-bbf5-4f37-9c82-14176e46a8a8_191123_FCD45580.jpg?auto=compress,format);
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
      mix-blend-mode: color;
    }
    .menu-button {
      mix-blend-mode: difference;
      color: $green;
      border: 1px $green solid;
      background: transparent;
      font-size: 1rem;
      font-weight: bold;
    }
    #menu .menu-item a {
      color: white;
      mix-blend-mode: difference;
    }
    
    .menu-button, #lang .lang {
      // transform: scale(0.8);
      font-size: 0.8rem;
      line-height: 1em;
    }
    #lang .lang {
      padding: 0.52rem 0.6rem 0.3rem !important;
    }
    .menu-button {
      // padding: 0.5rem 0.5rem 0.3rem;
      height: 1.75rem;
      box-sizing: border-box;
      padding-top: 0.5rem
    }
      
    .intro {
      color: white;
      mix-blend-mode: difference;
    }
    .index.intro {
      display: block;
    }
  }
  .splash.loaded {
    #logo {
      .part-wrapper {
        filter: invert(100%);  
      }
      mix-blend-mode: difference; 
    }
  }
  
  .menu-button {
    // color: $green;
    color: white;
    background: $green;
    border: 1px $green solid;
    padding: 0.48rem 0.6rem 0;
    border-radius: 6px;
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
}


// DESKTOP
@media (min-width: 960px) {
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
    cursor: auto;
    cursor: url(assets/cursor-1x.png) 15 15, auto;
  }

  a, .link:hover, #pixi, #pixi1, #pixi2, button, .back, .clicker{
    cursor: pointer;
    cursor: url(assets/cursorB-1x.png) 12 12, auto !important;
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
    background-color: #f5f5f5;
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
}
.titleLike {
  text-transform: uppercase;
  color: $green;
  font-weight: normal;
  // margin: 0 0 0.3rem 0;
  padding: 0;
  line-height: 1em;
  font-size: $headingSize;
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
  z-index: 888;
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
    color: black;
  }
}
.page-wrapper {
  padding-bottom: 6rem;
}






.abs {
  position: absolute !important;
  bottom: 0;
}

@media (min-width: 960px) {
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

</style>