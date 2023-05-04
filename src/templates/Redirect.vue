<template lang="pug">
layout
  .columns
</template>


<style lang="scss">
$green: rgb(17,230,54);
</style>

<script>
export default {
  name: 'Redirect',
  metaInfo() {
    return {
      title: 'Redirecting...'
    }
  },
  created () {
    if (!process.isClient) return

    if (this.$context && this.$context.node && this.$context.node.link) {
      window.location.replace(this.$context.node.link)
    } else {
      window.location.replace('/')
    }
  },
}
</script>
