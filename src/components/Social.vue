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
</template>


<style lang="scss" scoped>
#social {
  display: flex;
  align-items: center;
  .social {
    i {
      font-size: 1.5rem !important;
    }
    margin: 0.5rem 1rem 0 0;
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