// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

// var path = require('path')

module.exports = function (api, options) {

  api.createPages(async ({ createPage, graphql }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/

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




    const mediasQuery = await graphql(`{
      prismic {
        allMedias {
          edges {
            node {
              year
              image
              links {
                title
                link
              }
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

    let archives = []
    let keepLoading = true
    let after = ''

    while (keepLoading) {
      let archivesQuery = await graphql(`{
        prismic {
          allArchives(after: "${after}") {
            pageInfo {
              hasNextPage
              endCursor
            }
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
              cursor
            }
          }
        }
      }`)

      let data = archivesQuery.data.prismic.allArchives

      data.edges.forEach(({ node }) => {
        let lang, archive, alt, altArchive
        if (node._meta.lang == 'en-gb') {
          lang = 'en'
          archive = 'archive'
          altArchive = 'archives'
          alt = 'fr'
        }
        if (node._meta.lang == 'fr-ch') {
          lang = 'fr';
          archive = 'archives'
          altArchive = 'archive'
          alt = 'en';
        }

        const path = `/${lang}/${archive}/${node.year}/${node._meta.uid}`
        let altPath
        if (node._meta.alternateLanguages.length > 0) {
          altPath = `/${alt}/${altArchive}/${node.year}/${node._meta.alternateLanguages[0].uid}`
        } else {
          altPath = ''
        }


        console.log(path);

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

        node['context'] = {
          uid: node._meta.uid,
          lang: node._meta.lang,
          year: node.year,
          plainTitle: node.artist[0].text,
          path: path,
          altPath: altPath
        }
      })

      // set next page to load in the loop
      after = data.pageInfo.endCursor

      // add to master archives array
      archives = archives.concat(data.edges)

      // while loop breaker
      if (! data.pageInfo.hasNextPage) {
        keepLoading = false
      }
    }




    // CREATE THE PAGES
    const pagesQuery = await graphql(`{
      prismic {
        allPages {
          edges {
            node {
              title
              subtitle
              body
              image
              gallery {
                item
              }
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
    if (pagesQuery.hasOwnProperty('data')) {
      pagesQuery.data.prismic.allPages.edges.forEach(({ node }) => {
        let lang, alt
        if (node._meta.lang == 'en-gb') { lang = 'en'; alt = 'fr'; }
        if (node._meta.lang == 'fr-ch') { lang = 'fr'; alt = 'en'; }
        const path = `/${lang}/${node._meta.uid}`
        let altPath

        const skip = ['partners', 'partenaires', 'homepage', 'archive', 'archives', 'media', 'medias']

        if (! skip.includes(node._meta.uid)) {
          if (node._meta.alternateLanguages.length > 0) {
            altPath = `/${alt}/${node._meta.alternateLanguages[0].uid}/`
          }
          createPage({
            path: path,
            component: './src/templates/Page.vue',
            context: {
              node: node,
              uid: node._meta.uid,
              lang: node._meta.lang,
              plainTitle: node.title[0].text,
              altPath: altPath,
              gallery: node.gallery
            }
          })
        }
      })
    }


    // INDEX
    createPage({
      path: `/`,
      component: './src/pages/Index.vue',
      context: {
        lang: 'en-gb',
        altPath: '/fr/',
        gallery:  pagesQuery.data.prismic.allPages.edges.find(el => el.node._meta.uid == 'homepage')
      }
    })
    createPage({
      path: `/en`,
      component: './src/pages/Index.vue',
      context: {
        lang: 'en-gb',
        altPath: '/fr/',
        gallery:  pagesQuery.data.prismic.allPages.edges.find(el => el.node._meta.uid == 'homepage')
      }
    })
    createPage({
      path: `/fr`,
      component: './src/pages/Index.vue',
      context: {
        lang: 'fr-ch',
        altPath: '/en/',
        gallery: pagesQuery.data.prismic.allPages.edges.find(el => el.node._meta.uid == 'homepage')
      }
    })


    // ARCHIVE INDEX
    createPage({
      path: `/en/archive`,
      component: './src/pages/Archive.vue',
      context: {
        lang: 'en-gb',
        altPath: '/fr/archives',
        title: 'Archive',
        data: archives.filter(el => el.node._meta.lang == 'en-gb')
      }
    })
    createPage({
      path: `/fr/archives`,
      component: './src/pages/Archive.vue',
      context: {
        lang: 'fr-ch',
        altPath: '/en/archive',
        title: 'Archives',
        data: archives.filter(el => el.node._meta.lang == 'fr-ch')
      }
    })


    // PARTNERS
    createPage({
      path: `/en/partners`,
      component: './src/pages/Partners.vue',
      context: {
        lang: 'en-gb',
        altPath: '/fr/partenaires',
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
        data: pagesQuery.data.prismic.allPages.edges.find(el => el.node._meta.uid == 'partenaires')
      }
    })


    let image = mediasQuery.data.prismic.allMedias.edges.find(el => el.node.image !== null)

    // MEDIA
    createPage({
      path: `/en/media`,
      component: './src/pages/Media.vue',
      context: {
        pageTitle: 'Media',
        lang: 'en-gb',
        altPath: '/fr/medias',
        data: mediasQuery.data.prismic.allMedias.edges.filter(el => el.node._meta.lang == 'en-gb'),
        image: image
      }
    })
    createPage({
      path: `/fr/medias`,
      component: './src/pages/Media.vue',
      context: {
        pageTitle: 'Médias',
        lang: 'fr-ch',
        altPath: '/en/media',
        data: mediasQuery.data.prismic.allMedias.edges.filter(el => el.node._meta.lang == 'fr-ch'),
        image: image
      }
    })

  })

}