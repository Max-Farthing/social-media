const Post = require('../models/post')

exports.createPost = (req, res, next) => {
    const title = req.body.title
    const description = req.body.description

    const post = new Post({
        title,
        description
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
                message: "All posts grabbed",
                posts: data
            })
        })
        .catch(err => console.log(err))
}