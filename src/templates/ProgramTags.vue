<template lang="pug">
  layout
    .filters.mobile
      .toggle(@click='toggleFilter("dates")', :class='{ "is-active": (mobileCurrentFilter == "dates") }') Dates
      .toggle(@click='toggleFilter("locations")', :class='{ "is-active": (mobileCurrentFilter == "locations") }') {{ locationsTitle }}
      .toggle(@click='toggleFilter("categories")', :class='{ "is-active": (mobileCurrentFilter == "categories") }') {{ activitiesTitle }}
      .toggle(@click='toggleFilter("tags")', :class='{ "is-active": (mobileCurrentFilter == "tags") }') {{ themesTitle }}
      .togglex(@click='clearFilters') 
        span(v-if='anyFiltersAreSet') X
        span(v-else).white X
      
    .columns.tags-page.scroll
      .column.is-6.right.my-filters
        .inner
          .flex-wrapper
            .flex.filter-section(data-filter='locations', :class='{ "is-active": (mobileCurrentFilter == "locations") }')
              h2.tagtitle {{ locationsTitle }}
              .locations
                .location.is-active RADIO-40
                //- .location(v-for='loc in locations', :key='loc', @click='locationToggle(loc)', v-bind:class='toggledLocation(loc)') {{ loc }}
                .location.disabled(v-for='loc in locations', :key='loc') {{ loc }}
              .close-filter.tags
                .tag(@click='toggleFilter("close")')
                  span(v-if="lang == 'en'") close
                  span(v-else) fermer
              
                
            .flex.filter-section(data-filter='dates', :class='{ "is-active": (mobileCurrentFilter == "dates") }')
              h2.tagtitle Dates
              .dates
                //- .date(v-for='date in dates', @click='dateToggle(date)', v-bind:class='toggledDate(date)')  {{ date }}
                .date.disabled(v-for='date in dates')  {{ date }}
              .icon
                img(src='/doc.png')
                a(href='/menu.pdf', target='_blank') Menus à emporter 
                span.small (PDF)
              .icon
                img(src='/doc.png', target='_blank')
                a(href='/programme.pdf') Radio programme 
                span.small (PDF)
                
              
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
              
      .column.is-6.left.posts-col
        .inner(v-if='!moving')
          .icons-mobile
            .icon
              img(src='/doc.png')
              a(href='/menu.pdf', target='_blank') Menus à emporter 
              span.small (PDF)
            .icon
              img(src='/doc.png', target='_blank')
              a(href='/programme.pdf') Radio programme 
              span.small (PDF)
          .links(v-if='program.length')
            .link(v-for='(p, i) in filteredProgram', @click='programRoute(p.node._meta.uid)', :key='i')
              
              //- .image(v-if='p.node.image', :style='"background-image: url("+p.node.image.url+"&w=1280&h=900&fit=crop)"')
              
              .image(v-if='p.node.image', :style='"background-image: url("+resizeImage(p.node.image.url)+")"')
              
              
              
              //- div(v-if='p.node.image') {{ p.node.image.url }}
                
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
                    
              //- xmp {{ moreData(project) }}  
    
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
    return {
      title: this.$context.title
    }
  },
  data () {
    return {
      moving: false,
      toggledTags: [],
      toggledCats: [],
      toggledLocations: [],
      toggledDates: [],
      mobileCurrentFilter: null
    }
  },
  computed: {
    anyFiltersAreSet () {
      if (this.toggledTags.length || this.toggledCats.length || this.toggledLocations.length || this.toggledDates.length) return true
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
    dates () {
      let sel = []
      this.program.forEach(x => {
        if (x.node.date_time) {
          // console.log(x.node.date_time);
          // console.log(this.formatDate(x.node.date_time));
          sel.push(this.formatDate(x.node.date_time))
        }
        if (x.node.extra_days) {
          x.node.extra_days.forEach(x2 => {
            if (x2.extra_day) {
              sel.push(this.formatDate(x2.extra_day))    
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
      
      return filtered.sort()
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
      let tags = []
      this.filteredProgram.forEach(x => {
        // this.program.forEach(x => {
        let t = x.node._meta.tags
        t.forEach(y => {
          tags.push(y)
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
      return this.$context.program
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
      if (this.lang == 'fr') path = '/fr/programme/2020/' + slug + '/'
      else path = '/en/program/2020/' + slug + '/'
      
      console.log(path)
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
    padding-top: 3rem;
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
      font-family: 'CE', Times, serif;
      font-style: italic;
      padding: 0.3rem 0.3rem 0.1rem;
      border: 1px black solid;
      font-size: 0.9rem;
      line-height: 1em;
      text-transform: lowercase;
      &.is-active {
        background: #000;
        color: white;
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
    background: white;
    /* width: 100vw; */
    /* padding-top: 26vw; */
    /* padding-bottom: 1rem; */
    /* padding-top: 3rem; */
    margin-bottom: -3rem;
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
    padding-top: 6vw;
    padding-bottom: 5rem;
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

}

.tagtitle {
  margin-bottom: 0.4rem;
}
.tags {
  width: 100%;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  line-height: 1em;
  text-transform: capitalize;
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
        background: #000;
        color: white;
      }
    }
    &.is-active {
      background: #000;
      color: white;
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
  margin-top: 0.9rem;
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
  height: 30vw;
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
  text-transform: lowercase !important;
  font-family: 'CE', Times, serif;
  font-style: italic;
}

</style>