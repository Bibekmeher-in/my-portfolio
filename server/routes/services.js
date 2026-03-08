const express = require('express')
const Service = require('../models/Service')
const { authMiddleware, adminMiddleware } = require('../middleware/auth')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 })
        res.json(services)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id)
        res.json(service)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const service = await Service.create(req.body)
        res.status(201).json(service)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(service)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id)
        res.json({ message: 'Service deleted' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router
