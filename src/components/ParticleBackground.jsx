import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Animated particles component
function AnimatedParticles() {
  const ref = useRef()
  
  // Generate random particle positions
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(5000 * 3)
    
    for (let i = 0; i < 5000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100
    }
    
    return positions
  }, [])

  // Animation loop
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.05
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00f5ff"
          size={0.8}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  )
}

// Floating geometric shapes
function FloatingShapes() {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Wireframe Torus */}
      <mesh position={[-20, 10, -30]}>
        <torusGeometry args={[3, 1, 8, 16]} />
        <meshBasicMaterial color="#bf00ff" wireframe />
      </mesh>
      
      {/* Wireframe Octahedron */}
      <mesh position={[25, -15, -25]}>
        <octahedronGeometry args={[2]} />
        <meshBasicMaterial color="#39ff14" wireframe />
      </mesh>
      
      {/* Wireframe Icosahedron */}
      <mesh position={[-15, -20, -40]}>
        <icosahedronGeometry args={[1.5]} />
        <meshBasicMaterial color="#ff10f0" wireframe />
      </mesh>
      
      {/* Wireframe Tetrahedron */}
      <mesh position={[30, 20, -35]}>
        <tetrahedronGeometry args={[2.5]} />
        <meshBasicMaterial color="#00f5ff" wireframe />
      </mesh>
    </group>
  )
}

// Grid lines for cyber effect
function CyberGrid() {
  const gridRef = useRef()
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime) * 0.05
    }
  })

  return (
    <gridHelper
      ref={gridRef}
      args={[100, 20, '#00f5ff', '#00f5ff']}
      position={[0, -30, 0]}
    />
  )
}

const ParticleBackground = () => {
  return (
    <div className="particle-bg">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        {/* Ambient lighting */}
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#00f5ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.2} color="#bf00ff" />
        
        {/* 3D Elements */}
        <AnimatedParticles />
        <FloatingShapes />
        <CyberGrid />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#0a0a0a', 50, 200]} />
      </Canvas>
    </div>
  )
}

export default ParticleBackground