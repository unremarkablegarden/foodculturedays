<template lang="pug">
  layout
    #media
      .columns
        .column.is-6.desktop.no-pad.gallery-column
          .gallery
            //- xmp {{ image }}
            .item(:style="'background-image: url('+constrainImageUrl(image)+')'")
            //- .item(v-if='$context.image', :style="'background-image: url('+$context.image.node.image.url+')'")
            //- .item(v-if='image', :style="'background-image: url('+image.url+')'")
          //- prismic-image(:field='page.image', v-if='page.image')

        .column.is-6.left
          h1.title {{ $context.pageTitle }}
          .hr &nbsp;
          .year-wrapper(v-for='(page, index) in pages', :key='index')
            //- .year.serif {{ page.node.year }}
            .year.serif(v-if='page.node.title') {{ page.node.title[0].text }}
            .link-list
              .link(v-for='(link, index) in page.node.links' :key='index', v-if='link.title')
                a(:href='link.link', target="_blank") {{ link.title }}

</template>

<style lang="scss" scoped>
// $green: #11ff36;
$green: rgb(17,230,54);

#media {
  padding-bottom: 5rem;
}
h1.title {
  background: white;
  padding: 2rem 0.7rem 0rem;
  margin-left: -0.7rem;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  width: 100vw;
}

.hr {
  // font-size: 0;
  // line-height: 0;
  height: 1rem;
  border-bottom: 1px black solid;
}

// desktop
/* @media (min-width: 960px) { */
@media (min-width: 737px) {
  h1.title {
    // width: 50vw;
    width: auto;
  }
  .column.is-6.left {
    padding-bottom: 5rem;
  }
}

.year {
  padding: 0.7rem 0 0 0;
  /* display: none; */
}
.link-list {
  // border-top: 1px black solid;
}
.link-list {
  // border-top: 1px black solid;
  // margin-bottom: 1.3rem;
}
.link {
  border-bottom: 1px black solid;
  padding: 0.15rem 0 0.05rem;
  a {
    color: black;
    text-transform: uppercase;
    font-size: 0.97rem;
  }
  // a:hover, a:active {
  //   color: $green;
  // }
  a:visited {
    opacity: 0.5;
  }
}

/* @media (min-width: 960px) { */
@media (min-width: 737px) {
  .column.left {
    padding-right: 2.7rem;
  }
}
</style>

<script>
export default {
  metaInfo() {
    return {
      title: this.$context.pageTitle,
    }
  },
  // data () {
  //   return {
  //     image: false
  //   }
  // },
  // created () {
  //   if (!process.isClient) return
  //   this.image = this.pages[0].node.image.url
  // },
  methods: {
    constrainImageUrl (url) {
      let newUrl = url.replace('?auto=compress,format', '?fit=max&h=1600&w=1200&auto=compress,format=auto')
      console.log(newUrl)
      return newUrl
    },
  },
  computed: {
    pages () {
      if (!process.isClient) return

      let p = this.$context.data
      p.sort((a, b) => {
        const sortA = a.node.year
        const sortB = b.node.year
        if(sortA > sortB) { return -1 }
        if(sortA < sortB) { return 1 }
        return 0
      })
      return p
    },
    image () {
      if (!process.isClient) return
      return this.pages[0].node.image.url || false
    }
  }
}
</script>