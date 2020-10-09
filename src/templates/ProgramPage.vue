<template lang="pug">
  layout
    .columns.program-page
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
          .tags(v-if='page._meta.tags')
            g-link.tag(:to="tagLink(tag)", v-for='(tag,i) in page._meta.tags', :key='i').link
              .name {{ tag }}
          prismic-rich-text(:field='page.project', v-if='page.project').project-title
          prismic-rich-text(:field='page.artist', v-if='page.artist').artist-title
          prismic-rich-text(:field='page.project_body', v-if='page.project_body').project-body
          prismic-rich-text(:field='page.artist_body', v-if='page.artist_body').artist-body
</template>

<style lang="scss" scoped>
  .page-wrapper {
    margin-top: 1.6rem;
  }
</style>

<style lang="scss">
// $green: #11ff36;
$green: rgb(17,230,54);
$headingSize: 2.2rem;


.project-title, .artist-title {
  // background: pink;
  * {
    font-size: 1.7rem;
    color: black;
    font-weight: normal;
  }
}
.project-title {
  font-family: 'CE', Times, serif;
  font-style: italic;
  h2 {
    text-transform: uppercase;
    // color: #11e636;
    // font-weight: normal;
    margin: 0 0 0.3rem 0;
    padding: 0;
    line-height: 1em;
    font-size: 1.7rem;
    margin-left: -0.15rem;
  }
}
.project-body, .artist-body {
  strong {
    font-weight: normal !important;
  }
}

p em {
  &:after, &:before {
    content: ' '
  }
}

.tags {
  margin-bottom: 1rem;
  font-size: 0.9rem;
  line-height: 1em;
  text-transform: capitalize;
  .tag {
    border: 1px black solid;
    color: black;
    display: inline-block;
    margin: 0 0.5rem 0.5rem 0;
    padding: 0.3rem 0.2rem 0.1rem;
    // transition: all 200ms;
    &:hover {
      background: #000;
      color: white;
      // transition: all 200ms;
      // transform: scale(1.1) rotate(-3deg);
    }
  }
}


.image {
  width: calc(100% + 1.4rem);
  height: 45vh;
  background-position-x: center;
  background-position-y: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-left: -0.7rem;
  margin-bottom: 0.8rem;
}

.back {
  // width: calc(100% + 1.4rem);
  // cursor: pointer;
  text-transform: uppercase;
  color: $green;
  text-align: right;
  font-size: $headingSize;
  // background: white;
  // padding: 2rem 0.7rem 0.5rem;
  padding: 0.6rem 0.7rem 0.5rem;
  // margin-left: -0.7rem;
  box-sizing: border-box;
  // position: sticky;
  
  
  z-index: 1010;
  background: transparent;
  
  img {
    height: 1.8rem;
    width: auto;
  }
}

// MOBILE
/* @media (max-width: 960px) { */
@media (max-width: 736px) {
  .back {
    // top: 45vh;
    position: sticky;
    // position: relative;
    // background: pink;
    // background: white;
    background: white;
    width: 100vw;
    margin-left: -0.7rem;
    top: 0;
    // display: inline;  
  }
  .layout {
    // position: relative;
    // z-index: 999;
  }

}

// DEKSTOP
/* @media (min-width: 960px) { */
@media (min-width: 737px) {
  .image {
    display: none;
    // margin-left: -1rem;
    // width: 50vw;
  }
  .tags {
    width: 90%;
  }
  .back {
    top: 6vw;
    margin-top: 1rem;
    right: 2rem;
    // display: none;
    // width: calc(50vw - 2.5rem);
    // position: fixed;
    background: transparent;
    width: 3rem;
    // background: pink;
    // float: right;
    // margin-right: -2rem;
    // margin-top: 5.5vw;
    // left: 2rem;
    // top: 1rem;
    // width: 2rem;
    z-index: 99;
    // top: 0;
    // margin-top: 4rem;
    // right: 0rem;

    position: absolute;
    // text-align: left;
  }
  .project-title, .artist-title {
    width: 90%;
  }
}

</style>



<script>
// import Newsletter from '~/components/Newsletter.vue'
var slug = require('slug')

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
    tagLink (tag) {
      let ret
      if (this.lang == 'fr') {
        ret = '/fr/programme/themes/'
      } else {
        ret = '/en/program/themes/'
      }
      return ret + slug(tag) + '/'
    },
    goBack () {
      if (!process.isClient) return
      
      let path = window.location.pathname
      path = path.replace(/\/$/, "")
      path = path.split('/')
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
