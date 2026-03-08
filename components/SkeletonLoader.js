export function SkeletonCard() {
    return (
        <div className="skeleton-card">
            <div className="h-48 skeleton mb-4"></div>
            <div className="skeleton-title w-3/4"></div>
            <div className="skeleton-text w-full"></div>
            <div className="skeleton-text w-5/6"></div>
            <div className="flex gap-2 mt-4">
                <div className="h-6 w-16 skeleton"></div>
                <div className="h-6 w-16 skeleton"></div>
                <div className="h-6 w-16 skeleton"></div>
            </div>
        </div>
    )
}

export function SkeletonList() {
    return (
        <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="glass p-4 rounded-lg">
                    <div className="skeleton-title w-1/2"></div>
                    <div className="skeleton-text w-full"></div>
                    <div className="skeleton-text w-4/5"></div>
                </div>
            ))}
        </div>
    )
}

export function SkeletonGrid() {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    )
}
