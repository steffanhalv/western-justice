'stricted'

const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const router = require('./src/v1/router.js')

let app = express()
let server = http.Server(app)
let io = socketIO(server)
let port = process.env.PORT || 3000

// Public folder
app.use(express.static('public/dist'))

// Rest API
router.forEach(route => {
  app.get('/v1' + route.path, function (req, res) {
    route.method(req.body)
      .then(results => res.json(results))
      .catch(results => res.status(400).json(results))
  })
})

// Socket API
let connections = 0
let players = {}
io.on('connection', (socket) => {
  let player = null
  connections++
  socket.on('update', data => {
    if (player && data.username !== player.username) {
      delete players[player.username]
    }
    if (data.username.length >= 1) {
      players[data.username] = data
    }
    player = data
  })
  socket.on('shoot', data => {
    io.emit('shoot', data)
  })
  socket.on('elimination', data => {
    io.emit('elimination', data)
  })
  socket.on('item', data => {
    io.emit('item', data)
  })
  socket.on('disconnect', () => {
    if (player) {
      delete players[player.username]
    }
    connections--
  })
})

// Socket broadcast
setInterval(() => io.emit('server', {
  time: new Date().toTimeString(),
  users: connections,
  players: players
}), 5)

server.listen(port, () => console.log(`Listening on http://localhost:${port}`))