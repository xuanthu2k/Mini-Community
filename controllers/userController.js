const mongoose = require('mongoose')
const {User, Post} = require('../models/model')

const userController = {
    // add user
    addUSer: async(req,res)=>{
        try {
            const {username, password} = req.body
            if(!username){
                return res.json({
                    code: 400,
                    message: "invalid username"
                })
            }
            if(!password || password.length<6){
                return res.json({
                    code: 400,
                    message: "invalid password"
                })
            }
            const newUser = new User({username, password})
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
            .catch((err)=>{console.log(err)})
            if(user){
                return res.json({
                    code: 200,
                    data: user
                })
            }
            return res.json({
                code: 400,
                message: "Khong tim thay user"
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
            const user = await User.findById(req.user.id)
            const {username, password} = req.body
            if(username){
                const checkUsername = await User.findOne({"username":username})
                if(!checkUsername || (checkUsername.username==user.username)){
                    console.log("ok");
                }else{
                    return res.json({
                        code: 400,
                        message: "username existed"
                    })
                }
            }
            if((password && password.length < 6) || password==""){
                return res.json({
                    code: 400,
                    message: "Invalid password"
                })
            }
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
    },

    //Delete user
    deleteUser: async(req,res)=>{
        try {
            await User.findByIdAndDelete(req.params.id)
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

module.exports = userController

