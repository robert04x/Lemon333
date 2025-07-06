import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';

const GeometricLemon = ({ position }: { position: [number, number, number] }) => {
  const lemonRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!lemonRef.current) return;
    const t = state.clock.getElapsedTime();
    
    lemonRef.current.position.y += Math.sin(t + position[0]) * 0.003;
    lemonRef.current.rotation.y += 0.008;
    lemonRef.current.rotation.z = Math.sin(t * 0.7) * 0.15;
  });

  return (
    <group ref={lemonRef} position={position}>
      <mesh>
        <dodecahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial
          color="#fbbf24"
          transparent
          opacity={0.6}
          metalness={0.3}
          roughness={0.1}
          wireframe
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh scale={0.8}>
        <icosahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#fcd34d"
          transparent
          opacity={0.4}
          metalness={0.4}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
};

const GeometricPattern = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse, viewport } = useThree();
  
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(80, 80, 40, 40);
    const position = geo.attributes.position;
    
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      
      // Enhanced geometric pattern
      const wave1 = Math.sin(x * 0.2) * Math.cos(y * 0.2) * 0.8;
      const wave2 = Math.sin((x + y) * 0.3) * 0.6;
      const wave3 = Math.cos(Math.sqrt(x * x + y * y) * 0.3) * 0.7;
      const ripple = Math.sin(Math.sqrt(x * x + y * y) * 0.1) * 0.5;
      
      position.setZ(i, wave1 + wave2 + wave3 + ripple);
    }
    
    return geo;
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    
    const position = meshRef.current.geometry.attributes.position;
    const time = Date.now() * 0.0002;
    
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      
      // Enhanced mouse interaction
      const mouseEffect = new THREE.Vector2(mouse.x, mouse.y).multiplyScalar(3);
      const distanceToMouse = new THREE.Vector2(x / viewport.width, y / viewport.height)
        .sub(mouseEffect)
        .length();
      
      // More complex wave patterns
      const wave1 = Math.sin(x * 0.2 + time * 2) * Math.cos(y * 0.2 + time * 1.5) * 0.8;
      const wave2 = Math.sin((x + y) * 0.3 + time * 1.8) * 0.6;
      const wave3 = Math.cos(Math.sqrt(x * x + y * y) * 0.3 - time * 2.2) * 0.7;
      const ripple = Math.sin(Math.sqrt(x * x + y * y) * 0.1 - time * 3) * 0.5;
      
      const lift = Math.max(0, 6 - distanceToMouse) * 3;
      position.setZ(i, wave1 + wave2 + wave3 + ripple + lift);
    }
    
    position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, -8, -15]}>
      <primitive object={geometry} />
      <meshPhysicalMaterial
        color="#fbbf24"
        side={THREE.DoubleSide}
        wireframe
        transparent
        opacity={0.25}
        metalness={0.3}
        roughness={0.1}
        envMapIntensity={1.5}
      />
    </mesh>
  );
};

const FloatingShapes = () => {
  const shapes = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      ] as [number, number, number],
      scale: Math.random() * 0.8 + 0.4
    }));
  }, []);

  return (
    <>
      {shapes.map((shape, i) => (
        <GeometricLemon key={i} position={shape.position} />
      ))}
    </>
  );
};

const Background3D = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 40], fov: 65 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={['#fff8dc', 35, 90]} />
        <ambientLight intensity={1.2} />
        <pointLight position={[15, 15, 15]} intensity={2} color="#fef3c7" />
        <pointLight position={[-15, -15, -15]} intensity={0.8} color="#fbbf24" />
        <spotLight
          position={[0, 15, 0]}
          angle={0.6}
          penumbra={1}
          intensity={1.2}
          color="#fef3c7"
        />
        <directionalLight
          position={[10, 10, 5]}
          intensity={0.8}
          color="#fcd34d"
        />
        <GeometricPattern />
        <FloatingShapes />
      </Canvas>
    </div>
  );
};

export default Background3D;