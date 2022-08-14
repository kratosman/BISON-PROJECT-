const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    postId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    name:{ type: String, ref:'User'},
    comment: { type:String, required: true },
})

module.exports = mongoose.model('Comments', CommentSchema)