/**
 * Three.js and React Three Fiber Patterns
 * Sourced from r3f.docs.pmnd.rs, threejs.org, and Awwwards Collections.
 */

export const THREEJS_PATTERNS = {
  r3f_boilerplate: {
    name: "R3F Canvas Boilerplate",
    description: "Standard setup for a React Three Fiber scene with responsive canvas, lights, and orbit controls.",
    code: `import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'

export default function Scene() {
  return (
    <div className="w-full h-full min-h-[100dvh]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* Your 3D Content Here */}
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
        
        <OrbitControls enableZoom={false} autoRotate />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}`
  },
  scroll_driven_models: {
    name: "Scroll-Driven 3D Model",
    description: "High-end Awwwards-style scroll interaction tying scroll progress to 3D object rotation/position.",
    code: `import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export function ScrollModel() {
  const scroll = useScroll()
  const ref = useRef()
  
  useFrame((state, delta) => {
    // The scroll offset is a value between 0 and 1
    const offset = scroll.offset
    // Rotate model based on scroll
    ref.current.rotation.y = offset * Math.PI * 2
    ref.current.position.y = Math.sin(offset * Math.PI) * 2
  })
  
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
      <meshPhysicalMaterial 
        roughness={0.1} 
        metalness={0.8} 
        clearcoat={1} 
        color="#ffffff" 
      />
    </mesh>
  )
}`
  },
  cdn_particle_system: {
    name: "CDN-Compatible Particle System (r128)",
    description: "Fallback for non-React environments. BufferGeometry particles optimized for performance.",
    code: `const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.005,
  color: 0xffffff,
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);`
  }
};

export function getR3fPatterns(type = "all") {
  if (type === "all") return THREEJS_PATTERNS;
  return THREEJS_PATTERNS[type] || THREEJS_PATTERNS;
}
