'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import ProductCard from '@/components/ProductCard'

export default function StorePage() {
    const [products, setProducts] = useState([])
    const [filter, setFilter] = useState('all')
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
            setProducts(res.data)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    const categories = ['all', 'ebook', 'course', 'template', 'tool']
    const filteredProducts = products.filter(p =>
        (filter === 'all' || p.category === filter) &&
        (search === '' || p.title.toLowerCase().includes(search.toLowerCase()))
    )

    return (
        <div className="pt-24 section-padding">
            <div className="container-custom">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text">
                    Digital Store
                </h1>
                <p className="text-center text-gray-400 mb-12">
                    Premium digital products to accelerate your development
                </p>

                <div className="mb-8 space-y-4">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:border-primary text-sm sm:text-base"
                    />

                    <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-3 sm:px-4 py-2 rounded-lg capitalize text-xs sm:text-sm ${filter === cat ? 'bg-primary' : 'glass hover:bg-white/10'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                            <ProductCard key={product._id} product={product} index={index} />
                        ))
                    ) : (
                        <div className="col-span-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass p-12 rounded-lg text-center"
                            >
                                <div className="text-6xl mb-4">🛍️</div>
                                <h2 className="text-3xl font-bold mb-2 gradient-text">
                                    Products Coming Soon
                                </h2>
                                <p className="text-gray-400">
                                    {search || filter !== 'all'
                                        ? 'No products match your search. Try different filters.'
                                        : 'We are working on amazing digital products for you. Stay tuned!'}
                                </p>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
