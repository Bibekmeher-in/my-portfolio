import Link from 'next/link'
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa'

export default function Footer() {
    return (
        <footer className="glass border-t border-white/10">
            <div className="container-custom py-12">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-2xl font-bold gradient-text mb-4">Bibek Labs</h3>
                        <p className="text-gray-400">
                            Building the future with code, AI, and automation.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <div className="space-y-2">
                            <Link href="/" className="block text-gray-400 hover:text-primary">Home</Link>
                            <Link href="#about" className="block text-gray-400 hover:text-primary">About</Link>
                            <Link href="#services" className="block text-gray-400 hover:text-primary">Services</Link>
                            <Link href="#projects" className="block text-gray-400 hover:text-primary">Projects</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Resources</h4>
                        <div className="space-y-2">
                            <Link href="/store" className="block text-gray-400 hover:text-primary">Store</Link>
                            <Link href="/blog" className="block text-gray-400 hover:text-primary">Blog</Link>
                            <Link href="/contact" className="block text-gray-400 hover:text-primary">Contact</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Connect</h4>
                        <div className="flex gap-4">
                            <a href="https://github.com/Bibekmeher-in" className="text-2xl hover:text-primary transition-colors">
                                <FaGithub />
                            </a>
                            <a href="https://www.linkedin.com/in/bibekananda-meher-0990812b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-2xl hover:text-primary transition-colors">
                                <FaLinkedin />
                            </a>
                            <a href="https://x.com/Bibekanand59990" className="text-2xl hover:text-primary transition-colors">
                                <FaTwitter />
                            </a>
                            <a href="https://www.instagram.com/bibekmeher.in?igsh=MXZyYnVzdzBzMmVrZQ==" className="text-2xl hover:text-primary transition-colors">
                                <FaInstagram />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Bibek Labs. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
