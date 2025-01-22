<template lang="pug">
  layout
    .columns
      .column.is-6.desktop.no-pad.gallery-column
        .gallery
          .item(:style="'background-image: url('+constrainImageUrl(image)+')'")

      .column.is-6.left
        
        .page-wrapper
          .title
            .inner
              //- prismic-rich-text(:field='page.title')
              h1 Newsletter
          //- prismic-rich-text(:field='page.subtitle', v-if='page.subtitle').subtitle
          .subtitle Subscribe here
          .content
            #newsletter
              .inner
                //- h1 {{ t[lang].title }}
                
                //- .subtitle {{ t[lang].subtitle }}

                #mc_embed_signup
                  form#mc-embedded-subscribe-form.validate(action='https://foodculturedays.us16.list-manage.com/subscribe/post?u=07a3eaaaad1fdf2ab12286e6a&id=a741f19be3', method='post', name='mc-embedded-subscribe-form', target='_blank', novalidate)
                    #mc_embed_signup_scroll
                      .mc-field-group
                        label(for='mce-EMAIL') {{ t[lang].form[0] }}
                        input.required.email#mce-EMAIL(type='email', name='EMAIL')
                      .mc-field-group
                        label(for='mce-FNAME') {{ t[lang].form[1] }}
                        input#mce-FNAME(type='text', name='FNAME')
                      .mc-field-group
                        label(for='mce-LNAME') {{ t[lang].form[2] }}
                        input#mce-LNAME(type='text', name='LNAME')
                      .mc-field-group.size1of2
                        label(for='mce-BIRTHDAY-month') {{ t[lang].form[3] }}
                        .datefield
                          span.subfield.monthfield
                            input.birthday#mce-BIRTHDAY-month(type='text', pattern='[0-9]*', placeholder='MM', size='2', maxlength='2', name='BIRTHDAY[month]', style='width: 2.8rem;')
                          | /

                          span.subfield.dayfield
                            input.birthday#mce-BIRTHDAY-day(type='text', pattern='[0-9]*', placeholder='DD', size='2', maxlength='2', name='BIRTHDAY[day]', style='width: 2.8rem;')
                          span.small-meta.nowrap ( mm / dd )
                      //- #mce-responses.clear
                        .response#mce-error-response(style='display:none')
                        .response#mce-success-response(style='display:none')

                      div(style='position: absolute; left: -5000px;', aria-hidden='true')
                        input(type='text', name='b_07a3eaaaad1fdf2ab12286e6a_a741f19be3', tabindex='-1')
                      .clear
                        input#mc-embedded-subscribe.button(type='submit', :value='t[lang].form[4]', name='subscribe').submit

                //- script(type='text/javascript', src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js')

                //- script(type='text/javascript') (function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='BIRTHDAY';ftypes[3]='birthday';}(jQuery));var $mcj = jQuery.noConflict(true);

            
</template>

<script>
export default {
  metaInfo() {
    return {
      title: 'Newsletter'
    }
  },
  data () {
    return {
      image: 'https://images.prismic.io/foodculturedays2020/9f617d6d-4390-45ae-9335-6c2ffac4b83a_movie_image_51_48097.jpg?auto=format,compress',
      lang: 'en',
      t: {
        en: {
          title: 'NEXT EDITION (III) 26 – 29.11.2020, VEVEY',
          subtitle: 'Join our newsletter',
          form: [
            'Email address',
            'First name',
            'Last name',
            'Birthday',
            'Subscribe'
          ]
        },
        fr: {
          title: 'PROCHAINE EDITION (III) 26 – 29.11.2020, VEVEY',
          subtitle: 'Abonnez-vous à notre newsletter',
          form: [
            'Adresse E-mail',
            'Prénom',
            'Nom de famille',
            'Anniversaire',
            'Souscrire'
          ]
        }
      }
    }
  },
  created () {
    if (!process.isClient) return
    let lang = this.$store.state.lang
    if (!lang) {
      let path = window.location.pathname
      if (path == '/en' || path.includes('/en/')) {
        lang = 'en'
      } else if (path == '/fr' || path.includes('/fr/')) {
        lang = 'fr'
      }
    }
    if (lang.includes('fr')) { this.lang = 'fr' }
  },
  watch: {
    $route (to){
      if (to.path.includes('fr')) {
        this.lang = 'fr'
      } else {
        this.lang = 'en'
      }
    }
  },
  methods: {
    constrainImageUrl (url) {
      // if url contains auto=format,compress
      let newUrl
      if (url.indexOf('auto=format,compress') == -1) {
        newUrl = url.replace('?auto=format,compress', '?fit=max&h=1600&w=1200&auto=compress,format=auto')
      }
      else {
        newUrl = url.replace('?auto=compress,format', '?fit=max&h=1600&w=1200&auto=compress,format=auto')
      }
      console.log(newUrl)
      return newUrl
    },
  }
}
</script>

<style lang="scss" scoped>
#newsletter {
  // breakpoint for desktop
  // @media (min-width: 768px) {
  //   margin: 0 auto;
  //   max-width: 32rem;
  //   min-height: 90vh;
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  //   .inner {
  //     border: 2px solid black;
  //     padding: 2rem 4rem;
  //   }
  // }
  h1 {
    margin-top: 2rem;
  }
  .subtitle {
    text-transform: uppercase;
    font-size: 0.9rem;
    margin-top: 4rem;
    margin-bottom: 1rem;
  }
  margin-top: 1rem;
  form {
    font-size: 0.9rem;
  }
  label {
    display: block;
    margin-top: 1rem;
    padding-left: 0.1rem;
  }
  input {
    border: 1px black solid;
    width: 100%;
    background: white;
    color: black !important;
    font-family: 'D', -apple-system,system-ui,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;
    // line-height: 1rem;
    // font-size: 0.9rem;
    line-height: 1.6rem;
    font-size: 1rem;
    padding: 0.2rem 0.3rem 0;
    box-sizing: border-box;
  }
  .small-meta.nowrap {
    padding-left: 0.5rem;
  }
  .monthfield {
    margin-right: 0.4rem;
  }
  .dayfield {
    margin-left: 0.4rem;
  }
  .text {
    margin-bottom: 1rem;
  }
  .submit {
    text-transform: uppercase;
    margin: 0;
    padding: 0.2rem 0.5rem 0;
    display: inline-block;
    width: auto;
    font-size: 0.9rem;
    float: right;
  }
}
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
  z-index: 1010;
  background: transparent;
  img {
    height: 1.95rem;
    width: auto;
  }
  // position: absolute;
  width: calc(50vw - 2.6rem);
  // margin-top: 1rem;
  height: 0;
  position: sticky;
  // margin-left: -1.7rem;
  top: 0rem;
  z-index: 1018;
  // padding-top: 2rem;
  margin-top: 0;
  padding-top: 0;
  transform: translateY(2rem);
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
    height: 0;
    // position: fixed;
    background: transparent;
    width: 100vw;
    margin-left: -1.7rem;
    // margin-top: 2rem;
    top: 2rem;
    // z-index: 1015;
    // // padding-top: 2rem;
    // margin-top: 0;
    // padding-top: 0;
    // transform: translateY(2rem);
  }
  // .biennale .title {
  //   position: relative;
  //   background: transparent;
  // }
  
  .title .inner {
    max-width: 90%;
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

// .page-wrapper.biennale .title h1,
// .page-wrapper.biennale h1
// {
//   font-family: 'Maxi';
//   font-size: 2.7rem;
//   color: black;
//   font-weight: normal !important;
// }
// .biennale h1 strong, .biennale h2 strong {
//   font-weight: normal !important;
// }
// .biennale .content h2 {
//   font-family: 'Maxi';
//   text-align: center;
//   font-size: 3rem;
//   line-height: 0em;
//   margin-top: 1.0em;
//   font-weight: normal !important;
// }
</style>
