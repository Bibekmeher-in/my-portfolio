const express = require('express')
const nodemailer = require('nodemailer')
const Contact = require('../models/Contact')
const adminAuth = require('../middleware/adminAuth')

const router = express.Router()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

// Public route - anyone can submit contact form
router.post('/', async (req, res) => {
    try {
        console.log('Received contact form data:', req.body)

        // Validate required fields
        const { name, email, service, message } = req.body
        if (!name || !email || !service || !message) {
            return res.status(400).json({
                error: 'All fields are required',
                received: { name: !!name, email: !!email, service: !!service, message: !!message }
            })
        }

        // Save to database
        const contact = await Contact.create(req.body)
        console.log('Contact saved to database:', contact._id)

        // Try to send email, but don't fail if it doesn't work
        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER,
                subject: `New Contact: ${service}`,
                html: `
                    <h2>New Contact Message</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Service:</strong> ${service}</p>
                    <p><strong>Message:</strong> ${message}</p>
                `,
            })
            console.log('Email sent successfully')
        } catch (emailError) {
            console.error('Email sending failed:', emailError.message)
            // Continue anyway - contact is saved
        }

        res.status(201).json({ success: true, contact })
    } catch (error) {
        console.error('Contact form error:', error)
        res.status(400).json({ error: error.message })
    }
})

// Protected routes - admin only
router.get('/', adminAuth, async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 })
        res.json(contacts)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.delete('/:id', adminAuth, async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id)
        res.json({ message: 'Contact deleted successfully' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router
