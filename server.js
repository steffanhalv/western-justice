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
io.on('connection', (socket) => {
  connections++
  router.forEach(route => {
    socket.on(route.path, data => {
      route.method(data)
        .then(results => socket.emit(route.path, results))
        .catch(results => socket.emit(route.path, results))
    })
  })
  socket.on('disconnect', () => connections--)
})

// Socket broadcast
setInterval(() => io.emit('status', {
  time: new Date().toTimeString(),
  users: connections
}), 1000)

server.listen(port, () => console.log(`Listening on http://localhost:${port}`))