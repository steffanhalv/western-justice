<template>
  <div style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; overflow: hidden;">
    <div class="background" :style="mapStyle"></div>
    <button @click="$router.push('/')">Logout</button>
    <player
      id="player"
      :player="$store.state"
      class="player"
      :style="{
        left: '50%',
        top: '50%'
      }"
      style="position: absolute"/>
    <player
      v-for="player in filter($store.state.server.players)"
      :key="player.username"
      :player="player"
      :style="{
        left: player.x + px - $store.state.x + 'px',
        top: player.y + py - $store.state.y + 'px'
      }"
      class="player"
      style="position: absolute"/>
      <div style="position: fixed; bottom: 50px; left: 50px;">
        x: {{ $store.state.x }},
        y: {{ $store.state.y }}
        - {{ $store.state.server.users }} players online
      </div>
  </div>
</template>

<script>
import Player from '@/components/Player'
export default {
  components: {
    Player
  },
  data() {
    return {
      step: 5,
      px: 0,
      py: 0
    }
  },
  methods: {
    filter(obj) {
      delete obj[this.$store.state.username]
      return obj
    },
    walk() {
      setTimeout(() => {
        let step = this.step
        if (this.$store.state.run) step *= 2
        if (this.$store.state.walking) {
          if (this.$store.state.direction === 'up') this.$store.state.y -= step
          else if (this.$store.state.direction === 'down') this.$store.state.y += step
          else if (this.$store.state.direction === 'left') this.$store.state.x -= step
          else if (this.$store.state.direction === 'right') this.$store.state.x += step
        }
        this.walk()
      }, 10)
    },
    jump() {
      this.$store.state.jumping = true
      setTimeout(() => {
        this.$store.state.jumping = false
      }, 200)
    }
  },
  mounted() {
    this.$store.state.playing = true
    this.px = document.getElementById('player').getBoundingClientRect().left
    this.py = document.getElementById('player').getBoundingClientRect().top
  },
  computed: {
    mapStyle() {
      return {
        left: -this.$store.state.x + this.px - 1000 + 'px',
        top: -this.$store.state.y + this.py - 1000 + 'px'
      }
    }
  },
  created() {
    let audio = new Audio(require('@/assets/sound/dessert.mp3'))
    audio.loop = true
    audio.play()
    this.walk()
  }
}
</script>


<style scoped>
.background {
  z-index: -1;
  position: absolute;
  left: 0;
  top: 0;
  width: 2000px;
  height: 2000px;
  background-image: url('~@/assets/gfx/dessert.png');
}
.player {
  transition: transform .2s linear;
}
</style>