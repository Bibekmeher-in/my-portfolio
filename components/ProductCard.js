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
            className="glass rounded-lg overflow-hidden group card-3d"
        >
            <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <HiShoppingCart className="text-6xl opacity-20" />
            </div>

            <div className="p-6">
                <span className="text-xs px-3 py-1 bg-primary/20 rounded-full capitalize">
                    {product.category}
                </span>
                <h3 className="text-xl font-bold mt-3 mb-2">{product.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{formatINR(product.price)}</span>
                    <Link href={`/store/${product._id}`} className="btn-primary">
                        View Details
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}
