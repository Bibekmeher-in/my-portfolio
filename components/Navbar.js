'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { HiMenu, HiX, HiUser } from 'react-icons/hi'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const userData = localStorage.getItem('user')
        if (userData) {
            setUser(JSON.parse(userData))
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
        window.location.href = '/'
    }

    const menuItems = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Projects', href: '/projects' },
        { name: 'Store', href: '/store' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
    ]

    return (
        <motion.nav
            className="fixed w-full z-50 glass horror-glow"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container-custom">
                <div className="flex justify-between items-center h-20">
                    <Link href="/" className="text-3xl font-bold gradient-text text-shadow-horror animate-pulse-slow">
                        ⚡ Bibek Labs
                    </Link>

                    <div className="hidden md:flex items-center space-x-6">
                        {menuItems.map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href={item.href}
                                    className="hover:text-primary transition-all duration-300 relative group"
                                >
                                    {item.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            </motion.div>
                        ))}
                        <ThemeToggle />

                        {user ? (
                            <div className="flex items-center gap-3">
                                <Link href={user.role === 'admin' ? '/admin' : '/profile'} className="flex items-center gap-2 hover:text-primary">
                                    <HiUser /> {user.name}
                                </Link>
                                <button onClick={handleLogout} className="btn-secondary text-sm">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link href="/login" className="hover:text-primary">
                                    Login
                                </Link>
                                <Link href="/signup" className="btn-primary text-sm">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />
                        <motion.button
                            onClick={() => setIsOpen(!isOpen)}
                            whileTap={{ scale: 0.9 }}
                            className="text-primary"
                        >
                            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
                        </motion.button>
                    </div>
                </div>

                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden pb-4 glass mt-2 rounded-lg"
                    >
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block py-3 px-4 hover:text-primary hover:bg-primary/10 transition-all rounded"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}

                        {user ? (
                            <>
                                <Link
                                    href={user.role === 'admin' ? '/admin' : '/profile'}
                                    className="block py-3 px-4 hover:text-primary hover:bg-primary/10 transition-all rounded"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Profile ({user.name})
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout()
                                        setIsOpen(false)
                                    }}
                                    className="block w-full text-left py-3 px-4 hover:text-primary hover:bg-primary/10 transition-all rounded"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="block py-3 px-4 hover:text-primary hover:bg-primary/10 transition-all rounded"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="block py-3 px-4 bg-primary/20 hover:bg-primary/30 transition-all rounded mx-4 mt-2 text-center"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </motion.div>
                )}
            </div>
        </motion.nav>
    )
}
