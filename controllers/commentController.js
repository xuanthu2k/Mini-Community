const {Post, User, Comment} = require('../models/model')

const commentController = {
    addComment: async(req,res)=>{
        try {
            const newComment = new Comment(req.body)
            const savedComment = await newComment.save()
            const post = await Post.findById(req.body.contained)
            await post.updateOne({$push:{comments:savedComment._id}})
            return res.json({
                code:200,
                data: savedComment
            })
        } catch (error) {
            res.json({
                code:500,
                error
            })
        }
    },
    getComments: async(req,res)=>{
        try {
            const comments = await Comment.find()
            return res.json({
                code:200,
                data: comments
            })
        } catch (error) {
            res.json({
                code: 500,
                error
            })
        }
    }
}

module.exports = commentController