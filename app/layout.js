import './globals.css'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'

const Claymorphism3D = dynamic(() => import('@/components/Claymorphism3D'), {
    ssr: false,
})

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata = {
    title: 'Bibekmeher.in - Open Source Developer | AI Builder',
    description: 'Full Stack Developer, AI Builder, and Automation Expert. Building powerful websites, AI tools, and digital products.',
    keywords: 'full stack developer, AI builder, automation expert, web development, MERN stack',
    authors: [{ name: 'Bibek' }],
    openGraph: {
        title: 'BM - Open Source Developer | AI Builder',
        description: 'Building powerful websites, AI tools, and digital products.',
        type: 'website',
    },
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className={`${inter.className} perspective-3d`}>
                <ThemeProvider>
                    <Claymorphism3D />
                    <Navbar />
                    <main className="min-h-screen relative z-10">
                        <div className="page-transition">
                            {children}
                        </div>
                    </main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    )
}
