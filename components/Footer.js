'use client'
import Link from 'next/link'
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function Footer() {
    return (
        <footer className="clay-card border-t border-clay-300/20 mt-20 rounded-t-3xl">
            <div className="container-custom py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="depth-2"
                    >
                        <h3 className="text-2xl font-bold gradient-text-clay mb-4">Bibek Labs</h3>
                        <p className="text-clay-600">
                            Building the future with code, AI, and automation.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="depth-2"
                    >
                        <h4 className="font-bold mb-4 text-clay-800">Quick Links</h4>
                        <div className="space-y-2">
                            <Link href="/" className="block clay-btn px-3 py-2 text-clay-600 hover:text-clay-800 transition-all rounded-2xl depth-1 hover:depth-2">
                                Home
                            </Link>
                            <Link href="/about" className="block clay-btn px-3 py-2 text-clay-600 hover:text-clay-800 transition-all rounded-2xl depth-1 hover:depth-2">
                                About
                            </Link>
                            <Link href="/services" className="block clay-btn px-3 py-2 text-clay-600 hover:text-clay-800 transition-all rounded-2xl depth-1 hover:depth-2">
                                Services
                            </Link>
                            <Link href="/projects" className="block clay-btn px-3 py-2 text-clay-600 hover:text-clay-800 transition-all rounded-2xl depth-1 hover:depth-2">
                                Projects
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="depth-2"
                    >
                        <h4 className="font-bold mb-4 text-clay-800">Resources</h4>
                        <div className="space-y-2">
                            <Link href="/store" className="block clay-btn px-3 py-2 text-clay-600 hover:text-clay-800 transition-all rounded-2xl depth-1 hover:depth-2">
                                Store
                            </Link>
                            <Link href="/blog" className="block clay-btn px-3 py-2 text-clay-600 hover:text-clay-800 transition-all rounded-2xl depth-1 hover:depth-2">
                                Blog
                            </Link>
                            <Link href="/contact" className="block clay-btn px-3 py-2 text-clay-600 hover:text-clay-800 transition-all rounded-2xl depth-1 hover:depth-2">
                                Contact
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="depth-2"
                    >
                        <h4 className="font-bold mb-4 text-clay-800">Connect</h4>
                        <div className="flex gap-4">
                            <motion.a
                                href="https://github.com/Bibekmeher-in"
                                className="clay-btn p-3 text-clay-600 hover:text-clay-800 transition-colors depth-2 hover:depth-3"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaGithub size={20} />
                            </motion.a>
                            <motion.a
                                href="https://www.linkedin.com/in/bibekananda-meher-0990812b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                                className="clay-btn p-3 text-clay-600 hover:text-clay-800 transition-colors depth-2 hover:depth-3"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaLinkedin size={20} />
                            </motion.a>
                            <motion.a
                                href="https://x.com/Bibekanand59990"
                                className="clay-btn p-3 text-clay-600 hover:text-clay-800 transition-colors depth-2 hover:depth-3"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaTwitter size={20} />
                            </motion.a>
                            <motion.a
                                href="https://www.instagram.com/bibekmeher.in?igsh=MXZyYnVzdzBzMmVrZQ=="
                                className="clay-btn p-3 text-clay-600 hover:text-clay-800 transition-colors depth-2 hover:depth-3"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaInstagram size={20} />
                            </motion.a>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="border-t border-clay-300/20 pt-8 text-center text-clay-600"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p>&copy; {new Date().getFullYear()} Bibek Labs. All rights reserved.</p>
                </motion.div>
            </div>
        </footer>
    )
}
