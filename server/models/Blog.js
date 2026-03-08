const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    image: String,
    author: String,
    category: String,
    tags: String,
    slug: { type: String, unique: true },
    published: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
})

// Auto-generate slug from title before saving
blogSchema.pre('save', function (next) {
    if (!this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
    }
    next()
})

module.exports = mongoose.model('Blog', blogSchema)
