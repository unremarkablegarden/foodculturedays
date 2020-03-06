<template lang="pug">
  #logo
    .part-wrapper
      g-link(to="/")
        img(:src='$store.state.img.logoParts[0]', :style="{ 'margin-left': (offset/2)*-1+'px' }").logoPart.part1

    .part-wrapper.middle
      //- img(:src='$store.state.img.logoParts[1]', :style="{ 'transform': 'scale('+logoScale+') translateX('+logoOffX+'px) translateY('+logoOffY+'px)' }", @click='logoHome').logoPart.part2
      Pixi(:style="{ 'transform': 'scale('+logoScale+') translateX('+logoOffX+'px) translateY('+logoOffY+'px)' }", @click='logoHome').logoPart.part2

    .part-wrapper
      g-link(to="/")
        img(:src='$store.state.img.logoParts[2]', :style="{ 'margin-left': (offset*5)+'px' }").logoPart.part3
</template>


<script>
import Pixi from '~/components/Pixi.vue'
import {animatedScrollTo} from 'es6-scroll-to'

export default {
  components: {
    Pixi
  },
  data () {
    return {
      offset: 0,
      logoOffX: 0,
      logoOffY: 0,
      logoScale: 1
    }
  },
  methods: {
    logoHome () {
      if (!process.isClient) return
      if (process.isClient) {
        let top = window.pageYOffset
        animatedScrollTo({
            duration: top,
            to: 0
        })
        setTimeout(() => {
          this.$router.push('/')
        }, top);
      }
    },
    handleScroll (event) {
      if (!process.isClient) return
      if (process.isClient) {
        const w = window.innerWidth
        const h = window.innerHeight
        let top = window.pageYOffset
        this.offset = top * 0.5

        if (top > 100) {
          top = 100
        }
        this.logoOffX = (top/100) * (w/8.5)
        this.logoOffY = (top/100) * (h/4)
        this.logoScale = (top / 200) + 1
      }
    }
  },
  created () {
    if (!process.isClient) return
    if (process.isClient) {
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  destroyed () {
    if (!process.isClient) return
    if (process.isClient) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
}
</script>



<style lang="scss" scoped>
$w: calc(95vw);
$h: calc(95vw * 0.105);
$h2: calc(95vw * 0.085);
$left: calc(95vw * 0.066);

#logo {
  box-sizing: border-box;
  // margin-top: 1rem;
  margin-top: 0.8rem;
  // width: $w;
  width: 100vw;
  height: $h;
  // overflow: hidden;
  padding-left: 0.7rem;
  position: relative;
  z-index: 888;
  // background: red;
  // display: block;
  .part-wrapper {
    display: inline-block;
    height: $h;
    // box-shadow: 0 0 0 1px red;
    position: fixed;
  }
  .logoPart {
    display: block;
  }
  .part1, .part3 {
    // position: absolute;
    // width: $w;
    height: $h;
    // box-shadow: 0 0 1px 0px blue;
  }
  .part2 {
    z-index: 999;
    position: fixed;
    transform-origin: 0 0;
    height: $h2;
    // border: 1px red solid;
    width: 23vw;
    // box-shadow: 0 0 1px 1px red;
    margin-left: $left;
    // clip: rect(0px,90px,30px,0px);
    // top, right, bottom, left
  }
}
</style>