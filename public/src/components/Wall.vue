<template>
  <div class="wall" :style="{
    width: wall.width + 'px',
    height: wall.height + 'px'
  }">
  </div>
</template>

<script>
export default {
  props: ['wall', 'parent', 'index'],
  data() {
    return {
    }
  }
}
</script>


<style>
.wall {
  background-image: url('~@/assets/gfx/wall.jpg');
  background-size: 100px;
  z-index: 0;
}
</style>