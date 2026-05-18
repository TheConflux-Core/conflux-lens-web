'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ================================================================
// Hero Emblem Ring — the crosshair+lens emblem as a 3D ring
// floating behind the hero text, between particles and core
// ================================================================
function HeroEmblemRing() {
  const meshRef = useRef<THREE.Mesh>(null);
  const iconHaloRef = useRef<THREE.Mesh>(null);
  const ringGlowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      // Slow rotation — subtle, almost imperceptible
      meshRef.current.rotation.z = Math.sin(t * 0.08) * 0.15;
      meshRef.current.rotation.x = t * 0.03;
      const breathe = 1 + Math.sin(t * 0.5) * 0.025;
      meshRef.current.scale.setScalar(breathe);
    }
    if (ringGlowRef.current) {
      ringGlowRef.current.rotation.z = -t * 0.05;
      ringGlowRef.current.rotation.x = t * 0.02;
    }
    if (iconHaloRef.current) {
      const pulse = 0.06 + Math.sin(t * 1.5) * 0.025;
      iconHaloRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <Float speed={0.6} rotationIntensity={0.05} floatIntensity={0.4}>
      {/* Main emblem ring */}
      <mesh ref={meshRef} position={[0, 0, -2.5]}>
        <ringGeometry args={[2.8, 3.8, 128]} />
        <meshBasicMaterial
          color="#F4D03F"
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer halo ring */}
      <mesh ref={ringGlowRef} position={[0, 0, -2.6]}>
        <ringGeometry args={[3.6, 5.0, 64]} />
        <meshBasicMaterial
          color="#D4AF37"
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner glow dot (lens core) */}
      <mesh ref={iconHaloRef} position={[0, 0, -2.4]}>
        <circleGeometry args={[0.35, 32]} />
        <meshBasicMaterial
          color="#F4D03F"
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </Float>
  );
}

function SlowParticles({ count = 200 }) {
  const mesh = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute in a sphere around the lens
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 3 + Math.random() * 5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    if (mesh.current) {
      // Extremely slow drift — no spinning
      mesh.current.rotation.y = clock.getElapsedTime() * 0.015;
      mesh.current.rotation.x = clock.getElapsedTime() * 0.008;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#F4D03F"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function LensCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Very slow rotation — subtle presence, not spinning
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.08;
      
      // Gentle breathing scale
      const breathe = 1 + Math.sin(clock.getElapsedTime() * 0.4) * 0.03;
      meshRef.current.scale.setScalar(breathe);
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.3}>
      <Icosahedron ref={meshRef} args={[1.5, 1]} scale={1.4}>
        <MeshDistortMaterial
          color="#B8860B"
          attach="material"
          distort={0.15}
          speed={1}
          roughness={0.05}
          metalness={1}
        />
      </Icosahedron>
    </Float>
  );
}

function SubtleGlowRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      // Near-static — just a subtle tilt oscillation
      ringRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[2.8, 0.003, 8, 100]} />
      <meshStandardMaterial
        color="#D4AF37"
        emissive="#D4AF37"
        emissiveIntensity={0.08}
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

function AmbientGlow() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshBasicMaterial
        color="#F4D03F"
        transparent
        opacity={0.03}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#F4D03F" />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#D4AF37" />
      <pointLight position={[0, 3, 2]} intensity={1.5} color="#FFFFFF" />
      
      <SlowParticles count={180} />
      <HeroEmblemRing />
      <LensCore />
      <SubtleGlowRing />
      <AmbientGlow />
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 40 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}