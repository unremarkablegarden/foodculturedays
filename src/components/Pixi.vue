<template lang="pug">
  #pixi
    .pixi(:style="{ transform: scale }")
    .clicker(@click='logoHome')
</template>

<style lang="scss">
#pixi {
  // transform-origin: 0 0;
  // transform: scale(0.2) translate(-5vw, -2vw);
  // box-shadow: 0 0 1px 1px blue;
  canvas {
    // transform-origin: 0 0;
    // transform: scale(0.2) translate(-5vw, -2vw);
    // box-shadow: 0 0 1px 1px red;
  }
  .pixi {
    // box-shadow: 0 0 1px 1px green;
    // box-shadow: 0 0 1px 1px blue;
    // background: rgba(0,255,0,0.2);
    position: relative;
    z-index: 0;
    // height: 9vw;
    // width: 21vw;
    transform-origin: 0 0;
    // transform: scale(0.2);
    // translate(-5vw, -2vw);
  }
  .clicker {
    // box-shadow: 0 0 1px 1px purple;
    // background: rgba(255,200,0,0.1);
    // background: red;
    height: 9vw;
    width: 21vw;
    position: absolute;
    z-index: 999;
    top: 0;
  }
}
</style>

<script>
// var path = require('path')
// import * as PIXI from 'pixi.js'
import {animatedScrollTo} from 'es6-scroll-to'

export default {
  name: 'Pixi',
  data () {
    return {
      loaded: false,
      img: '/blob400.png',
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
      if (process.isClient) {
        // let clicker = this.$parent.$el.querySelector('#pixi2')
        //
        // console.log(clicker);
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
  },
}
</script>