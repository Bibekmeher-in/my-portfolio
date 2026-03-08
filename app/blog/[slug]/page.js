'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { motion } from 'framer-motion'
import { HiClock, HiTag, HiShare } from 'react-icons/hi'

export default function BlogPost() {
    const params = useParams()
    const [post, setPost] = useState(null)

    useEffect(() => {
        fetchPost()
    }, [])

    const fetchPost = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${params.slug}`)
            setPost(res.data)
        } catch (error) {
            console.error('Error fetching post:', error)
        }
    }

    if (!post) return <div className="pt-24 text-center">Loading...</div>

    return (
        <div className="pt-24 section-padding">
            <article className="container-custom max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="mb-8">
                        <span className="px-4 py-2 bg-primary/20 rounded-full text-sm capitalize">
                            {post.category}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

                    <div className="flex items-center gap-6 text-gray-400 mb-8">
                        <span className="flex items-center gap-2">
                            <HiClock /> {post.readTime} min read
                        </span>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="prose prose-invert max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/10">
                        <button className="flex items-center gap-2 btn-primary">
                            <HiShare /> Share Article
                        </button>
                    </div>
                </motion.div>
            </article>
        </div>
    )
}
