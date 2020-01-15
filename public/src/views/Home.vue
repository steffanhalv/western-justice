<template>
  <div class="background">
    <div class="login">
      <h1 style="width: 100%">Western Justice</h1>
      <input placeholder="Username" v-model="$store.state.username" class="username">
      <button :disabled="$store.state.username.length < 3" @click="$router.push('/game')">Play</button>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      username: ''
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
  background-image: url('~@/assets/gfx/dessert.png')
}
.login {
  margin: 300px auto;
  width: 500px;
  font-size: 25px;
  text-align: center;
}
.login input, .login button {
  border-radius: 4px;
  height: 50px;
  width: 100%;
  border: none;
  background-color: rgb(134, 91, 56);
  color: white;
  margin-bottom: 10px;
  padding: 10px;
  box-sizing: border-box;
  font-size: 20px;
  text-align: center;
}
.login input::placeholder {
  color: rgba(255, 255, 255, 0.5)
}
.login button {
  cursor: pointer
}
.login button:hover {
  color: rgb(255, 221, 147);
  background: rgb(79, 99, 128);
}
.login button[disabled] {
  opacity: 0.5;
}
</style>