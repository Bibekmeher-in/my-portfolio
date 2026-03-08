'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import axios from 'axios'
import { isAuthenticated, isAdmin, getToken, logout } from '@/lib/auth'
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi'

export default function AdminDashboard() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState('products')
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingItem, setEditingItem] = useState(null)

    useEffect(() => {
        if (!isAuthenticated() || !isAdmin()) {
            router.push('/admin/login')
            return
        }
        fetchData()
    }, [activeTab])

    const fetchData = async () => {
        setLoading(true)
        try {
            const endpoint = activeTab === 'messages' ? 'contact' :
                activeTab === 'subscribers' ? 'newsletter' : activeTab
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}`, {
                headers: { Authorization: `Bearer ${getToken()}` }
            })
            setData(res.data)
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this?')) return

        try {
            const endpoint = activeTab === 'messages' ? 'contact' : activeTab
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}/${id}`, {
                headers: { Authorization: `Bearer ${getToken()}` }
            })
            fetchData()
        } catch (error) {
            alert('Error deleting: ' + (error.response?.data?.error || error.message))
        }
    }

    const tabs = [
        { id: 'products', name: 'Products', canAdd: true },
        { id: 'projects', name: 'Projects', canAdd: true },
        { id: 'blog', name: 'Blog', canAdd: true },
        { id: 'services', name: 'Services', canAdd: true },
        { id: 'messages', name: 'Messages', canAdd: false },
    ]

    const currentTab = tabs.find(t => t.id === activeTab)

    return (
        <div className="pt-24 section-padding">
            <div className="container-custom">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold gradient-text">Admin Dashboard</h1>
                    <button onClick={logout} className="btn-secondary w-full sm:w-auto">Logout</button>
                </div>

                <div className="flex gap-2 mb-8 flex-wrap overflow-x-auto pb-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id)
                                setShowForm(false)
                            }}
                            className={`px-3 sm:px-6 py-2 rounded-lg capitalize text-xs sm:text-sm whitespace-nowrap ${activeTab === tab.id ? 'bg-primary' : 'glass'
                                }`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>

                {showForm ? (
                    <FormComponent
                        type={activeTab}
                        item={editingItem}
                        onClose={() => {
                            setShowForm(false)
                            setEditingItem(null)
                            fetchData()
                        }}
                    />
                ) : (
                    <div className="glass p-4 sm:p-6 rounded-lg">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                            <h2 className="text-xl sm:text-2xl font-bold capitalize">{activeTab}</h2>
                            {currentTab?.canAdd && (
                                <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
                                    <HiPlus /> Add New
                                </button>
                            )}
                        </div>

                        {loading ? (
                            <div className="text-center py-8">Loading...</div>
                        ) : (
                            <DataTable
                                data={data}
                                type={activeTab}
                                onEdit={(item) => {
                                    setEditingItem(item)
                                    setShowForm(true)
                                }}
                                onDelete={handleDelete}
                                canEdit={currentTab?.canAdd}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

function DataTable({ data, type, onEdit, onDelete, canEdit }) {
    if (data.length === 0) {
        return <div className="text-center py-8 text-gray-400 text-sm sm:text-base">No data</div>
    }

    // Special rendering for messages
    if (type === 'messages') {
        return (
            <div className="space-y-3 sm:space-y-4">
                {data.map((item) => (
                    <div key={item._id} className="glass p-3 sm:p-4 rounded-lg border border-white/10">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4 mb-3">
                            <div className="min-w-0 flex-1">
                                <h3 className="font-bold text-sm sm:text-lg break-words">{item.name}</h3>
                                <p className="text-xs sm:text-sm text-gray-400 break-all">{item.email}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <span className="text-xs px-2 sm:px-3 py-1 rounded-full bg-primary/20 text-primary inline-block">
                                    {item.service}
                                </span>
                                <p className="text-xs text-gray-400 mt-1 whitespace-nowrap">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="bg-black/20 p-2 sm:p-3 rounded text-xs sm:text-sm break-words">
                            <p>{item.message}</p>
                        </div>
                        <div className="flex justify-end mt-2">
                            <button
                                onClick={() => onDelete(item._id)}
                                className="text-red-500 text-xs sm:text-sm hover:text-red-400 flex items-center gap-1"
                            >
                                <HiTrash /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full text-xs sm:text-sm">
                <thead>
                    <tr className="border-b border-white/10">
                        <th className="text-left p-2 sm:p-3">Title</th>
                        <th className="text-left p-2 sm:p-3">Date</th>
                        <th className="text-left p-2 sm:p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item._id} className="border-b border-white/10">
                            <td className="p-2 sm:p-3 truncate">{item.title || item.name || item.email}</td>
                            <td className="p-2 sm:p-3 whitespace-nowrap">{new Date(item.createdAt).toLocaleDateString()}</td>
                            <td className="p-2 sm:p-3">
                                {canEdit && (
                                    <div className="flex gap-2">
                                        <button onClick={() => onEdit(item)} className="text-primary hover:text-primary/80">
                                            <HiPencil />
                                        </button>
                                        <button onClick={() => onDelete(item._id)} className="text-red-500 hover:text-red-400">
                                            <HiTrash />
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function FormComponent({ type, item, onClose }) {
    const [formData, setFormData] = useState(item || {})
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (item) {
                await axios.put(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/${type}/${item._id}`,
                    formData,
                    { headers: { Authorization: `Bearer ${getToken()}` } }
                )
            } else {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/${type}`,
                    formData,
                    { headers: { Authorization: `Bearer ${getToken()}` } }
                )
            }
            alert('Saved successfully!')
            onClose()
        } catch (error) {
            alert('Error: ' + (error.response?.data?.error || error.message))
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-4 sm:p-8 rounded-lg max-w-3xl mx-auto"
        >
            <h2 className="text-xl sm:text-2xl font-bold mb-6 capitalize">
                {item ? 'Edit' : 'Add New'} {type.slice(0, -1)}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Common Fields */}
                <div>
                    <label className="block text-xs sm:text-sm font-medium mb-2">Title *</label>
                    <input
                        type="text"
                        placeholder="Enter title"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 glass rounded-lg focus:outline-none focus:border-primary text-sm"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs sm:text-sm font-medium mb-2">Description *</label>
                    <textarea
                        placeholder="Enter description"
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 glass rounded-lg focus:outline-none focus:border-primary text-sm"
                        rows="4"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs sm:text-sm font-medium mb-2">Image URL</label>
                    <input
                        type="url"
                        placeholder="https://example.com/image.jpg (optional)"
                        value={formData.image || ''}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 glass rounded-lg focus:outline-none focus:border-primary text-sm"
                    />
                    <p className="text-xs text-gray-400 mt-1">Optional: Use image hosting services like Imgur, Cloudinary, or upload to your server</p>
                </div>

                {/* Projects Specific Fields */}
                {type === 'projects' && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium mb-2">Live Demo URL</label>
                                <input
                                    type="url"
                                    placeholder="https://demo.example.com"
                                    value={formData.liveUrl || ''}
                                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 glass rounded-lg focus:outline-none focus:border-primary text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium mb-2">GitHub URL</label>
                                <input
                                    type="url"
                                    placeholder="https://github.com/username/repo"
                                    value={formData.githubUrl || ''}
                                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 glass rounded-lg focus:outline-none focus:border-primary text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium mb-2">Technologies (comma separated)</label>
                            <input
                                type="text"
                                placeholder="React, Node.js, MongoDB"
                                value={formData.technologies || ''}
                                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 glass rounded-lg focus:outline-none focus:border-primary text-sm"
                            />
                        </div>
                    </>
                )}

                {/* Blog Specific Fields */}
                {type === 'blog' && (
                    <>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium mb-2">Content *</label>
                            <textarea
                                placeholder="Full blog post content (supports markdown)"
                                value={formData.content || ''}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 glass rounded-lg focus:outline-none focus:border-primary text-sm"
                                rows="8"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium mb-2">Author</label>
                                <input
                                    type="text"
                                    placeholder="Author name"
                                    value={formData.author || ''}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 glass rounded-lg focus:outline-none focus:border-primary text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium mb-2">Category</label>
                                <select
                                    value={formData.category || ''}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 glass rounded-lg focus:outline-none focus:border-primary text-sm"
                                >
                                    <option value="">Select category</option>
                                    <option value="web-development">Web Development</option>
                                    <option value="mobile-development">Mobile Development</option>
                                    <option value="ai-ml">AI & ML</option>
                                    <option value="automation">Automation</option>
                                    <option value="tutorial">Tutorial</option>
                                    <option value="news">News</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium mb-2">Tags (comma separated)</label>
                            <input
                                type="text"
                                placeholder="react, javascript, tutorial"
                                value={formData.tags || ''}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 glass rounded-lg focus:outline-none focus:border-primary text-sm"
                            />
                        </div>
                    </>
                )}

                {/* Services Specific Fields */}
                {type === 'services' && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium mb-2">Icon (emoji or icon name)</label>
                                <input
                                    type="text"
                                    placeholder="🚀 or FaRocket"
                                    value={formData.icon || ''}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 glass rounded-lg focus:outline-none focus:border-primary text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium mb-2">Price (optional)</label>
                                <input
                                    type="text"
                                    placeholder="Starting from ₹10,000"
                                    value={formData.price || ''}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 glass rounded-lg focus:outline-none focus:border-primary text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium mb-2">Features (one per line)</label>
                            <textarea
                                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                                value={formData.features || ''}
                                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 glass rounded-lg focus:outline-none focus:border-primary text-sm"
                                rows="5"
                            />
                        </div>
                    </>
                )}

                {/* Products Specific Fields */}
                {type === 'products' && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium mb-2">Price (₹) *</label>
                                <input
                                    type="number"
                                    placeholder="999"
                                    value={formData.price || ''}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 glass rounded-lg focus:outline-none focus:border-primary text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium mb-2">Category *</label>
                                <select
                                    value={formData.category || ''}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 glass rounded-lg focus:outline-none focus:border-primary text-sm"
                                    required
                                >
                                    <option value="">Select category</option>
                                    <option value="ebook">E-book</option>
                                    <option value="course">Course</option>
                                    <option value="template">Template</option>
                                    <option value="tool">Tool</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium mb-2">Download URL</label>
                            <input
                                type="url"
                                placeholder="https://example.com/download"
                                value={formData.downloadUrl || ''}
                                onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 glass rounded-lg focus:outline-none focus:border-primary text-sm"
                            />
                        </div>
                    </>
                )}

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                    <button type="submit" disabled={loading} className="btn-primary flex-1 text-sm sm:text-base">
                        {loading ? 'Saving...' : item ? 'Update' : 'Create'}
                    </button>
                    <button type="button" onClick={onClose} className="btn-secondary flex-1 text-sm sm:text-base">
                        Cancel
                    </button>
                </div>
            </form>
        </motion.div>
    )
}
