const express = require('express')
const Product = require('../models/Product')
const adminAuth = require('../middleware/adminAuth')

const router = express.Router()

// Public routes - anyone can view products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.json(product)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// Protected routes - admin only
router.post('/', adminAuth, async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).json(product)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.put('/:id', adminAuth, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(product)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.delete('/:id', adminAuth, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.json({ message: 'Product deleted' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router
