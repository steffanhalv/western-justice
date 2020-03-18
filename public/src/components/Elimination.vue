<template>
  <div class="elimination">
  </div>
</template>

<script>
export default {
  props: ['elimination', 'parent', 'index'],
  created() {
    setTimeout(() => {
      delete this.$store.state.eliminations[this.elimination.uniq]
    }, 1500)
  }
}
</script>


<style scoped>
.elimination {
  width: 100px;
  height: 100px;
  background-image: url('~@/assets/soviet_onion.png');
  background-size: contain;
  background-repeat: no-repeat;
  transition: transform .2s linear;
  animation: rotate 1.5s linear infinite
}
@keyframes rotate{
  to {
    transform: rotate(360deg);
  }
}
</style>