<template lang="pug">
#radio(v-if='show')
  .inner
    div
      span
        h4 Radio
      span.close(@click='show = false') ╳
    .frame
      iframe(src='https://radio-40.ch/player.php')  
</template>

<script>
export default {
  name: 'Radio',
  data () {
    return {
      show: true
    }
  }
}
</script>

<style lang="scss" scoped>
#radio {
  .close {
    font-size: 0.9rem;
    float: right;
    cursor: pointer;
  }
  position: fixed;
  bottom: 1.5rem;
  @media (max-width: 736px) {
    bottom: 3.5rem;
  }
  left: 1.5rem;
  /* width: calc(100vh - 2rem); */
  width: auto;
  display: inline-block;
  overflow: hidden;
  z-index: 98;
  background: white;
  /* border: 2px black solid; */
  /* border: 1px black solid; */
  /* background: linear-gradient(to right, #e649ff, #2370ff); */
  border-radius: 2px;
  box-shadow: 0px 3px 12px 3px #00000040;
  .inner {
    background: white;
    margin: 1px;
    padding: .66rem;
    overflow: hidden;
    height: 80px;
  }
  h4 {
    margin: 0 0 0.4rem 0;
    font-size: 1rem;
    line-height: 1.1em;
    text-align: left;
  }
  iframe {
    border: 0;
  }
}
  
</style>