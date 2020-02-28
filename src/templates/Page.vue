<template lang="pug">
  layout
    .page-wrapper
      //- prismic-image(:field='page.image', v-if='page.image')
      prismic-rich-text(:field='page.title').title
      .content
        prismic-rich-text(:field='page.body')

      Newsletter
      //- a.link(@click='$nav("/" + lang + "/newsletter")').button {{ newsletterText }}



</template>


<style lang="scss">
$green: #11ff36;

.title {
  position: sticky;
  top: 0;
  background: white;
  padding: 1rem 0 0rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 10px 20px 3px white;
}
.content {
  p {
    margin-top: 0;
    margin-block-start: 0;
  }
}
.page-wrapper {
  padding-bottom: 6rem;
}
.newsletter {
  margin-top: 4rem;
  .button {
    color: black;
    text-transform: uppercase;
    font-size: 0.9rem;
    border: 1px black solid;
    padding: 0.3rem 0.4rem 0.1rem;
    &:hover {
      color: white;
      background: black;
    }
  }
}

</style>



<script>
import Newsletter from '~/components/Newsletter.vue'

export default {
  components: {
    Newsletter
  },
  metaInfo() {
    return {
      title: this.$context.plainTitle
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
    newsletterText () {
      const en = 'Join our newsletter'
      const fr = 'Abonnez-vous à notre newsletter'
      if (this.lang == 'fr') { return fr }
      else { return en }
    }
  }
}
</script>
