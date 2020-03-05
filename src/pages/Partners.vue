<template lang="pug">
  layout#partners
    .page-wrapper
      .title
        h1 {{ $context.title }}
      .img-wrapper
        img(:src="imgs1").mobile
        img(:src="imgs2", ).desktop

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