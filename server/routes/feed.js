const express = require('express')

const postController = require('../controllers/posts')

const router = express.Router()

//  GET* feed/post
router.get('/post', postController.getPosts)

//  POST* feed/post  
router.post('/post', postController.createPost)

//  DELETE* feed/post/:postId
router.delete('/post/:postId', postController.deletePost)

module.exports = router