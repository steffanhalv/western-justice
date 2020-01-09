<template>
  <div class="background">
    <button @click="$router.push('/')">Logout</button>
    <player style="position: absolute; left: 50%; top: 50%"/>
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
    }
  }
}
</script>


<style scoped>
.background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url('~@/assets/dessert.jpg')
}
</style>