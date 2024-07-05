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