<template lang="pug">
  #loader
    img(alt='FOODCULTURE days', :src='$store.state.img.blobMobile')
</template>

<script>
// this.$store.commit('setLang', this.langs[l])
export default {
  name: 'loader',
  data () {
    return {
    }
  },
  created () {
    var t = this
    setTimeout(function () {
      t.$store.commit('setLoaded', true)
    }, 0)
  }
  // computed: {
  //   loaded () {
  //     // this.$store.commit('setLang', this.langs[l])
  //     return this.$store.state.loading
  //   }
  // }
}
</script>