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
    hp: 100,
    x: 0,
    y: 0,
    deaths: 0,
    gold: 0,
    kills: 0,
    width: 100,
    height: 100,
    walking: false,
    run: false,
    direction: 'up',
    jumping: false,
    bullets: {},
    eliminations: {},
    items: {},
    server: {
      players: [],
      users: 0,
      time: ''
    },
    walls: [
      {
        x: -1200,
        y: -500,
        width: 1100,
        height: 100
      },
      {
        x: -200,
        y: -900,
        width: 100,
        height: 500
      },
      {
        x: -200,
        y: -1700,
        width: 100,
        height: 600
      },
      {
        x: -1200,
        y: -1700,
        width: 100,
        height: 1300
      },
      {
        x: -1200,
        y: -1700,
        width: 1100,
        height: 100
      }
    ]
  },
  mutations: {},
  actions: {},
  modules: {}
})
