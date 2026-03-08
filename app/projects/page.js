'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiExternalLink, HiCode } from 'react-icons/hi'
import axios from 'axios'

export default function ProjectsPage() {
    const [filter, setFilter] = useState('all')
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`)
            setProjects(res.data)
        } catch (error) {
            console.error('Error fetching projects:', error)
        } finally {
            setLoading(false)
        }
    }

    const categories = ['all', 'web', 'ai', 'automation']
    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter)

    const colors = ['#dc2626', '#991b1b', '#ef4444']

    return (
        <div className="pt-24 section-padding">
            <div className="container-custom">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl sm:text-5xl md:text-7xl font-bold text-center mb-8 md:mb-12 gradient-text text-shadow-horror"
                >
                    Projects
                </motion.h1>

                <div className="flex justify-center gap-2 sm:gap-4 mb-8 md:mb-12 flex-wrap">
                    {categories.map((cat) => (
                        <motion.button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg capitalize font-semibold transition-all text-sm sm:text-base ${filter === cat
                                ? 'bg-gradient-to-r from-primary to-secondary text-white'
                                : 'glass hover:border-primary'
                                }`}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>

                {loading ? (
                    <div className="text-center py-8 md:py-12">
                        <div className="text-xl md:text-2xl text-gray-400">Loading projects...</div>
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass p-6 md:p-12 rounded-lg text-center"
                    >
                        <div className="text-4xl md:text-6xl mb-3 md:mb-4">🚀</div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-2 gradient-text">Projects Coming Soon</h2>
                        <p className="text-gray-400 text-sm md:text-base">
                            Amazing projects are in the works. Stay tuned!
                        </p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                        {filteredProjects.map((project, index) => {
                            const color = colors[index % colors.length]
                            const techArray = project.technologies ? project.technologies.split(',').map(t => t.trim()) : []

                            return (
                                <motion.div
                                    key={project._id}
                                    initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{
                                        y: -10,
                                        rotateY: 5,
                                        rotateX: 5,
                                    }}
                                    className="glass rounded-2xl overflow-hidden group card-3d horror-glow"
                                >
                                    {project.image ? (
                                        <div className="relative h-40 sm:h-48 overflow-hidden">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className="relative h-40 sm:h-48 flex items-center justify-center"
                                            style={{
                                                background: `radial-gradient(circle, ${color}40, transparent)`,
                                            }}
                                        >
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                                className="text-6xl sm:text-8xl opacity-30"
                                            >
                                                <HiCode style={{ color: color, filter: `drop-shadow(0 0 20px ${color})` }} />
                                            </motion.div>
                                        </div>
                                    )}

                                    <div className="p-4 sm:p-6">
                                        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-primary">{project.title}</h3>
                                        <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">{project.description}</p>

                                        {techArray.length > 0 && (
                                            <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                                                {techArray.map((tech, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-xs px-2 sm:px-3 py-1 rounded-full border"
                                                        style={{
                                                            borderColor: color,
                                                            color: color,
                                                            boxShadow: `0 0 10px ${color}40`,
                                                        }}
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-accent hover:text-primary transition-colors text-sm sm:text-base"
                                                >
                                                    <HiExternalLink /> Live Demo
                                                </a>
                                            )}
                                            {project.githubUrl && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-accent hover:text-secondary transition-colors text-sm sm:text-base"
                                                >
                                                    <HiCode /> GitHub
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
