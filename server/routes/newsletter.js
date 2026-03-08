const express = require('express')
const Newsletter = require('../models/Newsletter')

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const newsletter = await Newsletter.create(req.body)
        res.status(201).json(newsletter)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.get('/', async (req, res) => {
    try {
        const subscribers = await Newsletter.find({ subscribed: true })
        res.json(subscribers)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router
