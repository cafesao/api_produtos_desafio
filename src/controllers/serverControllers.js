const redisController = require('../database/redisController')
const { hashObject } = require('../function/functions')

module.exports = {
  add: async (req, res) => {
    const body = req.body
    const objectDisabled = []
    let count = 0

    body.map(async (object_current, index) => {
      let hash = hashObject(object_current)
      let test = await redisController.hasObject(hash)

      if (test === false) {
        await redisController.add(hash)
        count += 1
      } else {
        const expire = await redisController.time_left(hash)
        const object_current_copy = Object.assign(object_current, { expire })

        objectDisabled.push(object_current_copy)
      }

      if (index + 1 === body.length) {
        if (count === body.length) {
          return res
            .status(200)
            .send({ info: 'Objects were added successfully' })
        } else {
          return res.status(403).send({
            error:
              'Some of the objects in the request body have already been sent recently, wait about 10 minutes.',
            info: objectDisabled,
          })
        }
      }
    })
  },
}
