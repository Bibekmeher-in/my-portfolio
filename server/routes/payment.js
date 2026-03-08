const express = require('express')
const Razorpay = require('razorpay')
const crypto = require('crypto')
const Order = require('../models/Order')

const router = express.Router()

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// Create Razorpay order
router.post('/create-order', async (req, res) => {
    try {
        const { amount, productId, productTitle } = req.body

        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            return res.status(500).json({
                error: 'Razorpay keys not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in environment variables.'
            })
        }

        // Create Razorpay order
        const options = {
            amount: amount * 100, // amount in paise (₹1 = 100 paise)
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: {
                productId,
                productTitle,
            },
        }

        const order = await razorpay.orders.create(options)

        res.json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            key: process.env.RAZORPAY_KEY_ID,
        })
    } catch (error) {
        console.error('Error creating Razorpay order:', error)
        res.status(500).json({ error: error.message })
    }
})

// Verify payment
router.post('/verify-payment', async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            productId,
            productTitle,
            amount,
        } = req.body

        // Verify signature
        const sign = razorpay_order_id + '|' + razorpay_payment_id
        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest('hex')

        if (razorpay_signature === expectedSign) {
            // Payment is verified, save order to database
            const order = await Order.create({
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
                productId,
                productTitle,
                amount: amount / 100, // Convert back to rupees
                userEmail: 'customer@example.com',
                userName: 'Customer',
                status: 'completed',
                paymentMethod: 'razorpay',
            })

            res.json({
                success: true,
                message: 'Payment verified successfully',
                order,
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Invalid signature',
            })
        }
    } catch (error) {
        console.error('Error verifying payment:', error)
        res.status(500).json({ error: error.message })
    }
})

// Get user orders
router.get('/orders/:email', async (req, res) => {
    try {
        const orders = await Order.find({ userEmail: req.params.email }).sort({ createdAt: -1 })
        res.json(orders)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router
