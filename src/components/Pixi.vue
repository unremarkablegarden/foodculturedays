<template lang="pug">
  #pixi
    .pixi
    .clicker(@click='logoHome')

</template>

<style lang="scss">
#pixi {
  canvas {
    transform-origin: 0 0;
    transform: scale(0.2) translate(-5vw, -2vw);
  }
  .pixi {
    // box-shadow: 0 0 1px 1px blue;
    position: relative;
    z-index: 0;
    height: 9vw;
    width: 21vw;
  }
  .clicker {
    // box-shadow: 0 0 1px 1px red;
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
      logo: {
        img: '/blob400.png',
        w: 400,
        h: 150,
        pad: 10,
        scaleX: 56,
        scaleY: 56
      },
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

    const blob = PIXI.Sprite.from(this.logo.img);
    container.addChild(blob);

    blob.x = this.logo.pad
    blob.y = this.logo.pad
    blob.width = this.logo.w
    blob.height = this.logo.h

    const displaceImg = '/displacement_map_repeat.jpg'
    const displacementSprite = PIXI.Sprite.from(displaceImg)

    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT

    const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite)

    displacementFilter.padding = this.logo.pad
    displacementSprite.position = blob.position

    app.stage.addChild(displacementSprite)

    blob.filters = [displacementFilter]

    displacementFilter.scale.x = this.logo.scaleX
    displacementFilter.scale.y = this.logo.scaleY

    app.ticker.add(() => {
        displacementSprite.x++
        if (displacementSprite.x > displacementSprite.width) {
          displacementSprite.x = 0
        }
    })

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
  },
}
</script>