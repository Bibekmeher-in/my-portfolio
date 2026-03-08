'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect, lazy, Suspense } from 'react'

const ParticleBackground = lazy(() => import('./ParticleBackground'))

function AutoScrollText() {
    const texts = ['Open Source Developer', 'AI Automation', 'Tech Entreprenuer']
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
                className="text-xl sm:text-2xl md:text-4xl mb-0 text-primary font-bold"
            >
                {texts[currentIndex]}
            </motion.h2>
        </AnimatePresence>
    )
}

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <Suspense fallback={<div className="absolute inset-0" />}>
                <ParticleBackground />
            </Suspense>

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        y: [0, -30, 0],
                        rotateZ: [0, 180, 360],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-20 left-4 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 border-2 border-primary/30 rounded-lg"
                    style={{ transform: 'rotateX(45deg) rotateY(45deg)' }}
                />
                <motion.div
                    animate={{
                        y: [0, 40, 0],
                        rotateZ: [360, 180, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute bottom-20 right-4 sm:right-10 w-20 h-20 sm:w-40 sm:h-40 border-2 border-secondary/30 rounded-full"
                />
            </div>

            <div className="container-custom relative z-10 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, z: -100 }}
                    animate={{ opacity: 1, z: 0 }}
                    transition={{ duration: 1 }}
                >
                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 text-shadow-horror leading-tight"
                        animate={{
                            textShadow: [
                                '0 0 10px rgba(220, 38, 38, 0.8)',
                                '0 0 30px rgba(153, 27, 27, 0.8)',
                                '0 0 10px rgba(220, 38, 38, 0.8)',
                            ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        Hi, I'm <span className="gradient-text">Bibek</span>
                    </motion.h1>

                    <motion.div
                        initial={{ rotateX: 90, opacity: 0 }}
                        animate={{ rotateX: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="glass p-4 sm:p-6 md:p-8 rounded-2xl mb-6 sm:mb-8 inline-block animate-float"
                    >
                        <AutoScrollText />
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-accent mb-0 mt-3 sm:mt-4 px-2">
                            I build powerful websites, AI tools, automation systems and digital products
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Link href="/projects" className="btn-primary animate-pulse-slow w-full sm:w-auto text-center">
                            View Projects
                        </Link>
                        <Link href="/store" className="btn-secondary animate-float-slow w-full sm:w-auto text-center">
                            Visit Store
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
