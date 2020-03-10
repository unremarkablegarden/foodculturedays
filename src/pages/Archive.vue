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
            .item(style="background-image: url(https://images.prismic.io/foodculturedays2020/70016f6a-2c5b-41bc-8adc-ed85add086f4_IMG_0901.jpg?auto=compress,format)")

            //- .item(style='padding: 10vw') The images are quite low-res in the archive so we can't use them big like this maybe... See sub-pages.

            //- prismic-image(:field='page.image', v-if='page.image')

        .column.is-6.left
          h1.title {{ title }}
          .year(v-for='(year, index) in years', :key='index')
            h2.serif {{ year.year }}

            .pages-wrapper
              g-link(:to='page.node.context.path', v-for='(page, index) in year.pages', :key='index').link
                .page
                  h2
                    em {{ tc(page.node.project[0].text) }}
                    div {{ tc(page.node.artist[0].text) }}
</template>

<style lang="scss" scoped>
h1 {
  margin-top: 0.3rem;
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
  font-size: 1.05rem;
}
.pages-wrapper {
  border-top: 1px black solid;
  // margin-top: 2rem;
  margin-bottom: 5rem;
}
.page {
  padding: 0.5rem 0 0.2rem;
  border-bottom: 1px black solid;
}
.link {
  color: black;
}
</style>

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
      lang: 'en'
    }
  },
  methods: {
    tc (text) {
      // return titleCaseFrench.convert(text)
      return text
    }
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
      years.sort()

      let structure = []

      years.forEach(year => {
        let p = pages.filter(el => el.node.year == year)

        p.sort((a, b) => {
          const sortA = a.node.artist[0].text
          const sortB = b.node.artist[0].text
          if(sortA < sortB) { return -1 }
          if(sortA > sortB) { return 1 }
          return 0
        })

        structure.push({
          year: year,
          pages: p
        })
      })

      return structure
    },
  },
  created () {
    if (process.isClient) {
      let lang = this.$context.lang
      if (lang.includes('fr')) { this.lang = 'fr' }
    }
  },
  watch: {
    $route (to){
      if (to.path.includes('fr')) {
        this.lang = 'fr'
      } else {
        this.lang = 'en'
      }
    }
  }
}
</script>
