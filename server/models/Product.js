const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true, enum: ['ebook', 'course', 'template', 'tool'] },
    image: String,
    downloadLink: String,
    features: [String],
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Product', productSchema)
