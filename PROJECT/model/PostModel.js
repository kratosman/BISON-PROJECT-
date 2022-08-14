const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: { type:String, required: true, ref:'User' },
    address: { type:String, required: true},
    post: { type: String, required: true},
    image: { type: String, required: true}
}, {timestamps: true })

module.exports = mongoose.model('Post', PostSchema)