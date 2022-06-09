const {Post, User, Comment} = require('../models/model')

const commentController = {
    addComment: async(req,res)=>{
        try {
            const {post, content}= req.body
            if(!post || !content){
                return res.json({
                    code: 400,
                    message: "invalid comment"
                })
            }
            const commentData = {
                author: req.user.username,
                post,
                content
            }
            const newComment = new Comment(commentData)
            const savedComment = await newComment.save()
            const updatePost = await Post.findById(post)
            await updatePost.updateOne({$push:{comments:savedComment._id}})
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
            const comments = await Comment.find().populate("author")
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
    },
    getComment: async(req,res)=>{
        try {
            const comment = await Comment.findById(req.params.id).populate("post").populate("author")
            .catch(err=>console.log(err))
            if(comment){
                return res.json({
                    code:200,
                    data:comment
                })
            }
            return res.json({
                code:400,
                message: "khong tim thay comment"
            })
        } catch (error) {
            return res.json({
                code: 500,
                error
            })
        }
    },

     //update comment
     updateComment: async(req,res)=>{
        try {
            const comment = await Comment.findById(req.params.id)
            await comment.updateOne({$set:req.body})
            return res.json({
                code: 200,
                message: "update thanh cong"
            })
        } catch (error) {
            return res.json({
                code: 500,
                error
            })
        }
    },

    //delete comment
    deleteComment: async(req,res)=>{
        try {
            await Comment.findByIdAndDelete(req.params.id)
            await Post.updateMany({comments: req.params.id},{$pull:{comments: req.params.id}})
            return res.json({
                code: 200,
                message: 'Xoa thanh cong'
            })
        } catch (error) {
            return res.json({
                code: 500,
                error
            })
        }
    }
}

module.exports = commentController