
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

const route = require('express').Router()

route.post('/', userController.addUSer)
route.get('/',userController.getUsers)
route.get('/:id',userController.getUser)
route.put('/:id',authMiddleware.verifyToken, userController.updateUser)
route.delete('/:id',authMiddleware.verifyToken, authMiddleware.verifyAdmin, userController.deleteUser)

module.exports = route