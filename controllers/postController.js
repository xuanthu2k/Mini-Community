const mongoose = require('mongoose')

const {User, Post} = require('../models/model')

const postController = {
    addPost: async(req,res)=>{
        try {
            const newPost = new Post(req.body)
            const savePost = await newPost.save()
            const author = await User.findById(req.body.by)
            await author.updateOne({$push:{ posts: savePost._id}})
            return res.json({
                code: 200,
                data: savePost
            })
        } catch (error) {
            res.json({
                code: 500,
                error
            })
        }
    },

    getPosts: async(req,res)=>{
        try {
            const posts = await Post.find()
            return res.json({
                code: 200,
                data: posts
            })
        } catch (error) {
            return res.json({
                code: 500,
                error
            })
        }
    },

    //get a post
    getPost: async(req,res)=>{
        try {
            const post = await Post.findById(req.params.id).populate("by").populate("comments")
            if(post){
                return res.json({
                    code: 200,
                    data: post
                })
            }
            return res.json({
                code: 400,
                message: "khong tim thay post"
            })
        } catch (error) {
            return res.json({
                code: 500,
                error
            })
        }
    },
    
    //update post
    updatePost: async(req,res)=>{
        try {
            const post = await Post.findById(req.params.id)
            await post.updateOne({$set:req.body})
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

    //Delete post
    deletePost: async(req,res)=>{
        try {
            await Post.findByIdAndDelete(req.params.id)
            await User.updateMany({posts: req.params.id},{$pull:{posts: req.params.id}})
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

module.exports = postController