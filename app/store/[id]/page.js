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
                    color: '#8B7355',
                    backdrop_color: 'rgba(0, 0, 0, 0.8)',
                },
                modal: {
                    backdropclose: false,
                    escape: true,
                    handleback: true,
                    confirm_close: true,
                    ondismiss: function () {
                        setLoading(false)
                        // Remove body class when modal closes
                        document.body.classList.remove('razorpay-open')
                    },
                    animation: true,
                },
            }

            const razorpay = new window.Razorpay(options)

            // Add body class when modal opens
            razorpay.on('payment.submit', function () {
                document.body.classList.add('razorpay-open')
            })

            razorpay.open()

            // Ensure modal is visible by adding body class
            setTimeout(() => {
                document.body.classList.add('razorpay-open')
                // Force z-index on Razorpay elements
                const razorpayContainer = document.querySelector('.razorpay-container')
                const razorpayBackdrop = document.querySelector('.razorpay-backdrop')
                if (razorpayContainer) razorpayContainer.style.zIndex = '99999'
                if (razorpayBackdrop) razorpayBackdrop.style.zIndex = '99998'
            }, 100)

        } catch (error) {
            console.error('Error initiating payment:', error)
            alert('Failed to initiate payment. Please try again.')
            setLoading(false)
        }
    }

    if (!product) return (
        <div className="pt-24 section-padding text-center">
            <div className="text-2xl text-clay-text-muted">Loading...</div>
        </div>
    )

    return (
        <div className="pt-24 section-padding">
            <div className="container-custom max-w-6xl">
                <div className="grid md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="clay-card rounded-3xl overflow-hidden depth-2"
                    >
                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-96 object-cover"
                            />
                        ) : (
                            <div className="h-96 bg-gradient-to-br from-clay-200 to-clay-300 dark:from-clay-700 dark:to-clay-800 rounded-3xl flex items-center justify-center">
                                <HiShoppingCart className="text-9xl text-clay-text-muted opacity-30" />
                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <span className="px-4 py-2 clay-btn rounded-full text-sm capitalize inline-block">
                            {product.category}
                        </span>

                        <h1 className="text-4xl font-bold mt-4 mb-4 text-clay-text">{product.title}</h1>
                        <p className="text-clay-text-muted mb-6">{product.description}</p>

                        <div className="text-4xl font-bold gradient-text-clay mb-6">
                            {formatCurrency(product.price)}
                        </div>

                        {product.features && (
                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-4 text-clay-text">What's Included:</h3>
                                <ul className="space-y-2">
                                    {product.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-clay-text-secondary">
                                            <HiCheck className="text-green-600 dark:text-green-400 flex-shrink-0" size={20} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button
                            onClick={handlePurchase}
                            disabled={loading}
                            className="clay-btn w-full py-4 text-lg font-bold depth-3 hover:depth-4 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {loading ? 'Processing...' : 'Purchase Now'}
                        </button>

                        <div className="mt-4 text-center">
                            <p className="text-xs text-clay-text-muted mb-2">
                                Secure payment powered by Razorpay
                            </p>
                            <div className="flex justify-center items-center gap-3 text-xs text-clay-text-muted">
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
