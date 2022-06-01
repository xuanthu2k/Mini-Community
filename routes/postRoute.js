const postController = require('../controllers/postController')

const route = require('express').Router()

route.post('/',postController.addPost)
route.get('/',postController.getPosts)
route.get('/:id',postController.getPost)
route.put('/:id',postController.updatePost)
route.delete('/:id',postController.deletePost)

module.exports = route