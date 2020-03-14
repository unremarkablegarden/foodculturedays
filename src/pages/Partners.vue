<template lang="pug">
  layout
    #partners
      //- xmp {{ $context }}
      .page-wrapper
        //- .title
          h1 {{ title }}
        .img-wrapper
          img(:src="img1").mobile
          img(:src="img2", ).desktop
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
@media (min-width: 960px) {
  #partners {
    padding: 6vw 2rem 5rem;
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
    title () {
      if (process.isClient) {
        return this.$context.data.node.title[0].text
      }
    },
    imgs () {
      if (process.isClient) {
        return this.$context.data.node.body.filter(el => el.type == 'image')
      }
    },
    img1 () {
      if (process.isClient) {
        return this.imgs[0].url
      }
    },
    img2 () {
      if (process.isClient) {
        return this.imgs[1].url
      }
    }
  }
}
</script>