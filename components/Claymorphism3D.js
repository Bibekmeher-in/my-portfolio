'use client'
import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshWobbleMaterial, MeshReflectorMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'

function ClaySphere({ position, size, color }) {
    const meshRef = useRef()

    useFrame((state) => {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    })

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <mesh ref={meshRef} position={position} castShadow receiveShadow>
                <sphereGeometry args={[size, 32, 32]} />
                <MeshWobbleMaterial
                    color={color}
                    factor={0.2}
                    speed={1}
                    roughness={0.8}
                    metalness={0.2}
                />
            </mesh>
        </Float>
    )
}

function ClayBox({ position, size, color }) {
    const meshRef = useRef()

    useFrame((state) => {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    })

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
            <mesh ref={meshRef} position={position} castShadow receiveShadow>
                <boxGeometry args={size} />
                <MeshWobbleMaterial
                    color={color}
                    factor={0.1}
                    speed={0.5}
                    roughness={0.7}
                    metalness={0.1}
                />
            </mesh>
        </Float>
    )
}

function ClayTorus({ position, size, color }) {
    const meshRef = useRef()

    useFrame((state) => {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
        meshRef.current.rotation.z = state.clock.elapsedTime * 0.2
    })

    return (
        <Float speed={2.5} rotationIntensity={0.8} floatIntensity={2}>
            <mesh ref={meshRef} position={position} castShadow receiveShadow>
                <torusGeometry args={[size, size * 0.3, 16, 100]} />
                <MeshWobbleMaterial
                    color={color}
                    factor={0.3}
                    speed={2}
                    roughness={0.6}
                    metalness={0.3}
                />
            </mesh>
        </Float>
    )
}

function Ground() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={2048}
                mixBlur={1}
                mixStrength={40}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#E6D2BC"
                metalness={0.5}
            />
        </mesh>
    )
}

function Lights() {
    return (
        <>
            <ambientLight intensity={0.4} color="#FFE5D9" />
            <directionalLight
                position={[10, 10, 5]}
                intensity={0.8}
                color="#FFE5D9"
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
            <pointLight position={[-10, -10, -10]} intensity={0.3} color="#D6B89C" />
            <hemisphereLight
                skyColor="#E6D2BC"
                groundColor="#5A4233"
                intensity={0.3}
            />
        </>
    )
}

export default function Claymorphism3D() {
    return (
        <>
            {/* 3D Canvas */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Canvas
                    shadows
                    camera={{ position: [0, 0, 20], fov: 50 }}
                    style={{ background: 'transparent' }}
                >
                    <Lights />
                    <ClaySphere position={[-15, 5, -10]} size={2} color="#E6D2BC" />
                    <ClayBox position={[12, -3, -15]} size={[3, 3, 3]} color="#D6B89C" />
                    <ClayTorus position={[-8, -8, -20]} size={3} color="#C9A889" />
                    <ClaySphere position={[18, 8, -25]} size={1.5} color="#8B7355" />
                    <ClayBox position={[-20, -10, -30]} size={[2, 4, 2]} color="#5A4233" />
                    <ClayTorus position={[5, 12, -35]} size={2} color="#E6D2BC" />
                    <Ground />
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        enableRotate={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                    />
                </Canvas>
            </div>

            {/* 2D Floating Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-clay-200/20 to-clay-300/10 backdrop-blur-sm border border-white/10"
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute top-3/4 right-1/4 w-48 h-48 rounded-3xl bg-gradient-to-tr from-clay-300/15 to-clay-400/10 backdrop-blur-sm border border-white/10"
                    animate={{
                        y: [0, 40, 0],
                        rotateX: [0, 45, 0],
                        rotateY: [0, 45, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 left-3/4 w-32 h-32 rounded-2xl bg-gradient-to-bl from-clay-400/20 to-clay-500/10 backdrop-blur-sm border border-white/10"
                    animate={{
                        y: [0, -20, 0],
                        rotateZ: [0, 90, 180, 270, 360],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>
        </>
    )
}