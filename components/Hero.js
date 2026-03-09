'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'

function AutoScrollText() {
    const texts = ['Open Source Developer', 'AI Automation', 'Tech Entrepreneur']
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % texts.length)
        }, 2500)
        return () => clearInterval(interval)
    }, [])

    return (
        <AnimatePresence mode="wait">
            <motion.h2
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-xl sm:text-2xl md:text-4xl mb-0 gradient-text-clay font-bold depth-2"
            >
                {texts[currentIndex]}
            </motion.h2>
        </AnimatePresence>
    )
}

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden perspective-3d">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* 3D Floating Elements */}
                <motion.div
                    animate={{
                        y: [0, -40, 0],
                        rotateX: [0, 45, 0],
                        rotateY: [0, 45, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 left-4 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 clay-card depth-3"
                    style={{ transformStyle: 'preserve-3d' }}
                />
                <motion.div
                    animate={{
                        y: [0, 60, 0],
                        rotateZ: [0, 180, 360],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-20 right-4 sm:right-10 w-20 h-20 sm:w-40 sm:h-40 clay-card rounded-full depth-4"
                    style={{ transformStyle: 'preserve-3d' }}
                />
                <motion.div
                    animate={{
                        x: [0, 30, 0],
                        rotateY: [0, 90, 180, 270, 360],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-24 sm:h-24 clay-card depth-2"
                    style={{ transformStyle: 'preserve-3d' }}
                />
            </div>

            <div className="container-custom relative z-10 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, type: "spring", stiffness: 100 }}
                    className="perspective-3d"
                >
                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 text-clay-800 leading-tight"
                        animate={{
                            textShadow: [
                                '2px 2px 4px rgba(90, 66, 51, 0.2)',
                                '4px 4px 8px rgba(90, 66, 51, 0.3)',
                                '2px 2px 4px rgba(90, 66, 51, 0.2)',
                            ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        Hi, I'm <span className="gradient-text-clay depth-3 inline-block">Bibek</span>
                    </motion.h1>

                    <motion.div
                        initial={{ rotateX: 90, opacity: 0 }}
                        animate={{ rotateX: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 150 }}
                        className="clay-card p-4 sm:p-6 md:p-8 rounded-3xl mb-6 sm:mb-8 inline-block float-3d depth-3"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div className="clay-card-inner">
                            <AutoScrollText />
                            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-clay-600 mb-0 mt-3 sm:mt-4 px-2 depth-1">
                                I build powerful websites, AI tools, automation systems and digital products
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                    >
                        <Link
                            href="/projects"
                            className="clay-btn px-6 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl font-semibold w-full sm:w-auto text-center depth-3 hover:depth-4"
                        >
                            <span className="relative z-10">View Projects</span>
                        </Link>
                        <Link
                            href="/store"
                            className="clay-btn px-6 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl font-semibold w-full sm:w-auto text-center depth-3 hover:depth-4"
                        >
                            <span className="relative z-10">Visit Store</span>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Interactive 3D Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-1/3 left-1/6 w-8 h-8 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-clay-200/30 to-clay-300/20 backdrop-blur-sm border border-white/10"
                    animate={{
                        y: [0, -20, 0],
                        x: [0, 15, 0],
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-1/3 right-1/6 w-12 h-12 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-clay-300/25 to-clay-400/15 backdrop-blur-sm border border-white/10"
                    animate={{
                        y: [0, 25, 0],
                        rotate: [0, 90, 180, 270, 360],
                    }}
                    transition={{
                        duration: 9,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>
        </section>
    )
}
