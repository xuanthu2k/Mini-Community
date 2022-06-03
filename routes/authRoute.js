const authController = require('../controllers/authController')

const route = require('express').Router()

route.post('/login',authController.login)

module.exports = route