const express = require('express')

const serverController = require('../controllers/serverControllers')
const Router = express.Router()

Router.post('/products', serverController.add)

module.exports = Router
