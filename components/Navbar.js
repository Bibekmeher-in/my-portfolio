'use client'
import { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { HiMenu, HiX, HiUser } from 'react-icons/hi'
import ThemeToggle from './ThemeToggle'

const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Store', href: '/store' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [user, setUser] = useState(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const userData = localStorage.getItem('user')
        if (userData) {
            try {
                setUser(JSON.parse(userData))
            } catch (e) {
                console.error('Failed to parse user data')
            }
        }
    }, [])

    const handleLogout = useCallback(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
        setIsOpen(false)
        window.location.href = '/'
    }, [])

    const handleMenuClose = useCallback(() => {
        setIsOpen(false)
    }, [])

    const memoizedMenuItems = useMemo(() => menuItems, [])

    if (!mounted) return null

    return (
        <motion.nav
            className="fixed w-full z-50 clay-navbar depth-1"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
            <div className="container-custom">
                <div className="flex justify-between items-center h-20">
                    <Link href="/" className="text-2xl sm:text-3xl font-extrabold depth-2 inline-block hover:scale-105 transition-transform">
                        <span className="bg-gradient-to-r from-clay-700 to-clay-600 dark:from-clay-100 dark:to-clay-200 bg-clip-text text-transparent drop-shadow-lg">
                            ⚡ BM
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-6">
                        {memoizedMenuItems.map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="relative"
                            >
                                <Link
                                    href={item.href}
                                    className="clay-btn px-4 py-2 text-clay-600 hover:text-clay-800 transition-all duration-300 relative group depth-2"
                                >
                                    <span className="relative z-10">{item.name}</span>
                                </Link>
                            </motion.div>
                        ))}

                        <ThemeToggle />

                        {user && (
                            <div className="flex items-center gap-3">
                                <Link
                                    href={user.role === 'admin' ? '/admin' : '/profile'}
                                    className="clay-btn px-4 py-2 flex items-center gap-2 text-clay-600 hover:text-clay-800 depth-2"
                                >
                                    <HiUser className="depth-1" />
                                    <span className="relative z-10">{user.name}</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="clay-btn px-4 py-2 text-sm text-clay-600 hover:text-clay-800 depth-2"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />
                        {user && (
                            <Link
                                href={user.role === 'admin' ? '/admin' : '/profile'}
                                className="clay-btn p-2 text-clay-600 depth-2"
                            >
                                <HiUser size={20} />
                            </Link>
                        )}
                        <motion.button
                            onClick={() => setIsOpen(!isOpen)}
                            whileTap={{ scale: 0.9 }}
                            className="clay-btn p-2 text-clay-600 depth-2"
                        >
                            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                        </motion.button>
                    </div>
                </div>

                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden clay-card mt-2 overflow-hidden"
                    >
                        <div className="p-4 space-y-2">
                            {memoizedMenuItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block clay-btn py-3 px-4 text-clay-600 hover:text-clay-800 transition-all rounded-2xl depth-2"
                                    onClick={handleMenuClose}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            {user && (
                                <>
                                    <Link
                                        href={user.role === 'admin' ? '/admin' : '/profile'}
                                        className="block clay-btn py-3 px-4 text-clay-600 hover:text-clay-800 transition-all rounded-2xl depth-2"
                                        onClick={handleMenuClose}
                                    >
                                        Profile ({user.name})
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left clay-btn py-3 px-4 text-clay-600 hover:text-clay-800 transition-all rounded-2xl depth-2"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    )
}
