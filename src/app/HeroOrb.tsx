"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function FloatingOrb() {
  const mesh = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!mesh.current) return;

    mesh.current.rotation.x += delta * 0.12;
    mesh.current.rotation.y += delta * 0.18;
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.18;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.55, 4]} />
      <meshStandardMaterial color="#eef6ff" roughness={0.16} metalness={0.88} wireframe />
    </mesh>
  );
}

export default function HeroOrb() {
  return (
    <Canvas camera={{ position: [0, 0, 4.4], fov: 48 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={1.8} />
      <pointLight position={[2.5, 2, 3]} intensity={15} color="#b9dcff" />
      <pointLight position={[-3, -2, 1]} intensity={8} color="#ffffff" />
      <FloatingOrb />
    </Canvas>
  );
}
