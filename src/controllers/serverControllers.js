const cluster = require('cluster')
const redisController = require('../database/redisController')
const hashObject = require('../function/hashObject')
const checkObject = require('../function/checkObject')
const message = require('../error/error')

module.exports = {
  add: async (req, res) => {
    const body = req.body
    const objectExpireAt = []
    let count = 0

    if (checkObject.objectIsArray(body)) {
      return res.status(400).send({ info: message.objectInvalidSyntax() })
    }

    body.map(async (object_current, index) => {
      if (checkObject.objectIsEmpty(object_current)) {
        return res.status(400).send({ info: message.objectInvalidSyntax() })
      }

      const hash = hashObject(object_current)
      const checkHash = await redisController.hasObject(hash)

      if (!checkHash) {
        await redisController.add(hash)
        count += 1
      } else {
        const expire = await redisController.time_left(hash)

        objectExpireAt.push(Object.assign(object_current, { expire }))
      }

      if (checkObject.endArrayObject(index, body.length)) {
        if (count === body.length) {
          return res.status(200).send({ info: message.objectSucess() })
        }
        return res.status(403).send({
          info: message.objectFailed(),
          data: objectExpireAt,
        })
      }
    })
  },
}
