<template lang="pug">
  #splash
    .image
    #matter.words
      //- .word NATURE
      //- .word CULTURE
      //- .word SOCIETY
      //- .word ART
    .index.intro
      .text(v-if="lang == 'en'")
        //- | Foodculture days is a space for 
        //- em critical reflexion 
        //- | and a platform for 
        //- em knowledge exchange 
        //- | based in Vevey (Switzerland)
        
        //- | Foodculture days is an interdisciplinary 
        //- em platform 
        //- | for 
        //- em knowledge exchange 
        //- | based in Vevey (Switzerland)
        
        //- | foodculture days is a transdisciplinary 
        //- em knowledge-sharing platform 
        //- | based in Vevey (Switzerland)
        
        em foodculture days 
        | is a knowledge-sharing platform based in Vevey, Switzerland.
        


      .text(v-else)
        //- | Foodculture days est une 
        //- em plateforme 
        //- | interdisciplinaire 
        //- em d’échange de connaissances 
        //- | basée à Vevey (Suisse)
        
        //- | foodculture days est une 
        //- em plateforme 
        //- | transdisciplinaire 
        //- em de partage de connaissances 
        //- | basée à Vevey (Suisse)
        
        em foodculture days 
        | est une plateforme de partage de connaissances basée à Vevey, Suisse.

</template>

<script>
import Matter from 'matter-js'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      matterLoaded: false,
      render: null,
      winW: 0,
      winH: 0,
      // isMobile: true,
    }
  },
  computed: {
    // lang () {
    //   // return this.$store.state.lang
    //   if (!process.isClient) return
    //   return this.$context.lang
    // },
    ...mapGetters({
      lang: 'getLang'
    }),
    loaded () {
      // show menu after loaded is set in store by Logo.vue
      let loaded = this.$store.state.loaded
      if (loaded && !this.matterLoaded) {
        // setTimeout(() => {
        //   this.matterInit()
        // }, 1800)
      }
      return loaded
    }
  },
  watch: {
    loaded (loadedTrue) {
      if (loadedTrue && !this.matterLoaded) {
        this.matterInit()
      }
    },
    $route (to, from) {
      if (to.path !== '/fr/' && to.path !== '/en/') {
        if (this.matterLoaded) {
          this.matterControl('stop')
        }
      } else {
        setTimeout(() => {
          if (this.matterLoaded) {
            this.matterControl('run')    
          } else {
            this.matterInit()
          }          
        }, 500)
      }
    }
  },
  created () {
    if (!process.isClient) return
    window.addEventListener('resize', this.handleResize)
    this.setSize()
    // this.checkPath()
    // this.checkMobile()
  },
  destroyed () {
    if (!process.isClient) return
    window.removeEventListener('resize', this.handleResize)
  },
  mounted () {
    // console.log('Splash mounted')
    this.setSize()
  },
  methods: {
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
      // this.checkMobile()
    },
    // checkMobile () {
    //   if (this.winW >= 960) {
    //     this.isMobile = false
    //     this.splash = false
    //   } else {
    //     this.isMobile = true
    //     if (this.isHome) this.splash = true
    //   }
    // },
    matterControl (cmd) {
      if (!process.isClient) return
      if (this.winW >= 736) return
      
      var Render = Matter.Render
      if (cmd == 'run') {
        console.log('run matter');
        Render.run(this.render)  
      }
      if (cmd == 'stop') {
        console.log('stop matter');
        Render.stop(this.render) 
      }
    },
    matterInit () {
      if (!process.isClient) return
      if (this.winW >= 736) return
      // if (!isMobile)
      console.log('MATTER IT');
      
      var Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Common = Matter.Common,
          MouseConstraint = Matter.MouseConstraint,
          Mouse = Matter.Mouse,
          World = Matter.World,
          // Vertices = Matter.Vertices,
          // Svg = Matter.Svg,
          Bodies = Matter.Bodies
          
      var engine = Engine.create({
            enableSleeping: true
          })
          
      var world = engine.world
      world.gravity.y = 1.0;
        
      
      let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
      let winW = (iOS) ? screen.width : window.innerWidth
      // let winH = (iOS) ? screen.height : window.innerHeight
      let winH = (iOS) ? (screen.availHeight - 160) : (window.innerHeight * 0.76)
      
      let iPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream
      let aspect = window.screen.width / window.screen.height
      if (iPhone && aspect.toFixed(3) === "0.462") {
        // I'm an iPhone X or 11...
        winH -= 60
      }
      // console.log(navigator.userAgent);
      
          // winH -= 160
      // winH = winH * 0.76
      
      this.render = Render.create({
        element: this.$el.querySelector('#matter'),
        engine: engine,
        options: {
          width: winW,
          height: winH,
          // width: winW*2,
          // height: winH,
          pixelRatio: 2,
          // wireframes: true,
          wireframes: false,
          showSleeping: false,
          // showAngleIndicator: true,
          // showCollisions: true
        }
      })
      
      this.render.options.wireframeBackground = 'transparent'
      this.render.options.background = 'transparent'

      // padding
      let p = 10,
          p2 = p * 2
      winW = winW - p2
      winH = winH - p2
      
      var rest = 0.7,
      space = winW / 4,
      scale = 0.7,
      scale2 = 1
      
      // society
      // word1a= 214x40 = 
      // societe
      // word1b= 179x52 = 
      // art
      // word2 = 103x40 = 
      // culture
      // word3 = 224x40 = 
      // nature
      // word4 = 201x40 = 
      
      let 
          // r1a = { sprite: { texture: '/word1a.svg', xScale: 0.71*scale2, yScale: 0.71*scale2 } },
          // r1b = { sprite: { texture: '/word1b.svg', xScale: 0.73*scale2, yScale: 0.73*scale2 } },
          // r2 = { sprite: { texture: '/word2.svg', xScale: 0.34*scale2, yScale: 0.34*scale2 } },
          // r3 = { sprite: { texture: '/word3.svg', xScale: 0.74*scale2, yScale: 0.74*scale2 } },
          // r4 = { sprite: { texture: '/word4.svg', xScale: 0.67*scale2, yScale: 0.67*scale2 } },
          r1a = { sprite: { texture: '/word1a.svg', xScale: 0.7*scale2, yScale: 0.7*scale2 } },
          r1b = { sprite: { texture: '/word1b.svg', xScale: 0.7*scale2, yScale: 0.7*scale2 } },
           // art
          r2 = { sprite: { texture: '/word2.svg', xScale: 0.7*scale2, yScale: 0.7*scale2 } },
          // culture
          r3 = { sprite: { texture: '/word3.svg', xScale: 0.70*scale2, yScale: 0.70*scale2 } },
          // nature
          r4 = { sprite: { texture: '/word4.svg', xScale: 0.7*scale2, yScale: 0.7*scale2 } },
          Body1,
          start = Math.floor((Math.random() * 30) + 100) * -1
      
      if (this.lang == 'en') {
        Body1 = Bodies.rectangle(120 + space * 0, start-100, 232.27*scale, 41.29*scale, { 
          restitution: rest, 
          render: r1a 
        })
      } else {
        Body1 = Bodies.rectangle(120 + space * 0, start-100, 230.83*scale, 52.46*scale, { 
          restitution: rest, 
          render: r1b 
        })
      }
        
      let vis = false
      let t = 100
      let t2 = 50
      World.add(world, [
        // walls
        
        Bodies.rectangle(winW/2+p, winH+p+t2, winW, t, { isStatic: true, render: { visible: vis } }),
        Bodies.rectangle(0+p-t2, winH/2+p, t, winH, { isStatic: true, render: { visible: vis } }),
        Bodies.rectangle(winW+p+t2, winH/2+p, t, winH, { isStatic: true, render: { visible: vis } }),
        // Bodies.rectangle(winW/2+p, -100, winW, 1, { isStatic: true, render: { visible: vis } })
        
        Body1,

        Bodies.rectangle(100 + space * 1, start, 107.8*scale, 39.54*scale, { 
          restitution: rest, 
          render: r2, 
          angle: -Math.PI * 0.03 
        }),
        
        Bodies.rectangle(90 + space * 2, start+50, 242.83*scale, 41.29*scale, { 
          restitution: rest, 
          render: r3, 
          angle: -Math.PI * 0.1
        }),
      
        Bodies.rectangle(90 + space * 1, start+130, 213.33*scale, 40.41*scale, { 
          restitution: rest, 
          render: r4, 
          angle: -Math.PI * -0.1
        }),
      ]);
      
      // roof
      setTimeout(() => {
        World.add(world, [
          Bodies.rectangle(winW/2+p, -100, winW, 100, { isStatic: true, render: { visible: vis } })  
        ])
      }, 2500);
      
      var mouse = Mouse.create(this.render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.9,
          render: {
            visible: false
          }
        }
      });
      mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
      mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);
      World.add(world, mouseConstraint);
      this.render.mouse = mouse;
          
      
      Engine.run(engine);
      
      this.matterControl('run')
      
      this.matterLoaded = true
    }
  }
}
</script>

<style lang="scss" scoped>
#splash {
  display: none;
}
#matter {
  width: 100vw;
  // height: calc(100vh - 50px);
  // height: 95vh;
  position: fixed;
  top: 0;
  left: 0;
  // border: 3px red solid;
  z-index: 0;
  // background: rgba(255,255,0,0.1);
  overflow: hidden;
  mix-blend-mode: difference;
  // filter: invert(1);
}
.intro {
  display: none;
  margin-top: 0.3rem;
  // padding-top: 1rem;
  padding-left: 0.75rem;
  // padding-right: 0.75rem;
  font-size: 0.86rem;
  line-height: 1.2rem;
  em {
    font-size: 0.96rem;
  }
}
.words {
  color: white;
  // mix-blend-mode: difference;
  font-size: 2rem;
  line-height: 2rem;
}
/* @media (min-width: 960px) { */
@media (min-width: 737px) {
  .intro {
    display: none;
  }
}
</style>
