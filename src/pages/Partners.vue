<template lang="pug">
  layout
    #partners
      //- xmp {{ $context.data.node.body[3] }}
      
      .page-wrapper
        .img-wrapper
          img(v-if='$context.data', :src="$context.data.node.body[1].url").mobile
          img(v-if='$context.data',:src="$context.data.node.body[3].url").desktop
</template>

<style lang="scss" scoped>
.img-wrapper {
  width: 100%;
  img {
    width: 100%;
    height: auto;
    max-width: 100%;
  }
}
@media (max-width: 960px) {
  #partners {
    padding-top: 1rem;
  }
}
@media (min-width: 960px) {
  #partners {
    padding: 7vw 2rem 5rem;
  }
}
</style>

<script>
export default {
  name: 'Partners',
  metaInfo() {
    return {
      title: this.$context.title
    }
  },
  computed: {
    page () {
      // return this.$context.data
    },
    // title () {
    //   // if (process.isClient) {
    //     return this.$context.data.node.title[0].text
    //   // }
    // },
    imgs () {
      // if (process.isClient) {
        // return this.$context.data.node.body.filter(el => el.type == 'image')
      // }
    },
    img1 () {
      // if (process.isClient) {
        // return this.imgs[0].url
      // }
      // return page.node.
    },
    img2 () {
      // if (process.isClient) {
        // return this.imgs[1].url
      // }
    }
  }
}
</script>