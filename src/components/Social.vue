<template lang="pug">
#social
  .social
    a(href='https://www.instagram.com/foodculturedays/', target='_blank')
      i.lni-instagram.not-hover
      i.lni-instagram-filled.hover
  .social
    a(href='https://www.facebook.com/foodculturedays/', target='_blank')
      i.lni-facebook.not-hover
      i.lni-facebook-filled.hover
  //- .social
    a(href='https://www.facebook.com/foodculturedays/', target='_blank')
      i.lni-vimeo
  //- .social
    g-link(to='/newsletter')
      i.lni-envelope.not-hover
      i.lni-heart-filled.hover
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
#social {
  display: flex;
  align-items: center;
  .social {
    font-size: 25px;
    margin: 0 0.8rem 0 0;
  }
  a .hover {
    display: none;
  }
  a:hover {
    .hover {
      display: block;
    }
    .not-hover {
      display: none;
    }
  }
}
</style>