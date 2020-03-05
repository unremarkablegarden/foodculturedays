// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api, options) {

  api.createPages(async ({ createPage, graphql }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/

    // INDEX
    createPage({
      path: `/en`,
      component: './src/pages/Index.vue',
      context: {
        lang: 'en-gb',
        altPath: '/fr/'
      }
    })
    createPage({
      path: `/fr`,
      component: './src/pages/Index.vue',
      context: {
        lang: 'fr-ch',
        altPath: '/en/'
      }
    })

    // NEWSLETTER
    createPage({
      path: `/en/newsletter`,
      component: './src/pages/Newsletter.vue',
      context: {
        lang: 'en-gb',
        altPath: '/fr/newsletter/'
      }
    })
    createPage({
      path: `/fr/newsletter`,
      component: './src/pages/Newsletter.vue',
      context: {
        lang: 'fr-ch',
        altPath: '/en/newsletter/'
      }
    })


    // ARCHIVE INDEX
    createPage({
      path: `/en/archive`,
      component: './src/pages/Archive.vue',
      context: {
        lang: 'en-gb',
        altPath: '/fr/archives',
        title: 'Archive'
      }
    })
    createPage({
      path: `/fr/archives`,
      component: './src/pages/Archive.vue',
      context: {
        lang: 'fr-ch',
        altPath: '/en/archive',
        title: 'Archives'
      }
    })


    const pagesQuery = await graphql(`{
      prismic {
        allPages {
          edges {
            node {
              title
              subtitle
              body
              image
              _meta {
                uid
                lang
                alternateLanguages {
                  uid
                  lang
                }
              }
            }
          }
        }
      }
    }`)

    const archivesQuery = await graphql(`{
      prismic {
        allArchives {
          edges {
            node {
              year
              artist
              country
              artist_body
              project
              project_body
              image
              _meta {
                uid
                lang
                alternateLanguages {
                  uid
                  lang
                }
              }
            }
          }
        }
      }
    }`)



    // CREATE THE PAGES
    if (pagesQuery.hasOwnProperty('data')) {
      pagesQuery.data.prismic.allPages.edges.forEach(({ node }) => {
        let lang, alt
        if (node._meta.lang == 'en-gb') { lang = 'en'; alt = 'fr'; }
        if (node._meta.lang == 'fr-ch') { lang = 'fr'; alt = 'en'; }
        const path = `/${lang}/${node._meta.uid}`
        const altPath = `/${alt}/${node._meta.alternateLanguages[0].uid}/`
        const skip = ['partners', 'partenaires']

        if (! skip.includes(node._meta.uid)) {
          createPage({
            path: path,
            component: './src/templates/Page.vue',
            context: {
              node: node,
              uid: node._meta.uid,
              lang: node._meta.lang,
              plainTitle: node.title[0].text,
              altPath: altPath
            }
          })
        }
      })
    }

    if (archivesQuery.hasOwnProperty('data')) {
      archivesQuery.data.prismic.allArchives.edges.forEach(({ node }) => {
        let lang, archive, alt
        if (node._meta.lang == 'en-gb') { lang = 'en'; archive = 'archive'; alt = 'fr'; }
        if (node._meta.lang == 'fr-ch') { lang = 'fr'; archive = 'archiver'; alt = 'en'; }

        const path = `/${lang}/${node.year}/${archive}/${node._meta.uid}`
        const altPath = `/${alt}/${node.year}/${archive}/${node._meta.alternateLanguages[0].uid}`

        createPage({
          path: path,
          component: './src/templates/Archive.vue',
          context: {
            node: node,
            uid: node._meta.uid,
            lang: node._meta.lang,
            year: node.year,
            plainTitle: node.artist[0].text,
            altPath: altPath
          }
        })
      })
    }


    // PARTNERS
    createPage({
      path: `/en/partners`,
      component: './src/pages/Partners.vue',
      context: {
        lang: 'en-gb',
        altPath: '/fr/partenaires',
        // title: 'Partners',
        // uid: 'partners',
        data: pagesQuery.data.prismic.allPages.edges.find(el => el.node._meta.uid == 'partners')
      }
    })
    createPage({
      path: `/fr/partenaires`,
      component: './src/pages/Partners.vue',
      context: {
        lang: 'fr-ch',
        altPath: '/en/partners',
        title: 'Partenaires',
        // uid: 'partenaires',
        data: pagesQuery.data.prismic.allPages.edges.find(el => el.node._meta.uid == 'partenaires')
      }
    })

  })
}
