'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import axios from 'axios'
import { HiClock, HiTag } from 'react-icons/hi'

export default function BlogPage() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/blog`)
            setPosts(res.data)
        } catch (error) {
            console.error('Error fetching posts:', error)
        }
    }

    const categories = ['all', 'ai', 'coding', 'startup', 'automation', 'tech']
    const filteredPosts = filter === 'all'
        ? posts
        : posts.filter(p => p.category === filter)

    return (
        <div className="pt-24 section-padding">
            <div className="container-custom">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text">
                    Blog
                </h1>
                <p className="text-center text-gray-400 mb-12">
                    Insights on AI, coding, startups, and technology
                </p>

                <div className="flex justify-center gap-2 mb-12 flex-wrap px-2">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-3 sm:px-6 py-2 rounded-lg capitalize text-xs sm:text-sm ${filter === cat ? 'bg-primary' : 'glass hover:bg-white/10'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {filteredPosts.map((post, index) => (
                        <motion.article
                            key={post._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass rounded-lg overflow-hidden group hover:scale-105 transition-transform"
                        >
                            <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20" />

                            <div className="p-6">
                                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                                    <span className="flex items-center gap-1">
                                        <HiClock /> {post.readTime} min read
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <HiTag /> {post.category}
                                    </span>
                                </div>

                                <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>

                                <Link href={`/blog/${post.slug}`} className="text-primary hover:underline">
                                    Read More →
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </div>
    )
}
