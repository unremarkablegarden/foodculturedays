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
              title
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
                embed
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
                categories {
                  category {
                    ... on prismic_Category {
                      name
                      _meta {
                        uid
                      }
                    }
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
        
        
        
        let a = node.artist ? node.artist[0].text : ''
        let p = node.project ? node.project[0].text : ''
        
        let plainTitle = node.artist ? a : p
        
        
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
              // plainTitle: node.artist[0].text,
              plainTitle: plainTitle,
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
        
        // console.log(path)
        
        createPage({
          path: path,
          component: './src/templates/ArchivePage.vue',
          context: {
            node: node,
            uid: node._meta.uid,
            lang: node._meta.lang,
            year: node.year,
            tags: node._meta.tags,
            plainTitle: plainTitle,
            altPath: altPath
          }
        })

        node['context'] = {
          uid: node._meta.uid,
          lang: node._meta.lang,
          year: node.year,
          plainTitle: plainTitle,
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
          
          // console.log(path + ' (' +tags[tag].length+ ')')
          
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
      path: `/en/archive/themes`,
      component: './src/pages/ArchiveTags.vue',
      context: {
        title: 'Themes',
        lang: 'en',
        altPath: '/fr/archives/themes',
        data: enTags
      }
    })
    createPage({
      path: `/fr/archives/themes`,
      component: './src/pages/ArchiveTags.vue',
      context: {
        title: 'Themes',
        lang: 'fr',
        altPath: '/en/archive/themes',
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


    // NEWSLETTERS
    const newslettersQuery = await graphql(`{
      prismic {
        allNewsletterss {
          edges {
            node {
              max
              newsletters {
                title
                link
              }
              _meta {
                lang
              }
            }
          }
        }
      }
    }`)
    
    let newsletters = {}
    newsletters['fr'] = false
    newsletters['en'] = false
    newslettersQuery.data.prismic.allNewsletterss.edges.forEach(({ node }) => {
      if (node._meta.lang == 'fr-ch') {
        newsletters['fr'] = node
      } else {
        newsletters['en'] = node
      }      
    })
    
    // console.log(newsletters)


    // CREATE THE PAGES
    let pages = []
    let pagesQuery
    keepLoading = true
    after = ''
    
    while (keepLoading) {
      pagesQuery = await graphql(`{
        prismic {
          allPages(after: "${after}") {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                title
                subtitle
                body
                image
                gallery {
                  item
                }
                excerpt
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
      
      
      let pagesData = pagesQuery.data.prismic.allPages
      
      pagesData.edges.forEach(({ node }) => {
        let lang, alt
        if (node._meta.lang == 'en-gb') { lang = 'en'; alt = 'fr'; }
        if (node._meta.lang == 'fr-ch') { lang = 'fr'; alt = 'en'; }
        const path = `/${lang}/${node._meta.uid}`
        let altPath

        console.log('PAGE > ' + path)
        
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
              plainTitle: node.title && node.title.length && node.title[0].text ? node.title[0].text : 'no_plain_title',
              altPath: altPath,
              gallery: node.gallery,
              newsletters: newsletters[lang]
            }
          })
        }
      })
      
      // set next page to load in the loop
      after = pagesData.pageInfo.endCursor

      // add to master programs array
      pages = pages.concat(pagesData.edges)

      // while loop breaker
      if (! pagesData.pageInfo.hasNextPage) {
        keepLoading = false
      }
      
    }

    // pagesQuery = pages
    // console.log(pagesQuery)

    // INDEX
    createPage({
      path: `/`,
      component: './src/pages/Index.vue',
      context: {
        lang: 'en-gb',
        altPath: '/fr/',
        // gallery:  pagesQuery.data.prismic.allPages.edges.find(el => el.node._meta.uid == 'homepage')
        gallery:  pages.find(el => el.node._meta.uid == 'homepage')
      }
    })
    createPage({
      path: `/en`,
      component: './src/pages/Index.vue',
      context: {
        lang: 'en-gb',
        altPath: '/fr/',
        // gallery:  pagesQuery.data.prismic.allPages.edges.find(el => el.node._meta.uid == 'homepage')
        gallery:  pages.find(el => el.node._meta.uid == 'homepage')
      }
    })
    createPage({
      path: `/fr`,
      component: './src/pages/Index.vue',
      context: {
        lang: 'fr-ch',
        altPath: '/en/',
        gallery: pages.find(el => el.node._meta.uid == 'homepage')
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
        // data: pagesQuery.data.prismic.allPages.edges.find(el => el.node._meta.uid == 'partners')
        data: pages.find(el => el.node._meta.uid == 'partners')
      }
    })
    createPage({
      path: `/fr/partenaires`,
      component: './src/pages/Partners.vue',
      context: {
        lang: 'fr-ch',
        altPath: '/en/partners',
        title: 'Partenaires',
        // data: pagesQuery.data.prismic.allPages.edges.find(el => el.node._meta.uid == 'partenaires')
        data: pages.find(el => el.node._meta.uid == 'partenaires')
      }
    })


    // let image = mediasQuery.data.prismic.allMedias.edges.find(el => el.node.image !== null)
    let images = mediasQuery.data.prismic.allMedias.edges.filter(el => el.node.image !== null)

    // MEDIA
    createPage({
      path: `/en/media`,
      component: './src/pages/Media.vue',
      context: {
        pageTitle: 'Media',
        lang: 'en-gb',
        altPath: '/fr/medias',
        data: mediasQuery.data.prismic.allMedias.edges.filter(el => el.node._meta.lang == 'en-gb'),
        // image: image
        images: images
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
        // image: image
        images: images
      }
    })
    
    
    // LEGAL
    createPage({
      path: `/en/legal`,
      component: './src/pages/Legal.vue',
      context: {
        lang: 'en-gb',
        altPath: '/fr/legales',
        title: 'Legal',
        // data: pagesQuery.data.prismic.allPages.edges.find(el => el.node._meta.uid == 'partners')
        data: pages.find(el => el.node._meta.uid == 'legal')
      }
    })
    createPage({
      path: `/fr/legales`,
      component: './src/pages/Legal.vue',
      context: {
        lang: 'fr-ch',
        altPath: '/en/legal',
        title: 'Mentions Légales',
        // data: pagesQuery.data.prismic.allPages.edges.find(el => el.node._meta.uid == 'partenaires')
        data: pages.find(el => el.node._meta.uid == 'legales')
      }
    })

    
    ////////////////////////////////////
    
    
    
    let programs = []
    allProgramTags = {}
    enProgramTags = {}
    frProgramTags = {}
    keepLoading = true
    after = ''

    while (keepLoading) {
      let programsQuery = await graphql(`{
        prismic {
          allPrograms(after: "${after}") {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                categories {
                  category {
                    ... on prismic_Category {
                      name
                      _meta {
                        uid
                      }
                    }
                  }
                }
                year
                country
                artist
                artist_body
                project
                project_body
                date_time
                manual_date_time
                extra_days {
                  extra_day
                }
                location {
                  ... on prismic_Location {
                    location
                    short_name
                    _meta {
                      uid
                    }
                  }
                }
                image
                gallery {
                  gallery_image
                }
                price
                participants
                duration
                duration_richtext
                activation
                language
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

      // console.log(programsQuery);
      let data = programsQuery.data.prismic.allPrograms

      data.edges.forEach(({ node }) => {
        let lang, program, alt, altProgram
        if (node._meta.lang == 'en-gb') {
          lang = 'en'
          program = 'program'
          altProgram = 'programme'
          alt = 'fr'
        }
        if (node._meta.lang == 'fr-ch') {
          lang = 'fr';
          program = 'programme'
          altProgram = 'program'
          alt = 'en';
        }
        
        const path = `/${lang}/${program}/${node.year}/${node._meta.uid}`
        let altPath
        if (node._meta.alternateLanguages.length > 0) {
          altPath = `/${alt}/${altProgram}/${node.year}/${node._meta.alternateLanguages[0].uid}`
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
              // plainTitle: node.artist[0].text,
              tags: node._meta.tags,
            }
            
            // if (!tags[tag]) {
            //   allProgramTags[tag] = [tagEntry]
            // } else {
            //   allProgramTags[tag] = [...allProgramTags[tag], tagEntry]
            // }
            
            if (lang == 'fr') {
              if (!frProgramTags[tag]) {
                frProgramTags[tag] = [tagEntry]
              } else {
                frProgramTags[tag] = [...frProgramTags[tag], tagEntry]
              }
            }
            else {
              if (!enProgramTags[tag]) {
                enProgramTags[tag] = [tagEntry]
              } else {
                enProgramTags[tag] = [...enProgramTags[tag], tagEntry]
              }
            }
            
          })
        }
        
        // console.log(path)
        
        createPage({
          path: path,
          component: './src/templates/ProgramPage.vue',
          context: {
            node: node,
            uid: node._meta.uid,
            lang: node._meta.lang,
            year: node.year,
            tags: node._meta.tags,
            // plainTitle: node.artist[0].text,
            altPath: altPath
          }
        })

        node['context'] = {
          uid: node._meta.uid,
          lang: node._meta.lang,
          year: node.year,
          // plainTitle: node.artist[0].text,
          path: path,
          altPath: altPath
        }
      })

      // set next page to load in the loop
      after = data.pageInfo.endCursor

      // add to master programs array
      programs = programs.concat(data.edges)

      // while loop breaker
      if (! data.pageInfo.hasNextPage) {
        keepLoading = false
      }
    }
    
    // PROGRAM INDICES
    // createPage({
    //   path: `/en/program`,
    //   component: './src/pages/Program.vue',
    //   context: {
    //     lang: 'en-gb',
    //     altPath: '/fr/programme',
    //     title: 'Program',
    //     data: programs.filter(el => el.node._meta.lang == 'en-gb')
    //   }
    // })
    // createPage({
    //   path: `/fr/programme`,
    //   component: './src/pages/Program.vue',
    //   context: {
    //     lang: 'fr-ch',
    //     altPath: '/en/program',
    //     title: 'Programme',
    //     data: programs.filter(el => el.node._meta.lang == 'fr-ch')
    //   }
    // })
    
    //////////////////// program tags////////////////////
    
    tagsCreated = []
    langs = ['en', 'fr']
    
    langs.forEach(lang => {
      
      let tags
      if (lang == 'en') {
        tags = enProgramTags
      } else {
        tags = frProgramTags
      }
      
      Object.keys(tags).forEach(tag => {
        
          // let t = tags[tag]
          let tagSlug = slug(tag)
          let path, altPath
          
          if (lang == 'fr') {
            path = '/fr/programme/themes/' + tagSlug
          } else {
            path = '/en/program/themes/' + tagSlug
          }
          
          // console.log(path + ' (' +tags[tag].length+ ')')
          
          let title = tag.charAt(0).toUpperCase() + tag.slice(1)
          // let nodes = tags[tag]
          
        if (! tagsCreated.includes(path)) {
          
          createPage({
            path: path,
            component: './src/templates/ProgramTag.vue',
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
    
    createPage({
      path: `/en/program`,
      component: './src/templates/ProgramTags.vue',
      context: {
        title: 'Program',
        lang: 'en',
        altPath: '/fr/programme',
        dataTags: enProgramTags,
        program: programs.filter(el => el.node._meta.lang == 'en-gb')
        
      }
    })
    createPage({
      path: `/fr/programme`,
      component: './src/templates/ProgramTags.vue',
      context: {
        title: 'Programme',
        lang: 'fr',
        altPath: '/en/program',
        dataTags: frProgramTags,
        program: programs.filter(el => el.node._meta.lang == 'fr-ch')
      }
    })
    
    createPage({
      path: `/chapter2`,
      component: './src/templates/CustomPage.vue',
      context: {
        node: {
          title: 'Coming Soon',
          content: ''
        },
        uid: 'chapter2',
        lang: 'en',
        plainTitle: 'Coming Soon',
        altPath: '/chapter2',
      }
    })
    
    
    
    createPage({
      path: `/sobremesa`,
      component: './src/templates/Redirect.vue',
      context: {
        node: {
          title: 'Sombresa',
          link: 'https://foodculturedays.com/fr/programme/2023/sobremesa-exhibition'
        },
        uid: 'sombresa',
        lang: 'fr',
        plainTitle: 'Sombresa',
        altPath: '/en/sobremesa',
      }
    })
    createPage({
      path: `/en/sobremesa`,
      component: './src/templates/Redirect.vue',
      context: {
        node: {
          title: 'Sombresa',
          link: 'https://foodculturedays.com/en/program/2023/sobremesa-exhibition/'
        },
        uid: 'en-sombresa',
        lang: 'en',
        plainTitle: 'Sombresa',
        altPath: '/sobremesa',
      }
    })
    
    
    
    
    
    
  })

}