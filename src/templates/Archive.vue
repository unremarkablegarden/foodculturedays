<template lang="pug">
  layout
    .back(@click='goBack') {{ back[lang] }}
    .image(v-if='page.image', :style="'background-image: url('+page.image.url+')'")
    .page-wrapper
      prismic-rich-text(:field='page.project').project-title
      prismic-rich-text(:field='page.artist').artist-title
      prismic-rich-text(:field='page.project_body').project-body
      prismic-rich-text(:field='page.artist_body').artist-body
</template>


<style lang="scss">
// $green: #11ff36;
$green: rgb(17,230,54);
$headingSize: 2.2rem;


.project-title, .artist-title {
  * {
    font-size: 1.7rem;
    color: black;
  }
}
.project-title {
  font-family: 'CE', Times, serif;
  font-style: italic;
}

.image {
  width: 100vw;
  height: 45vh;
  background-position-x: 0;
  background-position-y: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-left: -0.7rem;
  margin-bottom: 0.8rem;
}

.back {
  cursor: pointer;
  text-transform: uppercase;
  color: $green;
  text-align: right;
  font-size: $headingSize;
  background: white;
  padding: 2rem 0.7rem 0.5rem;
  width: 100vw;
  margin-left: -0.7rem;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  z-index: 1010;
}
</style>



<script>
// import Newsletter from '~/components/Newsletter.vue'

export default {
  components: {
    // Newsletter
  },
  data () {
    return {
      back: {
        en: 'X',
        fr: 'X'
      }
    }
  },
  metaInfo() {
    return {
      title: this.$context.plainTitle
    }
  },
  methods: {
    goBack () {
      if (!process.isClient) return

      let path = window.location.pathname.split('/')
      path.pop(); path.pop();
      this.$router.push(path.join('/'))
    }
  },
  computed: {
    page () {
      return this.$context.node
    },
    lang () {
      let lang = this.page._meta.lang
      if (lang.includes('fr')) { lang = 'fr' }
      else { lang = 'en' }
      return lang
    },
    // newsletterText () {
    //   const en = 'Join our newsletter'
    //   const fr = 'Abonnez-vous à notre newsletter'
    //   if (this.lang == 'fr') { return fr }
    //   else { return en }
    // }
  }
}
</script>
