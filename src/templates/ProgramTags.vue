<template lang="pug">
layout
  //- program overview page
  .mobile
    .filters
      .toggle(@click='toggleFilter("dates")', :class='{ "is-active": (mobileCurrentFilter == "dates") }') Dates
      .toggle(@click='toggleFilter("locations")', :class='{ "is-active": (mobileCurrentFilter == "locations") }', v-if='locations.length') {{ locationsTitle }}
      .toggle(@click='toggleFilter("artists")', :class='{ "is-active": (mobileCurrentFilter == "artists") }') {{ artistsTitle }}
      .toggle(@click='toggleFilter("categories")', :class='{ "is-active": (mobileCurrentFilter == "categories") }') {{ activitiesTitle }}
      .toggle(@click='toggleFilter("tags")', :class='{ "is-active": (mobileCurrentFilter == "tags") }') {{ themesTitle }}
      .togglex(@click='clearFilters') 
        span(v-if='anyFiltersAreSet') X
        span(v-else).white X
    .about
      .icon
        span(style="display: inline-block; padding-right: 3px;") &rarr;
        span(v-if="lang == 'en'") 
          a(href='/en/biennale') About the Biennale
        span(v-else)
          a(href='/fr/biennale') À propos de la Biennale
    
  .columns.tags-page.scroll

    .column.is-6.left.my-filters
      .inner
        //- .flex-wrapper
        
          
        
        .filter-section(style='margin: 0.5rem 0 1rem;')
          //- .icon
            img(src='/doc.png')
            a(href='/programme.pdf', target='_blank')
              span(v-if="lang == 'en'") Download full program
              span(v-else) Télécharger le programme complet
            span.small (PDF)    
          .icon
            span(style="display: inline-block; padding-right: 3px;") &rarr;
            span(v-if="lang == 'en'") 
              a(href='/en/biennale') About the Biennale
            span(v-else)
              a(href='/fr/biennale') À propos de la Biennale
            //- span.small (PDF)    
            
        
        .flex.filter-section(data-filter='locations', :class='{ "is-active": (mobileCurrentFilter == "locations") }', v-if='locations.length')
          h2.tagtitle {{ locationsTitle }}
          .locations
            //- .location.is-active RADIO-40
            //- .location.disabled(v-for='loc in locations', :key='loc') {{ loc }}
            .location(v-for='loc in locations', :key='loc', @click='locationToggle(loc)', v-bind:class='toggledLocation(loc)') {{ loc }}
          
          .close-filter.tags
            .tag(@click='toggleFilter("close")')
              span(v-if="lang == 'en'") close
              span(v-else) fermer

        .filter-section(data-filter='dates', :class='{ "is-active": (mobileCurrentFilter == "dates") }')
              
          h2.tagtitle Dates
          .dates2.tags
            .date2.tag(v-for='date in dates', @click='dateToggle(date)', v-bind:class='toggledDate(date)')  {{ date }}
            //- .date.disabled(v-for='date in dates')  {{ date }}
          //- .icon
            img(src='/doc.png')
            a(href='/menu.pdf', target='_blank') Menus à emporter 
            span.small (PDF)
          //- .icon
          //-   img(src='/doc.png', target='_blank')
          //-   a(href='/programme.pdf')
          //-     span(v-if="lang == 'en'") Program
          //-     span(v-else) Programme 
          //-   span.small (PDF)
            
          
          .close-filter.tags
            .tag(@click='toggleFilter("close")')
              span(v-if="lang == 'en'") close
              span(v-else) fermer


        .filter-section(data-filter='categories', :class='{ "is-active": (mobileCurrentFilter == "categories") }')
          h2.tagtitle {{ activitiesTitle }}
          .categories.tags
            .category(v-for='cat in categories', :key='cat', v-bind:class='toggledCat(cat)', @click='catToggle(cat)').tag
              span {{ cat }}
          .close-filter.tags
            .tag(@click='toggleFilter("close")')
              span(v-if="lang == 'en'") close
              span(v-else) fermer
        
        .filter-section(data-filter='artists', :class='{ "is-active": (mobileCurrentFilter == "artists") }')
          h2.tagtitle {{ artistsTitle }}
          .artists.tags
            .artist(v-for='artist in artists', :key='artist', v-bind:class='toggledArtist(artist)', @click='artistToggle(artist)').tag
              span {{ artist }}
              //- span {{ stripCountry(artist) }}
          .close-filter.tags
            .tag(@click='toggleFilter("close")')
              span(v-if="lang == 'en'") close
              span(v-else) fermer
        
        .filter-section(data-filter='tags', :class='{ "is-active": (mobileCurrentFilter == "tags") }')
          h2.tagtitle {{ themesTitle }}
          .tags
            .tag(
                v-for='(tag, i) in tags', 
                @click='tagToggle(tag)'
                v-bind:class='toggledTag(tag)'
              )
              .name {{ tag }}
          .close-filter.tags
            .tag(@click='toggleFilter("close")')
              span(v-if="lang == 'en'") close
              span(v-else) fermer
              
      
      .clear-filter.tags(v-if='anyFiltersAreSet')
        .tag(@click='clearFilters') {{ resetLabel }}
        br
        br
        br

  
    .column.is-6.right.posts-col
      //- .wallpaper(v-if='!anyFiltersAreSet')
      //- .inner(v-else-if='anyFiltersAreSet && !moving')
      .inner(v-if='!moving')
        .icons-mobile
          //- .icon
            img(src='/doc.png')
            a(href='/menu.pdf', target='_blank') Menus à emporter 
            span.small (PDF)
          //- .icon
            img(src='/doc.png', target='_blank')
            a(href='/programme.pdf')
              span(v-if="lang == 'en'") Program
              span(v-else) Programme 
            span.small (PDF)
            
        .links(v-if='program.length')
          //- .link.about(@click='$router.push("/en/biennale")', v-if="lang == 'en' && !anyFiltersAreSet")
            .image(style='background-image: url(https://images.prismic.io/foodculturedays2020/dbd163b0-c536-4394-ac85-003f4dd36652_background.jpg?fit=max&h=1600&w=1200&auto=compress,format=auto)')
            h2
              em About the Biennale
              div foodculture days
          //- .link.about(@click='$router.push("/fr/biennale")', v-else-if="lang == 'fr' && !anyFiltersAreSet")
            .image(style='background-image: url(https://images.prismic.io/foodculturedays2020/dbd163b0-c536-4394-ac85-003f4dd36652_background.jpg?fit=max&h=1600&w=1200&auto=compress,format=auto)')
            h2
              em À propos de la Biennale
              div foodculture days
          
            
          .link(v-for='(p, i) in filteredProgram', @click='programRoute(p.node._meta.uid)', :key='i')
            
            .image(v-if='p.node.image', :style='"background-image: url("+resizeImage(p.node.image.url)+")"')
            
            h2
              em(v-if='p.node.project') {{ ucfirst(p.node.project[0].text) }}
              div(v-if='p.node.artist') {{ ucfirst(p.node.artist[0].text) }}
              
            //- .tags {{ p.node._meta.tags }}
            //- .tags.small
              div(v-if='p.node.location')
                .small {{ p.node.location.short_name }}
              div
                //- .small Activities
                .tag(v-for='(cat) in p.node.categories', v-bind:class='toggledCat(cat.category.name)')
                  .name {{ cat.category.name }}
              div
                //- .small Themes
                .tag(v-for='(tag) in p.node._meta.tags', v-bind:class='toggledTag(tag)')
                  .name {{ ucfirst(tag) }}

  
  .preload.is-hidden
    img(src='https://prismic-io.s3.amazonaws.com/foodculturedays2020/f5ad4715-275e-4423-a617-7036a66d82c1_Asset+4.svg')
    img(src='https://prismic-io.s3.amazonaws.com/foodculturedays2020/2b2b5e66-db76-474a-80f8-1369f060d844_Asset+3.svg')
</template>

<script>
import {format} from 'date-fns'
import frLocale from 'date-fns/locale/fr-CH'
import { parse } from "date-fns"

export default {
  metaInfo() {
    const img = 'https://images.prismic.io/foodculturedays2020/dbd163b0-c536-4394-ac85-003f4dd36652_background.jpg?fit=crop&h=675&w=1200&auto=compress,format=auto'
    return {
      title: this.$context.title,
      meta: [
        {
          property: 'og:image',
          content: img
        },
        {
          property: 'twitter:card',
          content: 'summary_large_image'
        }
      ]
    }
  },
  data () {
    return {
      year: 2023,
      moving: false,
      toggledTags: [],
      toggledCats: [],
      toggledLocations: [],
      toggledDates: [],
      toggledArtists: [],
      mobileCurrentFilter: null
    }
  },
  computed: {
    anyFiltersAreSet () {
      if (this.toggledTags.length || this.toggledCats.length || this.toggledLocations.length || this.toggledDates.length || this.toggledArtists.length) return true
    },
    resetLabel () {
      if (this.lang == 'fr') return 'Réinitialiser les filtres'
      else return "Reset filters"
    },
    locationsTitle () {
      if (this.lang == 'en') return 'Locations'
      else return 'Lieux'
    },
    activitiesTitle () {
      if (this.lang == 'en') return 'Activities'
      else return 'Activités'
    },
    themesTitle () {
      if (this.lang == 'en') return 'Themes'
      else return 'Themes'
    },
    artistsTitle () {
      if (this.lang == 'en') return 'Artists'
      else return 'Artistes'
    },
    dates () {
      let sel = []
      this.program.forEach(x => {
        if (x.node.date_time) {
          // console.log(x.node.date_time);
          // console.log(this.formatDate(x.node.date_time));
          // sel.push(this.formatDate(x.node.date_time))
          sel.push(x.node.date_time)
        }
        if (x.node.extra_days) {
          x.node.extra_days.forEach(x2 => {
            if (x2.extra_day) {
              sel.push(x2.extra_day)
            }
          })
        }
      })
      
      let added = []
      let filtered = []
      sel.forEach(cat => {
        if (! added.includes(cat) ) {
          added.push(cat)
          filtered.push(cat)
        }
      })
      
      filtered = filtered.sort()
      
      let formatted = []
      filtered.forEach(x => {
        let f = this.formatDate(x)
        if (! formatted.includes(f) ) {
          formatted.push(f)
        }
      })
      
      return formatted
    },
    
    locations () {
      let sel = []
      this.program.forEach(x => {
        let c = x.node
        if (c && c.location) {
          let name
          if (c.location.short_name) {
            name = c.location.short_name  
          } else {
            name = c.location[0].text.split(',').slice(0)[0]
          }  
          sel.push(name)  
        }
      })
      
      let added = []
      let filtered = []
      sel.forEach(cat => {
        if (! added.includes(cat) ) {
          added.push(cat)
          filtered.push(cat)
        }
      })
      
      return filtered.sort()
    },
    
    // artists () {
    //   let sel = []
    //   this.program.forEach(x => {
    //     let c = x.node
    //     if (c && c.artist && c.artist.length) {
    //       let name
    //       if (c.artist[0] && c.artist[0].text) {
    //         name = c.artist[0].text
    //         sel.push(name)  
    //       }
    //     }
    //   })
      
    //   let added = []
    //   let filtered = []
    //   sel.forEach(cat => {
    //     if (! added.includes(cat) ) {
    //       added.push(cat)
    //       filtered.push(cat)
    //     }
    //   })
      
    //   return filtered.sort()
    // },
    
    artists () {
      let artists = []
      this.filteredProgram.forEach(x => {
        let c = x.node.artist
        
        if (c && c.length) { 
          c.forEach(y => {
            if (y.text) {
              let z = this.stripCountry(y.text)
              // artists.push(z)
              if (z.includes('/')) {
                z.split('/').forEach(a => {
                  artists.push(a.trim())
                })
              } else {
                artists.push(z.trim())
              }
              
              // const z = y.text.split('/')
              // remove spaces at the start and end
              // z.forEach(a => {
              //   artists.push(a.trim())
              // })
              
              // old
              // artists.push(y.text)
            }
          })
        }
      })
      
      let added = []
      let artistsFiltered = []
      artists.forEach(artist => {
        if (! added.includes(artist) ) {
          added.push(artist)
          artistsFiltered.push(artist)
        }
      })
      
      return artistsFiltered.sort()
    },
    
    categories () {
      let cats = []
      this.filteredProgram.forEach(x => {
      // this.program.forEach(x => {
        let c = x.node.categories
        c.forEach(y => {
          if (y.category && y.category.name) cats.push(y.category.name)
        })
        
      })
      
      let added = []
      let catsFiltered = []
      cats.forEach(cat => {
        if (! added.includes(cat) ) {
          added.push(cat)
          catsFiltered.push(cat)
        }
      })
      
      return catsFiltered.sort()
    },
    tags () {
      let excluded = [
        'réservation conseillée', 'booking recommended', 'free entry', 'entrée libre', 'paid', 'payant', 'booking needed', 'réservation nécessaire'
      ]
      let tags = []
      
      this.filteredProgram.forEach(x => {
        // this.program.forEach(x => {
        let t = x.node._meta.tags
        t.forEach(y => {
          if (!excluded.includes(y.toLowerCase())) {
            tags.push(y)
          }
        })
      })
      
      let added = []
      let filtered = []
      tags.forEach(cat => {
        if (! added.includes(cat) ) {
          added.push(cat)
          filtered.push(cat)
        }
      })
      
      return filtered.sort()
    },
    dataTags () {
      return this.$context.dataTags
    },
    program () {
      let p = this.$context.program
      // console.log('program');
      
      // p.forEach(p => {
      //   let year = p.node.year
      //   console.log(year);
      // })
      // filter out all posts where p.node.year is not equal to this.year
      
      // get the hash of the current URL
      if (process.isClient) {
        let hash = window.location.hash
        if (hash) {
          let hashSplit = hash.split('#')
          if (hashSplit.length > 1) {
            let hashYear = hashSplit[1]
            if (hashYear) {
              this.year = parseInt(hashYear)
              console.log('year from hash: ' + this.year)
            }
          }
        }
      }
      
      p = p.filter(p => {
        return p.node.year == this.year
      })
            
      return p
    },
    lang () {
      return this.$context.lang
    },
    selectMsg () {
      if (this.lang == 'fr') return 'Sélectionner des balises'
      else return 'Select tags'
    },
    
    
    filteredProgram () {
      let program = this.program
      
      // locations
      if (this.toggledLocations.length) {
        program = program.filter(p => {
          if (p.node.location) {
            return this.toggledLocations.includes(p.node.location.short_name)  
          }
        })
      }
      
      // dates
      if (this.toggledDates.length) {
        program = program.filter(p => {
          if (p.node.date_time) {
            let dates = []
            dates.push(this.formatDate(p.node.date_time))
            if (p.node.extra_days) {
              p.node.extra_days.forEach(d => {
                dates.push(this.formatDate(d.extra_day))
              })
            }
            let found = false
            dates.forEach(d => {
              if (this.toggledDates.includes(d)) {
                found = true
              }
            })
            return found
          }
          // if (p.node.extra_days)
        })
      }
      
      
      // artists
      if (this.toggledArtists.length) {
        program = program.filter(p => {
          // console.log(p.node.artist)
          if (p.node.artist && p.node.artist.length) {
            // OLD: return this.toggledArtists.includes(p.node.artist[0].text)
            // NEW: if one of the names in this.toggledArtists can be found in the string p.node.artist[0].text, return true
            let found = false
            p.node.artist.forEach(a => {
              if (a.text) {
                this.toggledArtists.forEach(t => {
                  if (a.text.includes(t)) {
                    found = true
                  }
                })
              }
            })
            return found
          }
          // if (p.node.artist && p.node.artist.length) {
            
          //   // p.node.artist.forEach(a => {
          //   //   if (this.toggledArtists.includes(a.text)) {
          //   //     return true
          //   //   }
          //   // })
          // }
        })
      }
      
      // categories
      if (this.toggledCats.length) {
        program = program.filter(p => {
          // let found = false
          // if (p.node.categories.length) {
          //   p.node.categories.forEach(c => {
          //     if (this.toggledCats.includes(c.category.name)) {
          //       found = true
          //     }
          //   })
          // }
          // return found
          
          
          let pCats = []
          p.node.categories.forEach(c => {
            if (c.category && c.category.name) {
              pCats.push(c.category.name)  
            }
          })
          
          return this.toggledCats.every(x => pCats.includes(x))
          
          // const a = JSON.stringify(this.toggledCats.sort()).slice(1,-1)
          // const b = JSON.stringify(pCats.sort()).slice(1,-1)
          // if (b.includes(a)) console.log(a + ' = ' +b);
          // return b.includes(a)
        })
      }
      
      // tags
      if (this.toggledTags.length) {
        program = program.filter(p => {
          // let found = false
          // if (p.node._meta.tags.length) {
          //   p.node._meta.tags.forEach(t => {
          //     if (this.toggledTags.includes(t)) {
          //       found = true
          //     }
          //   })
          // }
          // return found
          
          let pTags = []
          p.node._meta.tags.forEach(t => pTags.push(t))
          
          return this.toggledTags.every(x => pTags.includes(x))
          // console.log(pTags);
          // const a = JSON.stringify(this.toggledTags.sort()).slice(1,-1)
          // const b = JSON.stringify(pTags.sort()).slice(1,-1)
          // if (b.includes(a)) console.log(a + ' = ' +b);
          // return b.includes(a)
        })
      }
      
      // sort program by: el.node.project[0].text
      program = program.sort((a,b) => {
        let aTitle = a.node.project[0].text
        let bTitle = b.node.project[0].text
        if (aTitle < bTitle) return -1
        if (aTitle > bTitle) return 1
        return 0
      })
      
      return program
    },
    
    
    
  //   posts () {
  //     let posts = []
      
  //     if (this.toggledTags.length) {
  //       // combine arrays
  //       this.toggledTags.forEach(tag => {
  //         if (this.dataTags[tag]) {
  //           posts = [...posts, ...this.dataTags[tag]]  
  //         }
  //       })
  //     }
  //     else {
  //       Object.entries(this.dataTags).forEach(([key,value])=>{
  //         posts = [...posts, ...value]
  //       })
  //     }
        
  //     // remove duplicates
  //     let added = []
  //     let postsFiltered = []
  //     posts.forEach(post => {
  //       let title
  //       if (post.project) {
  //         title = post.project[0].text
  //       } else if (post.artist) {
  //         title = post.artist[0].text
  //       }
          
  //       if (! added.includes(title) ) {
  //         added.push(title)
  //         postsFiltered.push(post)
  //       }
  //     })
      
  //     function compare(a, b) {
  //       let titleA, titleB
  //       if (a.project) {
  //         titleA = a.project[0].text
  //       } else if (a.artist) {
  //         titleA = a.artist[0].text
  //       }
  //       if (b.project) {
  //         titleB = b.project[0].text
  //       } else if (b.artist) {
  //         titleB = b.artist[0].text
  //       }
        
  //       const atitle = titleA,
  //             btitle = titleB
  //       if (atitle > btitle) return 1
  //       else if (atitle < btitle) return -1
  //       else return 0
  //     }
  //     postsFiltered.sort(compare)
      
  //     return postsFiltered
      
  //   }
  },
  methods: {
    stripCountry(artist) {
      // remove any language code in parentheses at the end of artist name
      let name = artist.split('(')[0].trim()
      return name
    },
    resizeImage (url) {
      let image = url.split('?')[0] + '?auto=compress,format&w=1280&h=900&fit=crop'
      return image
    },
    toggleFilter (which) {
      if (which == 'close') this.mobileCurrentFilter = null
      else if (this.mobileCurrentFilter == which) this.mobileCurrentFilter = null
      else this.mobileCurrentFilter = which
    },
    clearFilters () {
      // console.log('lcear');
      this.toggledLocations = []
      this.toggledDates = []
      this.toggledLocations = []
      this.toggledTags = []
      this.toggledCats = []
      this.toggledArtists = []
      this.mobileCurrentFilter = null
    },
    formatDate (date) {
      if (date !== null) {
        let time = date.split('T')[1].split('+')[0].slice(0,-3)
        let datetime = date.replace('T', ' ')
        let d = parse(datetime, "yyyy-MM-dd HH:mm:ssxx", new Date())
        let form = 'd MMMM'
        if (this.lang == 'fr') return format(d, form, { locale: frLocale })
        else return format(d, form)
      }
    },
    moreData(project) {
      let slug = project.path.split('/').slice(-1)[0]
      let data = this.program.find(x => x.node._meta.uid === slug)
      return data.node
    },
    locationToggle (loc) {
      if (! this.toggledLocations.includes(loc)) {
        // this.toggledLocations.push(loc)
        this.toggledLocations = [loc]
      } else {
        this.toggledLocations = this.toggledLocations.filter(item => item !== loc)
      }
    },
    dateToggle (date) {
      if (! this.toggledDates.includes(date)) {
        // this.toggledLocations.push(date)
        this.toggledDates = [date]
      } else {
        this.toggledDates = this.toggledDates.filter(item => item !== date)
      }
    },
    catToggle (cat) {
      if (! this.toggledCats.includes(cat)) {
        this.toggledCats.push(cat)
      } else {
        this.toggledCats = this.toggledCats.filter(item => item !== cat)
      }
    },
    artistToggle (artist) {
      if (! this.toggledArtists.includes(artist)) {
        this.toggledArtists.push(artist)
      } else {
        this.toggledArtists = this.toggledArtists.filter(item => item !== artist)
      }
      // console.log(this.toggledArtists)
    },
    tagToggle (tag) {
      if (! this.toggledTags.includes(tag)) {
        this.toggledTags.push(tag)
      } else {
        this.toggledTags = this.toggledTags.filter(item => item !== tag)
      }
    },
    programRoute (slug) {
      // this.moving = true
      // console.log(this.$router);
      let path
      if (this.lang == 'fr') path = '/fr/programme/'+this.year+'/' + slug + '/'
      else path = '/en/program/'+this.year+'/' + slug + '/'
      
      // console.log(path)
      this.$router.push(path)
    },
    toggledLocation (loc) {
      if (this.toggledLocations.includes(loc)) return 'is-active'
    },
    toggledDate (date) {
      if (this.toggledDates.includes(date)) return 'is-active'
    },
    toggledCat (cat) {
      if (this.toggledCats.includes(cat)) return 'is-active'
    },
    toggledArtist (artist) {
      if (this.toggledArtists.includes(artist)) return 'is-active'
    },
    toggledTag (tag) {
      if (this.toggledTags.includes(tag)) return 'is-active'
    },
    ucfirst (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  }
}
</script>

<style lang="scss" scoped>
$green: rgb(17,230,54);

.wallpaper {
  background-image: url(https://images.prismic.io/foodculturedays2020/d60351a7-80f6-461f-a0de-f3f4e22c4c48_POSTER_DIGITAL_A43.jpg?auto=compress,format);
  background-size: contain;
  // background-size: cover;
  // background-color: rgb(219,194,190);
  background-color: white;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 50vw;
  position: fixed;
  top: 0;
  left: 0;
}
@media (max-width: 737px) {
  .wallpaper {
    width: 100vw;
    top: 7rem;
    height: calc(100vh - 60px - 7rem);
  }
}


.icons-mobile {
  display: none;
}
@media (max-width: 737px) {
  .icons-mobile {
    display: block;
    margin-bottom: 1rem;
  }
}
.icon {
  img {
    height: 1rem;
    width: auto;
    margin-right: 0.4rem;
    margin-top: 0.3rem;
    transform: translate(0px, 1.7px);
  }
  a {
    padding-bottom: 0.1rem;
    display: inline-block;
    font-size: 0.95rem;
  }
  .small {
    font-size: 0.7rem;
    transform: translate(5px, -1px);
    display: inline-block;
  }
}

/* @media (max-width: 960px) { */
@media (max-width: 737px) {
  .columns {
    display: flex;
    /* flex-direction: column-reverse; */
    flex-direction: column;
  }
  .posts-col {
    /* margin-top: 1rem; */
    /* padding-top: 1rem; */
    /* padding-top: 1.6rem; */
    // padding-top: 3rem;
  }
  .tags-col {
    padding-top: 1rem;
    margin-top: 4rem;
  }
  .links {
    margin-top: 0 !important;
    margin-bottom: 5rem;
  }
  .clear-filter {
    display: none;
    /* .tag {
      font-family: 'CE', Times, serif;
      font-style: italic;
      font-size: 0.9rem;
      line-height: 1em;
      div {
        text-transform: lowercase !important;    
      }
    } */
  }
  .mobile {
    .about {
      margin-bottom: 0.5rem;
      // text-align: right;
    }
  }
  .filters {
    /* position: fixed; */
    
    position: relative;
    z-index: 1;
    /* top: 11vw; */
    /* top: 2.7rem; */
    /* left: 0; */
    width: calc(100vw - 1.4rem);
    display: flex;
    margin: 1rem 0;
    justify-content: space-between;
    .toggle {
      background: white;
      // font-family: 'CE', Times, serif;
      font-family: 'Maxi', sans-serif;
      // font-style: italic;
      padding: 0.2rem 0.3rem 0.2rem 0.2rem;
      border: 1px black solid;
      font-size: 0.9rem;
      line-height: 1em;
      // text-transform: lowercase;
      text-transform: uppercase;
      &.is-active {
        background: #000 !important;
        color: white !important;
      }
      
    }
    .togglex {
      font-size: 1.2rem;
      /* padding: 0.2rem 0.2rem 0 0; */
      transform: translate(-.25rem, .25rem);
      .white {
        color: transparent;
      }
    }
  }
  .my-filters {
    /* position: absolute; */
    /* top: 0; */
    /* left: 0; */
    position: relative;
    z-index: 999;
    background: white;
    /* width: 100vw; */
    /* padding-top: 26vw; */
    /* padding-bottom: 1rem; */
    // padding-top: 3rem;
    margin-bottom: -1rem;
    .filter-section {
      display: none;
      &.is-active {
        display: block;
      }
    }
  }  
}
/* @media (min-width: 960px) { */
@media (min-width: 737px) {
  .close-filter {
    display: none !important;
  }
  .posts-col {
    padding-top: 0.5rem;
    // padding-top: 6vw;
    // padding-bottom: 5rem;
  }
  .columns.scroll {
    .column {
      height: 100vh;
      overflow: auto;
    }  
  }
  .flex-wrapper {
    display: flex;
    .flex {
      width: 50%;
    }
  }
  .my-filters {
    .inner {
      padding-bottom: 3rem;
    }
  }

}

.tagtitle {
  margin-bottom: 1rem;
  font-family: 'Maxi', sans-serif;
  font-size: 1.8rem;
  line-height: 1.2em;
}
.tags {
  width: 100%;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  line-height: 1em;
  // text-transform: capitalize;
  .tag {
    border: 1px black solid;
    color: black;
    display: inline-block;
    margin: 0 0.5rem 0.5rem 0;
    padding: 0.3rem 0.2rem 0.1rem;
    // transition: all 200ms;
    /* @media (min-width: 960px) { */
    @media (min-width: 737px) {
      &:hover {
        background: #000 !important;
        color: white !important;
      }
    }
    &.is-active {
      background: #000 !important;
      color: white !important;
    }
  }
}
.tags.small {
  $grey: #999;
  margin-top: 0.1rem;
  margin-bottom: 0.3rem;
  .tag {
    text-transform: uppercase;
    border: 0;
    color: $grey;
    font-size: 7px;
    letter-spacing: 0.2px;
    line-height: 1em;
    padding: 3px 3px 1px;
    /* border: 1px #ccc solid; */
    border: 0;
    margin: 0 1px 1px 0;
    /* border-radius: 2px; */
    /* background: #f0f0f0; */
    &:hover {
      color: $grey;
      background: white;
    }
    /* display: none; */
    &.is-active {
      /* display: inline-block; */
      background: #f0f0f0;
      color: #000;
      &:hover {
        background: #f0f0f0;
        color: #000;
      }
    }
    
  }
}
  

h2 {
  font-size: 0.98rem;
  margin: 0;
  padding: 0;
  font-weight: normal;
  text-transform: uppercase;
}
em {
  // font-size: 1.05rem;
  font-size: 1.07rem;
}
.links {
  /* margin-top: 1.9rem; */
  // margin-top: 0.9rem;
  border-top: 1px black solid;
}
.link {
  border-bottom: 1px black solid;
  padding: 7px 0 3px;
}

// p em {
//   &:after, &:before {
//     content: ' '
//   }
// }

.location.disabled,
.date.disabled {
  opacity: 0.3;
}

.locations, .dates {
  margin-bottom: 2rem;
  @media (max-width: 737px) {
    margin-bottom: 1rem;
  }
  font-size: 0.95rem;
  margin-left: 2rem;
  .location, .date {
    /* margin-bottom: 0.1rem; */
    /* background: red; */
    &:before {
      content: '';
      /* background-image: url(https://prismic-io.s3.amazonaws.com/foodculturedays2020/f5ad4715-275e-4423-a617-7036a66d82c1_Asset+4.svg); */
      background-image: url(/assets/box.svg);
      background-size: 1rem auto;
      background-position: 0 4.15px;
      /* background-color: pink; */
      background-repeat: no-repeat;
      display: inline-block;
      height: 1.6rem;
      width: 1.1rem;
      margin-right: 0.8rem;
      margin-left: -1.9rem;
      /* padding-left: 2rem; */
      transform: translateY(0.4rem);
    }
    &.is-active {
      &:before {
        /* background-image: url(https://prismic-io.s3.amazonaws.com/foodculturedays2020/2b2b5e66-db76-474a-80f8-1369f060d844_Asset+3.svg); */
        background-image: url(/assets/box-check.svg);
        background-size: 1rem auto;
        background-position: 0 0;
        
      }
    }
  }
}

.image {
  height: 60vw;
  width: 100%;
  background: #fee;  
  display: block;
  margin: 0 0 0.5rem;
  background-color: #f5f5f5;
  background-size: cover;
  background-position: center;
}

.clear-filter .tag {
  text-transform: none !important;
}

.close-filter .tag {
  // text-transform: lowercase !important;
  // font-family: 'CE', Times, serif;
  font-family: 'Maxi', sans-serif;
  // font-style: italic;
  text-transform: uppercase !important;
  padding: 0.2rem 0.3rem 0.2rem 0.2rem;
}

// for desktop only
@media (min-width: 737px) {
  .image {
    height: 31vw;
  }
}

</style>