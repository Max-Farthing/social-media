const Post = require('../models/post')

exports.createPost = (req, res, next) => {
    const title = req.body.title
    const description = req.body.description
    const likes = 0

    const post = new Post({
        title,
        description,
        likes
    })

    post
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Post Created',
                post: result
            })
        })
        .catch(err => console.log(err))
}

exports.getPosts = (req, res, next) => {
    Post.find()
        .then(data => {
            res.status(201).json({
                posts: data
            })
        })
        .catch(err => console.log(err))
}

exports.deletePost = (req, res, next) => {
    const id = req.params.postId
    Post.findByIdAndDelete(id)
        .then(result => {
            res.status(201).json({
                message: "Task deleted",
                posts: result
            })
        })
        .catch(err => console.log(err))
}