'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, OrbitControls, Text3D, Center } from '@react-three/drei'
import * as THREE from 'three'

function MangaPanel({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    // Subtle floating animation
    meshRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.1
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} rotation={rotation} castShadow>
        <boxGeometry args={[2.5, 3.5, 0.15]} />
        <meshStandardMaterial
          color="#f5f5dc"
          roughness={0.7}
          metalness={0.1}
          emissive="#1a1a1a"
          emissiveIntensity={0.05}
        />
        {/* Inner panel content */}
        <mesh position={[0, 0, 0.08]}>
          <planeGeometry args={[2.2, 3.2]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} />
        </mesh>
        {/* Manga lines effect */}
        <mesh position={[0, 0, 0.09]}>
          <planeGeometry args={[2, 3]} />
          <MeshDistortMaterial
            color="#E91E63"
            speed={1}
            distort={0.1}
            radius={1}
            transparent
            opacity={0.3}
          />
        </mesh>
      </mesh>
    </Float>
  )
}

function MangaBook() {
  const groupRef = useRef<THREE.Group>(null)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouseX * 0.5,
      0.1
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouseY * 0.3,
      0.1
    )
  })

  return (
    <group
      ref={groupRef}
      onPointerMove={(e) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1
        const y = -(e.clientY / window.innerHeight) * 2 + 1
        setMouseX(x)
        setMouseY(y)
      }}
    >
      <MangaPanel position={[-1.5, 0, 0]} rotation={[0, -0.3, 0]} />
      <MangaPanel position={[1.5, 0, 0]} rotation={[0, 0.3, 0]} />
      <MangaPanel position={[0, 0, -1]} rotation={[0, 0, 0]} />
    </group>
  )
}

export function MangaCanvas3D() {
  return (
    <div className="w-full h-[600px]">
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9C27B0" />
        <MangaBook />
      </Canvas>
    </div>
  )
}
