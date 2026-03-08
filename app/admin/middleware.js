// This middleware protects admin routes
export function checkAdminAccess() {
    if (typeof window === 'undefined') return false

    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if (!token || !user) {
        return false
    }

    try {
        const userData = JSON.parse(user)
        return userData.role === 'admin'
    } catch (error) {
        return false
    }
}
