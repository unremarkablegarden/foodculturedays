<template lang="pug">
  layout
    #media
      h1.title {{ $context.pageTitle }}
      .year-wrapper(v-for='(page, index) in pages', :key='index')
        .year.serif {{ page.node.year }}
        .link-list
          .link(v-for='(link, index) in page.node.links' :key='index')
            a(:href='link.link', target="_blank") {{ link.title }}

</template>

<style lang="scss" scoped>
// $green: #11ff36;
$green: rgb(17,230,54);

#media {
  padding-bottom: 5rem;
}
h1.title {
  background: white;
  padding: 2rem 0.7rem 0rem;
  width: 100vw;
  margin-left: -0.7rem;
  box-sizing: border-box;
  position: sticky;
  top: 0;
}
.year {
  padding: 0.7rem 0 0 0;
}
.link-list {
  border-top: 1px black solid;
  margin-bottom: 1.3rem;
}
.link {
  border-bottom: 1px black solid;
  padding: 0.15rem 0 0.05rem;
  a {
    color: black;
    text-transform: uppercase;
    font-size: 0.97rem;
  }
  // a:hover, a:active {
  //   color: $green;
  // }
  a:visited {
    opacity: 0.5;
  }
}
</style>

<script>
export default {
  metaInfo() {
    return {
      title: this.$context.pageTitle
    }
  },
  data () {
    return {
    }
  },
  computed: {
    pages () {
      if (!process.isClient) return

      let p = this.$context.data
      p.sort((a, b) => {
        const sortA = a.node.year
        const sortB = b.node.year
        if(sortA > sortB) { return -1 }
        if(sortA < sortB) { return 1 }
        return 0
      })
      return p
    }
  }
}
</script>