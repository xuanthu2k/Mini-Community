const mongoose = require('mongoose')
const {User, Post} = require('../models/model')

const userController = {
    // add user
    addUSer: async(req,res)=>{
        try {
            const newUser = new User(req.body)
            const saveUSer = await newUser.save()
            return res.json({
                code: 200,
                message: "thanh cong",
                data: saveUSer
            })
        } catch (error) {
            return res.json({
                code: 500,
                message: "that bai",
                error: error
            })
        }
    },

    // get all user
    getUsers: async(req,res)=>{
        try {
            const allUSer = await User.find()
            return res.json({
                code: 200,
                data: allUSer
            })
        } catch (error) {
            return res.json({
                code: 500,
                message: "that bai",
                error: error
            })
        }
    },

    //get a user
    getUser: async(req,res)=>{
        try {
            const user = await User.findById(req.params.id).populate("posts")
            return res.json({
                code: 200,
                data: user
            })
        } catch (error) {
            return res.json({
                code:500,
                error
            })
        }
    },

    //update user
    updateUser: async(req,res)=>{
        try {
            const user = await User.findById(req.params.id)
            await user.updateOne({$set:req.body})
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
    }
}

module.exports = userController

