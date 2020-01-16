<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
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
    setInterval(() => {
      this.$store.state.io.emit('update', {
        username: this.$store.state.username,
        x: this.$store.state.x,
        y: this.$store.state.y,
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
}
</style>
