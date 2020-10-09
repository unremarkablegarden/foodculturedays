<template lang="pug">
  layout
    .columns.tags-page
      .column.is-6.right.posts-col
        .inner(v-if='!moving')
          //- br
          .links(v-if='posts')
            //- xmp {{ posts }}
            .link(@click='archiveRoute(page.path)', v-for='(page, i) in posts', :key='i')
              h2
                em {{ ucfirst(page.project[0].text) }}
                div {{ ucfirst(page.artist[0].text) }}
                
          .selectMsg(v-else)
            h3 
              em {{ selectMsg }}
            
      .column.is-6.left.tags-col
        //- .desktop.no-pad.gallery-column
        .tags
          .tag(
              v-for='(tags, tagName) in data', 
              @click='tagToggle(tagName)',
              v-bind:class='toggledTag(tagName)'
            )
            .name {{ ucfirst(tagName) }}
      
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.$context.title
    }
  },
  data () {
    return {
      moving: false,
      toggledTags: []
    }
  },
  computed: {
    data () {
      return this.$context.data
    },
    lang () {
      return this.$context.lang
    },
    selectMsg () {
      if (this.lang == 'fr') return 'Sélectionner des balises'
      else return 'Select tags'
    },
    posts () {
      if (this.toggledTags.length) {
        let posts = []
        
        // combine arrays
        this.toggledTags.forEach(tag => {
          if (this.data[tag]) {
            posts = [...posts, ...this.data[tag]]  
          }
        })
        
        // remove duplicates
        let added = []
        let postsFiltered = []
        posts.forEach(post => {
          let title = post.project[0].text
          if (! added.includes(title) ) {
            added.push(title)
            postsFiltered.push(post)
          }
        })
        
        function compare(a, b) {
          const atitle = a.project[0].text,
                btitle = b.project[0].text
          if (atitle > btitle) return 1
          else if (atitle < btitle) return -1
          else return 0
        }
        postsFiltered.sort(compare)
        
        return postsFiltered
      }
    }
  },
  methods: {
    tagToggle (tag) {
      if (! this.toggledTags.includes(tag)) {
        this.toggledTags.push(tag)
      } else {
        this.toggledTags = this.toggledTags.filter(item => item !== tag)
      }
    },
    archiveRoute (path) {
      // this.toggledTags = []
      this.moving = true
      console.log(path+'/')
      this.$router.push(path+'/')
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
    padding-top: 2.3rem;
  }
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
</style>