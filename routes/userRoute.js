
const userController = require('../controllers/userController')

const route = require('express').Router()

route.post('/',userController.addUSer)
route.get('/',userController.getUsers)
route.get('/:id',userController.getUser)
route.put('/:id',userController.updateUser)

module.exports = route