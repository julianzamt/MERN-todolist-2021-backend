const mongoose = require('../bin/mongodb')
const errorMessages = require('../utils/errorMessages')

const postSchema = new mongoose.Schema({
    title: { type: String, required: [true, errorMessages.required], maxlength: [30, errorMessages.maxlength] },
    description: { type: String, maxlength: [280, errorMessages.maxlength] },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Post", postSchema)
