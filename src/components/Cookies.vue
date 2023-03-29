<template lang="pug">
#cookies
  transition(name='fade')
    .notice(v-if='show').fixed.bottom-0.right-0.z-50.bg-black.text-white.shadow-lg.text-xs.px-4.py-4.mx-4.my-4
      .col-8
        .en(v-if='lang === "en"')
          div This website uses cookies to ensure you get the best experience on our website.
          div.mt-2 By continuing to use this website, you agree to our use of cookies.
        .fr(v-else)
          div Ce site Web utilise des cookies pour vous garantir la meilleure expérience possible sur notre site.
          div.mt-2 En continuant à utiliser ce site Web, vous acceptez que nous utilisions des cookies.
      .col-4(style="margin-top: 1rem")
        button.btn(@click='accept')
          span(v-if='lang === "en"') I understand
          span(v-else) J'ai compris
        
        //- xmp lang {{  lang  }}
        
</template>


<script>
export default {
  data () {
    return {
      show: false,
      lang: null
    }
  },
  
  watch: {
    // watch route change
    $route (to, from) {
      this.lang = this.pathLang()
    }
    
  },
  created() {
    this.lang = this.pathLang()
  },
  mounted () {
    const accepted = localStorage.getItem('cookiesAccepted')
    // const accepted = false
    this.$nextTick(() => {
      setTimeout(() => {
        if (!accepted) this.show = true
      }, 3000);
    })
    // this.show = true
  },
  methods: {
    accept () {
      localStorage.setItem('cookiesAccepted', true)
      this.show = false
    },
    
    pathLang () {
      let path = window.location.pathname
      let pathLang = null
      if (path !== '/') {
        if (path == '/en' || path.includes('/en/')) {
          pathLang = 'en'
        } else if (path == '/fr' || path.includes('/fr/')) {
          pathLang = 'fr'
        }
      }
      return pathLang
    }
  }
}
</script>


<style lang="scss">
.notice {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1999;
  background-color: black;
  color: white;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
  font-size: 1rem;
  line-height: 1.5;
  padding: 1rem;
  margin: 1rem;
  width: calc(100% - 4rem);
  @media (min-width: 768px) {
    width: 24rem;
  }
}
.btn {
  padding: 3px 4px 2px;
  cursor: pointer;
  // text-transform: uppercase;
  font-weight: bold;
  color: black;
  background-color: white;
  border-color: black;
  &:hover {
    background-color: black;
    color: white;
    border: 2px solid white;
  }
  border: 2px solid white;
}
.mt-2 {
  margin-top: 0.5rem;
}
// fade transition vue
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}

</style>