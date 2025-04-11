<template lang="pug">
layout
  .program
    .columns
      .column.is-6.no-pad.gallery-column
        .gallery
          //- .item(style="background-image: url(https://images.prismic.io/foodculturedays2020/f23c2ded-df54-4f93-8013-d436bcc2e68d_2020_09_25_RAW_academie_Anna_Tje%CC%81-5-2+c.+Mathilde+Assier+copie.jpg??fit=max&h=1600&w=1200auto=compress,format); background-position: center center; background-size: cover;")
          .item(style="background-image: url(https://images.prismic.io/foodculturedays2020/Z_WPb3dAxsiBwdYk__MG_9472.jpg?auto=format,compress&fit=max&h=1600&w=1200auto=compress,format); background-position: center center; background-size: cover;")
      .column.is-6.left
        .page-wrapper
          //- .back(@click='goBack')
            img(src='https://images.prismic.io/foodculturedays2020/dc97c761-a203-480b-be86-918aa8fc8add_close.png?auto=compress,format').close
            
          h1.title 
            template(v-if='lang === "en"') Program
            template(v-else) Programme
          p(v-if='lang === "en"') The program for 2025 is not available yet.
          p(v-else) Le programme pour 2025 n'est pas encore disponible.
//- layout
  //- .links
    .link(v-for='(p, i) in filteredProgram', @click='programRoute(p.node._meta.uid)', :key='i', v-if='p && p.node._meta.uid') {{ p.node._meta.uid }}
  //- xmp.debug {{ program }}
  
  //- program overview page
  .mobile
    .filters
      .toggle(@click='toggleFilter("dates")', :class='{ "is-active": (mobileCurrentFilter == "dates") }') Dates
      .toggle(@click='toggleFilter("locations")', :class='{ "is-active": (mobileCurrentFilter == "locations") }', v-if='locations.length') {{ locationsTitle }}
      .toggle(@click='toggleFilter("artists")', :class='{ "is-active": (mobileCurrentFilter == "artists") }') {{ artistsTitle }}
      .toggle(@click='toggleFilter("categories")', :class='{ "is-active": (mobileCurrentFilter == "categories") }') {{ activitiesTitle }}
      .toggle(@click='toggleFilter("tags")', :class='{ "is-active": (mobileCurrentFilter == "tags") }') {{ themesTitle }}
      .togglex(@click='clearFilters') 
        span(v-if='anyFiltersAreSet') ×
        span(v-else).white X
    .about
      .icon
        .arrow &rarr;
        span(v-if="lang == 'en'") 
          a(href='/en/biennale') About the biennial
        span(v-else)
          a(href='/fr/biennale') À propos de la Biennale
      .icon
        .arrow &rarr;
        span(v-if="lang == 'en'") 
          a(href='/en/ticketing-info') Ticketing info
        span(v-else)
          a(href='/fr/info-et-billeterie') Info et Billeterie
      .icon
        .arrow &rarr;
        span(v-if="lang == 'en'") 
          a(href='https://foodculturedays2020.cdn.prismic.io/foodculturedays2020/5ac4b9ee-757a-4192-90dc-73774367653e_2023_fcd_catalog_digital.pdf' target="_blank") Download the program
        span(v-else)
          a(href='https://foodculturedays2020.cdn.prismic.io/foodculturedays2020/5ac4b9ee-757a-4192-90dc-73774367653e_2023_fcd_catalog_digital.pdf' target="_blank") Téléchargez le programme
      .icon
        .arrow &rarr;
        span(v-if="lang == 'en'") 
          a(href='https://foodculturedays2020.cdn.prismic.io/foodculturedays2020/fc03ddf6-4d71-4601-af05-ef841fb9db8d_2023_program_digital.pdf' target="_blank") Download the schedule
        span(v-else)
          a(href='https://foodculturedays2020.cdn.prismic.io/foodculturedays2020/fc03ddf6-4d71-4601-af05-ef841fb9db8d_2023_program_digital.pdf' target="_blank") Téléchargez l'horaire
      .icon
        .arrow &rarr;
        span(v-if="lang == 'en'") 
          a(href='/en/menu-of-the-day-2023') Menu of the day
        span(v-else)
          a(href='/fr/menu-du-jour-2023/') Menu du jour
    
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
            
          .icon
            span(style="display: inline-block; padding-right: 3px;") &rarr;
            span(v-if="lang == 'en'") 
              a(href='/en/ticketing-info') Ticketing info
            span(v-else)
              a(href='/fr/info-et-billeterie') Info et Billeterie
              
          .icon
            span(style="display: inline-block; padding-right: 3px;") &rarr;
            span(v-if="lang == 'en'") 
              a(href='https://foodculturedays2020.cdn.prismic.io/foodculturedays2020/5ac4b9ee-757a-4192-90dc-73774367653e_2023_fcd_catalog_digital.pdf' target="_blank") Download the program
            span(v-else)
              a(href='https://foodculturedays2020.cdn.prismic.io/foodculturedays2020/5ac4b9ee-757a-4192-90dc-73774367653e_2023_fcd_catalog_digital.pdf' target="_blank") Télécharger le programme
            
          .icon
            span(style="display: inline-block; padding-right: 3px;") &rarr;
            span(v-if="lang == 'en'") 
              a(href='https://foodculturedays2020.cdn.prismic.io/foodculturedays2020/fc03ddf6-4d71-4601-af05-ef841fb9db8d_2023_program_digital.pdf' target="_blank") Download the schedule
            span(v-else)
              a(href='https://foodculturedays2020.cdn.prismic.io/foodculturedays2020/fc03ddf6-4d71-4601-af05-ef841fb9db8d_2023_program_digital.pdf' target="_blank") Téléchargez l'horaire
              
          .icon
            span(style="display: inline-block; padding-right: 3px;") &rarr;
            span(v-if="lang == 'en'") 
              a(href='/en/menu-of-the-day-2023') Menu of the day
            span(v-else)
              a(href='/fr/menu-du-jour-2023/') Menu du jour

        
        .flex.filter-section(data-filter='locations', :class='{ "is-active": (mobileCurrentFilter == "locations") }', v-if='locations.length')
          h2.tagtitle {{ locationsTitle }}
          .locations
            .location(v-for='loc in locations', :key='loc', @click='locationToggle(loc)', :class='toggledLocation(loc)') {{ loc }}
          
          .close-filter.tags
            .tag(@click='toggleFilter("close")')
              span(v-if="lang == 'en'") close
              span(v-else) fermer

        .filter-section(data-filter='dates', :class='{ "is-active": (mobileCurrentFilter == "dates") }')
          h2.tagtitle Dates
          .dates2.tags
            .date2.tag(v-for='(date, i) in dates', @click='dateToggle(date)', :class='toggledDate(date)', :key='i')  {{ date }}
            
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
        br

  
    .column.is-6.right.posts-col
      .inner(v-if='!moving')
        .n-events(v-if='filteredProgram.length')
          span(v-if='lang == "en"') Showing {{ filteredProgram.length }} events
          span(v-else) Affichage de {{ filteredProgram.length }} événements
        
        //- .icons-mobile
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
          //- .link(v-for='(p, i) in filteredProgram', @click='programRoute(p.node._meta.uid)', :key='i', v-if='p && p.node._meta.uid')
            h2 {{ p.node.project[0].text }}
          .link(v-for='(p, i) in filteredProgram', @click='programRoute(p.node._meta.uid)', :key='i', v-if='p && p.node._meta.uid')
            .image(v-if='p.node.image', :style='"background-image: url("+resizeImage(p.node.image.url)+")"')
            h2
              em(v-if='p.node.project') {{ ucfirst(p.node.project[0].text) }}
              div(v-if='p.node.artist') {{ ucfirst(p.node.artist[0].text) }}
            .program-overview-time
              .dts
                Dates(:node='p.node', :lang='lang')
                //- span.d(v-for='(d,i) in allDates(p.node)')
                //-   span {{ d }}
  
  .preload.is-hidden
    img(src='https://prismic-io.s3.amazonaws.com/foodculturedays2020/f5ad4715-275e-4423-a617-7036a66d82c1_Asset+4.svg')
    img(src='https://prismic-io.s3.amazonaws.com/foodculturedays2020/2b2b5e66-db76-474a-80f8-1369f060d844_Asset+3.svg')
</template>

<script>
import Dates from '~/components/Dates.vue'
import {format, isValid, parseISO } from 'date-fns'
import frLocale from 'date-fns/locale/fr-CH'
// import {parse} from "date-fns"
// import {parseISO} from 'date-fns'

export default {
  components: {
    Dates
  },
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
      else return "Reset the filters"
    },
    locationsTitle () {
      if (this.lang == 'en') return 'Venues'
      else return 'Lieux'
    },
    activitiesTitle () {
      if (this.lang == 'en') return 'Activities'
      else return 'Activités'
    },
    themesTitle () {
      if (this.lang == 'en') return 'Themes'
      else return 'Thèmes'
    },
    artistsTitle () {
      if (this.lang == 'en') return 'Participants'
      else return 'Participant·e·s'
      // if (this.lang == 'en') return 'Artists'
      // else return 'Artistes'
    },
    dates () {
      let sel = []
      this.filteredProgram.forEach(x => {
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
      
      // return filtered
      
      let formatted = []
      filtered.forEach(x => {
        if (x) {
          let f = this.formatDate(x)
          if (! formatted.includes(f) ) {
            formatted.push(f)
          }
        }
      })
      
      return formatted
    },
    
    locations () {
      let sel = []
      this.filteredProgram.forEach(x => {
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
      
      // FR
      // 0: "Dans la ville"
      // 1: "Pavillon Central"
      // 2: "Musée du Jeu"
      // 3: "EPICOOP - épicerie coopérative"
      
      // EN
      // 0: "Central Pavilion"
      // 1: "Around the City"
      // 2: "EPICOOP - cooperative grocery store"
      // 3: "Musée du Jeu"

      // requested order: en/fr
      
      // 0: central pavillon / pavillon central
      // 1: Around the city / Dans la ville
      // 2: Musée du Jeu / Musée du Jeu
      // 3: EPICOOP - cooperative grocery store / EPICOOP - épicerie coopérative
      
      // if french, swap 0 and 1
      if (this.lang == 'fr') {
        let temp = filtered[0]
        filtered[0] = filtered[1]
        filtered[1] = temp
      }
      // if english, swap 2 and 3
      if (this.lang == 'en') {
        let temp = filtered[2]
        filtered[2] = filtered[3]
        filtered[3] = temp
      }
      
      // remove all null elements
      filtered = filtered.filter(function (el) {
        return el != null;
      })
      
      return filtered
    },
    
    
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
              // console.log('year from hash: ' + this.year)
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
        })
      }
      
      // categories
      if (this.toggledCats.length) {
        program = program.filter(p => {
          
          let pCats = []
          p.node.categories.forEach(c => {
            if (c.category && c.category.name) {
              pCats.push(c.category.name)  
            }
          })
          
          return this.toggledCats.every(x => pCats.includes(x))
          
        })
      }
      
      // tags
      if (this.toggledTags.length) {
        program = program.filter(p => {
          
          let pTags = []
          p.node._meta.tags.forEach(t => pTags.push(t))
          
          return this.toggledTags.every(x => pTags.includes(x))
        })
      }
      
      // sort program by: el.node.project[0].text
      // program = program.sort((a,b) => {
      //   let aTitle = a.node.project && a.node.project.length && a.node.project[0].text ? a.node.project[0].text : 'Missing title'
      //   let bTitle = b.node.project && b.node.project.length && b.node.project[0].text ? b.node.project[0].text : 'Missing title'
      //   if (aTitle < bTitle) return -1
      //   if (aTitle > bTitle) return 1
      //   return 0
      // })
      
      // sort program by: el.node.date_time (converted with date-fns)
      program = program.sort((a,b) => {
        let aDate = a.node.date_time ? this.getUnixtime(a.node.date_time) : 'Missing date'
        let bDate = b.node.date_time ? this.getUnixtime(b.node.date_time) : 'Missing date'
        // console.log(this.getUnixtime(a.node.date_time))
        if (aDate < bDate) return -1
        if (aDate > bDate) return 1
        return 0
      })
      
      return program
    },
    
    
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
    
    // for some reason breaks the built code
    // formatDate (date) {
    //   if (date !== null) {
    //     let time = date.split('T')[1].split('+')[0].slice(0,-3)
    //     let datetime = date.replace('T', ' ')
    //     let d = parse(datetime, "yyyy-MM-dd HH:mm:ssxx", new Date())
    //     let form = 'd MMMM'
    //     if (this.lang == 'fr') return format(d, form, { locale: frLocale })
    //     else return format(d, form)
    //   }
    // },
    
    getUnixtime (date_time) {
      if (typeof date_time !== 'string' || date_time.trim() === '') return ''
      const date = parseISO(date_time)
      const unix = new Date(date).getTime()
      return unix
    },
    
    
    
    // convertToRanges2(numbers) {
    //   const ranges = [];
    //   let start = numbers[0];
    //   let end = numbers[0];
    //   let startDate = null
    //   let endDate = null
      
    //   // sort numbers
    //   numbers = numbers.sort((a,b) => {
    //     if (a < b) return -1
    //     if (a > b) return 1
    //     return 0
    //   })
      
    //   console.log('numbers', numbers);

    //   for (let i = 1; i < numbers.length; i++) {
    //     if (numbers[i] === end + 1) {
    //       end = numbers[i];
    //     } else {
    //       // ranges.push(start === end ? `${start}` : `${start}-${end}`);
    //       startDate = this.convertNumberToDate(start)
    //       endDate = this.convertNumberToDate(end)
    //       ranges.push(start === end ? `${startDate}` : `${startDate}-${endDate}`);
    //       start = numbers[i];
    //       end = numbers[i];
    //     }
    //   }

    //   // ranges.push(start === end ? `${start}` : `${start}-${end}`);
    //   startDate = this.convertNumberToDate(start)
    //   endDate = this.convertNumberToDate(end)
    //   ranges.push(start === end ? `${startDate}` : `${startDate}-${endDate}`);

    //   return ranges;
    // },
    
    
    
    // convertNumberToDate2 (dayOfYear) {
    //   const date = parse(dayOfYear, 'DDD', new Date());
    //   let monthAndDay
    //   if (this.lang == 'fr') {
    //     monthAndDay = format(date, 'd MMMM', { locale: frLocale })
    //   } else {
    //     monthAndDay = format(date, 'MMMM d')
    //   }
    //   return monthAndDay
    //   // return dayOfYear
    // },
    
    // allDates (node) {
    //   // add all the dates to an array
    //   let dates = []
    //   if (node.date_time) {
    //     let date = node.date_time
    //     if (date && ! dates.includes(date)) dates.push(date)
    //   }
    //   if (node.extra_days) {
    //     node.extra_days.forEach(d => {
    //       let date = d.extra_day
    //       if (date && ! dates.includes(date)) dates.push(date)
    //     })
    //   }
      
    //   // filter out empty
    //   if (dates.length == 0) return []

    //   // convert string to object
    //   dates = dates.map(d => new Date(d))

    //   // parse them
    //   // dates = dates.map(d => parseISO(d))
      
    //   // turn into numbers
    //   dates = dates.map(d => format(d, 'DDD'))
    //   // parse as ints
    //   dates = dates.map(d => parseInt(d))
      
    //   // remove dupes
    //   // dates = dates.filter((item, index) => dates.indexOf(item) === index)
    //   // doesn't work so give me a vanilla version
    //   // let added = []
    //   // let filtered = []
    //   // dates.forEach(d => {
    //   //   if (! added.includes(d) ) {
    //   //     added.push(d)
    //   //     filtered.push(d)
    //   //   }
    //   // })
    //   // dates = filtered
    //   // console.log('dates', dates);
      
    //   // sort
    //   dates = dates.sort()
      
    //   // THIS BROKE THE CODE???
    //   // turn into ranges
    //   // dates = this.convertToRanges(dates)
      
    //   // // convert ranges to dates
    //   // dates = this.convertRangeToDates(dates)
    //   // debug
    //   // console.log('dates', dates)
      
    //   return dates
    // },
    
    // convertToRanges(numbers) {
    //   if (!Array.isArray(numbers) || numbers.length === 0) {
    //     return [];
    //   }

    //   const ranges = [];
    //   let startRange = numbers[0];
    //   let endRange = numbers[0];

    //   numbers.forEach((num, i) => {
    //     if (i === 0) return; // Skip the first element since we've already set startRange and endRange.

    //     if (num === endRange + 1) {
    //       endRange = num;
    //     } else {
    //       ranges.push(startRange === endRange ? startRange.toString() : `${startRange}-${endRange}`);
    //       startRange = endRange = num;
    //     }
    //   });

    //   ranges.push(startRange === endRange ? startRange.toString() : `${startRange}-${endRange}`);

    //   return ranges;
    // },
    
    // convertToRanges(numbers) {
    //   // numbers is a sorted array of ints
    //   // some have only one element
    //   // if they are sequential, put them as a "range" string in ranges
    //   // e.g. 143, 144, 145 becomes 143-145
    //   // then the next number is not sequential, so it becomes a new range
    //   // some have no ranges but several discontinious numbers
      
    //   // GPT-4:
    //   const ranges = [];
    //   let startRange = numbers[0];
    //   let endRange = numbers[0];

    //   for (let i = 1; i < numbers.length; i++) {
    //     if (numbers[i] === endRange + 1) {
    //       endRange = numbers[i];
    //     } else {
    //       if (startRange === endRange) {
    //         ranges.push(startRange.toString());
    //       } else {
    //         ranges.push(`${startRange}-${endRange}`);
    //       }
    //       startRange = endRange = numbers[i];
    //     }
    //   }

    //   if (startRange === endRange) {
    //     ranges.push(startRange.toString());
    //   } else {
    //     ranges.push(`${startRange}-${endRange}`);
    //   }

    //   return ranges;      
    // },
    
    // convertRangeToDates (ranges) {
    //   // GPT-4
    //   const formatDate = (dayOfYear) => {
    //     const date = setDayOfYear(new Date(), dayOfYear);
    //     const formatTemplate = this.lang === 'fr' ? 'd MMMM' : 'MMMM d';
    //     const locale = this.lang === 'fr' ? frLocale : undefined;

    //     return format(date, formatTemplate, { locale });
    //   };

    //   const formatRange = (range) => {
    //     const [start, end] = range.split('-');
    //     return `${formatDate(start)}-${formatDate(end)}`;
    //   };

    //   return ranges.map((item) => {
    //     return item.includes('-') ? formatRange(item) : formatDate(parseInt(item));
    //   });
    // },
    
    
    
    // allDates2 (node) {
    //   let dates = []
      
    //   if (node.date_time) {
    //     let date = node.date_time
    //     if (date && ! dates.includes(date)) dates.push(date)
    //   }
    //   if (node.extra_days) {
    //     node.extra_days.forEach(d => {
    //       let date = d.extra_day
    //       if (date && ! dates.includes(date)) dates.push(date)
    //     })
    //   }
      
    //   // loop through the dates and replace continuous dates with ranges, possible several ranges
    //   let datesAsInts = []
    //   let ranges = []
      
    //   if (dates.length > 1) {
    //     dates.forEach(d => {
    //       let day = parseInt(format(parseISO(d), 'DDD'))
    //       if (! datesAsInts.includes(day)) datesAsInts.push(parseInt(day))
    //     })
    //     ranges = this.convertToRanges(datesAsInts)
    //   } else {
    //     if (dates[0]) {
    //       let day = format(parseISO(dates[0]), 'DDD')
    //       ranges = this.convertToRanges([day])
    //     }
    //   }
      
    //   let ret = ranges.length ? ranges : dates
    //   return ret
    // },
    
    formatDateTime (dateStr) {
      // Parse the date string to a JavaScript Date object
      if (typeof dateStr !== 'string' || dateStr.trim() === '') return ''
      const date = parseISO(dateStr)

      // Format the date string in French with the +02:00 time zone
      let formattedDateFrench = format(date, 'd MMMM / HH:mm', { locale: frLocale, timeZone: '+02:00' })
      formattedDateFrench = formattedDateFrench.replace('/', 'à')

      // Format the date string in English with the +02:00 time zone
      let formattedDateEnglish = format(date, 'MMMM d / h a', { timeZone: '+02:00' })
      formattedDateEnglish = formattedDateEnglish.replace('/', 'at')

      if (this.lang == 'fr') return formattedDateFrench
      else return formattedDateEnglish
    },
    
    formatDate(date) {
      if (typeof date !== 'string' || date.trim() === '') {
        // console.log('date error 1', date)
        return ''
      }
      
      const d = parseISO(date)
      if (!isValid(d)) {
        // console.log('date error 2', date)
        return ''
      }
      
      const form = 'd MMMM'
      if (this.lang === 'fr') {
        return format(d, form, { locale: frLocale })
      }
      
      return format(d, form)
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
      // this.$router.push(path)
      this.$nav(path)
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

  white-space: nowrap;
  
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
      margin-bottom: 1.5rem;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      a {
        // font-size: 0.9rem;
        font-size: 0.8rem;
      }
      .arrow {
        display: inline-block;  
        // padding-right: 4px;
        padding-right: 3px;
      }
      .icon {
        // box-shadow: 0 0 0 1px black;
        width: 50%;
      }
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
      padding: 0.3rem 0.3rem 0rem 0.2rem;
      border: 1px black solid;
      border-radius: 5px;
      font-size: 0.8rem;
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
      transform: translate(0, 0.15rem);
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
    border-radius: 5px;
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

.clear-filter {
  margin-top: -2rem;
    .tag {
      text-transform: none !important;
      background: black;
      color: white;
      border-color: black;
    }
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

xmp.debug {
  // allow line breaks
  white-space: pre-wrap;
  max-width: 50vw;
  position: absolute;
}

.dts .d {
  display: inline-block;
  margin-right: 0.3rem;
  font-size: 0.7rem;
  line-height: 1em;
  border: 1px black solid;
  padding: 4px 6px 1px;
  border-radius: 10px;
  // ::after {
  //   content: ',';
  //   display: inline-block;
  //   margin-right: 0.2rem;
  // }
  // &:last-child {
  //   ::after {
  //     content: '';
  //   }
  // }
}
.n-events {
  background: black;
  color: white;
  // background: white;
  font-size: 0.8rem;
  // font-weight: 600;
  line-height: 1em;
  border: 1px black solid;
  padding: 4px 6px 1px;
  border-radius: 10px;
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
}
@media (max-width: 737px) {
  .n-events {
    display: none;
  }
}

</style>

<style lang="scss">
.program-overview-time {
  margin-top: 0.25rem;
  padding-bottom: 0.25rem;
  font-size: 0.8rem;
  line-height: 1.5em;
  table, tr, td, p {
    padding: 0 !important;
    margin: 0 !important;
    
  }
}
</style>