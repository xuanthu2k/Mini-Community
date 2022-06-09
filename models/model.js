const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    admin: {
        type: Boolean,
        default:false
    },
    avatar: {
        type: String,
        default: "https://png.pngtree.com/png-vector/20200329/ourlarge/pngtree-character-avatar-of-businessman-with-beard-png-image_2166772.jpg"
    },
    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
})

const postSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title:{
        type:String
    },
    content: {
        type: String
    },
    image: {
        type: String
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
    }
},{ timestamps: true })

const commentSchema = new Schema({
    author: {
        type: String,
        ref: "User",
        required: true
    },
    post: {
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
    }
},{ timestamps: true })

const User = mongoose.model('User',userSchema)
const Post = mongoose.model('Post',postSchema)
const Comment = mongoose.model('Comment',commentSchema)
module.exports={User, Post, Comment}