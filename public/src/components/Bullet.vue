<template>
  <div class="bullet">
  </div>
</template>

<script>
export default {
  props: ['bullet', 'parent', 'index'],
  created() {
    let countdown = 8
    setInterval(() => {
      let step = 40
      if (this.bullet.direction === 'up') this.bullet.y -= step
      else if (this.bullet.direction === 'down') this.bullet.y += step
      else if (this.bullet.direction === 'left') this.bullet.x -= step
      else if (this.bullet.direction === 'right') this.bullet.x += step
      if (countdown <= 0) {
        // Delete self
        let bulls = []
        this.$store.state.bullets.forEach(it => {
          if (it.uniq !== this.bullet.uniq) bulls.push(it)
        })
        this.$store.state.bullets = bulls
      }
      countdown--
    }, 15)
  }
}
</script>


<style scoped>
.bullet {
  width: 6px;
  height: 6px;
  background-color: orange;
  border-radius: 50%;
  border: 1px solid black;
}
</style>