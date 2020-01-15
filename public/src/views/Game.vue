<template>
  <div style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; overflow: hidden;">
    <div class="background" :style="style"></div>
    <button @click="$router.push('/')">Logout</button>
    <player style="position: fixed; left: 50%; top: 50%"/>
    <h1 style="text-align: center;">{{$store.state.username}}</h1>
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
      x: 50,
      y: 50,
      step: 5,
      walking: false,
      direction: 'up'
    }
  },
  methods: {
    walk() {
      setTimeout(() => {
        if (this.walking) {
          if (this.direction === 'up') this.y -= this.step
          else if (this.direction === 'down') this.y += this.step
          else if (this.direction === 'left') this.x -= this.step
          else if (this.direction === 'right') this.x += this.step
        }
        this.walk()
      }, 10)
    }
  },
  computed: {
    style() {
      return {
        left: 'calc(-50% - ' + this.x + 'px)',
        top: 'calc(-50% - ' + this.y + 'px)'
      }
    }
  },
  mounted() {
    this.walk()
  },
  created() {
    let audio = new Audio(require('@/assets/sound/dessert.mp3'))
    audio.loop = true
    audio.play()
    document.addEventListener('keydown', e => {
      e.preventDefault()
      if (e.keyCode === 38 || e.key === 'w') {
        this.direction = 'up'
        this.walking = true
      } else if (e.keyCode === 40 || e.key === 's') {
        this.direction = 'down'
        this.walking = true
      } else if (e.keyCode === 37 || e.key === 'a') {
        this.direction = 'left'
        this.walking = true
      } else if (e.keyCode === 39 || e.key === 'd') {
        this.direction = 'right'
        this.walking = true
      }
    })
    document.addEventListener('keyup', e => {
      e.preventDefault()
      if ((e.keyCode === 38 || e.key === 'w') && this.direction === 'up') {
        this.walking = false
      } else if ((e.keyCode === 40 || e.key === 's') && this.direction === 'down') {
        this.walking = false
      } else if ((e.keyCode === 37 || e.key === 'a') && this.direction === 'left') {
        this.walking = false
      } else if ((e.keyCode === 39 || e.key === 'd') && this.direction === 'right') {
        this.walking = false
      }
    })
  }
}
</script>


<style scoped>
.background {
  z-index: -1;
  position: absolute;
  left: 0;
  top: 0;
  width: 200%;
  height: 200%;
  background-image: url('~@/assets/gfx/dessert.png')
}
</style>