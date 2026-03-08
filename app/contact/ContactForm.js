'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import axios from 'axios'

export default function ContactForm() {
    const searchParams = useSearchParams()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: '',
        message: '',
    })
    const [status, setStatus] = useState('')

    useEffect(() => {
        const serviceParam = searchParams.get('service')
        if (serviceParam) {
            setFormData(prev => ({ ...prev, service: serviceParam }))
        }
    }, [searchParams])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('sending')
        try {
            console.log('Sending contact form:', formData)
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, formData)
            console.log('Response:', response.data)
            setStatus('success')
            setFormData({ name: '', email: '', service: '', message: '' })
            setTimeout(() => setStatus(''), 3000)
        } catch (error) {
            console.error('Contact form error:', error.response?.data || error.message)
            setStatus('error')
            setTimeout(() => setStatus(''), 3000)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="order-2 md:order-1"
        >
            <h2 className="text-xl sm:text-2xl font-bold mb-6">Send a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-4" suppressHydrationWarning>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:border-primary text-sm sm:text-base"
                    required
                    suppressHydrationWarning
                />

                <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:border-primary text-sm sm:text-base"
                    required
                    suppressHydrationWarning
                />

                <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:border-primary text-sm sm:text-base"
                    required
                    suppressHydrationWarning
                >
                    <option value="">Select Service</option>
                    <option value="web">Web Development</option>
                    <option value="app">App Development</option>
                    <option value="ai">AI Chatbot</option>
                    <option value="automation">Automation</option>
                    <option value="seo">SEO Optimization</option>
                    <option value="ethical">Ethical Hacking</option>
                </select>

                <textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows="5"
                    className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:border-primary text-sm sm:text-base"
                    required
                />

                <button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={status === 'sending'}
                    suppressHydrationWarning
                >
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
            </form>

            {status === 'success' && (
                <p className="text-green-500 mt-4 text-sm sm:text-base">✓ Message sent successfully!</p>
            )}
            {status === 'error' && (
                <p className="text-red-500 mt-4 text-sm sm:text-base">✗ Failed to send. Please try again or contact via WhatsApp.</p>
            )}
        </motion.div>
    )
}
