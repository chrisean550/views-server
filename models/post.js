const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    url:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    }
})

module.exports = mongoose.model('Post', postSchema)