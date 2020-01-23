<template>
  <div id="app">
    <router-view/>
    <div style="position: absolute; bottom: 10px; right: 10px;">
      <button
        :style="'opacity: ' + ($store.state.direction === 'up' ? '1' : '.5')"
        class="up"
        @contextmenu.prevent=""
        @touchstart="$store.state.direction = 'up', $store.state.walking = true"
        @mousedown="$store.state.direction = 'up', $store.state.walking = true"
        @mouseup="$store.state.walking = false"
        @touchend="$store.state.walking = false"
      >UP</button>
      <button
        :style="'opacity: ' + ($store.state.direction === 'down' ? '1' : '.5')"
        class="down"
        @contextmenu.prevent=""
        @touchstart="$store.state.direction = 'down', $store.state.walking = true"
        @touchend="$store.state.walking = false"
        @mousedown="$store.state.direction = 'down', $store.state.walking = true"
        @mouseup="$store.state.walking = false"
      >DOWN</button>
      <button
        :style="'opacity: ' + ($store.state.direction === 'right' ? '1' : '.5')"
        class="right"
        @contextmenu.prevent=""
        @touchstart="$store.state.direction = 'right', $store.state.walking = true"
        @touchend="$store.state.walking = false"
        @mousedown="$store.state.direction = 'right', $store.state.walking = true"
        @mouseup="$store.state.walking = false"
      >RIGHT</button>
      <button
        :style="'opacity: ' + ($store.state.direction === 'left' ? '1' : '.5')"
        class="left"
        @contextmenu.prevent=""
        @touchstart="$store.state.direction = 'left', $store.state.walking = true"
        @touchend="$store.state.walking = false"
        @mousedown="$store.state.direction = 'left', $store.state.walking = true"
        @mouseup="$store.state.walking = false"
      >LEFT</button>
      <button
        @contextmenu.prevent=""
        class="jump"
        @click="jump()"
      >FIRE</button>
      <button
        :style="'opacity: ' + ($store.state.run ? '1' : '.5')"
        class="run"
        @contextmenu.prevent=""
        @click="$store.state.run = !$store.state.run"
      >RUN</button>
    </div>
  </div>
</template>
<script>
let i = 0
export default {
  data() {
    return {
    }
  },
  methods: {
    jump() {
      this.shoot()
      this.$store.state.jumping = true
      setTimeout(() => {
        this.$store.state.jumping = false
      }, 200)
    },
    shoot() {
      this.$store.state.io.emit('shoot', {
        id: this.$store.state.username,
        uniq: this.$store.state.username + i++,
        x: this.$store.state.x + 40,
        y: this.$store.state.y + 40,
        hp: this.$store.state.hp,
        direction: this.$store.state.direction
      })
    }
  },
  created() {
    document.addEventListener('keydown', e => {
      // e.preventDefault()
      if (this.$store.state.playing) {
        if (e.keyCode === 38 || e.keyCode === 87) {
          this.$store.state.direction = 'up'
          this.$store.state.walking = true
        } else if (e.keyCode === 40 || e.keyCode === 83) {
          this.$store.state.direction = 'down'
          this.$store.state.walking = true
        } else if (e.keyCode === 37 || e.keyCode === 65) {
          this.$store.state.direction = 'left'
          this.$store.state.walking = true
        } else if (e.keyCode === 39 || e.keyCode === 68) {
          this.$store.state.direction = 'right'
          this.$store.state.walking = true
        } else if (e.keyCode === 16) {
          this.$store.state.run = true
        } else if (e.keyCode === 32) {
          this.jump()
        }
      }
    })
    document.addEventListener('keyup', e => {
      // e.preventDefault()
      if (this.$store.state.playing) {
        if ((e.keyCode === 38 || e.keyCode === 87) && this.$store.state.direction === 'up') {
          this.$store.state.walking = false
        } else if ((e.keyCode === 40 || e.keyCode === 83) && this.$store.state.direction === 'down') {
          this.$store.state.walking = false
        } else if ((e.keyCode === 37 || e.keyCode === 65) && this.$store.state.direction === 'left') {
          this.$store.state.walking = false
        } else if ((e.keyCode === 39 || e.keyCode === 68) && this.$store.state.direction === 'right') {
          this.$store.state.walking = false
        } else if (e.keyCode === 16) {
          this.$store.state.run = false
        }
      }
    })
    this.$store.state.io.on('server', server => {
      this.$store.state.server = server
    })
    this.$store.state.io.on('shoot', bullet => {
      let shotgun = new Audio(require('@/assets/sound/shotgun.mp3'))
      shotgun.play()
      this.$store.state.bullets[bullet.uniq] = bullet
    })
    setInterval(() => {
      this.$store.state.io.emit('update', {
        username: this.$store.state.username,
        x: this.$store.state.x,
        y: this.$store.state.y,
        hp: this.$store.state.hp,
        walking: this.$store.state.walking,
        run: this.$store.state.run,
        direction: this.$store.state.direction,
        jumping: this.$store.state.jumping
      })
    }, 5)
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Bevan&display=swap');
#app, body {
  font-family: 'Bevan', cursive;
  margin: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
}
button, button > * {
  user-select: none;
}
</style>

<style scoped>
.up, .down, .right, .left, .jump, .run {
  border-radius: 8px;
  border: none;
  padding: 5px;
  cursor: pointer;
  opacity: .5;
  outline: none;
  transition: all .2s ease;
  user-select: none;
}
.up:hover, .down:hover, .right:hover, .left:hover, .jump:hover, .run:hover {
  opacity: 1!important;
}
.up {
  position: absolute;
  bottom: 110px;
  right: 55px;
  height: 50px;
  width: 50px;
}
.down {
  position: absolute;
  bottom: 0;
  right: 55px;
  height: 50px;
  width: 50px;
}
.run {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 50px;
  width: 50px;
}
.right {
  position: absolute;
  bottom: 55px;
  right: 0;
  height: 50px;
  width: 50px;
}
.left {
  position: absolute;
  bottom: 55px;
  right: 110px;
  height: 50px;
  width: 50px;
}
.jump {
  position: absolute;
  bottom: 55px;
  right: 55px;
  height: 50px;
  width: 50px;
}
</style>
