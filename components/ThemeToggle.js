'use client'
import { HiMoon, HiSun } from 'react-icons/hi'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
    const [theme, setTheme] = useState('dark')

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark'
        setTheme(savedTheme)
        document.body.classList.toggle('light', savedTheme === 'light')
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        document.body.classList.toggle('light', newTheme === 'light')
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg glass hover:bg-primary/20 transition-all"
        >
            {theme === 'dark' ? <HiSun size={20} className="text-accent" /> : <HiMoon size={20} className="text-primary" />}
        </button>
    )
}
