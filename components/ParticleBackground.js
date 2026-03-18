'use client'
import { motion } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'

function seededRandom(seed) {
    const x = Math.sin(seed) * 10000
    return x - Math.floor(x)
}

export default function ParticleBackground() {
    const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight })
        setMounted(true)
    }, [])

    // Reduced particle count from 80 to 30 for better performance
    const particles = useMemo(() => {
        const colors = ['#dc2626', '#991b1b', '#ef4444', '#7f1d1d']
        return Array.from({ length: 30 }).map((_, i) => {
            const seed1 = i * 0.1
            const seed2 = i * 0.2
            const seed3 = i * 0.3
            const seed4 = i * 0.4

            return {
                id: i,
                color: colors[i % colors.length],
                size: seededRandom(seed1) * 3 + 0.5,
                initialX: seededRandom(seed2),
                initialY: seededRandom(seed3),
                duration: seededRandom(seed4) * 15 + 10,
            }
        })
    }, [])

    if (!mounted) return null

    return (
        <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: particle.color,
                        boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                        willChange: 'transform, opacity',
                    }}
                    initial={{
                        x: particle.initialX * dimensions.width,
                        y: particle.initialY * dimensions.height,
                    }}
                    animate={{
                        x: [
                            particle.initialX * dimensions.width,
                            seededRandom(particle.id * 0.5) * dimensions.width,
                            seededRandom(particle.id * 0.6) * dimensions.width,
                        ],
                        y: [
                            particle.initialY * dimensions.height,
                            seededRandom(particle.id * 0.7) * dimensions.height,
                            seededRandom(particle.id * 0.8) * dimensions.height,
                        ],
                        scale: [0, 1, 0],
                        opacity: [0, 0.8, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    )
}
