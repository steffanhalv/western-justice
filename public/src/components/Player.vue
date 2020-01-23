<template>
  <div :style="playerStyle" class="player">
    <span style="margin-left: -4px; margin-top: -25px; width: 100%; text-align: center; display: block">
      {{ player.username || 'Guest' }} - {{ player.hp }}
    </span>
  </div>
</template>

<script>
export default {
  props: ['player', 'x', 'y'],
  computed: {
    playerStyle() {
      let rotation = 0
      if (this.player.direction === 'right') {
        rotation = 90
      } else if (this.player.direction === 'down') {
        rotation = 180
      } else if (this.player.direction === 'left') {
        rotation = 270
      }
      let scale = this.player.jumping ? 1.5 : 1
      return {
        transform: 'rotate(' + rotation + 'deg) scale(' + scale + ')'
      }
    }
  },
  data() {
    return {
    }
  }
}
</script>


<style scoped>
.player {
  width: 100px;
  height: 100px;
  background-image: url('~@/assets/hatt.png');
  background-size: contain;
  background-repeat: no-repeat;
  transition: transform .2s linear;
}
</style>