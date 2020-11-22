<template lang="pug">
  transition(name='slide-fade')
    #statement(v-if='showPopup')
      .popup(v-for="(edge, i) in $static.prismic.allPages.edges", :key="edge.node.uid", v-if='edge.node._meta.lang == langs[lang]')
          prismic-rich-text(:field='edge.node.subtitle')
          prismic-rich-text(:field='edge.node.excerpt')
          .flex
            .left
              g-link(:to='"/" + langpath[lang] + "/" + edge.node._meta.uid')
                span(v-if='lang == 1') Lire la suite
                span(v-else) Read more
            .right
              a(@click='showPopup = false')
                span(v-if='lang == 1') Fermer
                span(v-else) Close
</template>

<static-query>
query {
  prismic {
      allPages(uid_in:["statement", "communique"]) {
      	edges {
          node {
            title
            subtitle
            body
            excerpt
            _meta {
              uid
          		lang
            }
          }
        }       
      }
  }
}
</static-query>

<script>
export default {
  name: 'Statement',
  data () {
    return {
      popupdelay: 1000,
      showPopup: false,
      langs: [ 'en-gb', 'fr-ch' ],
      langpath: [ 'en', 'fr' ],
    } 
  },
  watch: {
    loaded () {
      var t = this
      if (this.loaded) {
        if (!process.isClient) return
        setTimeout(()=> {
          console.log('pop up');
          t.showPopup = true;
        }, this.popupdelay)
      }
    }
  },
  computed: {
     lang () {
      let lang = this.$store.state.lang
      if (lang == 'fr') return 1
      else return 0
    },
    loaded () {
      // show menu after loaded is set in store by Logo.vue
      let loaded = this.$store.state.loaded
      return loaded
    }
  }
}
</script>

<style lang="scss">
#statement {
  position: fixed;
  top: 50vh;
  left: 50vw;
  width: 50vw;
  transform: translate(-50%, -50%);
  z-index: 99;
  background: white;
  box-shadow: 0 10px 20px 0px #00000055;
  padding: 1rem 2rem;
  box-sizing: border-box;
  .flex {
    display: flex;
    justify-content: space-between;
  }
}
@media (max-width: 736px) {
  #statement {
    width: 94vw;
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
    top: 7vh;
    left: 3vw;
    transform: none;
    h4 {
      font-size: 0.7rem;
    }
    em {
      font-size: 0.87rem !important;
    }
  }
}

.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .4s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  /* transform: translateY(50%); */
  margin-top: 50%;
  opacity: 0;
}
</style>