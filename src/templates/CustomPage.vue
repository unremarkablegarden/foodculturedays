<template lang="pug">
  layout
    .columns
      //- .column.is-6.desktop.no-pad.gallery-column
      //-   .gallery
      //-     .item(v-if='page.image', :style="'background-image: url('+page.image.url+')'")
      //-     .item(v-else) Add a featured image to this page in Prismic
      //-     //- prismic-image(:field='page.image', v-if='page.image')

      .column.is-6.left
        .page-wrapper
          //- prismic-rich-text(:field='page.title').title
          .title {{ page.title }}
          //- prismic-rich-text(:field='page.subtitle', v-if='page.subtitle').subtitle
          .content
            prismic-rich-text(:field='page.body')

          Newsletter

</template>


<style lang="scss">
// $green: #11ff36;
$green: rgb(17,230,54);
</style>

<script>
import Newsletter from '~/components/Newsletter.vue'

export default {
  components: {
    Newsletter
  },
  name: 'Page',
  metaInfo() {
    return {
      title: 'Coming soon'
    }
  },
  data () {
    return {
      gallery: false
    }
  },
  created () {
    if (!process.isClient) return
    window.location.replace("/en/chapter2");
  },
  computed: {
    page () {
      return this.$context.node
    }
  }
}
</script>
