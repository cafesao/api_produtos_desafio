const redis = require('./redis')

const { promisify } = require('util')

const existAsync = promisify(redis.exists).bind(redis)
const setAsync = promisify(redis.set).bind(redis)
const ttlAsync = promisify(redis.ttl).bind(redis)

module.exports = {
  add: async (hash) => {
    await setAsync(hash, '')
    redis.expire(hash, process.env.EXPIRE)
  },
  hasObject: async (hash) => {
    const result = await existAsync(hash)

    return result === 1
  },
  time_left: async (hash) => await ttlAsync(hash),
}
