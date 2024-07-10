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
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
})

module.exports = mongoose.model("Post", postSchema)