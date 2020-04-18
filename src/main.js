// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuex from 'vuex'
import { common } from 'prismic-vue/components'
import { animatedScrollTo } from 'es6-scroll-to'
import anime from 'animejs/lib/anime.min.js'
import DefaultLayout from '~/layouts/Default.vue'


export default function (Vue, { router, head, isClient, appOptions }) {
  
  // head.script.push({
  //   src: 'https://browser-update.org/update.min.js',
  //   body: true
  // })
  
  let navLang = 'en'
  if (process.isClient) {
    navLang = navigator.language || navigator.userLanguage
    navLang = navLang.toLowerCase()  
  }
  let lang = 'en'
  if (navLang.includes('fr')) lang = 'fr'
  
  Vue.use(Vuex)
  appOptions.store = new Vuex.Store({
    state: {
      lang: lang,
      loaded: false,
      transitionName: 'slide-left',
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
        console.log('store = ' + val)
        state.lang = val
      },
      setTransitionName (state, val) {
        // console.log('set transition name: ' + val);
        state.transitionName = val
      }
    },
    actions: {
      setLang ({commit}, val) {
        let lang
        if (val == 1) lang = 'fr'
        else lang = 'en'
        commit('setLang', lang)
      }
    },
    getters: {
      getLang: state => state.lang
    }
  })

  router.beforeEach((to, from, next) => {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    let transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    if (from.path !== '/' && to.path == '/en/' || from.path !== '/' && to.path == '/fr/') { transitionName = 'slide-right' }

    appOptions.store.commit('setTransitionName', transitionName)
    next()
  })

  head.link.push({
    rel: 'stylesheet',
    href: 'https://cdn.lineicons.com/1.0.1/LineIcons.min.css'
  })

  // head.meta.push({
  //   key: 'og:description',
  //   name: 'og:description',
  //   content: `A multidisciplinary platform for knowledge exchange`,
  // })

  Vue.prototype.$anime = anime

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

  Vue.prototype.$prismic = {
    linkResolver() {
      console.log('linkResolver()')
    }
  }

  // require('~/main.css')

  Vue.component('Layout', DefaultLayout)

  Object.entries(common).forEach(([_, component]) => {
    Vue.component(component.name, component)
  })
}
