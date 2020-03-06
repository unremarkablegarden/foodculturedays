export default [
  {
    path: "/fr/test-fr/",
    component: () => import(/* webpackChunkName: "page--src--templates--page-vue" */ "/Users/euklides/Development/foodculturedays/fcd-gridsome/src/templates/Page.vue")
  },
  {
    path: "/en/test/",
    component: () => import(/* webpackChunkName: "page--src--templates--page-vue" */ "/Users/euklides/Development/foodculturedays/fcd-gridsome/src/templates/Page.vue")
  },
  {
    path: "/fr/partenaires/",
    component: () => import(/* webpackChunkName: "page--src--pages--partners-vue" */ "/Users/euklides/Development/foodculturedays/fcd-gridsome/src/pages/Partners.vue")
  },
  {
    path: "/en/partners/",
    component: () => import(/* webpackChunkName: "page--src--pages--partners-vue" */ "/Users/euklides/Development/foodculturedays/fcd-gridsome/src/pages/Partners.vue")
  },
  {
    path: "/fr/newsletter/",
    component: () => import(/* webpackChunkName: "page--src--pages--newsletter-vue" */ "/Users/euklides/Development/foodculturedays/fcd-gridsome/src/pages/Newsletter.vue")
  },
  {
    path: "/en/newsletter/",
    component: () => import(/* webpackChunkName: "page--src--pages--newsletter-vue" */ "/Users/euklides/Development/foodculturedays/fcd-gridsome/src/pages/Newsletter.vue")
  },
  {
    path: "/fr/medias/",
    component: () => import(/* webpackChunkName: "page--src--pages--media-vue" */ "/Users/euklides/Development/foodculturedays/fcd-gridsome/src/pages/Media.vue")
  },
  {
    path: "/en/media/",
    component: () => import(/* webpackChunkName: "page--src--pages--media-vue" */ "/Users/euklides/Development/foodculturedays/fcd-gridsome/src/pages/Media.vue")
  },
  {
    path: "/fr/contact/",
    component: () => import(/* webpackChunkName: "page--src--templates--page-vue" */ "/Users/euklides/Development/foodculturedays/fcd-gridsome/src/templates/Page.vue")
  },
  {
    path: "/fr/a-propos/",
    component: () => import(/* webpackChunkName: "page--src--templates--page-vue" */ "/Users/euklides/Development/foodculturedays/fcd-gridsome/src/templates/Page.vue")
  },
  {
    path: "/en/contact/",
    component: () => import(/* webpackChunkName: "page--src--templates--page-vue" */ "/Users/euklides/Development/foodculturedays/fcd-gridsome/src/templates/Page.vue")
  },
  {
    path: "/fr/archives/",
    component: () => import(/* webpackChunkName: "page--src--pages--archive-vue" */ "/Users/euklides/Development/foodculturedays/fcd-gridsome/src/pages/Archive.vue")
  },
  {
    path: "/en/about/",
    component: () => import(/* webpackChunkName: "page--src--templates--page-vue" */ "/Users/euklides/Development/foodculturedays/fcd-gridsome/src/templates/Page.vue")
  },
  {
    path: "/en/archive/",
    component: () => import(/* webpackChunkName: "page--src--pages--archive-vue" */ "/Users/euklides/Development/foodculturedays/fcd-gridsome/src/pages/Archive.vue")
  },
  {
    path: "/partners/",
    component: () => import(/* webpackChunkName: "page--src--pages--partners-vue" */ "/Users/euklides/Development/foodculturedays/fcd-gridsome/src/pages/Partners.vue")
  },
  {
    path: "/newsletter/",
    component: () => import(/* webpackChunkName: "page--src--pages--newsletter-vue" */ "/Users/euklides/Development/foodculturedays/fcd-gridsome/src/pages/Newsletter.vue")
  },
  {
    path: "/media/",
    component: () => import(/* webpackChunkName: "page--src--pages--media-vue" */ "/Users/euklides/Development/foodculturedays/fcd-gridsome/src/pages/Media.vue")
  },
  {
    path: "/fr/",
    component: () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/euklides/Development/foodculturedays/fcd-gridsome/src/pages/Index.vue")
  },
  {
    path: "/en/",
    component: () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/euklides/Development/foodculturedays/fcd-gridsome/src/pages/Index.vue")
  },
  {
    path: "/archive/",
    component: () => import(/* webpackChunkName: "page--src--pages--archive-vue" */ "/Users/euklides/Development/foodculturedays/fcd-gridsome/src/pages/Archive.vue")
  },
  {
    name: "404",
    path: "/404/",
    component: () => import(/* webpackChunkName: "page--src--pages--404-vue" */ "/Users/euklides/Development/foodculturedays/fcd-gridsome/src/pages/404.vue")
  },
  {
    name: "home",
    path: "/",
    component: () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/euklides/Development/foodculturedays/fcd-gridsome/src/pages/Index.vue")
  },
  {
    name: "*",
    path: "*",
    component: () => import(/* webpackChunkName: "page--src--pages--404-vue" */ "/Users/euklides/Development/foodculturedays/fcd-gridsome/src/pages/404.vue")
  }
]

