//dependencies
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

//routes
const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')

const app = express()

//creating mongodb atlas connection
mongoose.connect(process.env.REACT_APP_URI, {useNewUrlParser:true, useUnifiedTopology:true})
const db = mongoose.connection
db.on('error', error =>{
    console.log(error)
})
db.once('open', () =>{
    console.log('connected to database')
})

//tells express to accept json format
app.use(express.json())

//tells express to allow CORS
app.use(cors())

//tells express what router to use for specifies route
app.use('/users', usersRouter)
app.use('/posts', postsRouter)

//starts server on local port

app.listen(3000, ()=> {
    console.log('server started...')
})