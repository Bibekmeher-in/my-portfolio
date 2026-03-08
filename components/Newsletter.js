'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

export default function Newsletter() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/newsletter`, { email })
            setStatus('success')
            setEmail('')
        } catch (error) {
            setStatus('error')
        }
    }

    return (
        <section className="section-padding">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="glass p-6 sm:p-8 md:p-12 rounded-lg text-center"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Stay Updated</h2>
                    <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
                        Subscribe to get the latest updates on AI, coding, and tech trends.
                    </p>

                    <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4 px-4" suppressHydrationWarning>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary text-sm sm:text-base"
                            required
                            suppressHydrationWarning
                        />
                        <button type="submit" className="btn-primary whitespace-nowrap" suppressHydrationWarning>
                            Subscribe
                        </button>
                    </form>

                    {status === 'success' && (
                        <p className="text-green-500 mt-4">Successfully subscribed!</p>
                    )}
                    {status === 'error' && (
                        <p className="text-red-500 mt-4">Something went wrong. Try again.</p>
                    )}
                </motion.div>
            </div>
        </section>
    )
}
