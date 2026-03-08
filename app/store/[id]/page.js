'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { motion } from 'framer-motion'
import { HiShoppingCart, HiCheck } from 'react-icons/hi'
import { formatCurrency } from '@/lib/currency'

export default function ProductDetail() {
    const params = useParams()
    const router = useRouter()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchProduct()
        loadRazorpayScript()
    }, [])

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.id}`)
            setProduct(res.data)
        } catch (error) {
            console.error('Error fetching product:', error)
        }
    }

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = 'https://checkout.razorpay.com/v1/checkout.js'
            script.onload = () => resolve(true)
            script.onerror = () => resolve(false)
            document.body.appendChild(script)
        })
    }

    const handlePurchase = async () => {
        setLoading(true)

        try {
            // Create order on backend
            const orderRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-order`, {
                amount: product.price,
                productId: product._id,
                productTitle: product.title,
            })

            const { orderId, amount, currency, key } = orderRes.data

            // Razorpay options
            const options = {
                key: key,
                amount: amount,
                currency: currency,
                name: 'Bibek Labs',
                description: product.title,
                order_id: orderId,
                handler: async function (response) {
                    try {
                        // Verify payment on backend
                        const verifyRes = await axios.post(
                            `${process.env.NEXT_PUBLIC_API_URL}/api/payment/verify-payment`,
                            {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                productId: product._id,
                                productTitle: product.title,
                                amount: amount,
                            }
                        )

                        if (verifyRes.data.success) {
                            alert('Payment successful! Thank you for your purchase.')
                            router.push('/store')
                        }
                    } catch (error) {
                        console.error('Payment verification failed:', error)
                        alert('Payment verification failed. Please contact support.')
                    }
                },
                prefill: {
                    name: 'Customer',
                    email: '',
                },
                method: {
                    upi: true,
                    card: true,
                    netbanking: true,
                    wallet: true,
                },
                config: {
                    display: {
                        blocks: {
                            banks: {
                                name: 'All payment methods',
                                instruments: [
                                    {
                                        method: 'upi'
                                    },
                                    {
                                        method: 'card'
                                    },
                                    {
                                        method: 'netbanking'
                                    },
                                    {
                                        method: 'wallet'
                                    }
                                ],
                            },
                        },
                        sequence: ['block.banks'],
                        preferences: {
                            show_default_blocks: true,
                        },
                    },
                },
                theme: {
                    color: '#FF6B35',
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false)
                    }
                }
            }

            const razorpay = new window.Razorpay(options)
            razorpay.open()
        } catch (error) {
            console.error('Error initiating payment:', error)
            alert('Failed to initiate payment. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (!product) return (
        <div className="pt-24 section-padding text-center">
            <div className="text-2xl text-gray-400">Loading...</div>
        </div>
    )

    return (
        <div className="pt-24 section-padding">
            <div className="container-custom max-w-6xl">
                <div className="grid md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="rounded-lg overflow-hidden"
                    >
                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-96 object-cover"
                            />
                        ) : (
                            <div className="h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                                <HiShoppingCart className="text-9xl opacity-20" />
                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <span className="px-4 py-2 bg-primary/20 rounded-full text-sm capitalize">
                            {product.category}
                        </span>

                        <h1 className="text-4xl font-bold mt-4 mb-4">{product.title}</h1>
                        <p className="text-gray-400 mb-6">{product.description}</p>

                        <div className="text-4xl font-bold text-primary mb-6">
                            {formatCurrency(product.price)}
                        </div>

                        {product.features && (
                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-4">What's Included:</h3>
                                <ul className="space-y-2">
                                    {product.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <HiCheck className="text-primary" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button
                            onClick={handlePurchase}
                            disabled={loading}
                            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Processing...' : 'Purchase Now'}
                        </button>

                        <div className="mt-4 text-center">
                            <p className="text-xs text-gray-400 mb-2">
                                Secure payment powered by Razorpay
                            </p>
                            <div className="flex justify-center items-center gap-3 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                    💳 Cards
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    📱 UPI
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    🏦 Net Banking
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                    👛 Wallets
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
