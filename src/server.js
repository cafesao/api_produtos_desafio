require('dotenv').config()

const express = require('express')
const cors = require('cors')

const Routes = require('./routes/Routes')
const server = express()

server.use(express.json())
server.use(cors())

server.use('/v1', Routes)

server.listen(process.env.PORT, () => {
  console.log(`[Server] Server started on port: ${process.env.PORT}`)
})
