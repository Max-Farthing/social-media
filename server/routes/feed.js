const express = require('express')

const postController = require('../controllers/posts')
const isAuth = require('../middlewares/is-auth')

const router = express.Router()

//  GET* feed/post
router.get('/post', postController.getPosts)

//  POST* feed/post  
router.post('/post', postController.createPost)

//  PATCH* feed/post/:postId   adding a like
router.patch('/post/:postId', postController.addLike)

//  DELETE* feed/post/:postId
router.delete('/post/:postId', postController.deletePost)

module.exports = router