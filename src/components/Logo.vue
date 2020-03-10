<template lang="pug">
  .logo-wrapper
    #logo
      #curtain(v-if='curtain', v-bind:class="{ transparent: transparent }")
      .clicker(@click='logoHome')
      .part-wrapper
        img(:src='$store.state.img.logoParts[0]', :style="{ 'margin-left': (offset/2)*-1+'px' }").logoPart.part1

      .part-wrapper#pixi1(v-bind:class="{ step1: step1, step2: step2, step3: step3 }").middle.start
        Pixi.logoPart.part2

      .part-wrapper
        img(:src='$store.state.img.logoParts[2]', :style="{ 'margin-left': (offset*5)+'px' }").logoPart.part3

    .pixi2(v-bind:class="{ 'is-hidden': !showBlob }", v-if="enableBlob")#pixi2
      Pixi
      //- (@click='logoHome')
</template>


<script>
import Pixi from '~/components/Pixi.vue'
import {animatedScrollTo} from 'es6-scroll-to'

export default {
  components: { Pixi },
  data () {
    return {
      offset: 0,
      logoOffX: 0,
      logoOffY: 0,
      logoScale: 1,
      winW: null,
      winH: null,
      top: 0,
      step1: false,
      step2: false,
      step3: false,
      transparent: false,
      curtain: true,
      showBlob: false,
      enableBlob: false,
    }
  },
  methods: {
    logoHome () {
      if (!process.isClient) return
      let top = window.pageYOffset
      animatedScrollTo({
          duration: top,
          to: 0
      })

      setTimeout(() => {
        let home = '/en/'
        let path = this.$route.path
        if (path.includes('/fr/')) { home = '/fr/'}
        if (path !== '/en/' && path !== '/fr/' && path !== '/' ) {
          this.$router.push(home)
        }
      }, top);
    },
    setSize () {
      if (!process.isClient) return
      let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
      let iw = (iOS) ? screen.width : window.innerWidth
      let ih = (iOS) ? screen.height : window.innerHeight
      this.winW = iw
      this.winH = ih
    },
    setLoaded () {
      this.$store.commit('setLoaded', true)
    },
    handleScroll (event) {
      if (!process.isClient) return
      this.setSize()
      let top = window.pageYOffset
      this.top = top

      // fuckery to get the hidden clicker to be disabled, plus fade
      if (!this.enableBlob && this.top > 50 && !this.curtain) {
        // && this.winW < 960
        this.enableBlob = true
        setTimeout(() => {
          this.showBlob = true
        }, 10)
      }

      if (this.enableBlob && this.top < 50 && !this.curtain) {
        this.showBlob = false
        setTimeout(() => {
          this.enableBlob = false
        }, 666)
      }
    },
    handleResize (event) {
      // console.log('resize')
      this.setSize()
    },
  },
  mounted () {
    // if (!process.isClient) return
    this.setSize()

    let t = 500
    setTimeout(() => {
      // console.log('step1');
      this.step1 = true

      setTimeout(() => {
        // console.log('step2');
        this.step2 = true
        // console.log('step3');
        this.step3 = true
      }, t+500)
      // setTimeout(() => {
        // console.log('step3');
        // this.step3 = true
      // }, t+500) // t+1000
      setTimeout(() => {
        // console.log('step4');
        this.transparent = true
      }, t+800) // t+1400
      setTimeout(() => {
        // console.log('step5');
        this.curtain = false
        this.setLoaded()
      }, t+1100) // t+1800

    }, t)
  },
  created () {
    // prevent animation if its not loaded on menu page
    const path = this.$route.path
    // console.log(path);

    if (path !== '/en/' && path !== '/fr/' && path !== '/') {
      this.step1 = true
      this.step2 = true
      this.step3 = true
      this.transparent = true
      this.curtain = false
      this.setLoaded()
    }

    if (!process.isClient) return
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
  },
  destroyed () {
    if (!process.isClient) return
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>



<style lang="scss" scoped>
$w: calc(95vw);
$h: calc(95vw * 0.105);
$h2: calc(95vw * 0.085);
$left: calc(95vw * 0.06);

.clicker {
  position: absolute;
  width: 100%;
  height: $h2;
  // background: pink;
  z-index: 10;
}

#curtain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 202vh;
  background: white;
  z-index: 1000;
  opacity: 1;
  // transition: all 500ms;
  // z-index: 10;
  z-index: 900;
  transition: all 1000ms;
}
.transparent {
  transition: all 1000ms;
  opacity: 0 !important;
}

.pixi2 {
  position: fixed;
  opacity: 1;
  transition: all 1000ms;
  width: 21vw;
  height: 9vw;
  overflow: hidden;
}
// mobile
@media (max-width: 960px) {
  .pixi2 {
    left: 50vw;
    top: 50vh;
    // transform: translate(-15.5vw, -13vw) scale(1.4);
    transform: translate(-20vw,-20vw) scale(1.4);
    transform-origin: 0 0;
    padding: 0.5rem;
  }
}
// desktop
@media (min-width: 960px) {
  .pixi2 {
    left: 50vw;
    top: 50vh;
    transform: translate(-52%, -60%) scale(1);
    z-index: 2001;
    padding: 1rem;
    transform-origin: center center;
  }
}


.is-moved {
  margin-left: -100vw;
}
.is-hidden {
  opacity: 0;
  transition: all 400ms;
  // height: 0;
}

.center {
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  width: 50vw;
  height: 50vh;
}

.debug {
  position: fixed;
  top: 100px;
  left: 100px;
}
.ref {
  // opacity: 0.2;
  opacity: 0;
}

#pixi1 {
  position: relative;
  z-index: 1001;
  // transform: scaleX(1.01);
}
// mobile
@media (max-width: 960px) {
  .start {
    transform-origin: center center;
    transform: scale(1.4);
    margin-left: 23vw;
    margin-top: 39vh;
    opacity: 0;
  }
}
// desktop
@media (min-width: 960px) {
  .start {
    transform-origin: center center;
    transform: scale(2);
    margin-left: -31vw;
    margin-top: 80vh;
    opacity: 0;
  }
}
.step1 {
  transition: all 2000ms;
  opacity: 1;
}
.step2 {
  transition: all 600ms;
  transform-origin: center center;
  transform: scale(1);
  margin-top: 0;
  margin-left: 29vw
}
@media (min-width: 960px) {
  .step2 {
    margin-left: -16vw;
  }
}
.step3 {
  transition: all 600ms;
  margin-left: 0;
}

.part2 {
  z-index: 1001;
  position: fixed;
  transform-origin: 0 0;
  height: $h2;
  // width: 23vw;
  // box-shadow: 0 0 1px 1px red;
  margin-left: $left;
  transform: scaleX(1.01)
}

#logo {
  box-sizing: border-box;
  width: 100vw;
  height: $h;
  padding-left: 0.7rem;
  position: relative;
  z-index: 1000;
  .part-wrapper {
    display: inline-block;
    height: $h;
    position: fixed;
  }
  .logoPart {
    display: block;
  }
  .part1, .part3 {
    height: $h;
    // background-color: pink;
  }
}
</style>