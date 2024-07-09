const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema ({
    title: {
        type: String,
        required: true,
    }, 
    description: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        required: true
    },
    // creator: {
    // implemented in the future
    // }
})

module.exports = mongoose.model("Post", postSchema)