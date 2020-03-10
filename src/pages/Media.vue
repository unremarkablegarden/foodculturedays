<template lang="pug">
  layout
    #media
      .columns
        .column.is-6.desktop.no-pad.gallery-column
          //- xmp {{ $context.image }}
          .gallery
            .item(v-if='$context.image', :style="'background-image: url('+$context.image.node.image.url+')'")
            //- .item(v-if='image', :style="'background-image: url('+image.url+')'")
          //- prismic-image(:field='page.image', v-if='page.image')

        .column.is-6.left
          h1.title {{ $context.pageTitle }}
          .year-wrapper(v-for='(page, index) in pages', :key='index')
            .year.serif {{ page.node.year }}
            .link-list
              .link(v-for='(link, index) in page.node.links' :key='index')
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

// desktop
@media (min-width: 960px) {
  h1.title {
    width: 50vw;
  }
  .column.is-6.left {
    padding-bottom: 5rem;
  }
}

.year {
  padding: 0.7rem 0 0 0;
}
.link-list {
  border-top: 1px black solid;
  margin-bottom: 1.3rem;
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

@media (min-width: 960px) {
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
  data () {
    return {
      image: false
    }
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
    // image () {
    //   if (!process.isClient) return
    //   return this.pages[0].image
    // }
  }
}
</script>