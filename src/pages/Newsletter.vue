<template lang="pug">
  layout
    #newsletter
      h1 {{ t[lang].title }}
      .subtitle {{ t[lang].subtitle }}

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
                  input.birthday#mce-BIRTHDAY-month(type='text', pattern='[0-9]*', placeholder='MM', size='2', maxlength='2', name='BIRTHDAY[month]')
                | /

                span.subfield.dayfield
                  input.birthday#mce-BIRTHDAY-day(type='text', pattern='[0-9]*', placeholder='DD', size='2', maxlength='2', name='BIRTHDAY[day]')
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
    let lang = this.$store.state.lang
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
  }
}
</script>

<style lang="scss" scoped>
#newsletter {
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
</style>