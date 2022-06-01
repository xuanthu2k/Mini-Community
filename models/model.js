const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    avatar: {
        type: String
    },
    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
})

const postSchema = new Schema({
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        text_content: String,
        image: String
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        },
    ],
    likes: {
        type:Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }  
})

const commentSchema = new Schema({
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    contained: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    content: {
        type: String
    },
    likes: {
        type:Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    } 
})

const User = mongoose.model('User',userSchema)
const Post = mongoose.model('Post',postSchema)
const Comment = mongoose.model('Comment',commentSchema)
module.exports={User, Post, Comment}