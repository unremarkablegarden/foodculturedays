<template lang="pug">
  #app
    Loader(v-if='!$store.state.loaded')
    .body(v-else)
      Logo
      #buttons(v-bind:class="{ 'abs': animating }")
        Social
        Lang
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

export default {
  data () {
    return {
      animating: false
    }
  },
  watch: {
    $route (to, from) {
      this.animating = true
      setTimeout(() => {
        this.animating = false
      }, 600)
    }
  },
  computed: {
    transitionName () {
      return this.$store.state.transitionName
    }
  },
  components: {
    Lang, Social, Loader, Logo
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
.abs {
  position: absolute !important;
}
// .slide-left-enter-active,
// .slide-left-leave-active
// .slide-right-enter-active,
// .slide-right-leave-active {
//   transition-duration: 0.5s;
//   transition-property: height, opacity, transform;
//   transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
//   overflow: hidden;
//   position: absolute;
//   width: calc(100vw - 1.4rem);
// }
// .slide-left-enter {
//   translate: transformX(100vw);
// }
// .slide-left-enter-active {
//   translate: transformX(100vw);
// }
// .slide-left-leave-active {
//   translate: transformX(100vw);
// }

// .slide-right-enter {
//   translate: transformX(100vw);
// }
// .slide-right-leave-active {
//   translate: transformX(100vw);
// }

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

$green: #11ff36;

.green {
  color: $green;
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

.layout {
  // max-width: 760px;
  margin: 0 auto;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
}


h1, h2, h3, h4 {
  text-transform: uppercase;
  color: $green;
  font-weight: normal;
  margin: 0;
  padding: 0;
  line-height: 1em;
  font-size: 30px;
}

// .title {
//   margin-top: 4rem;
// }

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
  padding: 0.5rem 0.8rem 0.1rem;
  background: white;
  box-sizing: border-box;
  // box-shadow: 0 0 30px white;
  box-shadow: 0 -10px 20px 5px white;
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
  line-height: 1.5;
  font-size: 17.5px;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.004);
  text-rendering: optimizeLegibility !important;
  -webkit-font-smoothing: antialiased !important;
}
i, em {
  font-family: 'CE', Times, serif;
}

xmp {
  background: black;
  font-size: 12px;
  line-height: 1em;
  color: white;
}
</style>