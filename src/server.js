require('dotenv').config()
const cluster = require('cluster')
const numCPUs = require('os').cpus().length

const express = require('express')
const cors = require('cors')

const Routes = require('./routes/Routes')

const server = express()

server.use(express.json())
server.use(cors())

server.use('/v1', Routes)

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
} else {
  server.listen(process.env.PORT, () => {
    console.log(
      `[Server] [Cluster: ${cluster.worker.id}] Server started on port: ${process.env.PORT}`,
    )
  })
}
