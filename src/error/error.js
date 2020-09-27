const message = {
  objectSucess: () => 'Objects were added successfully',
  objectFailed: () =>
    'Some of the objects in the request body have already been sent recently, wait about 10 minutes.',
  objectInvalidSyntax: () => 'The syntax is invalid',
}

module.exports = message
