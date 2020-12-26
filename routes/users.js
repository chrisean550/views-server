//dependencies
const express = require('express')

const router = express.Router()

//schema
const User = require('../models/user')

//get all users
router.get('/', async (req, res) =>{
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// get one user by id
router.get('/findByID/:id', getUserById, (req, res) =>{
    res.json(res.user)
})

//get one user by username
router.get('/findByUsername/:username', getUserByUsername, (req, res) =>{
    res.json(res.user)
})

//create one user
router.post('/', async (req, res) =>{
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({message: err})
    }
})

//update one user
router.patch('/:id', getUserById, async (req, res) =>{
    if(req.body.username != null){
        res.user.username = req.body.username
    }
    if(req.body.email != null){
        res.user.email = req.body.email
    }
    if(req.body.fname != null){
        res.user.first_name = req.body.first_name
    }
    if(req.body.lname != null){
        res.user.last_name = req.body.last_name
    }
    if(req.body.pwd != null){
        res.user.password = req.body.password
    }

    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({message: err})
    }

})

//delete one user
router.delete('/:id', getUserById, async (req, res) =>{
    try{
        await res.user.remove()
        res.json({message: 'User deleted'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

async function getUserById(req, res, next){
    try {
        user = await User.findById(req.params.id)
        if(user == null){
            return res.status(404).json({message: 'Cant find user'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.user = user
    next()
}


async function getUserByUsername(req, res, next){
    try {
        user = await User.findOne({ username: req.params.username })
        if(user == null){
            return res.status(404).json({message: 'Cant find user'})
        }
    } catch (err) {
        return res.status(502).json({message: err.message})
    }

    res.user = user
    next()
}

module.exports = router