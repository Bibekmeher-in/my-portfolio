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
        <section className="section-padding perspective-3d">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="clay-card p-6 sm:p-8 md:p-12 rounded-3xl text-center depth-3 hover:depth-4"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <div className="clay-card-inner">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-clay-800 depth-2">
                            Stay Updated
                        </h2>
                        <p className="text-clay-600 mb-6 sm:mb-8 text-sm sm:text-base depth-1">
                            Subscribe to get the latest updates on AI, coding, and tech trends.
                        </p>

                        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4 px-4" suppressHydrationWarning>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="clay-input flex-1 px-3 sm:px-4 py-2 sm:py-3 text-clay-800 placeholder-clay-400 text-sm sm:text-base depth-2"
                                required
                                suppressHydrationWarning
                            />
                            <button
                                type="submit"
                                className="clay-btn px-4 sm:px-6 py-2 sm:py-3 whitespace-nowrap text-clay-800 hover:text-clay-900 font-semibold depth-3 hover:depth-4"
                                suppressHydrationWarning
                            >
                                <span className="relative z-10">Subscribe</span>
                            </button>
                        </form>

                        {status === 'success' && (
                            <motion.p
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-green-600 mt-4 depth-1"
                            >
                                Successfully subscribed!
                            </motion.p>
                        )}
                        {status === 'error' && (
                            <motion.p
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-red-600 mt-4 depth-1"
                            >
                                Something went wrong. Try again.
                            </motion.p>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
