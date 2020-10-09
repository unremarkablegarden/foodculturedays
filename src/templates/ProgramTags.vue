<template lang="pug">
  layout
    .columns.tags-page.scroll
      .column.is-6.right
        .inner
          .flex-wrapper
            .flex
              h2.tagtitle {{ locationsTitle }}
              .locations
                .location(v-for='loc in locations', :key='loc', @click='locationToggle(loc)', v-bind:class='toggledLocation(loc)') {{ loc }}
                
            .flex
              h2.tagtitle Dates
              .dates
                .date(v-for='date in dates', @click='dateToggle(date)', v-bind:class='toggledDate(date)')  {{ date }}
          
          h2.tagtitle {{ activitiesTitle }}
          .categories.tags
            //- xmp {{ categories }}
            .category(v-for='cat in categories', :key='cat', v-bind:class='toggledCat(cat)', @click='catToggle(cat)').tag
              span {{ cat }}
              
          h2.tagtitle {{ themesTitle }}
          .tags
            //- xmp {{ tags }}
            .tag(
                v-for='(tag, i) in tags', 
                @click='tagToggle(tag)'
                v-bind:class='toggledTag(tag)'
              )
              //- .name {{ ucfirst(tag) }}
              .name {{ tag }}
            
      .column.is-6.left.posts-col
        .inner(v-if='!moving')
          br
          .links(v-if='program.length')
            .link(v-for='(p, i) in filteredProgram', @click='programRoute(p.node._meta.uid)', :key='i')
              //- xmp {{ p.node._meta.uid }}
              //- .date {{ formatDate(p.node.date_time) }}
              .image
                img(:src='p.node.image.url', v-if='p.node.image')
                div(v-else) &nbsp;

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
    }
  },
  computed: {
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
          sel.push(this.formatDate(x.node.date_time))
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
            return this.toggledDates.includes(this.formatDate(p.node.date_time))
          }
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
          p.node.categories.forEach(c => pCats.push(c.category.name))
          
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
    formatDate (date) {
      if (this.lang == 'fr') return format(new Date(date), 'c MMMM', { locale: frLocale })
      else return format(new Date(date), 'c MMMM')
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

/* @media (max-width: 960px) { */
@media (min-width: 737px) {
  .columns {
    display: flex;
    flex-direction: column-reverse;
  }
  .posts-col {
    /* margin-top: 1rem; */
    padding-top: 1rem;
    /* padding-top: 3rem; */
  }
  .tags-col {
    padding-top: 1rem;
    margin-top: 4rem;
  }
  .links {
    margin-top: 0 !important;
    margin-bottom: 5rem;
  }
}
/* @media (min-width: 960px) { */
@media (min-width: 737px) {
  .posts-col {
    padding-top: 6vw;
  }
}

.tagtitle {
  margin-bottom: 0.4rem;
}
.tags {
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
  margin-top: 1.9rem;
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

.locations, .dates {
  margin-bottom: 2rem;
  font-size: 0.95rem;
  .location, .date {
    /* margin-bottom: 0.1rem; */
    /* background: red; */
    &:before {
      content: '';
      background-image: url(https://prismic-io.s3.amazonaws.com/foodculturedays2020/f5ad4715-275e-4423-a617-7036a66d82c1_Asset+4.svg);
      background-size: 1rem auto;
      background-position: 0 4.15px;
      /* background-color: pink; */
      background-repeat: no-repeat;
      display: inline-block;
      height: 1.6rem;
      width: 1.1rem;
      margin-right: 0.8rem;
      transform: translateY(0.4rem);
    }
    &.is-active {
      &:before {
        background-image: url(https://prismic-io.s3.amazonaws.com/foodculturedays2020/2b2b5e66-db76-474a-80f8-1369f060d844_Asset+3.svg);
        background-size: 1rem auto;
        background-position: 0 0;
        
      }
    }
  }
}
.flex-wrapper {
  display: flex;
  .flex {
    width: 50%;
  }
}

.columns.scroll {
  .column {
    height: 100vh;
    overflow: auto;
    /* height: 100%; */
    /* overflow-y: auto; */
  }  
}

.image {
  height: 7rem;
  width: 100%;
  background: #fee;  
  display: block;
  margin: 0 0 0.5rem;
}

</style>