<template>
  <div class="bullet">
  </div>
</template>

<script>
export default {
  props: ['bullet', 'parent', 'index'],
  created() {
    let countdown = 20
    setInterval(() => {
      let step = 45
      if (this.bullet.direction === 'up') this.bullet.y -= step
      else if (this.bullet.direction === 'down') this.bullet.y += step
      else if (this.bullet.direction === 'left') this.bullet.x -= step
      else if (this.bullet.direction === 'right') this.bullet.x += step
      if (countdown <= 0) {
        delete this.$store.state.bullets[this.bullet.uniq]
      }
      countdown--
    }, 15)
  }
}
</script>


<style scoped>
.bullet {
  width: 8px;
  height: 8px;
  background-color: orange;
  border-radius: 50%;
  border: 2px solid black;
}
</style>