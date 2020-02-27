<template lang="pug">
  layout
    #newsletter
      h1 {{ t[lang].title }}
      .subtitle {{ t[lang].subtitle }}
      form
        label {{ t[lang].form[0] }}
        input(type="text").text
        label {{ t[lang].form[1] }}
        input(type="text").text
        label {{ t[lang].form[2] }}
        input(type="text").text
        input(type="submit", :value="t[lang].form[3]").submit

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
            'Souscrire'
          ]
        }
      }
    }
  },
  created () {
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
  }
  input {
    border: 1px black solid;
    width: 100%;
    background: white;
    font-family: 'D', -apple-system,system-ui,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;
    line-height: 1rem;
    font-size: 0.9rem;
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
    float: right;
  }
}
</style>