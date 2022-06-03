const postController = require('../controllers/postController')
const authMiddleware = require('../middleware/authMiddleware')

const route = require('express').Router()

route.post('/',authMiddleware.verifyToken ,postController.addPost)
route.get('/',postController.getPosts)
route.get('/:id',postController.getPost)
route.put('/:id',authMiddleware.verifyToken,authMiddleware.verifyPostOwner, postController.updatePost)
route.delete('/:id',authMiddleware.verifyToken, authMiddleware.verifyPostOwnerAndAdmin, postController.deletePost)

module.exports = route