<template>
  <div class="background">
    <button @click="$router.push('/')">Logout</button>
  </div>
</template>

<script>
export default {
  components: {
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