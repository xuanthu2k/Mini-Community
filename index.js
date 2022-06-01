const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require('./routes/userRoute')
const postRoute = require('./routes/postRoute')
const commentRoute = require('./routes/commentRoute')

dotenv.config()
const app = express()
app.use(express.json())

//connect DB
mongoose.connect(process.env.MONGO_URI,()=>{console.log('Ket noi db thanh cong');})

//Routes
app.use('/api/user',userRoute)
app.use('/api/post',postRoute)
app.use('/api/comment',commentRoute)

app.get('/',(req,res)=>{
    res.json({
        message: 'Chua ho tro duong dan nay'
    })
})

app.listen(process.env.PORT,()=>{
    console.log(`Server runing at http://localhost:${process.env.PORT}`);
})