const redis = require('redis')

module.exports = redis.createClient({
  host: 'redis',
  port: process.env.PORT_REDIS,
  prefix: 'redis-server:',
})
