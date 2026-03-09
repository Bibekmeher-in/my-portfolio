'use client'
import { HiMoon, HiSun } from 'react-icons/hi'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <button className="clay-btn p-2 sm:p-3 depth-2">
                <HiSun size={20} />
            </button>
        )
    }

    return (
        <motion.button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="clay-btn p-2 sm:p-3 depth-2 hover:depth-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
            >
                {theme === 'dark' ? (
                    <HiSun size={20} className="text-clay-text" />
                ) : (
                    <HiMoon size={20} className="text-clay-text" />
                )}
            </motion.div>
        </motion.button>
    )
}
