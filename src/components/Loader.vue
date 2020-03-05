<template>
  <div id="loader" v-if='loading'>
    <div id="blob-wrapper">
      <svg id="blob" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1316.76 3521.58">
        <!-- <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stop-color="#05a"/>
            <stop offset="100%" stop-color="#0a5"/>
          </linearGradient>
        </defs> -->
        <path class="path" id="blobPath" d="M964.48,119.44c43.29,19.89,109.76,93.89,109.76,93.89S1198,323.75,1215.9,364c29.3,70.38,26.25,142.33,28,163.46,1.32,21.13,12.26,117.76,0,178.12s-41.08,118.6-56,142c-7.41,11.72-68.2,110.2-91,131.7-36.71,33.38-108,73-143,87.34s-99.71,39.65-118.49,47.18-39.8,12.71-47.24,16.68c-16.18,9.07-36.3,9.82-47.21,28-9.21,15.34-23.62,42.09-3.5,62.38,19.67,20.29,114.54,64.28,152.6,80,37.61,15.7,108,31.9,129.85,43a167.53,167.53,0,0,1,48.56,36.77c16.59,17.57,49.39,64.17,57.7,82.64s56.93,106.63,68.32,124.73c10.91,18,39.8,65.65,45.9,106.9,6.57,41.25,2.63,102.9-3.5,135.95s-38.48,168.64-61.65,215.91c-10,21-46.35,101.86-80,151.06-72.15,106.32-169.68,111.66-229.56,126.16-59.47,14.47-187.17,64.53-190.22,130.88-1.31,31.21,32.35,55.75,59.47,59.5,49.42,6.83,85.69-.25,135.56-.25,50.29,0,287.66.77,306.09,19.57,21.24,28.8,37.1,88.3,39.33,122.45,3.6,55.3,3.5,92.58,0,166.18-3.92,73.63-27.09,245.12-33.22,267.54-8.31,29.21-17.07,62.65-29.75,90-11.36,24.23-27.54,48.94-45.89,68.33-21.44,22.76-46.35,43.1-69.55,63.42-17,14.55-64.7,46.2-84.37,60.28-19.25,14.1-87.45,43.74-110.63,47.26-31.48,4.82-59,10.47-88.34,12.54s-111.5,22.73-126.36,22.73c-53.36,0-150.86-8.71-198.08-31.74-25.8-12.45-68.64-27.7-90.08-40-21-12.34-77.41-37.94-116.31-79C184,3262.61,156.87,3189.43,129.75,3071c-23.62-91-28-118.07-27.53-156.33.41-61.87-14-159.29-10.08-198.07,2.63-20.12,38.48-110.15,43.74-119,14.86-23.64,63.39-47.57,103.18-63.44s143-31.73,126.8-87.26c-15.73-55.55-91.37-104.66-111-142.8-14.44-28.32-84.85-151.26-102.76-190.39C133.74,2074.62,80,1916.42,73.37,1889c-6.12-27.48-6.12-61.9-6.12-92.83-.42-58.49,3.94-120.47,25.38-174.32,9.63-23.2,69.09-131.69,86.58-159s53.34-59.27,84.38-88.85c27.56-26.14,56-51.6,88.32-73.38,41.11-27.28,112.84-64.56,127.25-73.91,14-9.31,52.92-49,40.24-64.87s-31.06-30.14-53.34-42.81c-21.88-12.71-149.55-95.49-183.67-123.92-33.66-28.41-80.71-81.94-112.19-125.34S109.37,766,95.37,737.43s-26.22-83.59-28-129,31.93-134.94,49-163.12C136.49,411.44,162.74,379.77,185,347c29.75-43.4,51-83.32,86.47-121,43.26-46.2,113.18-82.89,156.47-97s125.92-33,174.45-45.1S764.22,62.57,802.25,69.59C840.73,76.59,920.8,99.54,964.48,119.44Z" />
      </svg>
    </div>
    <div id="curtain"></div>
  </div>
</template>

<style>
#blog, .path {
  transform-origin: center center;
}
#blob {
  height: 40vh;
  width: auto;
  /* background: rgba(255,0,0,0.2); */
}
.path {
  stroke-dasharray: 10500 1000;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  /* fill: green; */
  /* stroke: #11ff36; */
  /* stroke : url(#gradient); */
  stroke: #000;
  stroke-width: 134px;
}
</style>

<script>
export default {
  name: 'loader',
  data () {
    return {
      loading: true
    }
  },
  mounted () {
    var thiss = this
    const w = window.outerWidth
    const h = window.outerHeight
    const curtain = this.$el.querySelector('#curtain')
    const blob = this.$el.querySelector('#blob')
    const blobPath =  this.$el.querySelector('#blobPath')

    // console.log(w + " x " + h)

    const t = 1000

    const a = this.$anime

    var tl = a.timeline({
      // ...
    });

    tl
      .add({
        targets: blob,
        scale: {
          value: 0.5,
          duration: t,
          easing: 'easeOutSine',
        },
        rotate: {
          value: -90,
          duration: t,
          easing: 'easeInSine',
        },
      })
      .add({
        targets: blob,
        scale: {
          value: 0.28,
          duration: 500,
          easing: 'easeInOutSine',
        },
        'translateX': {
          value: h*1.6,
          duration: 500,
          easing: 'easeInOutSine',
          // delay: t+500
        },
      })
      .add({
        targets: blob,
        'translateY': {
          value: (w*1.11)*-1,
          duration: 500,
          easing: 'easeInOutSine',
        },
      })
      .add({
        targets: curtain,
        opacity: {
          value: 0,
          duration: 700,
          easing: 'easeOutSine',
          // delay: t+1000
        },
        complete: function(anim) {
          thiss.loading = false
          // thiss.store.commit('setLoaded', true)
          thiss.$store.commit('setLoaded', true)
        }
      })


      // .add({
      //   targets: blob,

      // })

    this.$anime({ targets: blobPath,
      strokeDashoffset: [this.$anime.setDashoffset, 1000],
      easing: 'easeInOutSine',
      duration: t,

      // close the snakes
      strokeDasharray: {
        value: '10500 0',
        duration: t*1,
        easing: 'easeOutQuart',
        delay: t/2,
      }

      // // color
      // stroke: {
      //   value: '#000',
      //   duration: 500,
      //   easing: 'linear',
      //   delay: t+1000
      // }
    })

    // this.$anime({ targets: blob,
      // scale: {
      //   value: 0.5,
      //   duration: t,
      //   easing: 'easeOutSine',
      //   delay: 0,
      // },
      // rotate: {
      //   value: -90,
      //   duration: t,
      //   easing: 'easeInSine',
      // },
      // 'translateX': {
      //   value: h*0.9,
      //   duration: 500,
      //   easing: 'easeInOutSine',
      //   delay: t+500
      // },
      // 'translateY': {
      //   value: (w*0.6)*-1,
      //   duration: 500,
      //   easing: 'easeInOutSine',
      //   delay: t+1000
      // },
      // 'opacity': {
      //   value: 0,
      //   duration: 300,
      //   easing: 'easeOutSine',
      //   delay: t+700
      // }
    // })

  },
  methods: {
  }
}
</script>


<style lang="scss" scoped>
#loader {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
}
#blob-wrapper {
  position: relative;
  z-index: 1001;
}
#curtain {
  background: white;
  // background: rgba(255,255,255,0.9);
  position: fixed;
  z-index: 999;
  width: 100vw;
  height: 100vh;
}
</style>
