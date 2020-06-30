// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

// var path = require('path')
var slug = require('slug')


module.exports = function (api, options) {

  api.createPages(async ({ createPage, graphql }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/

    // NEWSLETTER
    // createPage({
    //   path: `/en/newsletter`,
    //   component: './src/pages/Newsletter.vue',
    //   context: {
    //     lang: 'en-gb',
    //     altPath: '/fr/newsletter/'
    //   }
    // })
    // createPage({
    //   path: `/fr/newsletter`,
    //   component: './src/pages/Newsletter.vue',
    //   context: {
    //     lang: 'fr-ch',
    //     altPath: '/en/newsletter/'
    //   }
    // })


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
    let allTags = {}
    let enTags = {}
    let frTags = {}
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
                  tags
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
        
        // POPULATE TAGS OBJECT
        let tagEntry
        if (node._meta.tags.length > 0) {
          
          node._meta.tags.forEach(tag => {
            tagEntry = {
              artist: node.artist,
              project: node.project,
              year: node.year,
              path: path,
              altPath: altPath,
              lang: lang,
              slug: slug(tag),
              image: node.image,
              plainTitle: node.artist[0].text,
              tags: node._meta.tags,
            }
            
            // if (!tags[tag]) {
            //   allTags[tag] = [tagEntry]
            // } else {
            //   allTags[tag] = [...allTags[tag], tagEntry]
            // }
            
            if (lang == 'fr') {
              if (!frTags[tag]) {
                frTags[tag] = [tagEntry]
              } else {
                frTags[tag] = [...frTags[tag], tagEntry]
              }
            }
            else {
              if (!enTags[tag]) {
                enTags[tag] = [tagEntry]
              } else {
                enTags[tag] = [...enTags[tag], tagEntry]
              }
            }
            
          })
        }
        
        console.log(path)
        
        createPage({
          path: path,
          component: './src/templates/ArchivePage.vue',
          context: {
            node: node,
            uid: node._meta.uid,
            lang: node._meta.lang,
            year: node.year,
            tags: node._meta.tags,
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
    
    // console.log('/////////////////////////////////////')
    let tagsCreated = []
    let langs = ['en', 'fr']
    
    langs.forEach(lang => {
      
      let tags
      if (lang == 'en') {
        tags = enTags
      } else {
        tags = frTags
      }
      
      Object.keys(tags).forEach(tag => {
        
          // let t = tags[tag]
          let tagSlug = slug(tag)
          let path, altPath
          
          if (lang == 'fr') {
            path = '/fr/archives/themes/' + tagSlug
          } else {
            path = '/en/archive/themes/' + tagSlug
          }
          
          console.log(path + ' (' +tags[tag].length+ ')')
          
          let title = tag.charAt(0).toUpperCase() + tag.slice(1)
          // let nodes = tags[tag]
          
        if (! tagsCreated.includes(path)) {
          
          createPage({
            path: path,
            component: './src/templates/ArchiveTag.vue',
            context: {
              // altPath: altPath,
              // path: path,
              // slug: tagSlug,
              title: title,
              node: tags[tag]
              // node: nodes.filter(el => el.lang == lang)
            }
          })
          
          tagsCreated.push(path)
        }
      })
      
    })
    
    // console.log('/////////////////////////////////////')
  
    // console.log(enTags)
    // console.log(frTags)
    createPage({
      path: `/en/tags`,
      component: './src/pages/Tags.vue',
      context: {
        title: 'Tags',
        lang: 'en',
        altPath: '/fr/tags',
        data: enTags
      }
    })
    createPage({
      path: `/fr/tags`,
      component: './src/pages/Tags.vue',
      context: {
        title: 'Tags',
        lang: 'fr',
        altPath: '/en/tags',
        data: frTags
      }
    })
    
    
    // ARCHIVE THEME INDICES
    // createPage({
    //   path: `/en/archive/themes`,
    //   component: './src/pages/ArchiveTags.vue',
    //   context: {
    //     lang: 'en-gb',
    //     altPath: '/fr/archives/themes',
    //     title: 'Themes',
    //     data: tags['en']
    //   }
    // })
    // createPage({
    //   path: `/fr/archives/themes`,
    //   component: './src/pages/ArchiveTags.vue',
    //   context: {
    //     lang: 'fr-ch',
    //     altPath: '/en/archive/themes',
    //     title: 'Thèmes',
    //     data: tags['fr']
    //   }
    // })





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
        title: 'Partners',
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