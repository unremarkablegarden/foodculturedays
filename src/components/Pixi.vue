<template lang="pug">
  #pixi
    .pixi(:style="{ transform: scale }")
    .clicker(@click='logoHome')
</template>

<style lang="scss">
#pixi {
  .pixi {
    position: relative;
    z-index: 0;
    transform-origin: 0 0;
  }
  .clicker {
    // background: rgba(255,200,0,1);
    height: 9vw;
    width: 21vw;
    position: absolute;
    z-index: 999;
    top: 0;

  }
}
</style>

<script>
import {animatedScrollTo} from 'es6-scroll-to'
// import Modernizr from 'modernizr'

export default {
  name: 'Pixi',
  data () {
    return {
      loaded: false,
      img: '/blob800.png',
      w: 400,
      // h: 150,
      ratio: (150/400),
      blobSize: 0.21,
      pad: 10,
      scaleX: 70,
      scaleY: 70,
      displacement: '/displacement_map_repeat4f.png',
      winW: null,
      winH: null,
    }
  },
  computed: {
    scale () {
      let vw = this.blobSize
      let scale = (this.winW / this.w) * vw
      return 'scale(' + scale + ') ' +  this.translate
    },
    translate () {
      let x, y
      x = '-10px'
      y = '-10px'
      return 'translate('+x+', '+y+')'
    },
    h () {
      return this.w * this.ratio
    }
  },
  mounted () {
    if (!process.isClient) return

    let PIXI = require("pixi.js")
    // let PIXI = require('pixi.js-legacy')
    // console.log(PIXI.autoDetectRenderer)


    const app = new PIXI.Application({
      width: 420,
      height: 170,
      transparent: true
    })

    const target = this.$el.children[0]
    target.append(app.view)

    app.stage.interactive = true;

    const container = new PIXI.Container()
    app.stage.addChild(container);

    const blob = PIXI.Sprite.from(this.img);
    container.addChild(blob);

    blob.x = this.pad
    blob.y = this.pad
    blob.width = this.w
    blob.height = this.h

    const displaceImg = this.displacement
    const displacementSprite = PIXI.Sprite.from(displaceImg)

    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT

    const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite)

    displacementFilter.padding = this.pad
    displacementSprite.position = blob.position

    app.stage.addChild(displacementSprite)

    blob.filters = [displacementFilter]

    displacementFilter.scale.x = this.scaleX
    displacementFilter.scale.y = this.scaleY

    app.ticker.add(() => {
        displacementSprite.x++
        if (displacementSprite.x > displacementSprite.width) {
          displacementSprite.x = 0
        }
    })

    // listen to resize and set once when loaded
    // setTimeout(() => {
    this.setWinSize()
    // },10)
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() {
    if (!process.isClient) return
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    setWinSize () {
      let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
      let iw = (iOS) ? screen.width : window.innerWidth
      let ih = (iOS) ? screen.height : window.innerHeight

      this.winW = iw
      this.winH = ih
    },
    onResize () {
      if (!process.isClient) return
      this.setWinSize()
    },
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
  },
}
</script>