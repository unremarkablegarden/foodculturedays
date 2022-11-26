<template lang="pug">
  #newsletter
    .subtitle {{ t[lang].subtitle }}

    #mc_embed_signup
      form#mc-embedded-subscribe-form.validate(action='https://foodculturedays.us16.list-manage.com/subscribe/post?u=07a3eaaaad1fdf2ab12286e6a&id=a741f19be3', method='post', name='mc-embedded-subscribe-form', target='_blank', novalidate)
        #mc_embed_signup_scroll
          div(style='position: absolute; left: -5000px;', aria-hidden='true')
            input(type='text', name='b_07a3eaaaad1fdf2ab12286e6a_a741f19be3', tabindex='-1')
          label(for='mce-EMAIL') {{ t[lang].form[0] }}
          .mc-field-group#email.email-fields
            .email-left
              input.required.email#mce-EMAIL(type='email', name='EMAIL')
            .email-right
              input#mc-embedded-subscribe.button(type='submit', :value='t[lang].form[4]', name='subscribe').submit
    
    .downloads
      //- xmp {{ nletters }}
      .newsletter-link(v-for='(item, i) in nletters', :key="i")
        a(:href='item.link', target="_blank") 
          | {{ item.title }}
          span.arrow.green &nbsp;&rarr;&nbsp;
      

</template>

<script>
export default {
  data () {
    return {
      lang: 'en',
      t: {
        en: {
          title: 'NEXT EDITION (III) 26 – 29.11.2020, VEVEY',
          // subtitle: 'Join our newsletter',
          subtitle: 'Subscribe to our newsletter',
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
  props: ['newsletters'],
  computed: {
    nletters () {
      if (this.newsletters && this.newsletters.newsletters) {
        let max = this.newsletters.max
        if (!max) max = 5
        // const length = this.newsletters.newsletters.length
        return this.newsletters.newsletters.slice(0, max)
        // .reverse()
      }
    }
  },
  created () {
    if (!process.isClient) return
    let lang = this.$store.state.lang
    if (lang.includes('/fr/')) { this.lang = 'fr' }
  },
  watch: {
    $route (to){
      if (to.path.includes('fr')) {
        this.lang = 'fr'
      } else {
        this.lang = 'en'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  #newsletter {
  .downloads {
    margin-top: 1rem;
    .arrow {
    }
  }
  h1 {
    margin-top: 2rem;
  }
  .subtitle {
    text-transform: uppercase;
    // font-size: 0.9rem;
    margin-top: 3rem;
    margin-bottom: 0rem;
  }
  margin-top: 1rem;
  form {
    font-size: 0.9rem;
  }
  label {
    display: block;
    margin-top: 1rem;
    padding-left: 0.1rem;
    font-size: 1.2rem;
  }
  .email-fields {
    display: flex;
    .email-right {
      input {
        // border-left: 0;
        // border-top-right-radius: 6px;
        // border-bottom-right-radius: 6px;
        border-radius: 6px;
      }
    }
  }
  table, td, tr {
    // margin: 0;
    padding: 0;
    width: 100%;
  }
  input {
    border: 1px black solid;
    width: 100%;
    background: white;
    font-family: 'D', -apple-system,system-ui,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;
    // line-height: 1rem;
    // font-size: 0.9rem;
    line-height: 1.6rem;
    font-size: 1rem;
    padding: 0.2rem 0.3rem 0;
    box-sizing: border-box;
    height: 2rem;

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
  /* #email { */
    // float: left;
  /* } */
  .submit {
    text-transform: uppercase;
    // margin: 2.3rem 0 0 0;
    margin-left: 0.3rem;
    padding: 0.2rem 0.5rem 0.1rem;
    display: inline-block;
    width: auto;
    font-size: 0.9rem;
    transform: scale(1.01);
    // float: right;
  }

}
</style>