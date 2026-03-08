'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import axios from 'axios'
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa'

export default function ContactPage() {
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
        <div className="pt-24 section-padding">
            <div className="container-custom max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text">
                    Get In Touch
                </h1>
                <p className="text-center text-gray-400 mb-12">
                    Let's discuss your project and bring your ideas to life
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
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
                                <option value="seo">Ethical Hacking</option>
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

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="order-1 md:order-2"
                    >
                        <h2 className="text-xl sm:text-2xl font-bold mb-6">Connect With Me</h2>

                        <div className="space-y-4 sm:space-y-6">
                            <a
                                href="https://wa.me/message/TLRJTLEO7C45F1"
                                className="flex items-center gap-3 sm:gap-4 glass p-3 sm:p-4 rounded-lg hover:bg-white/10 transition-all"
                            >
                                <FaWhatsapp className="text-2xl sm:text-3xl text-green-500 flex-shrink-0" />
                                <div className="min-w-0">
                                    <h3 className="font-bold text-sm sm:text-base">WhatsApp</h3>
                                    <p className="text-gray-400 text-xs sm:text-sm">Quick response</p>
                                </div>
                            </a>

                            <div className="glass p-4 sm:p-6 rounded-lg">
                                <h3 className="font-bold mb-4 text-sm sm:text-base">Social Links</h3>
                                <div className="flex gap-3 sm:gap-4">
                                    <a href="https://github.com/Bibekmeher-in" className="text-2xl sm:text-3xl hover:text-primary transition-colors">
                                        <FaGithub />
                                    </a>
                                    <a href="https://www.linkedin.com/in/bibekananda-meher-0990812b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-2xl sm:text-3xl hover:text-primary transition-colors">
                                        <FaLinkedin />
                                    </a>
                                    <a href="https://x.com/Bibekanand59990" className="text-2xl sm:text-3xl hover:text-primary transition-colors">
                                        <FaTwitter />
                                    </a>
                                    <a href="https://www.instagram.com/bibekmeher.in?igsh=MXZyYnVzdzBzMmVrZQ==" className="text-2xl sm:text-3xl hover:text-primary transition-colors">
                                        <FaInstagram />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
