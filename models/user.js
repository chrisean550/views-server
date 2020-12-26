//dependencies
const mongoose = require('mongoose')

//define schema
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim:true,
        unique: true,
        minlength: 3  
    },
    email:{
        type: String,
        required: true,
        trim:true,
        unique: true
    },
    first_name:{
        type: String,
        required: true,
        trim:true,
        unique:false
    },
    last_name:{
        type: String,
        required: true,
        trim:true,
        unique:false
    },
    password:{
        type: String,
        required: true,
        trim:true,
        minlength: 5
    }
})

//export schema with the name "User" in the database
module.exports = mongoose.model('User', userSchema)