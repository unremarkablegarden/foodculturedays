<template lang="pug">
  layout
    .page-wrapper
      //- prismic-image(:field='page.image', v-if='page.image')
      prismic-rich-text(:field='page.title').title
      prismic-rich-text(:field='page.subtitle', v-if='page.subtitle').subtitle
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
      title: this.$context.plainTitle
    }
  },
  computed: {
    page () {
      return this.$context.node
    }
  }
}
</script>
