import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const commentModel = mongoose.model('Comment', commentSchema, 'Comment');

export default commentModel;