<template lang="pug">
#cookies
  transition(name='fade')
    .notice(v-if='show', class='md:w-96').fixed.bottom-0.right-0.z-50.bg-black.text-white.shadow-lg.text-xs.px-4.py-4.mx-4.my-4
      .col-8
        .en(v-if='lang === "en"')
          div This website uses cookies to ensure you get the best experience on our website.
          div.mt-2 By continuing to use this website, you agree to our use of cookies.
        .fr(v-else)
          div Ce site Web utilise des cookies pour vous garantir la meilleure expérience possible sur notre site.
          div.mt-2 En continuant à utiliser ce site Web, vous acceptez que nous utilisions des cookies.
      .col-4.mt-2
        button.btn(@click='accept', style='padding: 3px 4px 0px', class='hover:bg-white hover:text-black').border-2.border-white
          span(v-if='lang === "en"') I understand
          span(v-else) J'ai compris
  
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  props: {
    lang: {
      type: String,
      default: 'fr',
    }
  },
  mounted () {
    const accepted = localStorage.getItem('cookiesAccepted')
    this.$nextTick(() => {
      if (!accepted) this.show = true
    })
  },
  methods: {
    accept () {
      localStorage.setItem('cookiesAccepted', true)
      this.show = false
    }
  }
}
</script>