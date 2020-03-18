<template>
  <div v-if="item.type==='gold'" class="gold">
    {{ coins }}
  </div>
</template>

<script>
export default {
  props: ['item', 'parent', 'index'],
  data() {
    return {
      coins: 0,
      interval: null
    }
  },
  created() {
    if (this.item.type === 'gold') {
      this.coins = this.item.value
      this.interval = setInterval(() => {
        if (this.isCollide(this.item, this.$store.state)) {
          this.$store.state.gold += this.coins
          this.coins = 0
          delete this.$store.state.items[this.item.uniq]
          clearInterval(this.interval)
        } else if (this.coins <= 10) {
          delete this.$store.state.items[this.item.uniq]
          clearInterval(this.interval)
        }
        this.coins-=10
      }, 100)
    }
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
.gold {
  width: 25px;
  height: 25px;
  background-color: rgb(255, 234, 0);
  color: rgb(255, 153, 0);
  border-radius: 50%;
  padding: 5px;
  text-align: center;
}
</style>