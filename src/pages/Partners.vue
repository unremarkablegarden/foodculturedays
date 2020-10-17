<template lang="pug">
  layout
    #partners
      .page-wrapper
        //- xmp {{ this.$context.data.node.gallery }}
        .img-wrapper(v-if='$context.data')
          img(:src="image.mobile").mobile
          img(:src="image.desktop").desktop
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
/* @media (max-width: 960px) { */
@media (max-width: 736px) {
  #partners {
    padding-top: 1rem;
  }
}
/* @media (min-width: 960px) { */
@media (min-width: 737px) {
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
    image() {
      let images = {
        mobile: null,
        desktop: null,
      }      
      if (this.$context.data.node.gallery.length) {
        let i1 = this.$context.data.node.gallery[0]
        let i2 = this.$context.data.node.gallery[1]
        if (i1.item.dimensions.width >= i2.item.dimensions.width) {
          images.mobile = i2.item.url
          images.desktop = i1.item.url
        }
      }
      
      return images
    },
  }
}
</script>