// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuex from 'vuex'
import { common } from 'prismic-vue/components'
import { animatedScrollTo } from 'es6-scroll-to'
import anime from 'animejs/lib/anime.min.js'
import DefaultLayout from '~/layouts/Default.vue'
// import * as PIXI from 'pixi.js'

export default function (Vue, { router, head, isClient, appOptions }) {
  Vue.use(Vuex)

  // console.log(JSON.stringify(appOptions));


  appOptions.store = new Vuex.Store({
    state: {
      lang: 'en-gb',
      loaded: false,
      transitionName: 'slide-left',
      // urlMap: false,
      img: {
        blobMobile: 'https://images.prismic.io/foodculturedays2020/06c2d21b-3c2c-4630-981b-1fc92de9028d_blob-mobile.svg?auto=compress,format',
        logo: 'https://images.prismic.io/foodculturedays2020/e5f2d0ad-8f07-45b0-8c5a-6e480cf54d14_logo.svg?auto=compress,format',
        logoParts: [
          'https://images.prismic.io/foodculturedays2020/064e355d-d4aa-47c6-9c9d-56c9c53a5fc9_logo1.svg?auto=compress,format',
          // full logo
          // 'https://images.prismic.io/foodculturedays2020/e5f2d0ad-8f07-45b0-8c5a-6e480cf54d14_logo.svg?auto=compress,format',
          // old part with big width
          // 'https://images.prismic.io/foodculturedays2020/b8247d2f-d27c-4f2c-b51c-860e7a81b739_logo2.svg?auto=compress,format',
          'https://images.prismic.io/foodculturedays2020/4d8abd31-e023-4ded-a245-e728554fbe06_blob.svg?auto=compress,format',
          'https://images.prismic.io/foodculturedays2020/5ce3419c-a90f-4bda-b842-0a05ffcec96c_logo3.svg?auto=compress,format',
        ]
      }
    },
    mutations: {
      setLoaded (state, val) {
        // console.log('state: loaded: ' + val)
        state.loaded = val
      },
      setLang (state, val) {
        // console.log('store = ' + val)
        state.lang = val
      },
      setTransitionName (state, val) {
        // console.log('set transition name: ' + val);
        state.transitionName = val
      }
    }
  })

  router.beforeEach((to, from, next) => {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    const transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    appOptions.store.commit('setTransitionName', transitionName)
    next()
  })

  head.link.push({
    rel: 'stylesheet',
    href: 'https://cdn.lineicons.com/1.0.1/LineIcons.min.css'
  })

  Vue.prototype.$anime = anime

  // if (process.isClient) {
  //   Vue.prototype.$PIXI = PIXI
  // }

  Vue.prototype.$nav = (to) => {
    if (process.isClient) {
      let top = window.pageYOffset
      animatedScrollTo({
          duration: top,
          to: 0
      })
      setTimeout(() => {
        router.push(to)
      }, top);
    }
  }

  // Add attributes to HTML tag
  // var userLang = navigator.language || navigator.userLanguage;
  // head.htmlAttrs = { lang: userLang.toLowerCase() }

  Vue.prototype.$prismic = {
    linkResolver() {
      console.log('linkResolver()')
    }
  }

  Vue.component('Layout', DefaultLayout)

  Object.entries(common).forEach(([_, component]) => {
    Vue.component(component.name, component)
  })
}
