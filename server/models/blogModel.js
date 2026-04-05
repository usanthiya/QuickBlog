import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isPublished: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
})
const blog = mongoose.model("Blog", blogSchema, "Blog");

export default blog;