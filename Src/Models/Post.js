const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 50
    } ,
    desc: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required:true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const PostModel = mongoose.model('Posts', PostSchema)

module.exports = PostModel