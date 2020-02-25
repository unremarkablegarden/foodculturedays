<template lang="pug">
  layout
    //- prismic-image(:field='page.image', v-if='page.image')
    prismic-rich-text(:field='page.title').title
    .content
      prismic-rich-text(:field='page.body')
</template>


<style lang="scss">
$green: #11ff36;

.title {
  position: sticky;
  top: 0rem;
  background: white;
  padding: 1rem 0 0rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 10px 20px 3px white;
}
.content {
  padding-bottom: 4rem;
  p {
    margin-top: 0;
    margin-block-start: 0;
  }
}
</style>



<script>
export default {
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
