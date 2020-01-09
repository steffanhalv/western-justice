'stricted'

const env = require('./env.js')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const mongodb = require('mongodb')

let app = express()
let server = http.createServer(app)
let port = process.env.PORT || 3000

app.use(express.static('public/dist'))
app.use(express.static('public/socket'))

app.get('/v1', function (req, res) {
  let client = new mongodb.MongoClient(env.creds.mongo, { useNewUrlParser: true })
  client.connect(err => {
    if (err) res.json({
      msg: 'Connection err _a',
      err
    })
    else {
      let collection = client.db('wj').collection('users')
      collection.find({}).toArray(function(err, docs) {
        if (err) res.json({
          msg: 'Connection err _b',
          err
        })
        else res.json(docs)
      })
      client.close()
    }
  })
})

let io = socketIO(server)
io.on('connection', (socket) => {
  console.log('Client connected')
  socket.on('disconnect', () => console.log('Client disconnected'))
})

setInterval(() => io.emit('time',
  new Date().toTimeString()
), 1000)

server.listen(port, () => console.log(`Listening on http://localhost:${port}`))
