<template lang="pug">
  layout
    #archive
      .columns
        .column.is-6.desktop.no-pad.gallery-column
          .gallery
            //- .year(v-for='(year, index) in years', :key='index')
            //-   //- h2.serif {{ year.year }}
            //-   .item(v-for='(page, index) in year.pages', :key='index', v-if='page.node.image.url', :style="'background-image: url('+page.node.image.url+')'")

            //- .item(v-if='page.image', :style="'background-image: url('+page.image.url+')'")
            
            //- .item(style="background-image: url(https://images.prismic.io/foodculturedays2020/70016f6a-2c5b-41bc-8adc-ed85add086f4_IMG_0901.jpg?auto=compress,format)")
            
            .item(style="background-image: url(https://images.prismic.io/foodculturedays2020/f23c2ded-df54-4f93-8013-d436bcc2e68d_2020_09_25_RAW_academie_Anna_Tje%CC%81-5-2+c.+Mathilde+Assier+copie.jpg??fit=max&h=1600&w=1200auto=compress,format); background-position: center center; background-size: cover;")

            //- .item(style='padding: 10vw') The images are quite low-res in the archive so we can't use them big like this maybe... See sub-pages.

            //- prismic-image(:field='page.image', v-if='page.image')
        client-only
          .column.is-6.left
            h1.title {{ title }}
            
            //- 2023 pdf
            //- .year
            //-   h2.serif 
            //-     span 2023
            //-   .pages-wrapper.page
            //-       .archive-item
            //-         a(href='https://prismic-io.s3.amazonaws.com/foodculturedays2020/a80190aa-f2e5-404d-8e09-f5f3aac82945_2023_fcd_catalog_digital.pdf', target='_blank', style='color: black; display: block;')
            //-           h2(v-if='lang === "en"')
            //-             em Art Biennale 2023
            //-             div Devouring the Soil’s Words
            //-           h2(v-else)
            //-             em Biennale d'art 2023
            //-             div Dévorer les paroles de la terre
            
            .year(v-for='(year, index) in years', :key='index')
              h2.serif 
                span {{ year.year }}
                template(v-if='year.year === "2020"') 
                  span &nbsp;
                  span(v-if='lang === "fr"') PROGRAMME RADIO
                  span(v-else) RADIO PROGRAM

              .pages-wrapper
                .archive-item(v-for='(page, index) in year.pages', :key='index')
                  //- g-link(:to='page.node.context.path', v-for='(page, index) in year.pages', :key='index').link
                  template(v-if='page && page.node && page.node.context.path')
                    .page.link(@click='archiveRoute(page.node.context.path)')
                      h2
                        
                        div(v-if='!page.node.artist && !page.node.project') 
                          strong ERROR with this page. Fix in Prismic:
                          xmp(style='text-transform: none;') {{ page.node }}
                        em(v-if='page.node.project') {{ tc(page.node.project[0].text) }}
                        div(v-if='page.node.artist') {{ tc(page.node.artist[0].text) }}
                  
                  template(v-else-if='page.biennale == true')
                    //- .archive-item
                    a.page.link(href='https://prismic-io.s3.amazonaws.com/foodculturedays2020/a80190aa-f2e5-404d-8e09-f5f3aac82945_2023_fcd_catalog_digital.pdf', target='_blank', style='color: black; display: block;')
                        h2(v-if='lang === "en"')
                          em Art Biennale 2023
                          div Devouring the Soil’s Words
                        h2(v-else)
                          em Biennale d'art 2023
                          div Dévorer les paroles de la terre
                    
</template>

<script>
// var titleCaseFrench = require('titlecase-french')

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
      // return titleCaseFrench.convert(text)
      return text
    },
    archiveRoute (path) {
      // console.log(path+'/')
      this.$router.push(path+'/')
    }
    // linkclicked (el) {
    //   console.log(el);
    // }
  },
  // created () {
    // if (process.isClient) {
      // let lang = this.$context.lang
      // if (lang.includes('fr')) { this.lang = 'fr' }
    // }
  // },
  mounted () {
    if (!process.isClient) return
    let lang = this.$store.state.lang
    if (!lang) {
      let path = window.location.pathname
      if (path.includes('en/')) { this.lang = 'en' }
      // if (path == '/en' || path.includes('/en/')) {
      //   lang = 'en'
      // } else if (path == '/fr' || path.includes('/fr/')) {
      //   lang = 'fr'
      // }
    } else {
      this.lang = lang
    }
    // if (lang.includes('fr')) { this.lang = 'fr' }
  },
  computed: {
    pages () {
      return this.$context.data
    },
    title () {
      return this.$context.title
    },
    years () {
      if (!process.isClient) return

      const t = this
      const pages = this.pages

      let years = []
      this.pages.forEach(page => {
        const year = page.node.year
        if (!years.includes(year)) {
          years.push(year)
        }
      })
      years.sort().reverse()

      let structure = []

      years.forEach(year => {
        let p = pages.filter(el => el.node.year == year)
        
        // console.log(p)

        p.sort((a, b) => {
          const Aartist = a.node.artist ? a.node.artist[0].text : false
          const Aproject = a.node.project ? a.node.project[0].text : a.node._meta.uid
          
          const Bartist = b.node.artist ? b.node.artist[0].text : false
          const Bproject = b.node.project ? b.node.project[0].text : b.node._meta.uid
          
          const sortA = Aartist ? Aartist : Aproject
          const sortB = Bartist ? Bartist : Bproject
          
          // const sortA = a.node.artist ? a.node.artist[0].text : a.node.project[0].text
          // const sortB = b.node.artist ? b.node.artist[0].text : b.node.project[0].text
          
          if(sortA > sortB) { return -1 }
          if(sortA < sortB) { return 1 }
          return 0
        })

        structure.push({
          year: year,
          pages: p
        })
      })

      // console.log(structure)
      
      structure.forEach(s => {
        if (s.year == 2023) {
          const pdf = {
            biennale: true
          }
          s.pages.push(pdf)
        }
      })
      
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
  // margin-top: 0.3rem;
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
  // font-size: 1.05rem;
  font-size: 1.07rem;
}
.pages-wrapper {
  border-top: 1px black solid;
  // margin-top: 2rem;
  margin-bottom: 2rem;
}

// replaces pages-wrapper (not year titles)
// h1.title {
//   border-bottom: 1px black solid;
//   margin-bottom: 0;
//   padding-bottom: 1rem;
// }

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
