import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    io: io(
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://westernjustice.herokuapp.com'
    ),
    playing: false,
    username: '',
    x: 0,
    y: 0,
    walking: false,
    run: false,
    direction: 'up',
    jumping: false,
    server: {
      players: [],
      users: 0,
      time: ''
    }
  },
  mutations: {},
  actions: {},
  modules: {}
})
