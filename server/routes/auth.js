const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ email, password: hashedPassword, name })
        res.status(201).json({ message: 'User created' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET)
        res.json({ token, user: { name: user.name, email: user.email, role: user.role } })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router
