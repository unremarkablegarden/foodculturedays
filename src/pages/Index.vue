<template lang="pug">
  layout
    //- Splash
    //- Statement
    Menu(v-if='notSlashIndex && !isMobile')
</template>

<script>
import Menu from '~/components/Menu.vue'
import Splash from '~/components/Splash.vue'
// import Statement from '~/components/Statement.vue'

export default {
  components: {
    Menu, 
    Splash,
    // Statement
  },
  metaInfo: {
    title: function () {
      let title = 'Home'
      if (process.isClient) {
        if (location.pathname == '/fr/') {
          title = 'Accueil'
        }
      }
      return title
    }
  },
  data () {
    return {
      winH: 0,
      winW: 0,
      isMobile: true,
    }
  },
  destroyed () {
    if (!process.isClient) return
    // window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  },
  created () {
    if (!process.isClient) return
    // window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
    this.setSize()
    this.checkMobile()
    let c = this.$context.gallery
    if (c) {
      if ('node' in c) { c = c.node }
      if ('gallery' in c) { c = c.gallery }
      this.total = c.length
      this.gallery = c
    }
  },
  computed: {
    lang () {
      if (!process.isClient) return
      return this.$context.lang
    },
    notSlashIndex () {
      let path = this.$route.path
      if (path !== '/') {
        return true
      }
    }
  },
  methods: {
    handleResize (event) {
      this.setSize()
      this.checkMobile()
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
      if (this.winW >= 736) {
        this.isMobile = false
      } else {
        this.isMobile = true
      }
    },
    
  }
}
</script>
