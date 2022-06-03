const mongoose = require('mongoose')
const {User, Post, Comment} = require('../models/model')
const jwt = require('jsonwebtoken')

const authController = {
    // Login
    login:async(req,res)=>{
        try {
            const user = await User.findOne({"username":req.body.username})
            if(!user){
                return res.json({
                    code: 400,
                    message: "wrong username"
                })
            }
            if(user.password!=req.body.password){
                return res.json({
                    code: 400,
                    message: 'wrong password'
                })
            }
            const payload = {
                username: user.username,
                id: user.id
            }
            const token = await jwt.sign(payload,process.env.TOKEN_SECRET,{expiresIn: "30d"})
            return res.json({
                code: 200,
                message: "Login successfully",
                token
            })
        } catch (error) {
            return res.json({
                code:500,
                error
            })
        }
    }
}

module.exports = authController