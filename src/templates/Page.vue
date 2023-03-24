<template lang="pug">
  layout
    .columns
      .column.is-6.desktop.no-pad.gallery-column
        .gallery(v-if='page.gallery.length && page.gallery[0].item !== null').slider
          .items
            .item(
              v-for='(item, i) in page.gallery', 
              :style="'background-image: url('+constrainImageUrl(item.item.url)+')'", 
              :data-n='i', 
              :class='{ "is-active": (i == gallery.n)  }', 
              @click='mobileNext()', 
              v-if='item.item'
            )
          .navs(v-if='page.gallery.length > 1')
            .dots
              .dot(
                v-for='(item, i) in page.gallery', 
                :data-n='i', 
                :class='{ "is-active": (i == gallery.n)  }',
              )
            .control
              .left(@click='galleryNav("-1")')
              .right(@click='galleryNav("+1")')
          
        .gallery(v-if='page.image && !page.gallery.length')
          .item(:style="'background-image: url('+constrainImageUrl(page.image.url)+')'", v-if='page.image')
        
          //- .item(v-if='page.image', :style="'background-image: url('+page.image.url+')'")
          .item(v-else) Add a featured image to this page in Prismic
          //- prismic-image(:field='page.image', v-if='page.image')

      .column.is-6.left
        .back(@click='goBack', v-if='page._meta.uid === "biennale"')
          img(src='https://images.prismic.io/foodculturedays2020/dc97c761-a203-480b-be86-918aa8fc8add_close.png?auto=compress,format').close
        .page-wrapper(:class='page._meta.uid')
          
          prismic-rich-text(:field='page.title').title
          prismic-rich-text(:field='page.subtitle', v-if='page.subtitle').subtitle
          .content
            //- xmp {{ page.body }}
            prismic-rich-text(v-if='page.body', :field='page.body')

          Newsletter(:newsletters='$context.newsletters')

</template>

<script>
import Newsletter from '~/components/Newsletter.vue'

export default {
  components: {
    Newsletter
  },
  name: 'Page',
  metaInfo() {
    return {
      title: this.$context.plainTitle
    }
  },
  data () {
    return {
      // gallery: false,
      gallery: {
        n: 0,
      },
      back: {
        en: '←',
        fr: '←'
      },
    }
  },
  computed: {
    page () {
      // {
      //   "type": "paragraph",
      //   "text": "*\n*\n*",
      //   "spans": []
      // },
      var data = this.$context.node
      data.body.forEach(el => {
        if (el && el.type == 'paragraph') {
          if (el.text == '*\n*\n*') {
            el.text = '*'
            el.type = 'heading2'
          }
        }
      })
      return data
    }
  },
  methods: {
    goBack () {
      if (!process.isClient) return
      this.$router.go(-1)
    },
    constrainImageUrl (url) {
      let newUrl = url.replace('?auto=compress,format', '?fit=max&h=1600&w=1200&auto=compress,format=auto')
      console.log(newUrl)
      return newUrl
    },
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
  }
}
</script>




<style lang="scss">
// $green: #11ff36;
$green: rgb(17,230,54);
$headingSize: 2.2rem;

.back {
  text-transform: uppercase;
  color: $green;
  text-align: right;
  font-size: $headingSize;
  // padding: 0.6rem 0.7rem 0.5rem;
  padding: 0;
  box-sizing: border-box;
  z-index: 1020;
  background: transparent;
  img {
    height: 1.95rem;
    width: auto;
  }
  position: absolute;
  width: calc(50vw - 2.6rem);
  margin-top: 1rem;
}

// MOBILE
/* @media (max-width: 960px) { */
@media (max-width: 736px) {
  // .back {
  //   position: sticky;
  //   background: white;
  //   width: 100vw;
  //   margin-left: -0.7rem;
  //   top: 0;
  // }
  .back {
    position: sticky;
    background: white;
    width: 100vw;
    margin-left: -0.7rem;
    top: 0;
  }
  
  .page-wrapper {
    margin-top: 0rem !important;
  }
  
  .gallery.slider {
    position: relative;
    z-index: 888;
    .items {
      height: 50vh;
      .item {
        height: 50vh;
        width: calc(100% + 1.4rem);
        margin-left: -0.7rem;
        display: none;
        /* background-size: contain; */
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        background-color: #f5f5f5;
        &.is-active {
          display: block;
        }
        &.contain {
          background-size: contain;
        }
      }  
    }
    .navs {
      height: 0;
    }
    .dots {
      $c: rgba(0,0,0,1);
      
      display: flex;
      justify-content: center;
      align-items: center;
      transform: translateY(-1.5rem);
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
  }
  

}

// DEKSTOP
/* @media (min-width: 960px) { */
@media (min-width: 737px) {

  
  .tags {
    width: 90%;
  }
  // .back {
  //   top: 6vw;
  //   margin-top: 1rem;
  //   right: 2rem;
  //   background: transparent;
  //   width: 3rem;
  //   z-index: 99;
  //   position: absolute;
  // }
  .project-title, .artist-title {
    width: 90%;
  }
  
  
  .gallery.slider {
  .items {
    .item {
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      display: none;
      /* background-size: contain; */
      background-size: cover;
      &.is-active {
        display: block;
      }
    }  
  }
  .dots {
    $c: rgba(0,0,0,1);
    width: 50vw;
    position: fixed;
    left: 0;
    bottom: 0;
    height: 4vw;
    display: flex;
    justify-content: center;
    align-items: center;
    .dot {
      background: transparent;
      border: 1.5px $c solid;
      height: 0.6rem;
      width: 0.6rem;
      border-radius: 1rem;
      margin: 1rem;
      margin-bottom: 1.5rem;
      &.is-active {
        background: $c;  
      }
    }
  }
  .control {
    .left, .right {
      height: 100vh;
      width: 25vw;
      position: fixed;
      top: 0;
    }
    .left {
      left: 0;
      cursor: w-resize;
      &:hover {
        background: linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0) 30%);
      }
    }
    .right {
      left: 25vw;
      cursor: e-resize;
      
      &:hover {
        background: linear-gradient(-90deg, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0) 30%);
      }
    }
  }
  
}
  
}

.page-wrapper.biennale .title h1,
.page-wrapper.biennale h1
{
  font-family: 'Maxi';
  font-size: 2.7rem;
  color: black;
  font-weight: normal !important;
}
.biennale h1 strong, .biennale h2 strong {
  font-weight: normal !important;
}
.biennale .content h2 {
  font-family: 'Maxi';
  text-align: center;
  font-size: 3rem;
  line-height: 0em;
  margin-top: 1.0em;
  font-weight: normal !important;
}
</style>
