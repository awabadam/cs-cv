"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const OBJECT_COUNT = 40;
const COLORS = ["#141414", "#3d3d3d", "#7d7a6f", "#c9c3b4", "#4a4a4a"];

interface FloatingObject {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  speed: number;
  rotSpeed: THREE.Vector3;
  scale: number;
  shape: number;
  color: string;
  offset: number;
}

function RiverObjects() {
  const groupRef = useRef<THREE.Group>(null);

  const objects = useMemo<FloatingObject[]>(() => {
    return Array.from({ length: OBJECT_COUNT }, (_, i) => {
      const t = i / OBJECT_COUNT;
      return {
        position: new THREE.Vector3(
          3 - t * 8 + (Math.random() - 0.5) * 2.5,
          3 - t * 6 + (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 3
        ),
        rotation: new THREE.Euler(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
        speed: 0.15 + Math.random() * 0.25,
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.015
        ),
        scale: 0.08 + Math.random() * 0.25,
        shape: Math.floor(Math.random() * 5),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        offset: Math.random() * Math.PI * 2,
      };
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    objects.forEach((obj) => {
      // Flow from top-right to bottom-left
      obj.position.x -= obj.speed * 0.008;
      obj.position.y -= obj.speed * 0.006;

      // Swirl motion
      obj.position.x += Math.sin(time * 0.3 + obj.offset) * 0.003;
      obj.position.y += Math.cos(time * 0.25 + obj.offset) * 0.002;
      obj.position.z += Math.sin(time * 0.2 + obj.offset * 2) * 0.001;

      // Rotate
      obj.rotation.x += obj.rotSpeed.x;
      obj.rotation.y += obj.rotSpeed.y;
      obj.rotation.z += obj.rotSpeed.z;

      // Respawn when off screen (bottom-left)
      if (obj.position.x < -6 || obj.position.y < -5) {
        obj.position.x = 5 + Math.random() * 2;
        obj.position.y = 4 + Math.random() * 2;
        obj.position.z = (Math.random() - 0.5) * 3;
      }
    });

    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const obj = objects[i];
        if (obj) {
          child.position.copy(obj.position);
          child.rotation.copy(obj.rotation);
        }
      });
    }
  });

  const geometries = useMemo(
    () => [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.OctahedronGeometry(0.6),
      new THREE.TetrahedronGeometry(0.7),
      new THREE.TorusGeometry(0.4, 0.15, 8, 16),
      new THREE.CylinderGeometry(0.3, 0.3, 1, 6),
    ],
    []
  );

  return (
    <group ref={groupRef}>
      {objects.map((obj, i) => (
        <mesh
          key={i}
          position={obj.position}
          rotation={obj.rotation}
          scale={obj.scale}
          geometry={geometries[obj.shape]}
        >
          <meshStandardMaterial
            color={obj.color}
            roughness={0.85}
            metalness={0.05}
            transparent
            opacity={0.6 + obj.scale * 0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ObjectRiver() {
  return (
    <div className="w-full h-full" style={{ background: "var(--paper-edge)" }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#e8e2d4"]} />
        <fog attach="fog" args={["#e8e2d4", 5, 12]} />

        {/* Soft editorial lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 3]} intensity={0.8} color="#f5f0e8" />
        <directionalLight position={[-3, -2, 2]} intensity={0.3} color="#c9c3b4" />

        <RiverObjects />
      </Canvas>
    </div>
  );
}
