const commentController = require('../controllers/commentController')

const route = require('express').Router()

route.post('/',commentController.addComment)
route.get('/',commentController.getComments)

module.exports = route