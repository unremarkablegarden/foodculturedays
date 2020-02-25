<template lang="pug">
  #logo
    g-link(to="/")
      //- img(alt='FOODCULTURE days', :src='$store.state.img.logo')#logo
      img(:src='$store.state.img.logoParts[0]', :style="{ 'transform': 'translateX('+offset*-1+'px)' }").logoPart.part1

    img(:src='$store.state.img.logoParts[1]', :style="{ 'transform': 'translateX('+logoOffX+'px) translateY('+logoOffY+'px)' }", @click='logoHome').logoPart.part2

    g-link(to="/")
      img(:src='$store.state.img.logoParts[2]', :style="{ 'transform': 'translateX('+offset+'px)' }").logoPart.part3
</template>

<style lang="scss" scoped>
$w: calc(90vw);
$h: calc(90vw * 0.105);
#logo {
  margin-top: 1rem;
  width: $w;
  height: $h;
  overflow: hidden;
  margin-left: 0.7rem;
  .logoPart {
    position: absolute;
    width: $w;
    height: $h;
  }
  .part2 {
    z-index: 999;
    position: fixed;
  }
}
</style>

<script>
import {animatedScrollTo} from 'es6-scroll-to'

export default {
  data () {
    return {
      offset: 0,
      logoOffX: 0,
      logoOffY: 0
    }
  },
  methods: {
    logoHome () {
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
      if (process.isClient) {
        const w = window.innerWidth
        const h = window.innerHeight
        let top = window.pageYOffset
        this.offset = top

        top = top * 0.5
        if (top > 100) {
          top = 100
        }
        this.logoOffX = (top * 0.9)
        this.logoOffY = (top * (h/w) * 1.5)
      }
    }
  },
  created () {
    if (process.isClient) {
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  destroyed () {
    if (process.isClient) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
}
</script>