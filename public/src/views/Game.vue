<template>
  <div style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; overflow: hidden;">
    <div class="background" :style="mapStyle"></div>
    <div class="water" :style="waterStyle"></div>
    <button @click="$router.push('/')">EXIT</button>
    {{ $store.state.hp }}
    <player
      id="player"
      :player="$store.state"
      class="player"
      :style="{
        left: 'calc(50% - 45px)',
        top: 'calc(50% - 45px)'
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
    <bullet
      v-for="(bullet, i) in $store.state.bullets"
      :key="bullet.id"
      :index="i"
      :parent="$store.state.bullets"
      :bullet="bullet"
      :style="{
        left: bullet.x + px - $store.state.x + 'px',
        top: bullet.y + py - $store.state.y + 'px'
      }"
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
import Bullet from '@/components/Bullet'
export default {
  components: {
    Player,
    Bullet
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
    }
  },
  mounted() {
    this.$store.state.playing = true
    this.px = document.getElementById('player').getBoundingClientRect().left
    this.py = document.getElementById('player').getBoundingClientRect().top
    window.addEventListener('resize', () => {
      this.px = document.getElementById('player').getBoundingClientRect().left
      this.py = document.getElementById('player').getBoundingClientRect().top
    }, false)
    window.addEventListener('orientationchange', () => {
      this.px = document.getElementById('player').getBoundingClientRect().left
      this.py = document.getElementById('player').getBoundingClientRect().top
    }, false)
  },
  computed: {
    mapStyle() {
      return {
        left: -this.$store.state.x + this.px - 4000 + 'px',
        top: -this.$store.state.y + this.py - 4000 + 'px'
      }
    },
    waterStyle() {
      return {
        backgroundAttachment: 'fixed',
        backgroundPosition: (-this.$store.state.x + this.px - 1000 + 'px ') + (-this.$store.state.y + this.py - 1000 + 'px')
      }
    }
  },
  created() {
    let audio = new Audio(require('@/assets/sound/bg.mp3'))
    audio.loop = true
    audio.play()
    this.walk()
  }
}
</script>


<style scoped>
button {
  font-weight: bold;
  background: #555;
  color: white;
  padding: 20px;
  margin: 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background: white;
  color: #555;
  padding: 20px;
  margin: 20px;
  border: none;
}
.background {
  z-index: -1;
  position: absolute;
  left: 0;
  top: 0;
  width: 8000px;
  height: 8000px;
  background-image: url(~@/assets/gfx/dessert.png);
  border-radius: 50%;
}
.water {
  z-index: -2;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url(~@/assets/gfx/water.gif);
}
</style>