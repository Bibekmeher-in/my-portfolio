const express = require('express')
const Order = require('../models/Order')

const router = express.Router()

// Get all orders (admin)
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 })
        res.json(orders)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// Get orders by email (user)
router.get('/user/:email', async (req, res) => {
    try {
        const orders = await Order.find({ userEmail: req.params.email }).sort({ createdAt: -1 })
        res.json(orders)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// Delete order (admin)
router.delete('/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.json({ message: 'Order deleted successfully' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router
