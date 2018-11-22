import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    author: { type: String, default: '', required: true },
    text: { type: String, default: '', required: true },
    approved: { type: Boolean, default: false, required: true }
})

export default mongoose.model('comment', commentSchema)
