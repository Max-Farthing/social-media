require('dotenv').config()

const User = require('../models/user')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

exports.signup = (req, res, next) => {
    const userName = req.body.userName
    const email = req.body.email
    const password = req.body.password
    //hash password for safety
    const user = new User({
        userName,
        email,
        password,
        posts: []
    })
    return user.save()
        .then(result => {
            res.status(201).json({ message: 'User created', userId: result._id })
        })
        .catch(err => console.log(err))
}

exports.login = (req, res, next) => {
    const userName = req.body.userName
    const password = req.body.password
    let loadedUser;

    User.findOne({ userName: userName })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }
            loadedUser = user
            return password === user.password
        })
        .then(isEqual => {
            if (!isEqual) {
                return res.status(401).json({ message: "Wrong Password" })
            }
            const token = jwt.sign({
                userName: loadedUser.userName,
                userId: loadedUser._id.toString()
            }, secret, { expiresIn: '1h' })
            res.status(200).json({ token, userId: loadedUser._id.toString() })
        })
        .catch(err => console.log(err))
}

exports.findUser = (req, res, next) => {
    const userId = req.params.userId
    User.findById(userId)
        .then(user => {
            res.status(200).json({
                user
            })
        })
        .catch(err => console.log(err))
}