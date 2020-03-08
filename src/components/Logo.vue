<template lang="pug">
  #logo
    #curtain(v-if='curtain', v-bind:class="{ transparent: transparent }")
    //- .center
    .part-wrapper
      g-link(to="/")
        img(:src='$store.state.img.logoParts[0]', :style="{ 'margin-left': (offset/2)*-1+'px' }").logoPart.part1

    .part-wrapper#pixi1(v-bind:class="{ step1: step1, step2: step2, step3: step3 }").middle.start
      //- img(:src='$store.state.img.logoParts[1]', :style="{ 'transform': 'scale('+logoScale+') translateX('+logoOffX+'px) translateY('+logoOffY+'px)' }", @click='logoHome').logoPart.part2
      img(:style="{ 'transform': 'scale('+logoScale+') translateX('+logoOffX+'px) translateY('+logoOffY+'px)' }", :src='$store.state.img.logoParts[1]').logoPart.part2.ref

      Pixi(:style="{ 'transform': 'scale('+logoScale+') translateX('+logoOffX+'px) translateY('+logoOffY+'px)' }", @click='logoHome').logoPart.part2

    .part-wrapper
      g-link(to="/")
        img(:src='$store.state.img.logoParts[2]', :style="{ 'margin-left': (offset*5)+'px' }").logoPart.part3

    .pixi2(v-bind:class="{ 'is-hidden': !showBlob }", v-if="enableBlob")#pixi2
      Pixi(@click='logoHome')
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
      enableBlob: false
    }
  },
  // computed: {
  //   showBlob () {
  //     let showBlob = false
  //     if (this.top > 100 && !this.curtain) { showBlob = true }
  //     return showBlob
  //   }
  // },
  methods: {
    logoHome () {
      if (!process.isClient) return
      let top = window.pageYOffset
      animatedScrollTo({
          duration: top,
          to: 0
      })
      setTimeout(() => {
        this.$router.push('/')
      }, top)
    },
    setSize () {
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
      if (!this.enableBlob && this.top > 100 && !this.curtain && this.winW < 960) {
        this.enableBlob = true
        setTimeout(() => {
          this.showBlob = true
        }, 10)
      }

      if (this.enableBlob && this.top < 100 && !this.curtain && this.winW < 960) {
        this.showBlob = false
        setTimeout(() => {
          this.enableBlob = false
        }, 666)
      }
    }
  },
  mounted () {
    if (!process.isClient) return
    this.setSize()

    setTimeout(() => {
      this.step1 = true
    }, 200)
    setTimeout(() => {
      this.step2 = true
    }, 600)
    setTimeout(() => {
      this.step3 = true
    }, 1200)
    setTimeout(() => {
      this.transparent = true
    }, 1600)
    setTimeout(() => {
      this.curtain = false
      this.setLoaded()
    }, 2000)

  },
  created () {
    if (!process.isClient) return

    // prevent animation if its not loaded on menu page
    const path = this.$route.path
    if (path !== '/en/' || path == '/fr/') {
      this.step1 = true
      this.step2 = true
      this.step3 = true
      this.transparent = true
      this.curtain = false
      this.setLoaded()
    }
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    if (!process.isClient) return
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>



<style lang="scss" scoped>
$w: calc(95vw);
$h: calc(95vw * 0.105);
$h2: calc(95vw * 0.085);
$left: calc(95vw * 0.06);

#curtain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  z-index: 1000;
  opacity: 1;
  transition: all 500ms;
}
.transparent {
  transition: all 500ms;
  opacity: 0 !important;
}

.pixi2 {
  position: fixed;
  left: 50vw;
  top: 50vh;
                   //  x, y
                   // pixi is 21vw i think
  transform: translate(-15.5vw, -12vw) scale(1.4);
  transform-origin: 0 0;
  opacity: 1;
  transition: all 1000ms;
  // transition: opacity 900ms height 2000ms;
  // box-shadow: 0 0 1px 1px red;
  width: 21vw;
  height: 9vw;
  overflow: hidden;
}

.is-moved {
  margin-left: -100vw;
}
.is-hidden {
  opacity: 0;
  transition: all 666ms;
  // height: 0;
}

.center {
  position: fixed;
  top: 0;
  left: 0;
  background: red;
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
}
.start {
  transform-origin: center center;
  transform: scale(1.4);
  margin-left: 23vw;
  margin-top: 39vh;
  opacity: 0;
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
  }
}
</style>