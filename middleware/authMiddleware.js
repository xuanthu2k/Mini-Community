const jwt = require('jsonwebtoken')
const {User, Post, Comment} = require('../models/model')

const authMiddleware = {
    verifyToken:async(req,res,next)=>{
        const authorizationHeaders = req.headers['authorization']
        if(!authorizationHeaders ){
            return res.json({
                code: 400,
                message: "empty authorizationHeaders"
            })
        }
        const token = authorizationHeaders.split(' ')[1]
        if(!token){
            return res.json({
                code: 400,
                message: "empty token"
            })
        }
        jwt.verify(token,process.env.TOKEN_SECRET,(err,data)=>{
            if(err){
                return res.json({
                    code: 400,
                    message: "invalid token"
                })
            }
            req.user = data
            next()
        })
    },
    verifyAdmin:async(req,res,next)=>{
        const user = await User.findById(req.user.id)
        if(!user){
            return res.json({
                code: 400,
                message: "Error"
            })
        }
        if(!user.admin){
            return res.json({
                code: 400,
                message: "only admin"
            })
        }
        next()
    },
    verifyPostOwner:async(req,res,next)=>{
        const user = await User.findById(req.user.id)
        if(!user){
            return res.json({
                code: 400,
                message: "Error"
            })
        }
        const checkPost = await Post.findById(req.params.id)
        if(user.id!=checkPost.author){
            return res.json({
                code: 400,
                message: "only allowed by owner"
            })
        }
        next()
    },
    verifyPostOwnerAndAdmin:async(req,res,next)=>{
        const user = await User.findById(req.user.id)
        if(!user){
            return res.json({
                code: 400,
                message: "Error"
            })
        }
        const checkPost = await Post.findById(req.params.id)
        if((user.id!=checkPost.author) && !user.admin){
            return res.json({
                code: 400,
                message: "only allowed by owner and admin"
            })
        }
        next()
    },
    verifyCommentOwner:async(req,res,next)=>{
        const user = await User.findById(req.user.id)
        if(!user){
            return res.json({
                code: 400,
                message: "Error"
            })
        }
        const checkComment = await Comment.findById(req.params.id)
        if(user.id!=checkComment.author){
            return res.json({
                code: 400,
                message: "only allowed by owner"
            })
        }
        next()
    },
    verifyCommentOwnerAndAdmin:async(req,res,next)=>{
        const user = await User.findById(req.user.id)
        if(!user){
            return res.json({
                code: 400,
                message: "Error"
            })
        }
        const checkComment = await Comment.findById(req.params.id)
        if((user.id!=checkComment.author) && !user.admin){
            return res.json({
                code: 400,
                message: "only allowed by owner and admin"
            })
        }
        next()
    }
}

module.exports = authMiddleware