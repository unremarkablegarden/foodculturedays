<template lang="pug">
  layout
    .columns
</template>


<style lang="scss">
$green: rgb(17,230,54);
</style>

<script>
export default {
  name: 'Page',
  metaInfo() {
    return {
      title: 'Redirecting...'
    }
  },
  created () {
    if (!process.isClient) return
    
    // depuislacendredesforets.com
    const en = 'https://www.fromtheforestsashes.com/'
    
    window.location.replace(en);
  },
}
</script>
