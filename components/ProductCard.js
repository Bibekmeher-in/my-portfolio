'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { HiShoppingCart } from 'react-icons/hi'
import { formatINR } from '@/lib/currency'

export default function ProductCard({ product, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="clay-card p-6 rounded-3xl overflow-hidden group depth-2 hover:depth-3"
        >
            <div className="h-48 bg-gradient-to-br from-clay-200 to-clay-300 dark:from-clay-700 dark:to-clay-800 rounded-2xl flex items-center justify-center mb-4">
                <HiShoppingCart className="text-6xl text-clay-text-muted opacity-40" />
            </div>

            <div>
                <span className="text-xs px-3 py-1 clay-btn rounded-full capitalize inline-block mb-3">
                    {product.category}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-2 text-clay-text">{product.title}</h3>
                <p className="text-clay-text-muted mb-4 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold gradient-text-clay">{formatINR(product.price)}</span>
                    <Link
                        href={`/store/${product._id}`}
                        className="clay-btn px-4 py-2 font-semibold depth-2 hover:depth-3 transition-all"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}
