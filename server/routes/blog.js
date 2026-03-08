const express = require('express')
const Blog = require('../models/Blog')
const adminAuth = require('../middleware/adminAuth')

const router = express.Router()

// Public routes
router.get('/', async (req, res) => {
    try {
        const posts = await Blog.find({ published: true }).sort({ createdAt: -1 })
        res.json(posts)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.get('/:slug', async (req, res) => {
    try {
        const post = await Blog.findOne({ slug: req.params.slug })
        res.json(post)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// Protected routes - admin only
router.post('/', adminAuth, async (req, res) => {
    try {
        const post = await Blog.create(req.body)
        res.status(201).json(post)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.put('/:id', adminAuth, async (req, res) => {
    try {
        const post = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(post)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.delete('/:id', adminAuth, async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id)
        res.json({ message: 'Post deleted' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router
