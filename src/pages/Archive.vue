<template lang="pug">
  layout
    #archive
      .columns
        .column.is-6.desktop.no-pad.gallery-column
          .gallery
            .item(style="background-image: url(https://images.prismic.io/foodculturedays2020/f23c2ded-df54-4f93-8013-d436bcc2e68d_2020_09_25_RAW_academie_Anna_Tje%CC%81-5-2+c.+Mathilde+Assier+copie.jpg??fit=max&h=1600&w=1200auto=compress,format); background-position: center center; background-size: cover;")

        client-only
          .column.is-6.left
            h1.title {{ title }}
            .year(v-for='(year, index) in years', :key='index')
              h2.serif 
                span {{ year.year }}
                template(v-if='year.year === "2020"') 
                  span &nbsp;
                  span(v-if='lang === "fr"') PROGRAMME RADIO
                  span(v-else) RADIO PROGRAM

              .pages-wrapper
                .archive-item(v-for='(page, index) in year.pages', :key='index')
                  template(v-if='page && page.node && page.node.context.path && !page.node.hide_from_archive')
                    .page.link(@click='archiveRoute(page.node.context.path)')
                      h2                        
                        div(v-if='!page.node.artist && !page.node.project') 
                          strong ERROR with this page. Fix in Prismic:
                          xmp(style='text-transform: none;') {{ page.node }}
                        em(v-if='page.node.project') {{ tc(page.node.project[0].text) }}
                        div(v-if='page.node.artist') {{ tc(page.node.artist[0].text) }}
                        //- div(v-if='page.node?.program')
                          //- xmp {{ page.node.context.path }}
                          //- xmp {{ archiveRoute(page.node.context.path) }}
                          //- xmp {{ page.node.hide_from_archive }}
                  
                  template(v-else-if='page.biennale == true')
                    a.page.link(href='https://prismic-io.s3.amazonaws.com/foodculturedays2020/a80190aa-f2e5-404d-8e09-f5f3aac82945_2023_fcd_catalog_digital.pdf', target='_blank', style='color: black; display: block;')
                        h2(v-if='lang === "en"')
                          em Art Biennale 2023
                          div Devouring the Soil’s Words
                        h2(v-else)
                          em Biennale d'art 2023
                          div Dévorer les paroles de la terre
                    
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
      lang: 'fr'
    }
  },
  methods: {
    tc (text) {
      return text
    },
    archiveRoute (path) {
      this.$router.push(path+'/')
    }
    
  },
  
  mounted () {
    if (!process.isClient) return
    let lang = this.$store.state.lang
    if (!lang) {
      let path = window.location.pathname
      if (path.includes('en/')) { this.lang = 'en' }
  
    } else {
      this.lang = lang
    }
    // console.log(this.program)
  },
  computed: {
    pages () {
      return this.$context.data
    },
    title () {
      return this.$context.title
    },
    program () {
      let program = this.$context.program
      program.forEach(el => {
        el.node.program = true
      })
      return program
    },
    pagesAndProgram () {
      return [...this.pages, ...this.program]
    },
    years () {
      if (!process.isClient) return

      const t = this
      // const pages = this.pages
      const pages = this.pagesAndProgram

      let years = []
      // this.pages.forEach(page => {
      pages.forEach(page => {
        const year = page.node.year
        if (!years.includes(year)) {
          years.push(year)
        }
      })
      years.sort().reverse()

      let structure = []

      years.forEach(year => {
        let p = pages.filter(el => el.node.year == year)

        p.sort((a, b) => {
          const Aartist = a.node.artist ? a.node.artist[0].text : false
          const Aproject = a.node.project ? a.node.project[0].text : a.node._meta.uid
          
          const Bartist = b.node.artist ? b.node.artist[0].text : false
          const Bproject = b.node.project ? b.node.project[0].text : b.node._meta.uid
          
          const sortA = Aartist ? Aartist : Aproject
          const sortB = Bartist ? Bartist : Bproject
          
          if(sortA > sortB) { return -1 }
          if(sortA < sortB) { return 1 }
          return 0
        })

        structure.push({
          year: year,
          pages: p
        })
      })
      
      // let attached = false
      // structure.forEach(s => {
      //   if (s.year == 2023) {
      //     const pdf = {
      //       biennale: true
      //     }
      //     s.pages.push(pdf)
      //     attached = true
      //   }
      // })
      
      // if (!attached) {
        // structure.push({
        //   year: 2023,
        //   pages: [{
        //     biennale: true
        //   }]
        // })
        // structure.sort((a, b) => {
        //   if (a.year > b.year) { return -1 }
        //   if (a.year < b.year) { return 1 }
        //   return 0
        // })
      // }
      
      // console.log(structure)
      
      return structure
    },
  },
  watch: {
    $route (to){
      if (to.path.includes('fr/')) {
        this.lang = 'fr'
      } else {
        this.lang = 'en'
      }
    }
  }
}
</script>



<style lang="scss" scoped>

h1 {
  margin-bottom: 1rem;
}
h2 {
  font-size: 0.98rem;
  margin: 0;
  padding: 0;
  font-weight: normal;
  text-transform: uppercase;
}
em {
  font-size: 1.07rem;
}
.pages-wrapper {
  border-top: 1px black solid;
  // margin-top: 2rem;
  margin-bottom: 2rem;
}

.column.is-6.left {
  padding-bottom: 5rem;
}
.page {
  padding: 0.5rem 0 0.2rem;
  border-bottom: 1px black solid;
}
.link {
  color: black;
}
</style>
