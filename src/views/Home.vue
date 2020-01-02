<template>
  <div>
    <div class="login">
      <h1 style="width: 100%">Western Justice</h1>
      <input v-model="username" class="username">
      <input v-model="password" type="password" class="password">
      <button @click="login">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      username: '',
      password: ''
    }
  }
}
</script>


<style scoped>
.login {
  margin: 100px auto;
  width: 500px;
  font-size: 25px;
  text-align: center;
}
.login input, .login button {
  height: 50px;
  width: 100%;
  border: none;
  background-color: rgb(134, 91, 56);
  color: white;
  margin-bottom: 10px;
}
</style>