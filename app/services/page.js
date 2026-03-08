'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { HiCode, HiDeviceMobile, HiChatAlt2, HiLightningBolt, HiSearchCircle } from 'react-icons/hi'
import axios from 'axios'

export default function ServicesPage() {
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchServices()
    }, [])

    const defaultServices = [
        {
            _id: 'web-dev',
            title: 'Web Development',
            description: 'Build modern, responsive websites and web applications using latest technologies.',
            icon: '🌐',
            price: 'Starting from ₹15,000',
            features: 'Responsive Design\nSEO Optimized\nFast Performance\nSecure & Scalable'
        },
        {
            _id: 'ai-automation',
            title: 'AI Automation',
            description: 'Automate your business processes with AI-powered solutions and chatbots.',
            icon: '🤖',
            price: 'Starting from ₹20,000',
            features: 'AI Chatbots\nProcess Automation\nData Analysis\nCustom AI Solutions'
        },
        {
            _id: 'app-dev',
            title: 'App Development',
            description: 'Create powerful mobile and desktop applications for iOS, Android, and Windows.',
            icon: '📱',
            price: 'Starting from ₹25,000',
            features: 'Native Apps\nCross-Platform\nUser-Friendly UI\nReal-time Sync'
        },
        {
            _id: 'seo-opt',
            title: 'SEO Optimization',
            description: 'Boost your online visibility and rank higher on search engines.',
            icon: '📈',
            price: 'Starting from ₹10,000',
            features: 'Keyword Research\nOn-Page SEO\nLink Building\nAnalytics & Reports'
        },
        {
            _id: 'ethical-hack',
            title: 'Ethical Hacking',
            description: 'Secure your systems with comprehensive penetration testing and security audits.',
            icon: '🔒',
            price: 'Starting from ₹30,000',
            features: 'Security Audit\nPenetration Testing\nVulnerability Assessment\nSecurity Report'
        },
        {
            _id: 'any-project',
            title: 'Any Type of Project',
            description: 'Custom solutions tailored to your unique business needs and requirements.',
            icon: '⚡',
            price: 'Custom Quote',
            features: 'Custom Development\nConsultation\nProject Management\nPost-Launch Support'
        }
    ]

    const fetchServices = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/services`)
            setServices(res.data.length > 0 ? res.data : defaultServices)
        } catch (error) {
            console.error('Error fetching services:', error)
            setServices(defaultServices)
        } finally {
            setLoading(false)
        }
    }

    const iconMap = {
        'HiCode': HiCode,
        'HiDeviceMobile': HiDeviceMobile,
        'HiChatAlt2': HiChatAlt2,
        'HiLightningBolt': HiLightningBolt,
        'HiSearchCircle': HiSearchCircle,
    }

    const colors = ['#dc2626', '#991b1b', '#ef4444']

    return (
        <div className="pt-24 section-padding">
            <div className="container-custom">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-4xl sm:text-5xl md:text-7xl font-bold text-center mb-8 md:mb-12 gradient-text text-shadow-horror"
                >
                    Services
                </motion.h1>

                {loading ? (
                    <div className="text-center py-8 md:py-12">
                        <div className="text-xl md:text-2xl text-gray-400">Loading services...</div>
                    </div>
                ) : services.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass p-6 md:p-12 rounded-lg text-center"
                    >
                        <div className="text-4xl md:text-6xl mb-3 md:mb-4">💼</div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-2 gradient-text">Services Coming Soon</h2>
                        <p className="text-gray-400 text-sm md:text-base">
                            We're preparing amazing services for you. Stay tuned!
                        </p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                        {services.map((service, index) => {
                            const color = colors[index % colors.length]
                            const IconComponent = iconMap[service.icon] || HiCode
                            const featuresList = service.features ? service.features.split('\n').filter(f => f.trim()) : []

                            return (
                                <motion.div
                                    key={service._id}
                                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                    transition={{ delay: index * 0.15 }}
                                    whileHover={{
                                        y: -15,
                                        rotateY: 5,
                                        rotateX: 5,
                                        scale: 1.05,
                                    }}
                                    className="glass p-4 sm:p-6 md:p-8 rounded-2xl group cursor-pointer card-3d horror-glow relative overflow-hidden"
                                >
                                    <motion.div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                                        style={{
                                            background: `radial-gradient(circle at center, ${color}, transparent)`,
                                        }}
                                    />

                                    {service.image ? (
                                        <div className="mb-4 sm:mb-6">
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg group-hover:scale-110 transition-transform"
                                            />
                                        </div>
                                    ) : service.icon && service.icon.length <= 2 ? (
                                        <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">{service.icon}</div>
                                    ) : (
                                        <motion.div
                                            animate={{ rotate: [0, 360] }}
                                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                        >
                                            <IconComponent
                                                className="text-4xl sm:text-6xl mb-4 sm:mb-6 group-hover:scale-125 transition-transform duration-300"
                                                style={{ color: color, filter: `drop-shadow(0 0 10px ${color})` }}
                                            />
                                        </motion.div>
                                    )}

                                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{service.title}</h3>
                                    <p className="text-gray-300 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">{service.description}</p>

                                    {service.price && (
                                        <p className="text-accent font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{service.price}</p>
                                    )}

                                    {featuresList.length > 0 && (
                                        <ul className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6 space-y-1">
                                            {featuresList.map((feature, i) => (
                                                <li key={i}>✓ {feature}</li>
                                            ))}
                                        </ul>
                                    )}

                                    <Link
                                        href={`/contact?service=${encodeURIComponent(service.title)}`}
                                        className="text-accent hover:text-primary transition-colors font-semibold inline-flex items-center gap-2 text-sm sm:text-base"
                                    >
                                        Request Service →
                                    </Link>
                                </motion.div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
