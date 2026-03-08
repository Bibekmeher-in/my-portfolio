const express = require('express')
const Project = require('../models/Project')
const { authMiddleware, adminMiddleware } = require('../middleware/auth')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 })
        res.json(projects)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
        res.json(project)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const project = await Project.create(req.body)
        res.status(201).json(project)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(project)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id)
        res.json({ message: 'Project deleted' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router
