<template lang="pug">
  layout
    .columns.program-page
      .column.is-6.no-pad.gallery-column
        .gallery(v-if='page.gallery.length && page.gallery[0].gallery_image !== null').slider
          //- xmp {{ page.gallery }}
          .items
            .item(v-for='(item, i) in page.gallery', :style="'background-image: url('+item.gallery_image.url+')'", :data-n='i', :class='{ "is-active": (i == gallery.n)  }', @click='mobileNext()')
          .dots
            .dot(v-for='(item, i) in page.gallery', :data-n='i', :class='{ "is-active": (i == gallery.n)  }')
          .control
            .left(@click='galleryNav("-1")')
            .right(@click='galleryNav("+1")')
          
        .gallery(v-if='page.image && !page.gallery.length')
          .item(:style="'background-image: url('+page.image.url+')'")

      .column.is-6.left
        .back(@click='goBack')
          img(src='https://images.prismic.io/foodculturedays2020/dc97c761-a203-480b-be86-918aa8fc8add_close.png?auto=compress,format').close
        
        //- .image(v-if='page.image', :style="'background-image: url('+page.image.url+')'")
        
        .page-wrapper
          //- xmp {{ page.categories }}
          .tags(v-if='page.categories').categories
            .tag(v-for='cat in page.categories', v-if='cat.category !== null') {{ cat.category.name }}
          .tags(v-if='page._meta.tags').normal-tags
            .tag(v-for='(tag,i) in page._meta.tags', :key='i') {{ tag }}
            //- g-link.tag(:to="tagLink(tag)", v-for='(tag,i) in page._meta.tags', :key='i').link
            //-   .name {{ tag }}
          
          table.meta
            tr.date(v-if='page.date_time && !page.extra_days') 
              td.label Date
              td {{ formatDate(page.date_time) }}
            tr.date(v-else-if='page.date_time && page.extra_days') 
              td.label 
                span(v-if='fr') Dater
                span(v-else) Dates
              td 
                //- xmp {{ page.date_time }}
                //- xmp {{ page.extra_days }}
                | {{ formatDate(page.date_time) }}
                div(v-for='extra in page.extra_days', v-if='"date" in extra')
                  //- xmp {{ extra.extra_day }}
                  //- | , {{ formatDate(extra.extra_day) }}
                  | {{ formatDate(extra.extra_day) }}
            tr.location(v-if='page.location')
              td.label(v-if='fr') Lieu
              td.label(v-else) Venue
              td {{ page.location.location[0].text }}
            tr.price(v-if='page.price')
              td.label(v-if='fr') Prix
              td.label(v-else) Price
              td {{ page.price }} 
            tr.duration(v-if='page.duration || page.duration_richtext')
              td.label(v-if='fr') Durée
              td.label(v-else) Duration
              td(v-if='page.duration_richtext').duration-text
                prismic-rich-text(:field='page.duration_richtext')
              td(v-else)
                | {{ page.duration }} 
            tr.participants(v-if='page.participants')
              td(v-if='fr').label Remarquer
              td(v-if='fr')
                | Capacité maximale de {{ page.participants }} personnes
              td(v-if='en').label Note
              td(v-if='en')
                | Maximum capacity of {{ page.participants }} people
            tr.activation(v-if='page.activation')
              td.label Activation
              td {{ page.activation }}
              
              
          prismic-rich-text(:field='page.project', v-if='page.project').project-title
          prismic-rich-text(:field='page.artist', v-if='page.artist').artist-title
          
          prismic-rich-text(:field='page.project_body', v-if='page.project_body').project-body
          prismic-rich-text(:field='page.artist_body', v-if='page.artist_body').artist-body
</template>





<script>
// import Newsletter from '~/components/Newsletter.vue'
import {format} from 'date-fns'
import frLocale from 'date-fns/locale/fr-CH'
var slug = require('slug')

export default {
  components: {
    // Newsletter
  },
  data () {
    return {
      gallery: {
        n: 0,
      },
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
    mobileNext() {
      this.galleryNav('+1')
    },
    galleryNav(dir) {
      if (this.page.gallery) {
        const max = this.page.gallery.length -1
        let frame = this.gallery.n
        if (dir == '+1') frame += 1
        else if (dir == '-1') frame -= 1
        if (frame < 0) frame = max
        if (frame > max) frame = 0
        this.gallery.n = frame
      }
    },
    t (t1, t2) {
      if (this.lang == 'fr') return t2
      else t1
    },
    formatDate (date) {
      let checkTime = format(new Date(date), 'HH:mm')
      let form = 'd MMMM'
      if (checkTime !== '01:00') {
        form = 'd MMMM — HH:mm'  
      }
      if (this.lang == 'fr') return format(new Date(date), form, { locale: frLocale })
      else return format(new Date(date), form)
    },
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
    fr () {
      if (this.lang == 'fr') return true
    },
    en () {
      if (this.lang == 'en') return true
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
  .page-wrapper {
    margin-top: 0rem !important;
  }
  
  .gallery.slider {
    position: relative;
    z-index: 2000;
    .items {
      height: 50vh;
      .item {
        height: 50vh;
        width: calc(100% + 1.4rem);
        margin-left: -0.7rem;
        /* height: 100vh; */
        /* position: fixed; */
        /* top: 0; */
        /* left: 0; */
        display: none;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        background-color: #f5f5f5;
        /* background-color: white; */
        &.is-active {
          display: block;
        }
      }  
    }
    .dots {
      $c: rgba(0,0,0,1);
      /* width: 50vw; */
      /* position: fixed; */
      /* left: 0; */
      /* bottom: 0; */
      /* height: 4vw; */
      display: flex;
      justify-content: center;
      align-items: center;
      transform: translateY(0.5rem);
      .dot {
        background: transparent;
        border: 1px $c solid;
        height: 0.3rem;
        width: 0.3rem;
        border-radius: 1rem;
        margin: 0.4rem;
        margin-bottom: 0rem;
        &.is-active {
          background: $c;  
        }
      }
    }
    .control {
      /* position: relative; */
      /* background: rgba(255,0,0,0.5);
      margin-top: -100%;
      height: 50vw;
      width: 100%; */
      .left, .right {
      }
      .left {
        
      }
      .right {
        
      }
    }
  }
  

}

// DEKSTOP
/* @media (min-width: 960px) { */
@media (min-width: 737px) {

  
  
  .image {
    /* display: none; */
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

.meta {
  p {
    
  }
  .duration-text {
    p {
      margin: 0.2rem 0;
      padding: 0;
    }
  }
}

    
</style>

<style lang='scss' scoped>
.tags.categories {
  margin-bottom: 0;
  width: 95%;
}
.project-title, .artist-title {
  width: 100%;
}
.normal-tags {
  width: 100%;
  .tag {
    /* opacity: 0.5; */
    /* font-size: 0.7rem; */
  }  
}
.tags {
  /* font-size: 0.7rem; */
  .tag:hover {
    background: white;
    color: black;
  }
}
.meta {
  font-size: 0.9rem;
  line-height: 1.2em;
  margin: 0 0 1.8rem;
  border: 1px black solid;
  padding: 0.35rem 0.5rem 0.4rem;
  width: 100%;
  td {
    margin: 0.2rem 0
  }
}
.label {
  font-weight: bold;
  display: inline-block;
  /* min-width: 4rem; */
  padding-right: 0.7rem;
  
  /* text-align: right; */
  width: 100%;
}


</style>
