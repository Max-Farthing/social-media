const express = require('express')

const postController = require('../controllers/posts')

const router = express.Router()

//  GET* feed/post
router.get('/post', postController.getPosts)

//  POST* feed/post  
router.post('/post', postController.createPost)

module.exports = router