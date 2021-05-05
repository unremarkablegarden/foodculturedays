<template lang="pug">
  layout
    .columns
      .column.is-6.desktop.no-pad.gallery-column
        .gallery
          .item(v-if='page.image', :style="'background-image: url('+page.image.url+')'")
          .item(v-else) Add a featured image to this page in Prismic
          //- prismic-image(:field='page.image', v-if='page.image')

      .column.is-6.left
        .page-wrapper
          prismic-rich-text(:field='page.title').title
          prismic-rich-text(:field='page.subtitle', v-if='page.subtitle').subtitle
          .content
            prismic-rich-text(v-if='page.body', :field='page.body')

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
      title: this.$context.plainTitle
    }
  },
  data () {
    return {
      gallery: false
    }
  },
  computed: {
    page () {
      return this.$context.node
    }
  }
}
</script>
