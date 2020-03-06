<template lang="pug">
  layout
    #archive
      h1.title.unstick {{ title }}
      .year(v-for='(year, index) in years', :key='index')
        h1.title.bg-white {{ year.year }}

        g-link(:to='page.node.context.path', v-for='(page, index) in year.pages', :key='index').link
          .page
            h2
              em {{ tc(page.node.project[0].text) }}
              div {{ tc(page.node.artist[0].text) }}
</template>

<style lang="scss" scoped>
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
