const Post = require('../models/post')
const User = require('../models/user')

exports.createPost = (req, res, next) => {
    const title = req.body.title
    const description = req.body.description
    const likes = 0

    const creator = req.body.userId ? req.body.userId : null;

    const post = new Post({
        title,
        description,
        likes,
        creator
    })

    post
        .save()
        .then(result => {
            if(req.body.userId) {
                return User.findById(req.body.userId)
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
    const userId = req.params.userId
    let creator
    Post.findById(postId) 
    .then(post => {
        if(post.creator !== null && post.creator.toString() !== userId) {
            throw new Error("Not authorized to delete this post ")
        }
        creator = post.creator
        return Post.findByIdAndDelete(postId)
    })
    .then(deletedPost => {
        if(creator) {
            return User.findByIdAndUpdate(
                deletedPost.creator,
                { $pull: { posts: postId} },
                { new: true }
            )
        } 
    })
    .then(updatedUser => {
        res.status(200).json({
            message: "Post deleted",
            user: updatedUser || null
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

exports.findUserPosts = (req, res, next) => {
    const userId = req.params.userId
    User.findById(userId)
    .then(user => {
        return Post.find({ _id: { $in: user.posts }})
    })
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => console.log(err))
}