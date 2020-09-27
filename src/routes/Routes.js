const express = require('express')

const serverControllers = require('../controllers/serverControllers')

const Router = express.Router()

Router.post('/products', serverControllers.add)

module.exports = Router
