<template lang="pug">
  #app
    Loader
    .body
      Logo
      #buttons(v-bind:class="{ 'abs': animating }")
        Social#social
        //- (v-bind:class='{ moveoutleft: loading }').move
        Lang#lang
        //- (v-bind:class='{ moveoutright: loading }').move
      transition(:name='transitionName')
        router-view(class='child-view')
</template>

<static-query>
query {
  metadata {
    siteName
    siteDescription
  }
}
</static-query>

<script>
import Lang from '~/components/Lang.vue'
import Social from '~/components/Social.vue'
import Loader from '~/components/Loader.vue'
import Logo from '~/components/Logo.vue'
// import Pixi from '~/components/Pixi.vue'

export default {
  components: {
    Lang, Social, Loader, Logo
  },
  data () {
    return {
      animating: false,
      loading: true
    }
  },
  watch: {
    $route (to, from) {
      if (!process.isClient) return

      this.animating = true
      setTimeout(() => {
        this.animating = false
      }, 600)

      // console.log('watch router: ' + to.path);
      if (to.path == '/en/' && from.path !== '/fr/' || to.path == '/fr/' && from.path !== '/en/') {
        console.log('back home')
      }
    }
  },
  mounted () {
    if (!process.isClient) return

    const t = this
    const time = 1000
    // const time = 0

    // setTimeout(() => {
    // const menuItems = t.$el.querySelectorAll('.menu-item')
    // t.$anime({
    //   targets: menuItems,
    //   easing: 'easeOutSine',
    //   left: 0,
    //   delay: t.$anime.stagger(100)
    // });
    // }, time)

    setTimeout(() => {
      t.loading = false
    }, time+800)
    // t.loading = false
  },
  methods: {

  },
  computed: {
    transitionName () {
      return this.$store.state.transitionName
    }
  },
  metaInfo() {
    return {
      title: this.$static.metadata.siteName,
      meta: [
        {
          key: 'description',
          name: 'description',
          content: this.$static.metadata.siteDescription
        }
      ]
    }
  }
}
</script>

<style lang="scss">

// $green: #11ff36;
$green: rgb(17,230,54);
.green { color: $green; }

$headingSize: 2.2rem;

@media (max-width: 960px) {
  .desktop {
    display: none;
  }
}
@media (min-width: 960px) {
  .mobile {
    display: none;
  }
}

.layout {
  margin: 0 auto;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
}

h1 {
  text-transform: uppercase;
  color: $green;
  font-weight: normal;
  margin: 0 0 0.3rem 0;
  padding: 0;
  line-height: 1em;
  font-size: $headingSize;
}
.titleLike {
  text-transform: uppercase;
  color: $green;
  font-weight: normal;
  // margin: 0 0 0.3rem 0;
  padding: 0;
  line-height: 1em;
  font-size: $headingSize;
}

input {
  -webkit-appearance: none;
  -webkit-border-radius:0;
  border-radius:0;
}

#buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: fixed;
  // position: absolute;
  z-index: 888;
  bottom: 0;
  width: 100vw;
  left: 0;
  margin: 0;
  padding: 0.7rem 0.7rem 0.8rem 1.2rem;
  // border: 1px red solid;
  box-sizing: border-box;
  // padding: 1rem;
  background: white;
  box-sizing: border-box;
  // box-shadow: 0 0 30px white;
  // box-shadow: 0 -10px 20px 5px white;
}

textarea, select, input, button { outline: none; }

a {
  color: $green;
  text-decoration: none;
}

body {
  font-family: 'D', -apple-system,system-ui,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.275em;
  font-size: 18px;
  letter-spacing: -0.01rem;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.004);
  text-rendering: optimizeLegibility !important;
  -webkit-font-smoothing: antialiased !important;
}
.serif {
  font-family: 'CE', Times, serif;
}

i, em, label {
  font-family: 'CE', Times, serif;
  font-size: 1.285rem;
}


xmp {
  background: black;
  font-size: 12px;
  line-height: 1em;
  color: white;
}



.title {
  position: sticky;
  top: 0;
  background: white;
  padding: 1.7rem 0 0rem;
}
.title.unstick {
  position: relative;
}
.stick {
  top: 0;
  position: sticky;
}
.bg-white {
  background: white;
}

.subtitle {
  margin-top: 1rem;
  * {
    font-weight: normal;
    margin: 0 0 0.3rem 0;
    padding: 0;
  }
}

.content {
  p {
    margin-top: 0;
    margin-block-start: 0;
  }
  a {
    color: black;
  }
}
.page-wrapper {
  padding-bottom: 6rem;
}






.abs {
  position: absolute !important;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
  position: absolute;
  width: calc(100vw - 1.4rem)
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(100vw, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-100vw, 0);
}


@font-face {
    font-family: 'CE';
    src: url('./assets/ce-i.woff2') format('woff2'),
         url('./assets/ce-i.woff') format('woff');
    font-weight: 500;
    font-style: italic;
}

@font-face {
    font-family: 'D';
    src: url('./assets/d.woff2') format('woff2'),
         url('./assets/d.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'CE';
    src: url('./assets/ce.woff2') format('woff2'),
         url('./assets/ce.woff') format('woff');
    font-weight: bold;
    font-style: normal;
}

</style>