import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Animated particles component - optimized and subtle
function AnimatedParticles() {
  const ref = useRef()
  
  // Generate fewer particles for better performance
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(1500 * 3) // Reduced from 5000 to 1500
    
    for (let i = 0; i < 1500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80
    }
    
    return positions
  }, [])

  // Slower, smoother animation
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.05
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.015) * 0.05
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.01) * 0.02
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 6]}>
      <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00f5ff"
          size={0.4} // Smaller particles
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.15} // Much more subtle
        />
      </Points>
    </group>
  )
}

// Floating geometric shapes - more subtle and optimized
function FloatingShapes() {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.02
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <group ref={groupRef}>
      {/* Wireframe Torus - more subtle */}
      <mesh position={[-25, 8, -40]}>
        <torusGeometry args={[2, 0.5, 6, 12]} />
        <meshBasicMaterial color="#bf00ff" wireframe transparent opacity={0.1} />
      </mesh>
      
      {/* Wireframe Octahedron - more subtle */}
      <mesh position={[30, -12, -35]}>
        <octahedronGeometry args={[1.5]} />
        <meshBasicMaterial color="#39ff14" wireframe transparent opacity={0.1} />
      </mesh>
      
      {/* Wireframe Icosahedron - more subtle */}
      <mesh position={[-20, -25, -50]}>
        <icosahedronGeometry args={[1]} />
        <meshBasicMaterial color="#ff10f0" wireframe transparent opacity={0.08} />
      </mesh>
    </group>
  )
}

// Grid lines for cyber effect - very subtle
function CyberGrid() {
  const gridRef = useRef()
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.material.opacity = 0.03 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02
    }
  })

  return (
    <gridHelper
      ref={gridRef}
      args={[80, 15, '#00f5ff', '#00f5ff']}
      position={[0, -35, 0]}
    />
  )
}

const ParticleBackground = () => {
  return (
    <div className="particle-bg">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        style={{ background: 'transparent' }}
        performance={{ min: 0.5 }} // Performance optimization
      >
        {/* Very subtle ambient lighting */}
        <ambientLight intensity={0.05} />
        <pointLight position={[15, 15, 15]} intensity={0.1} color="#00f5ff" />
        <pointLight position={[-15, -15, -15]} intensity={0.08} color="#bf00ff" />
        
        {/* 3D Elements - optimized and subtle */}
        <AnimatedParticles />
        <FloatingShapes />
        <CyberGrid />
        
        {/* Fog for depth - more subtle */}
        <fog attach="fog" args={['#0a0a0a', 40, 180]} />
      </Canvas>
    </div>
  )
}

export default ParticleBackground