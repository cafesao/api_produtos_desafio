const redis = require('redis')

console.log('[Redis] Starting Redis server...')

module.exports = redis.createClient({
  host: 'redis',
  port: process.env.PORT_REDIS,
  prefix: 'redis-server:',
})
