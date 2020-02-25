// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  })

  api.createPages(async ({ createPage, graphql }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/

    // INDEX
    createPage({
      path: `/fr`,
      component: './src/pages/Index.vue',
      context: {
        lang: 'fr-ch'
      }
    })
    createPage({
      path: `/en`,
      component: './src/pages/Index.vue',
      context: {
        lang: 'en-gb'
      }
    })

    // NEWSLETTER
    createPage({
      path: `/en/newsletter`,
      component: './src/pages/Newsletter.vue',
      context: {
        lang: 'en-gb'
      }
    })
    createPage({
      path: `/fr/newsletter`,
      component: './src/pages/Newsletter.vue',
      context: {
        lang: 'en-gb'
      }
    })

    const { data } = await graphql(`{
      prismic {
        allPages {
          edges {
            node {
              title
              body
              image
              _meta {
                uid
                lang
              }
            }
          }
        }
      }
    }`)

    data.prismic.allPages.edges.forEach(({ node }) => {
      let lang
      if (node._meta.lang == 'en-gb') { lang = 'en' }
      if (node._meta.lang == 'fr-ch') { lang = 'fr' }

      console.log(`/${lang}/${node._meta.uid}`)

      createPage({
        path: `/${lang}/${node._meta.uid}`,
        component: './src/templates/Page.vue',
        context: {
          node: node,
          uid: node._meta.uid,
          lang: node._meta.lang,
          plainTitle: node.title[0].text
        }
      })
    })

  })
}
