const crypto = require('crypto')

module.exports = function hashObject(object) {
  const hash = crypto.createHash('md5')
  return hash.update(JSON.stringify(object)).digest('hex')
}
