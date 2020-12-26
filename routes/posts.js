//dependencies
const express = require('express')

const router = express.Router()

//schema
const Post = require('../models/post')

//
//get all post
router.get('/', async (req, res) =>{
    try {
        const posts = await Post.find()
        res.json(posts)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// get one post by id
router.get('/findByID/:id', getPostById, (req, res) =>{
    res.json(res.post)
})



//create one post
router.post('/', async (req, res) =>{
    const post = new Post({
        url: req.body.url,
        description: req.body.description
    })
    try {
        const newPost = await post.save()
        res.status(201).json(newPost)
    } catch (err) {
        res.status(400).json({message: err})
    }
})

//delete one user
router.delete('/:id', getPostById, async (req, res) =>{
    try{
        await res.post.remove()
        res.json({message: 'Post deleted'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

async function getPostById(req, res, next){
    try {
        post = await Post.findById(req.params.id)
        if(post == null){
            return res.status(404).json({message: 'Cant find post'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.post = post
    next()
}


module.exports = router