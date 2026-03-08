const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderId: String,
    paymentId: String,
    productId: String,
    productTitle: String,
    amount: { type: Number, required: true },
    userEmail: { type: String, required: true },
    userName: String,
    status: { type: String, default: 'pending', enum: ['pending', 'completed', 'failed'] },
    paymentMethod: { type: String, default: 'razorpay' },
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Order', orderSchema)
