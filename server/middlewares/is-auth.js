require('dotenv').config()
const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET

module.exports = (req, res, next) => {
    // const authHeader = req.get('Authorization')
    // if(!authHeader) {
    //     return res.status(401).json({ message: "Not Authenticated"})
    // }
    const token = req.get('Authorization').split(' ')[1]
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, secret)
    } catch(err) {
        return res.status(401).json({ message: "Not Authenticated"})
    }
    if(!decodedToken) {
        return res.status(401).json({ message: "Not Authenticated"})
    }
    req.userId = decodedToken.userId
    next()
}