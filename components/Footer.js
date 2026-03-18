'use client'
import Link from 'next/link'
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useMemo } from 'react'

const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/Bibekmeher-in', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/bibekananda-meher-0990812b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', label: 'LinkedIn' },
    { icon: FaTwitter, href: 'https://x.com/Bibekanand59990', label: 'Twitter' },
    { icon: FaInstagram, href: 'https://www.instagram.com/bibekmeher.in?igsh=MXZyYnVzdzBzMmVrZQ==', label: 'Instagram' },
]

const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
]

const resourceLinks = [
    { name: 'Store', href: '/store' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
]

export default function Footer() {
    const memoizedSocialLinks = useMemo(() => socialLinks, [])
    const memoizedQuickLinks = useMemo(() => quickLinks, [])
    const memoizedResourceLinks = useMemo(() => resourceLinks, [])
    const currentYear = useMemo(() => new Date().getFullYear(), [])

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
                            {memoizedQuickLinks.map((item) => (
                                <Link key={item.name} href={item.href} className="block clay-btn px-3 py-2 text-clay-600 hover:text-clay-800 transition-all rounded-2xl depth-1 hover:depth-2">
                                    {item.name}
                                </Link>
                            ))}
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
                            {memoizedResourceLinks.map((item) => (
                                <Link key={item.name} href={item.href} className="block clay-btn px-3 py-2 text-clay-600 hover:text-clay-800 transition-all rounded-2xl depth-1 hover:depth-2">
                                    {item.name}
                                </Link>
                            ))}
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
                            {memoizedSocialLinks.map((social) => {
                                const Icon = social.icon
                                return (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        aria-label={social.label}
                                        className="clay-btn p-3 text-clay-600 hover:text-clay-800 transition-colors depth-2 hover:depth-3"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Icon size={20} />
                                    </motion.a>
                                )
                            })}
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="border-t border-clay-300/20 pt-8 text-center text-clay-600"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p>&copy; {currentYear} Bibek Labs. All rights reserved.</p>
                </motion.div>
            </div>
        </footer>
    )
}
