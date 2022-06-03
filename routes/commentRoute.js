const commentController = require('../controllers/commentController')
const authMiddleware = require('../middleware/authMiddleware')

const route = require('express').Router()

route.post('/',authMiddleware.verifyToken ,commentController.addComment)
route.get('/',commentController.getComments)
route.get('/:id',commentController.getComment)
route.put('/:id',authMiddleware.verifyToken,authMiddleware.verifyCommentOwner, commentController.updateComment)
route.delete('/:id',authMiddleware.verifyToken,authMiddleware.verifyCommentOwnerAndAdmin, commentController.deleteComment)

module.exports = route