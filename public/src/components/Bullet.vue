<template>
  <div class="bullet">
  </div>
</template>

<script>
export default {
  props: ['bullet', 'parent', 'index'],
  data() {
    return {
      dead: false
    }
  },
  created() {
    let countdown = 20
    setInterval(() => {
      let step = 45
      if (this.bullet.direction === 'up') this.bullet.y -= step
      else if (this.bullet.direction === 'down') this.bullet.y += step
      else if (this.bullet.direction === 'left') this.bullet.x -= step
      else if (this.bullet.direction === 'right') this.bullet.x += step
      if (this.bullet.id !== this.$store.state.username && this.isCollide(this.bullet, this.$store.state)) {
        this.$store.state.hp -= 10
        if (this.$store.state.hp <= 0) {
          // Display dead body
          this.$store.state.io.emit('elimination', {
            id: this.$store.state.username,
            uniq: this.bullet.uniq,
            killer: this.bullet.id,
            x: this.$store.state.x,
            y: this.$store.state.y,
            width: 100,
            height: 100,
            hp: this.$store.state.hp,
            direction: this.$store.state.direction
          })
          // Drop gold / loot
          this.$store.state.io.emit('item', {
            type: 'gold',
            value: Math.floor(Math.random() * (525 - 125 + 1)) + 125,
            uniq: this.bullet.uniq,
            x: this.$store.state.x + 30,
            y: this.$store.state.y + 30,
            width: 25,
            height: 25
          })
          // Reset player
          this.$store.state.x = 0
          this.$store.state.y = 0
          this.$store.state.hp = 100
          this.$store.state.deaths++
        }
        delete this.$store.state.bullets[this.bullet.uniq]
      } else if (countdown <= 0) {
        delete this.$store.state.bullets[this.bullet.uniq]
      }
      countdown--
    }, 15)
  },
  methods: {
    isCollide(a, b) {
      return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
      )
    }
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