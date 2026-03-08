export const isAuthenticated = () => {
    if (typeof window === 'undefined') return false
    const token = localStorage.getItem('token')
    return !!token
}

export const isAdmin = () => {
    if (typeof window === 'undefined') return false
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    return user.role === 'admin'
}

export const getToken = () => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('token')
}

export const getUserData = () => {
    if (typeof window === 'undefined') return null
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/admin/login'
}
