<template lang="pug">
  layout
    .columns
      .column.is-6.desktop.no-pad.gallery-column
        .gallery
          .item(v-if='page.image', :style="'background-image: url('+page.image.url+')'")
          //- .item(v-else) Add a featured image to this page in Prismic
          //- prismic-image(:field='page.image', v-if='page.image')

      .column.is-6.left
        .back(@click='goBack')
          img(src='https://images.prismic.io/foodculturedays2020/dc97c761-a203-480b-be86-918aa8fc8add_close.png?auto=compress,format').close

        .image(v-if='page.image', :style="'background-image: url('+page.image.url+')'")
        .page-wrapper
          prismic-rich-text(:field='page.project').project-title
          prismic-rich-text(:field='page.artist').artist-title
          prismic-rich-text(:field='page.project_body').project-body
          prismic-rich-text(:field='page.artist_body').artist-body
</template>


<style lang="scss" >
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
  width: calc(100% + 1.4rem);
  height: 45vh;
  background-position-x: center;
  background-position-y: 0;
  background-size: cover;
  background-repeat: no-repeat;
  margin-left: -0.7rem;
  margin-bottom: 0.8rem;
}

.back {
  width: calc(100% + 1.4rem);
  // cursor: pointer;
  text-transform: uppercase;
  color: $green;
  text-align: right;
  font-size: $headingSize;
  background: white;
  // padding: 2rem 0.7rem 0.5rem;
  padding: 0.6rem 0.7rem 0.5rem;
  margin-left: -0.7rem;

  box-sizing: border-box;
  position: sticky;
  top: 0;
  z-index: 1010;
  img {
    height: 1.8rem;
    width: auto;
  }
}
@media (min-width: 960px) {
  .image {
    display: none;
    // margin-left: -1rem;
    // width: 50vw;
  }
  .back {
    // display: none;
    width: calc(50vw - 2.5rem);
    position: absolute;
    background: transparent;
    margin-top: 5.5vw;
    // text-align: left;
  }
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
        en: '←',
        fr: '←'
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
