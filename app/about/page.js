'use client'
import { motion } from 'framer-motion'
import { SiReact, SiNodedotjs, SiMongodb, SiPython, SiTailwindcss, SiNextdotjs, SiGithub, SiFlutter } from 'react-icons/si'
import { FaAndroid, FaPaintBrush, FaJava } from 'react-icons/fa'

export default function AboutPage() {
    const skills = [
        { name: 'React', level: 95, icon: SiReact, color: '#dc2626' },
        { name: 'Node.js', level: 90, icon: SiNodedotjs, color: '#991b1b' },
        { name: 'MongoDB', level: 85, icon: SiMongodb, color: '#ef4444' },
        { name: 'Python', level: 88, icon: SiPython, color: '#dc2626' },
        { name: 'Next.js', level: 92, icon: SiNextdotjs, color: '#991b1b' },
        { name: 'Tailwind', level: 95, icon: SiTailwindcss, color: '#ef4444' },
        { name: 'Java', level: 85, icon: FaJava, color: '#dc2626' },
        { name: 'GitHub', level: 90, icon: SiGithub, color: '#991b1b' },
        { name: 'Canva', level: 88, icon: FaPaintBrush, color: '#ef4444' },
        { name: 'Android Studio', level: 82, icon: FaAndroid, color: '#dc2626' },
        { name: 'Flutter', level: 87, icon: SiFlutter, color: '#991b1b' },
    ]

    const journey = [
        { year: '2023', title: 'Started Web Development', desc: 'Began learning HTML, CSS, JavaScript' },
        { year: '2024', title: 'Full Stack Developer', desc: 'Mastered MERN stack development' },
        { year: '2025', title: 'AI & Automation', desc: 'Started building AI tools and automation systems' },
        { year: '2026', title: 'Tech Entrepreneur', desc: 'Launched Bibek Labs and digital products' },
    ]

    return (
        <div className="pt-24 section-padding">
            <div className="container-custom">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold text-center mb-12 gradient-text text-shadow-horror"
                >
                    About Me
                </motion.h1>

                <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="glass p-6 md:p-8 rounded-2xl card-3d horror-glow flex flex-col items-center"
                    >
                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary mb-4 md:mb-6 relative">
                            <img
                                src="public/images/bibek-profile.svg"
                                alt="Bibek"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none'
                                    e.target.nextSibling.style.display = 'flex'
                                }}
                            />
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 hidden items-center justify-center text-4xl md:text-6xl font-bold text-primary">
                                B
                            </div>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-primary">Bibek</h3>
                        <p className="text-accent text-center text-sm md:text-base">Tech Entrepreneur</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass p-6 md:p-8 rounded-2xl card-3d horror-glow md:col-span-2"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-primary">My Story</h3>
                        <p className="text-gray-300 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                            Bibek is a passionate developer and AI builder focused on creating modern digital solutions.
                            He specializes in web development, automation systems, AI chatbots, and scalable applications.
                        </p>
                        <p className="text-gray-300 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                            With years of experience in the tech industry, Bibek has helped numerous businesses transform
                            their digital presence and automate their workflows.
                        </p>
                        <p className="text-accent leading-relaxed text-sm md:text-base">
                            When not coding, Bibek enjoys sharing knowledge through blog posts and creating digital products.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass p-6 md:p-8 rounded-2xl card-3d horror-glow mb-12 md:mb-16"
                >
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-secondary text-center">Skills</h3>
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 + index * 0.05 }}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <skill.icon className="text-xl md:text-2xl" style={{ color: skill.color }} />
                                        <span className="font-semibold text-sm md:text-base">{skill.name}</span>
                                    </div>
                                    <span className="text-accent font-bold text-sm md:text-base">{skill.level}%</span>
                                </div>
                                <div className="h-2 md:h-3 bg-horror-dark rounded-full overflow-hidden border border-primary/30">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${skill.level}%` }}
                                        transition={{ duration: 1.5, delay: 0.9 + index * 0.05 }}
                                        className="h-full rounded-full"
                                        style={{
                                            background: `linear-gradient(90deg, ${skill.color}, ${colors[(index + 1) % colors.length]})`,
                                            boxShadow: `0 0 10px ${skill.color}`,
                                        }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <h3 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center gradient-text">My Journey</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {journey.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30, rotateY: -90 }}
                                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                                transition={{ delay: 1 + index * 0.2 }}
                                whileHover={{ scale: 1.05, rotateY: 5 }}
                                className="glass p-4 md:p-6 rounded-xl card-3d horror-glow"
                            >
                                <div className="text-primary font-bold text-2xl md:text-3xl mb-2 md:mb-3 text-shadow-horror">
                                    {item.year}
                                </div>
                                <h4 className="font-bold text-lg md:text-xl mb-1 md:mb-2 text-accent">{item.title}</h4>
                                <p className="text-gray-400 text-xs md:text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

const colors = ['#dc2626', '#991b1b', '#ef4444', '#7f1d1d']
