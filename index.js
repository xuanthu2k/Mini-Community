const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const userRoute = require('./routes/userRoute')
const postRoute = require('./routes/postRoute')
const commentRoute = require('./routes/commentRoute')
const authRoute = require('./routes/authRoute')

dotenv.config()
const app = express()
app.use(express.json())

//connect DB
mongoose.connect(process.env.MONGO_URI,()=>{console.log('Ket noi db thanh cong');})

//Routes
app.use('/api/user',userRoute)
app.use('/api/post',postRoute)
app.use('/api/comment',commentRoute)
app.use('/api/auth',authRoute)

app.get('/',(req,res)=>{
    res.json({
        message: 'This link not support, please add /api/user or /api/post or /api/comment'
    })
})

app.listen(process.env.PORT,()=>{
    console.log(`Server runing at http://localhost:${process.env.PORT}`);
})