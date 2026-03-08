'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { HiUser, HiMail, HiCalendar, HiShoppingBag } from 'react-icons/hi'
import axios from 'axios'
import { formatCurrency } from '@/lib/currency'

export default function ProfilePage() {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const userData = localStorage.getItem('user')
        if (!userData) {
            router.push('/login')
            return
        }
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        fetchOrders(parsedUser.email)
    }, [])

    const fetchOrders = async (email) => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/orders/${email}`)
            setOrders(res.data)
        } catch (error) {
            console.error('Error fetching orders:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        router.push('/')
    }

    if (!user) return <div className="pt-24 text-center">Loading...</div>

    return (
        <div className="pt-24 section-padding">
            <div className="container-custom max-w-6xl">
                <h1 className="text-4xl font-bold mb-8 gradient-text">My Profile</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Profile Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass p-8 rounded-2xl"
                    >
                        <h2 className="text-2xl font-bold mb-6">Profile Information</h2>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 p-4 glass rounded-lg">
                                <HiUser className="text-3xl text-primary" />
                                <div>
                                    <p className="text-sm text-gray-400">Name</p>
                                    <p className="text-xl font-semibold">{user.name}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 glass rounded-lg">
                                <HiMail className="text-3xl text-primary" />
                                <div>
                                    <p className="text-sm text-gray-400">Email</p>
                                    <p className="text-xl font-semibold">{user.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 glass rounded-lg">
                                <HiCalendar className="text-3xl text-primary" />
                                <div>
                                    <p className="text-sm text-gray-400">Role</p>
                                    <p className="text-xl font-semibold capitalize">{user.role}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <button onClick={handleLogout} className="btn-secondary w-full">
                                Logout
                            </button>
                        </div>
                    </motion.div>

                    {/* Order History */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass p-8 rounded-2xl"
                    >
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <HiShoppingBag className="text-primary" />
                            Order History
                        </h2>

                        {loading ? (
                            <div className="text-center py-8 text-gray-400">Loading orders...</div>
                        ) : orders.length === 0 ? (
                            <div className="text-center py-8">
                                <HiShoppingBag className="text-6xl text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-400">No orders yet</p>
                            </div>
                        ) : (
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                {orders.map((order) => (
                                    <div key={order._id} className="glass p-4 rounded-lg border border-white/10">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold">{order.productTitle}</h3>
                                            <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'completed'
                                                    ? 'bg-green-500/20 text-green-500'
                                                    : 'bg-yellow-500/20 text-yellow-500'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="text-2xl font-bold text-primary mb-2">
                                            {formatCurrency(order.amount)}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {new Date(order.createdAt).toLocaleDateString()} at{' '}
                                            {new Date(order.createdAt).toLocaleTimeString()}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Payment ID: {order.paymentId}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
