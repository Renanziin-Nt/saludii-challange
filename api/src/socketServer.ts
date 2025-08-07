import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
app.use(express.json())

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:8910',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`)
})

app.post('/emit', (req, res) => {
  const { event, data } = req.body
  io.emit(event, data)
  res.sendStatus(200)
})

httpServer.listen(3001, () => {
  console.log('Socket.IO server running at http://localhost:3001')
})
