//dependencies
const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config()

//routes
const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')

const app = express()


const url = 'mongodb+srv://czn1:550748@cluster0.uztbr.mongodb.net/test?retryWrites=true&w=majority'

//creating mongodb atlas connection
mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true})
const db = mongoose.connection
db.on('error', error =>{
    console.log(error)
})
db.once('open', () =>{
    console.log('connected to database')
})

//tells express to accept json format
app.use(express.json())

//tells express what router to use for specifies route
app.use('/users', usersRouter)
app.use('/posts', postsRouter)

//starts server on local port

app.listen(process.env.PORT || 3000, ()=> {
    console.log('server started...')
})