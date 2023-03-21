<template lang="pug">
  layout
    #tags
      .columns
        .column.is-6.desktop.no-pad.gallery-column
          .gallery(v-if='image')
            .item(:style="'background-image: url('+constrainImageUrl(image)+')'")
        client-only
          .column.is-6.left
            //- xmp.item {{ $context }}
            h1.title {{ title }}
            .pages-wrapper
              .archive-item(v-for='(tag, index) in tags', :key='index')
                .page.link(@click='archiveRoute(tag.path)')
                  //- xmp {{ tag }}
                  h2
                    em(v-if='tag.project') {{ tag.project[0].text }}
                    div(v-if='tag.artist') {{ tag.artist[0].text }}
                    //- xmp {{ tag.path }}
                    //- xmp {{ tag.altPath }}
</template>

<script>
export default {
  data () {
    return {
    }
  },
  metaInfo() {
    return {
      title: this.$context.title
    }
  },
  methods: {
    constrainImageUrl (url) {
      if (url) {
        return url.replace('?auto=compress,format', '?fit=max&h=1600&w=1200&auto=compress,format=auto')
      } else {
        return rul
      }
    },
    // goBack () {
    //   if (!process.isClient) return
      
    //   let path = window.location.pathname
    //   path = path.replace(/\/$/, "")
    //   path = path.split('/')
    //   path.pop(); path.pop();
    //   this.$router.push(path.join('/'))
    // }
    archiveRoute (path) {
      console.log(path+'/')
      this.$router.push(path+'/')
    }
  },
  computed: {
    image () {
      if (this.page.length) {
        const rand = (min, max) =>  Math.floor(Math.random() * (max - min) + min)
        let max = this.page.length
        let r = rand(0,max)
        let post = this.page[r]
        let img
        if (post.image && post.image.url) {
          img = post.image.url  
        }
        if(img) return img
      }
    },
    title () {
      return this.$context.title
    },
    page () {
      return this.$context.node
    },
    tags () {
      return this.$context.node
    },
    lang () {
      let lang = this.page.lang
      if (lang.includes('fr')) { lang = 'fr' }
      else { lang = 'en' }
      return lang
    },
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