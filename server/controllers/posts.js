const Post = require('../models/post')

exports.createPost = (req, res, next) => {
    const title = req.body.title
    const description = req.body.description
    const likes = 0

    const creator = req.userId ? req.userId : null;

    const post = new Post({
        title,
        description,
        likes,
        creator
    })

    console.log(creator)

    post
        .save()
        .then(result => {
            if(req.userId) {
                return User.findById(req.userId)
                .then(user => {
                    if(!user) {
                        throw new Error("User not found")
                    }
                    user.posts.push(post)
                    return user.save()
                })
                .then(user => {
                    res.status(201).json({
                        message: 'Post Created',
                        post: result,
                        creator: { _id: user._id, name: user.name}
                    })
                })
            } else {
                res.status(201).json({
                    message: "Post Created",
                    post: result,
                    creator: { name: null }
                })
            }
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
    const postId = req.params.postId
    Post.findByIdAndDelete(postId) //change back when needed
    //  => {
        // if(post.creator.toString() !== req.userid && post.creator.toString() !== null) {
        //     return res.status(403).json({ message: "Not authorized to dlete this post "})
        // }
        // return Post.findByIdAndDelete(postId)
    // })
    .then(result => {
        res.status(200).json({
            message: "Post deleted",
            post: result
        })
    })
    .catch(err => console.log(err))
}

exports.addLike = (req, res, next) => {
    const id = req.params.postId
    const update = { $inc: { likes: 1 } }
    const options = { new: true }
    Post.findByIdAndUpdate(id, update, options)
        .then(updatedPost => {
            res.status(201).json({
                message: "Likes updated",
                post: updatedPost
            })
        })
        .catch(err => console.log(err))
}