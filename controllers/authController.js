const mongoose = require('mongoose')
const {User, Post, Comment} = require('../models/model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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
            const comparePass = await bcrypt.compare(req.body.password, user.password)
            if(!comparePass){
                return res.json({
                    code: 400,
                    message: 'wrong password'
                })
            }
            const payload = {
                username: user.username,
                id: user.id
            }
            const token = await jwt.sign(payload,process.env.TOKEN_SECRET,{expiresIn: "1d"})
            return res.json({
                code: 200,
                message: "Login successfully",
                userID:user.id,
                admin: user.admin,
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