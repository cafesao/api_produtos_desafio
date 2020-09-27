const checkObject = {
  objectIsArray: (body) => !Array.isArray(body),
  objectIsEmpty: (object) => Object.entries(object).length === 0,
  endArrayObject: (index, length) => index + 1 === length,
}

module.exports = checkObject
