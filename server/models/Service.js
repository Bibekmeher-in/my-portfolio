const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: String,
    icon: String,
    price: String,
    features: String,
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Service', serviceSchema)
