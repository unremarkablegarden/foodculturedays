// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuex from 'vuex'
import { common } from 'prismic-vue/components'
import { animatedScrollTo } from 'es6-scroll-to'
import anime from 'animejs/lib/anime.min.js'
import DefaultLayout from '~/layouts/Default.vue'
import VueAnalytics from 'vue-analytics'
// import XBrowserUpdate from 'x-browser-update'


export default function (Vue, { router, head, isClient, appOptions }) {
  
  Vue.use(VueAnalytics, {
    id: 'UA-173657310-1'
  })
  // head.script.push({
  //   src: 'https://browser-update.org/update.min.js',
  //   body: true,
  //   test: true,
  // })
  // Vue.use(XBrowserUpdate)
  
  head.script.push({
    src: 'https://cdn.oribi.io/Xy0yMDc5ODMzNTMw/oribi.js',
    async: true,
    id: 'ORIBIscript'   
  })
  // <script async="" src="" id=""></script>
  
  let navLang = 'fr'
  if (process.isClient) {
    navLang = navigator.language || navigator.userLanguage
    navLang = navLang.toLowerCase()  
  }
  let lang = 'fr'
  if (navLang.includes('en')) lang = 'en'
  
  // console.log('MAINJS lang = ' + lang)
  
  Vue.use(Vuex)
  appOptions.store = new Vuex.Store({
    state: {
      lang: null,
      userLang: lang,
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
      },
      homepageGallery: null,
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
      },
      setHomepageGallery (state, val) {
        state.homepageGallery = val
      }
    },
    actions: {
      setLang ({commit}, val) {
        let lang
        if (val == 1) lang = 'fr'
        else lang = 'en'
        commit('setLang', lang)
      },
      setHomepageGallery ({commit}, val) {
        commit('setHomepageGallery', val)
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
      // let top = window.pageYOffset
      // animatedScrollTo({
      //     duration: top,
      //     to: 0
      // })
      // setTimeout(() => {
      //   console.log('pushing $nav from main.js...');
      //   router.push(to)
      // }, top);
      router.replace(to)
    }
  }

  Vue.prototype.$prismic = {
    linkResolver() {
      // console.log('linkResolver()')
    }
  }

  // require('~/main.css')

  Vue.component('Layout', DefaultLayout)

  Object.entries(common).forEach(([_, component]) => {
    Vue.component(component.name, component)
  })
}
