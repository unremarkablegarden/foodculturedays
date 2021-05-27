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
    const lang = navigator.language || navigator.userLanguage
    const fr = 'http://depuislacendredesforets.com/'
    const en = 'https://www.fromtheforestsashes.com/'
    let link = en
    if (lang.includes('fr')) link = fr
    window.location.replace(link)
  },
}
</script>
